import BandeauDemo from "@/components/BandeauDemo";
import Confirmation from "@/components/Confirmation";
import styles from "./page.module.css";

export const metadata = { title: "Commande confirmée — H Store" };

/**
 * La page de confirmation (cahier §5.5).
 *
 * Comme la page Commande, le bandeau de démonstration est le **premier
 * élément** : il est lu avant le numéro de commande, sans avoir à défiler.
 */
export default function PageConfirmation() {
  return (
    <main>
      <BandeauDemo>
        Aucune commande n&apos;a été enregistrée et aucun paiement n&apos;a été demandé. Le numéro
        ci-dessous est tiré au hasard pour la démonstration.
      </BandeauDemo>

      <div className={styles.contenu}>
        <Confirmation />
      </div>
    </main>
  );
}
