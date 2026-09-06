import CarteProduit from "@/components/CarteProduit";
import type { Produit } from "@/lib/types";
import styles from "./GrilleProduits.module.css";

/**
 * La grille du catalogue. Une seule règle CSS produit tout le comportement
 * responsive attendu — voir GrilleProduits.module.css.
 */
export default function GrilleProduits({ produits }: { produits: readonly Produit[] }) {
  return (
    <div className={styles.grille}>
      {produits.map((produit) => (
        <CarteProduit key={produit.id} produit={produit} />
      ))}
    </div>
  );
}
