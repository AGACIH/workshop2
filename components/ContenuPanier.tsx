"use client";

import EtatVide from "@/components/EtatVide";
import LignePanier from "@/components/LignePanier";
import RecapitulatifPanier from "@/components/RecapitulatifPanier";
import { trouverProduit } from "@/lib/catalogue";
import { usePanier } from "@/lib/panier";
import styles from "./ContenuPanier.module.css";

/**
 * Le contenu du panier. Isolé ici pour que la page reste un composant serveur.
 *
 * Tant que le panier n'a pas été relu dans le navigateur, on n'affiche rien :
 * annoncer « votre panier est vide » avant d'avoir regardé serait faux.
 */
export default function ContenuPanier() {
  const { lignes, restaure } = usePanier();

  if (!restaure) return null;

  if (lignes.length === 0) {
    return (
      <EtatVide
        commeTitre
        titre="Votre panier est vide"
        explication="Parcourez le catalogue et ajoutez un produit : il restera dans ce navigateur si vous revenez plus tard."
        libelleLien="Voir le catalogue"
      />
    );
  }

  return (
    <>
      <h1 className={styles.titre}>Votre panier</h1>

      <div className={styles.disposition}>
        <ul className={styles.lignes}>
          {lignes.map((ligne) => {
            const produit = trouverProduit(ligne.produitId);
            // Une ligne dont le produit a disparu du catalogue est ignorée (cahier §9, cas 6).
            if (!produit) return null;
            return (
              <LignePanier key={ligne.produitId} produit={produit} quantite={ligne.quantite} />
            );
          })}
        </ul>

        <RecapitulatifPanier />
      </div>
    </>
  );
}
