import BandeauDemo from "@/components/BandeauDemo";
import FormulaireCommande from "@/components/FormulaireCommande";
import styles from "./page.module.css";

export const metadata = { title: "Commande — H Store" };

/**
 * La page Commande (cahier §5.4).
 *
 * Le bandeau de démonstration est le **premier élément de la page**, donc
 * visible sans défiler, y compris à 390 px (cahier §8). Ne pas le déplacer.
 */
export default function Commande() {
  return (
    <main>
      <BandeauDemo>
        Cette boutique est une démonstration. Votre commande ne sera pas enregistrée, rien ne vous
        sera envoyé, et aucun paiement ne vous sera demandé — il n&apos;y a aucun champ de carte
        bancaire sur ce site.
      </BandeauDemo>

      <h1 className={styles.titre}>Commande</h1>

      <FormulaireCommande />
    </main>
  );
}
