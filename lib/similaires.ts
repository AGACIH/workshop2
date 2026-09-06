import { PRODUITS } from "@/data/produits";
import type { Produit } from "@/lib/types";

/** Les libellés des trois caractéristiques, dans l'ordre du cahier §3. */
export const LIBELLES_CARACTERISTIQUES = ["Matière", "Taille", "Couleur"] as const;

/**
 * Quatre produits à proposer sous la fiche : ceux de la même catégorie
 * d'abord, complétés par d'autres si la catégorie n'en contient pas assez.
 */
export function produitsSimilaires(produit: Produit, nombre = 4): Produit[] {
  const autres = PRODUITS.filter((p) => p.id !== produit.id);
  const memeCategorie = autres.filter((p) => p.categorie === produit.categorie);
  const reste = autres.filter((p) => p.categorie !== produit.categorie);
  return [...memeCategorie, ...reste].slice(0, nombre);
}
