"use client";

import { useSearchParams } from "next/navigation";
import styles from "./ChampRecherche.module.css";

/**
 * Le champ de recherche de la barre du haut.
 *
 * Il est client pour une seule raison : relire le terme dans l'adresse et le
 * réafficher. Sans cela, le visiteur cherche « carnet », voit ses résultats,
 * et retrouve un champ vide — comme si sa recherche n'avait pas eu lieu.
 *
 * Le champ reste non contrôlé : `key` force React à le recréer quand le terme
 * de l'adresse change, ce qui évite de piloter chaque frappe pour rien.
 */
export default function ChampRecherche() {
  const recherche = useSearchParams().get("q") ?? "";

  return (
    <input
      key={recherche}
      type="search"
      name="q"
      defaultValue={recherche}
      className={styles.champ}
      placeholder="Rechercher un produit"
      aria-label="Rechercher un produit"
    />
  );
}
