import type { Totaux } from "@/lib/panier";

/**
 * L'adresse de livraison saisie sur la page Commande (cahier §5.4).
 *
 * **Il n'y a aucun champ de paiement dans ce type, et il n'y en aura pas.**
 * Ni numéro de carte, ni date d'expiration, ni cryptogramme, ni IBAN
 * (cahier §8, CLAUDE.md §1). Ce commentaire est là pour que l'ajout d'un tel
 * champ soit un geste conscient, et refusé.
 */
export type Adresse = {
  prenom: string;
  nom: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: string;
};

export const ADRESSE_VIDE: Adresse = {
  prenom: "",
  nom: "",
  email: "",
  adresse: "",
  codePostal: "",
  ville: "",
  pays: "France",
};

export type Erreurs = Partial<Record<keyof Adresse, string>>;

/** Une ligne figée au moment de la commande : le catalogue peut changer après. */
export type LigneCommandee = {
  produitId: string;
  nom: string;
  prixUnitaire: number;
  quantite: number;
};

export type Commande = {
  numero: string;
  adresse: Adresse;
  lignes: LigneCommandee[];
  totaux: Totaux;
};

/** Numéro de commande : `H-2026-4821`, quatre chiffres tirés au hasard (cahier §4). */
export function tirerNumeroCommande(): string {
  const chiffres = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `H-2026-${chiffres}`;
}

const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CODE_POSTAL_FR = /^\d{5}$/;

/**
 * Les messages sont en français, explicites, et disent quoi faire.
 * Jamais un code, jamais « invalid input » (DESIGN.md §6).
 */
export function validerAdresse(adresse: Adresse): Erreurs {
  const erreurs: Erreurs = {};

  if (adresse.prenom.trim() === "") erreurs.prenom = "Indiquez votre prénom.";
  if (adresse.nom.trim() === "") erreurs.nom = "Indiquez votre nom.";

  if (adresse.email.trim() === "") {
    erreurs.email = "Indiquez votre adresse email.";
  } else if (!COURRIEL.test(adresse.email.trim())) {
    erreurs.email = "Cette adresse email ne semble pas valide. Exemple : nom@exemple.fr";
  }

  if (adresse.adresse.trim() === "") {
    erreurs.adresse = "Indiquez votre adresse, numéro et rue.";
  }

  if (adresse.codePostal.trim() === "") {
    erreurs.codePostal = "Indiquez votre code postal.";
  } else if (adresse.pays.trim() === "France" && !CODE_POSTAL_FR.test(adresse.codePostal.trim())) {
    erreurs.codePostal = "Un code postal français compte cinq chiffres. Exemple : 59000";
  }

  if (adresse.ville.trim() === "") erreurs.ville = "Indiquez votre ville.";
  if (adresse.pays.trim() === "") erreurs.pays = "Indiquez votre pays.";

  return erreurs;
}

/**
 * La commande est gardée le temps d'afficher la confirmation, puis oubliée
 * avec l'onglet. Rien n'est envoyé nulle part : il n'y a ni serveur, ni compte,
 * ni email (cahier §2).
 */
const CLE_COMMANDE = "h-store-derniere-commande-v1";

export function enregistrerCommande(commande: Commande): void {
  try {
    window.sessionStorage.setItem(CLE_COMMANDE, JSON.stringify(commande));
  } catch {
    // Stockage indisponible : la page de confirmation le dira proprement.
  }
}

export function lireCommande(): Commande | null {
  try {
    const brut = window.sessionStorage.getItem(CLE_COMMANDE);
    if (!brut) return null;
    const commande: unknown = JSON.parse(brut);
    if (
      typeof commande === "object" &&
      commande !== null &&
      typeof (commande as Commande).numero === "string" &&
      Array.isArray((commande as Commande).lignes)
    ) {
      return commande as Commande;
    }
    return null;
  } catch {
    return null;
  }
}
