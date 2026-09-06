"use client";

import { QUANTITE_MAX, QUANTITE_MIN } from "@/lib/panier";
import styles from "./SelecteurQuantite.module.css";

/**
 * Le sélecteur de quantité, utilisé sur la fiche produit et dans le panier.
 *
 * Les bornes sont 1 à 10 (cahier §4). `minimum` descend à 0 dans le panier,
 * où passer sous 1 retire la ligne — l'appelant décide de ce que cela veut dire.
 */
export default function SelecteurQuantite({
  quantite,
  onChange,
  minimum = QUANTITE_MIN,
  nomProduit,
}: {
  quantite: number;
  onChange: (quantite: number) => void;
  minimum?: number;
  nomProduit: string;
}) {
  return (
    <div className={styles.groupe}>
      <button
        type="button"
        className={styles.bouton}
        onClick={() => onChange(quantite - 1)}
        disabled={quantite <= minimum}
        aria-label={`Diminuer la quantité de ${nomProduit}`}
      >
        −
      </button>

      <span className={styles.valeur} aria-live="polite">
        {quantite}
      </span>

      <button
        type="button"
        className={styles.bouton}
        onClick={() => onChange(quantite + 1)}
        disabled={quantite >= QUANTITE_MAX}
        aria-label={`Augmenter la quantité de ${nomProduit}`}
      >
        +
      </button>
    </div>
  );
}
