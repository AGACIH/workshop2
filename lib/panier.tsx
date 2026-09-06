"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { trouverProduit } from "@/lib/catalogue";
import type { LignePanier } from "@/lib/types";

/** Règles de gestion du cahier §4. Aucun de ces montants n'est écrit ailleurs. */
export const FRAIS_LIVRAISON = 490;
export const SEUIL_FRANCO = 5000;
export const QUANTITE_MIN = 1;
export const QUANTITE_MAX = 10;

/** Le suffixe de version permet d'ignorer proprement un panier d'un ancien format. */
const CLE_STOCKAGE = "h-store-panier-v1";

export type Totaux = {
  sousTotal: number;
  livraison: number;
  total: number;
  /** Ce qu'il manque pour la livraison offerte. 0 quand elle l'est déjà. */
  manqueFranco: number;
};

/**
 * Fonction pure : les mêmes lignes donnent toujours les mêmes totaux.
 * Tout est en centimes entiers, donc aucun arrondi ne se perd en route.
 * Une ligne dont le produit n'existe plus au catalogue est ignorée.
 */
export function calculerTotaux(lignes: readonly LignePanier[]): Totaux {
  const sousTotal = lignes.reduce((somme, ligne) => {
    const produit = trouverProduit(ligne.produitId);
    return produit ? somme + produit.prix * ligne.quantite : somme;
  }, 0);

  const livraison = sousTotal === 0 || sousTotal >= SEUIL_FRANCO ? 0 : FRAIS_LIVRAISON;

  return {
    sousTotal,
    livraison,
    total: sousTotal + livraison,
    manqueFranco: sousTotal > 0 && sousTotal < SEUIL_FRANCO ? SEUIL_FRANCO - sousTotal : 0,
  };
}

/** La pastille affiche la somme des quantités, pas le nombre de lignes (cahier §4). */
export function compterArticles(lignes: readonly LignePanier[]): number {
  return lignes.reduce((somme, ligne) => somme + ligne.quantite, 0);
}

type Etat = {
  lignes: LignePanier[];
  /** Faux tant que localStorage n'a pas été relu. Voir la règle 4 de STACK.md §6. */
  restaure: boolean;
};

type Action =
  | { type: "restaurer"; lignes: LignePanier[] }
  | { type: "ajouter"; produitId: string; quantite: number }
  | { type: "definirQuantite"; produitId: string; quantite: number }
  | { type: "retirer"; produitId: string }
  | { type: "vider" };

function borner(quantite: number): number {
  return Math.min(QUANTITE_MAX, Math.max(QUANTITE_MIN, Math.round(quantite)));
}

function reducteur(etat: Etat, action: Action): Etat {
  switch (action.type) {
    case "restaurer":
      return { lignes: action.lignes, restaure: true };

    case "ajouter": {
      const existante = etat.lignes.find((l) => l.produitId === action.produitId);
      // Ajouter un produit déjà présent incrémente sa ligne, il ne crée pas de doublon.
      if (existante) {
        return {
          ...etat,
          lignes: etat.lignes.map((ligne) =>
            ligne.produitId === action.produitId
              ? { ...ligne, quantite: borner(ligne.quantite + action.quantite) }
              : ligne,
          ),
        };
      }
      return {
        ...etat,
        lignes: [...etat.lignes, { produitId: action.produitId, quantite: borner(action.quantite) }],
      };
    }

    case "definirQuantite":
      // Descendre à 0 retire la ligne : le total se met à jour immédiatement (cahier §4).
      if (action.quantite < QUANTITE_MIN) {
        return { ...etat, lignes: etat.lignes.filter((l) => l.produitId !== action.produitId) };
      }
      return {
        ...etat,
        lignes: etat.lignes.map((ligne) =>
          ligne.produitId === action.produitId
            ? { ...ligne, quantite: borner(action.quantite) }
            : ligne,
        ),
      };

    case "retirer":
      return { ...etat, lignes: etat.lignes.filter((l) => l.produitId !== action.produitId) };

    case "vider":
      return { ...etat, lignes: [] };
  }
}

/**
 * Relit le panier du navigateur. Tout est enveloppé : navigation privée,
 * stockage bloqué, contenu abîmé — la boutique dégrade proprement, elle ne casse pas.
 * Une ligne dont le produit n'existe plus est ignorée sans bruit (cahier §9, cas 6).
 */
function lireStockage(): LignePanier[] {
  try {
    const brut = window.localStorage.getItem(CLE_STOCKAGE);
    if (!brut) return [];
    const donnees: unknown = JSON.parse(brut);
    if (!Array.isArray(donnees)) return [];
    return donnees
      .filter(
        (ligne): ligne is LignePanier =>
          typeof ligne === "object" &&
          ligne !== null &&
          typeof (ligne as LignePanier).produitId === "string" &&
          Number.isFinite((ligne as LignePanier).quantite),
      )
      .filter((ligne) => trouverProduit(ligne.produitId) !== undefined)
      .map((ligne) => ({ produitId: ligne.produitId, quantite: borner(ligne.quantite) }));
  } catch {
    return [];
  }
}

function ecrireStockage(lignes: readonly LignePanier[]): void {
  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(lignes));
  } catch {
    // Stockage indisponible : le panier vit le temps de la visite, et c'est tout.
  }
}

type ValeurPanier = Etat & {
  articles: number;
  totaux: Totaux;
  ajouter: (produitId: string, quantite?: number) => void;
  definirQuantite: (produitId: string, quantite: number) => void;
  retirer: (produitId: string) => void;
  vider: () => void;
};

const ContextePanier = createContext<ValeurPanier | null>(null);

export function FournisseurPanier({ children }: { children: React.ReactNode }) {
  // L'état initial est toujours vide : localStorage n'existe pas au rendu serveur.
  const [etat, envoyer] = useReducer(reducteur, { lignes: [], restaure: false });

  // La lecture se fait après le montage, jamais pendant le rendu.
  useEffect(() => {
    envoyer({ type: "restaurer", lignes: lireStockage() });
  }, []);

  useEffect(() => {
    if (etat.restaure) ecrireStockage(etat.lignes);
  }, [etat.lignes, etat.restaure]);

  const ajouter = useCallback(
    (produitId: string, quantite = 1) => envoyer({ type: "ajouter", produitId, quantite }),
    [],
  );
  const definirQuantite = useCallback(
    (produitId: string, quantite: number) =>
      envoyer({ type: "definirQuantite", produitId, quantite }),
    [],
  );
  const retirer = useCallback((produitId: string) => envoyer({ type: "retirer", produitId }), []);
  const vider = useCallback(() => envoyer({ type: "vider" }), []);

  const valeur = useMemo<ValeurPanier>(
    () => ({
      ...etat,
      articles: compterArticles(etat.lignes),
      totaux: calculerTotaux(etat.lignes),
      ajouter,
      definirQuantite,
      retirer,
      vider,
    }),
    [etat, ajouter, definirQuantite, retirer, vider],
  );

  return <ContextePanier.Provider value={valeur}>{children}</ContextePanier.Provider>;
}

export function usePanier(): ValeurPanier {
  const valeur = useContext(ContextePanier);
  if (valeur === null) {
    throw new Error("usePanier doit être appelé à l'intérieur de FournisseurPanier.");
  }
  return valeur;
}
