import type { Produit } from "@/lib/types";

/**
 * Le catalogue. Dix produits, identifiants et fichiers photo figés par le
 * chapitre 3 du cahier des charges (version 1.1) — voir maquette/ECARTS.md.
 *
 * Les prix sont en centimes, en entiers : c'est ce qui évite qu'un total
 * affiche 64,999999 € après trois additions (STACK.md §8).
 * L'affichage passe toujours par formaterPrix() de lib/format.ts.
 *
 * Les trois caractéristiques suivent le même ordre partout :
 * matière, dimensions ou taille, couleur.
 */
export const PRODUITS: readonly Produit[] = [
  {
    id: "tshirt-signature",
    nom: "T-shirt Signature",
    categorie: "Textile",
    prix: 2900,
    description:
      "Jersey de coton peigné 180 g/m², coupe droite et col côtelé qui ne se déforme pas. Le logo H est sérigraphié à plat, souple au toucher. Lavable à 30 °C sans perte de couleur.",
    caracteristiques: [
      "100 % coton peigné biologique, 180 g/m²",
      "Coupe unisexe, du XS au XXL",
      "Noir profond, logo bleu dégradé",
    ],
    photo: "/produits/tshirt.jpg",
    photoAlt: "T-shirt noir à col rond, logo H bleu dégradé sérigraphié sur la poitrine",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "hoodie-atelier",
    nom: "Hoodie Atelier H",
    categorie: "Textile",
    prix: 6500,
    description:
      "Molleton gratté 380 g/m², coupe droite et capuche doublée. La sérigraphie souple est posée à plat pour qu'elle ne craquèle pas au lavage. Fabriqué au Portugal, teint en petites séries.",
    caracteristiques: [
      "80 % coton biologique, 20 % polyester recyclé, 380 g/m²",
      "Coupe unisexe, du XS au XXL",
      "Bleu nuit, logo bleu dégradé",
    ],
    photo: "/produits/hoodie.jpg",
    photoAlt: "Sweat à capuche bleu nuit, capuche doublée et logo H bleu dégradé au centre",
    nouveaute: true,
    enStock: true,
  },
  {
    id: "casquette-brodee",
    nom: "Casquette brodée",
    categorie: "Accessoires",
    prix: 2400,
    description:
      "Casquette six panneaux en sergé de coton, visière préformée et fermeture métal réglable. Le logo est brodé fil à fil, pas imprimé. Elle garde sa forme après plusieurs lavages à la main.",
    caracteristiques: [
      "Sergé de coton 100 %, doublure jersey",
      "Taille unique, tour de tête 54 à 60 cm",
      "Bleu roi, broderie bleu clair",
    ],
    photo: "/produits/cap.jpg",
    photoAlt: "Casquette six panneaux bleu roi à visière préformée, logo H brodé bleu clair",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "mug-ceramique",
    nom: "Mug céramique",
    categorie: "Bureau",
    prix: 1400,
    description:
      "Grès émaillé de 350 ml, paroi épaisse qui garde le café chaud plus longtemps. Le motif est cuit sous émail : il ne s'efface ni au lave-vaisselle ni au micro-ondes.",
    caracteristiques: [
      "Grès émaillé, cuisson à 1 200 °C",
      "350 ml, hauteur 9,5 cm, diamètre 8,2 cm",
      "Blanc mat, logo bleu dégradé",
    ],
    photo: "/produits/mug.jpg",
    photoAlt: "Mug en grès blanc mat à paroi épaisse, logo H bleu dégradé sur le flanc",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "tote-bag-toile",
    nom: "Tote bag toile",
    categorie: "Accessoires",
    prix: 1800,
    description:
      "Toile de coton 340 g/m² non blanchie, coutures doubles aux anses et fond renforcé. Il porte six kilos de courses sans se déformer et se plie dans une poche.",
    caracteristiques: [
      "Coton non blanchi 340 g/m²",
      "38 × 42 cm, anses de 70 cm",
      "Écru naturel, logo bleu dégradé",
    ],
    photo: "/produits/tote.jpg",
    photoAlt: "Sac cabas en toile de coton écrue à longues anses, logo H bleu dégradé",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "gourde-inox",
    nom: "Gourde inox 500 ml",
    categorie: "Accessoires",
    prix: 3200,
    description:
      "Double paroi en inox brossé : douze heures pour le chaud, vingt-quatre pour le froid. Le bouchon à joint silicone se dévisse d'un quart de tour et ne fuit pas dans un sac.",
    caracteristiques: [
      "Acier inoxydable 18/8 double paroi",
      "500 ml, hauteur 26 cm, diamètre 7 cm",
      "Inox brossé, logo bleu dégradé",
    ],
    photo: "/produits/bottle.jpg",
    photoAlt: "Gourde isotherme en inox brossé à bouchon vissé, logo H bleu dégradé",
    nouveaute: false,
    enStock: false,
  },
  {
    id: "housse-14-pouces",
    nom: "Housse 14 pouces",
    categorie: "Bureau",
    prix: 4500,
    description:
      "Housse rembourrée pour ordinateur de 14 pouces, mousse de 5 mm et doublure microfibre. La fermeture éclair est protégée par un rabat pour ne pas marquer le capot.",
    caracteristiques: [
      "Nylon recyclé déperlant, mousse 5 mm",
      "36 × 25 × 2,5 cm, pour écrans 14 pouces",
      "Bleu nuit, logo bleu dégradé",
    ],
    photo: "/produits/sleeve.jpg",
    photoAlt:
      "Housse rembourrée bleu nuit pour ordinateur portable, fermeture éclair à rabat et logo H",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "carnet-bleu-nuit",
    nom: "Carnet bleu nuit",
    categorie: "Bureau",
    prix: 2200,
    description:
      "Carnet cousu de 192 pages ivoire, papier 100 g/m² qui ne transperce pas à l'encre. Couverture rigide toilée, élastique de fermeture et pochette au dos.",
    caracteristiques: [
      "Papier ivoire 100 g/m², reliure cousue",
      "A5, 14,8 × 21 cm, 192 pages",
      "Bleu nuit, logo bleu dégradé",
    ],
    photo: "/produits/notebook.jpg",
    photoAlt: "Carnet A5 à couverture toilée bleu nuit fermé par un élastique, logo H en creux",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "coque-silicone",
    nom: "Coque silicone",
    categorie: "Accessoires",
    prix: 1900,
    description:
      "Silicone souple doublé microfibre, bords surélevés autour de l'écran et des objectifs. Elle absorbe les chutes de hauteur de poche sans épaissir le téléphone.",
    caracteristiques: [
      "Silicone liquide, doublure microfibre",
      "Compatible iPhone 15 et 15 Pro",
      "Noir mat, logo bleu dégradé",
    ],
    photo: "/produits/phonecase.jpg",
    photoAlt: "Coque de téléphone en silicone noir mat vue de dos, logo H bleu dégradé",
    nouveaute: false,
    enStock: true,
  },
  {
    id: "planche-stickers",
    nom: "Planche de stickers",
    categorie: "Bureau",
    prix: 800,
    description:
      "Neuf autocollants en vinyle découpé, laminé mat et résistant à l'eau. Ils se décollent sans laisser de trace sur un ordinateur ou une gourde.",
    caracteristiques: [
      "Vinyle laminé mat, découpe à la forme",
      "Planche A6, 9 stickers de 3 à 6 cm",
      "Bleu dégradé sur fond transparent",
    ],
    photo: "/produits/stickers.jpg",
    photoAlt: "Planche de neuf autocollants en vinyle aux formes du logo H, dégradé bleu",
    nouveaute: true,
    enStock: true,
  },
];
