"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ChampsAdresse from "@/components/ChampsAdresse";
import EtatVide from "@/components/EtatVide";
import RecapitulatifCommande from "@/components/RecapitulatifCommande";
import { trouverProduit } from "@/lib/catalogue";
import {
  ADRESSE_VIDE,
  enregistrerCommande,
  tirerNumeroCommande,
  validerAdresse,
  type Adresse,
  type Erreurs,
  type LigneCommandee,
} from "@/lib/commande";
import { usePanier } from "@/lib/panier";
import styles from "./FormulaireCommande.module.css";

/**
 * Le formulaire de commande (cahier §5.4).
 *
 * **Aucun champ de paiement, sous aucune forme**, et aucun bouton laissant
 * croire qu'un paiement a lieu (cahier §8, CLAUDE.md §1).
 *
 * La commande ne part nulle part : elle est gardée le temps d'afficher la
 * confirmation, puis le panier est vidé.
 */
export default function FormulaireCommande() {
  const router = useRouter();
  const { lignes, totaux, restaure, vider } = usePanier();
  const [adresse, setAdresse] = useState<Adresse>(ADRESSE_VIDE);
  const [erreurs, setErreurs] = useState<Erreurs>({});

  if (!restaure) return null;

  if (lignes.length === 0) {
    return (
      <EtatVide
        titre="Votre panier est vide"
        explication="Il n'y a rien à commander pour le moment. Ajoutez un produit au panier, puis revenez ici."
        libelleLien="Voir le catalogue"
      />
    );
  }

  function modifier(champ: keyof Adresse, valeur: string) {
    setAdresse((precedente) => ({ ...precedente, [champ]: valeur }));
    // L'erreur disparaît dès que le visiteur corrige, sans attendre l'envoi.
    setErreurs((precedentes) => ({ ...precedentes, [champ]: undefined }));
  }

  function confirmer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();

    const trouvees = validerAdresse(adresse);
    // Formulaire incomplet : la commande ne part pas (cahier §9, cas 9).
    if (Object.keys(trouvees).length > 0) {
      setErreurs(trouvees);
      return;
    }

    const lignesCommandees: LigneCommandee[] = lignes.flatMap((ligne) => {
      const produit = trouverProduit(ligne.produitId);
      if (!produit) return [];
      return [
        {
          produitId: produit.id,
          nom: produit.nom,
          prixUnitaire: produit.prix,
          quantite: ligne.quantite,
        },
      ];
    });

    enregistrerCommande({
      numero: tirerNumeroCommande(),
      adresse,
      lignes: lignesCommandees,
      totaux,
    });

    vider();
    router.push("/commande/confirmation");
  }

  return (
    <form className={styles.formulaire} onSubmit={confirmer} noValidate>
      <div>
        <h2 className={styles.titreBloc}>Adresse de livraison</h2>
        <p className={styles.obligatoires}>Tous les champs sont obligatoires.</p>
        <ChampsAdresse adresse={adresse} erreurs={erreurs} onChange={modifier} />
      </div>

      <RecapitulatifCommande lignes={lignes} totaux={totaux} />
    </form>
  );
}
