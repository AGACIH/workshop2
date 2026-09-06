/** Les trois catégories du catalogue. Une faute de frappe devient une erreur de compilation. */
export type Categorie = "Textile" | "Bureau" | "Accessoires";

/**
 * Les trois caractéristiques d'un produit, toujours dans le même ordre :
 * matière, dimensions ou taille, couleur (cahier §3).
 */
export type Caracteristiques = readonly [
  matiere: string,
  dimensions: string,
  couleur: string,
];

export type Produit = {
  id: string;
  nom: string;
  categorie: Categorie;
  /** En centimes, entier. Jamais affiché tel quel : passer par formaterPrix(). */
  prix: number;
  description: string;
  caracteristiques: Caracteristiques;
  /** Chemin public, toujours sous /produits/ (STACK.md §5). */
  photo: string;
  /** Description de la photo pour les lecteurs d'écran. Jamais « image » ni « photo ». */
  photoAlt: string;
  nouveaute: boolean;
  enStock: boolean;
};

/** Une ligne de panier. Pas de variante taille/couleur : voir maquette/ECARTS.md, décision 4. */
export type LignePanier = {
  produitId: string;
  /** Entre 1 et 10 (cahier §4). À 0, la ligne est retirée. */
  quantite: number;
};
