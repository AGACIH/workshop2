"use client";

import Link from "next/link";
import { usePanier } from "@/lib/panier";
import styles from "./BoutonPanier.module.css";

/**
 * Le bouton panier de la barre du haut, avec sa pastille.
 *
 * Tant que le panier n'a pas été relu dans le navigateur, la pastille
 * n'affiche **rien** — jamais `0`. Sinon le visiteur verrait son panier
 * passer de vide à plein sous ses yeux à chaque chargement (STACK.md §6).
 *
 * La pastille compte la somme des quantités, pas le nombre de lignes (cahier §4).
 */
export default function BoutonPanier({ className = "" }: { className?: string }) {
  const { articles, restaure } = usePanier();
  const afficherPastille = restaure && articles > 0;

  return (
    <Link
      href="/panier"
      className={`${styles.panier} ${className}`}
      aria-label={afficherPastille ? `Voir le panier, ${articles} article${articles > 1 ? "s" : ""}` : "Voir le panier"}
    >
      <span className={styles.cadreIcone}>
        <svg className={styles.icone} viewBox="0 0 22 22" aria-hidden="true">
          <path
            d="M3 4h2.2l2 10.2h9.4l2-7.4H6.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="18" r="1.4" fill="currentColor" />
          <circle cx="16" cy="18" r="1.4" fill="currentColor" />
        </svg>
        {afficherPastille && <span className={styles.pastille}>{articles}</span>}
      </span>
      <span className={styles.libelle}>Panier</span>
    </Link>
  );
}
