import { PRODUITS } from "@/data/produits";
import type { Categorie, Produit } from "@/lib/types";

/** Les filtres de la vitrine, dans l'ordre d'affichage (cahier §5.1). */
export const CATEGORIES: readonly Categorie[] = ["Textile", "Bureau", "Accessoires"];

/** Valeur du filtre « Tout » dans l'adresse. */
export const TOUTES_CATEGORIES = "Tout";

export type FiltreCategorie = Categorie | typeof TOUTES_CATEGORIES;

/** Vrai si la valeur lue dans l'adresse est bien une de nos trois catégories. */
export function estCategorie(valeur: string | undefined): valeur is Categorie {
  return valeur !== undefined && CATEGORIES.includes(valeur as Categorie);
}

export function trouverProduit(id: string): Produit | undefined {
  return PRODUITS.find((produit) => produit.id === id);
}

/**
 * Compare sans tenir compte des accents ni de la casse : une recherche
 * « gourde » doit trouver « Gourde inox », et « ecru » doit trouver « écru ».
 */
function normaliser(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** La recherche porte sur le nom, la catégorie et la description (cahier §6). */
function correspond(produit: Produit, recherche: string): boolean {
  const terme = normaliser(recherche.trim());
  if (terme === "") return true;
  const champs = normaliser(`${produit.nom} ${produit.categorie} ${produit.description}`);
  return champs.includes(terme);
}

/**
 * Les nouveautés d'abord, le reste dans l'ordre du catalogue.
 * C'est le tri de la maquette (maquette/ECARTS.md §8).
 */
function nouveautesEnTete(produits: readonly Produit[]): Produit[] {
  return [...produits].sort(
    (a, b) => Number(b.nouveaute) - Number(a.nouveaute),
  );
}

export function filtrerProduits(
  categorie: FiltreCategorie,
  recherche: string,
): Produit[] {
  const retenus = PRODUITS.filter(
    (produit) =>
      (categorie === TOUTES_CATEGORIES || produit.categorie === categorie) &&
      correspond(produit, recherche),
  );
  return nouveautesEnTete(retenus);
}

/**
 * Le nombre de produits derrière chaque filtre, recherche en cours comprise :
 * le compteur affiché doit correspondre à ce qu'on obtient en cliquant.
 */
export function compterParFiltre(recherche: string): Record<FiltreCategorie, number> {
  const correspondants = PRODUITS.filter((produit) => correspond(produit, recherche));
  return {
    Tout: correspondants.length,
    Textile: correspondants.filter((p) => p.categorie === "Textile").length,
    Bureau: correspondants.filter((p) => p.categorie === "Bureau").length,
    Accessoires: correspondants.filter((p) => p.categorie === "Accessoires").length,
  };
}
