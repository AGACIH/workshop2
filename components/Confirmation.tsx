"use client";

import Link from "next/link";
import { useEffect, useReducer } from "react";
import EtatVide from "@/components/EtatVide";
import { lireCommande, type Commande } from "@/lib/commande";
import { formaterPrix } from "@/lib/format";
import styles from "./Confirmation.module.css";

type Lecture = { lue: boolean; commande: Commande | null };

/**
 * La lecture passe par un réducteur plutôt que par deux `useState` : les deux
 * valeurs changent toujours ensemble, et c'est le même geste que le panier.
 */
function reduireLecture(_precedente: Lecture, commande: Commande | null): Lecture {
  return { lue: true, commande };
}

/**
 * La page de confirmation (cahier §5.5).
 *
 * La commande est relue **après le montage** : elle vit dans le navigateur,
 * qui n'existe pas au rendu serveur. C'est aussi pourquoi le numéro est tiré
 * au moment de la confirmation et non ici — sinon le rendu serveur et le rendu
 * client afficheraient deux numéros différents.
 */
export default function Confirmation() {
  const [{ lue, commande }, deposerCommande] = useReducer(reduireLecture, {
    lue: false,
    commande: null,
  });

  useEffect(() => {
    deposerCommande(lireCommande());
  }, []);

  if (!lue) return null;

  if (!commande) {
    return (
      <EtatVide
        commeTitre
        titre="Aucune commande récente"
        explication="Cette page affiche le récapitulatif juste après une commande. Il n'y en a pas en mémoire dans cet onglet."
        libelleLien="Retour à la boutique"
      />
    );
  }

  const { adresse, lignes, totaux } = commande;

  return (
    <div className={styles.confirmation}>
      <h1 className={styles.titre}>Merci, votre commande est confirmée</h1>
      <p className={styles.numero}>
        Numéro de commande : <strong>{commande.numero}</strong>
      </p>

      <div className={styles.blocs}>
        <section className={styles.bloc}>
          <h2 className={styles.titreBloc}>Récapitulatif</h2>
          <ul className={styles.articles}>
            {lignes.map((ligne) => (
              <li key={ligne.produitId} className={styles.article}>
                <span>
                  {ligne.nom}
                  <span className={styles.quantite}> × {ligne.quantite}</span>
                </span>
                <span className={styles.montant}>
                  {formaterPrix(ligne.prixUnitaire * ligne.quantite)}
                </span>
              </li>
            ))}
          </ul>

          <dl className={styles.totaux}>
            <div className={styles.ligne}>
              <dt>Sous-total</dt>
              <dd>{formaterPrix(totaux.sousTotal)}</dd>
            </div>
            <div className={styles.ligne}>
              <dt>Livraison</dt>
              <dd>{totaux.livraison === 0 ? "Offerte" : formaterPrix(totaux.livraison)}</dd>
            </div>
            <div className={`${styles.ligne} ${styles.totalLigne}`}>
              <dt>Total</dt>
              <dd>{formaterPrix(totaux.total)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.bloc}>
          <h2 className={styles.titreBloc}>Adresse de livraison</h2>
          <address className={styles.adresse}>
            {adresse.prenom} {adresse.nom}
            <br />
            {adresse.adresse}
            <br />
            {adresse.codePostal} {adresse.ville}
            <br />
            {adresse.pays}
            <br />
            {adresse.email}
          </address>
        </section>
      </div>

      <p className={styles.rappel}>
        Ceci est une démonstration. Aucune commande n&apos;a été enregistrée et aucun paiement
        n&apos;a été demandé.
      </p>

      <p>
        <Link href="/" className={styles.retour}>
          Retour à la boutique
        </Link>
      </p>
    </div>
  );
}
