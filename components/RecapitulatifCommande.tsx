"use client";

import { trouverProduit } from "@/lib/catalogue";
import { formaterPrix } from "@/lib/format";
import type { Totaux } from "@/lib/panier";
import type { LignePanier } from "@/lib/types";
import styles from "./RecapitulatifCommande.module.css";

/**
 * Le récapitulatif de la page Commande, avec le bouton de confirmation
 * (cahier §5.4).
 *
 * Le bouton dit **« Confirmer la commande »**, pas « Payer » : aucun bouton ne
 * doit laisser croire qu'un paiement a lieu (cahier §8). Aucun logo de moyen de
 * paiement n'apparaît ici, ni ailleurs.
 */
export default function RecapitulatifCommande({
  lignes,
  totaux,
}: {
  lignes: readonly LignePanier[];
  totaux: Totaux;
}) {
  return (
    <aside className={styles.recapitulatif}>
      <h2 className={styles.titre}>Votre commande</h2>

      <ul className={styles.articles}>
        {lignes.map((ligne) => {
          const produit = trouverProduit(ligne.produitId);
          if (!produit) return null;
          return (
            <li key={ligne.produitId} className={styles.article}>
              <span className={styles.nom}>
                {produit.nom}
                <span className={styles.quantite}> × {ligne.quantite}</span>
              </span>
              <span className={styles.montant}>
                {formaterPrix(produit.prix * ligne.quantite)}
              </span>
            </li>
          );
        })}
      </ul>

      <dl className={styles.totaux}>
        <div className={styles.ligne}>
          <dt>Sous-total</dt>
          <dd>{formaterPrix(totaux.sousTotal)}</dd>
        </div>
        <div className={styles.ligne}>
          <dt>Livraison</dt>
          <dd className={totaux.livraison === 0 ? styles.offerte : undefined}>
            {totaux.livraison === 0 ? "Offerte" : formaterPrix(totaux.livraison)}
          </dd>
        </div>
        <div className={`${styles.ligne} ${styles.totalLigne}`}>
          <dt>Total</dt>
          <dd>{formaterPrix(totaux.total)}</dd>
        </div>
      </dl>

      <button type="submit" className={styles.confirmer}>
        Confirmer la commande
      </button>

      <p className={styles.mention}>
        Aucun paiement ne vous sera demandé, à aucun moment.
      </p>
    </aside>
  );
}
