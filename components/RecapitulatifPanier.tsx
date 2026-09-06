"use client";

import { formaterPrix } from "@/lib/format";
import { SEUIL_FRANCO, usePanier } from "@/lib/panier";
import styles from "./RecapitulatifPanier.module.css";

/**
 * Le récapitulatif du panier (cahier §5.3).
 *
 * Tous les montants sont calculés par la fonction pure de lib/panier.tsx :
 * aucun total n'est écrit en dur, et le message de franco de port donne
 * le montant exact qui manque, jamais une approximation.
 */
export default function RecapitulatifPanier() {
  const { totaux } = usePanier();

  return (
    <aside className={styles.recapitulatif}>
      <h2 className={styles.titre}>Récapitulatif</h2>

      <dl className={styles.lignes}>
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

      {totaux.manqueFranco > 0 && (
        <p className={styles.franco}>
          Plus que {formaterPrix(totaux.manqueFranco)} pour la livraison offerte.
        </p>
      )}

      {totaux.manqueFranco === 0 && totaux.sousTotal > 0 && (
        <p className={styles.francoAtteint}>
          Livraison offerte à partir de {formaterPrix(SEUIL_FRANCO)} d&apos;achat.
        </p>
      )}

      <p className={styles.suite}>
        La commande sera disponible à la prochaine étape du projet.
      </p>
    </aside>
  );
}
