"use client";

import Link from "next/link";
import { useState } from "react";
import SelecteurQuantite from "@/components/SelecteurQuantite";
import { usePanier } from "@/lib/panier";
import type { Produit } from "@/lib/types";
import styles from "./BoutonAjouter.module.css";

/**
 * Le sélecteur de quantité et l'ajout au panier de la fiche produit (cahier §5.2).
 *
 * Un produit en rupture n'est pas ajoutable : le bouton est désactivé et dit
 * pourquoi. C'est la seule information de stock du projet, et elle vient du
 * catalogue — jamais d'un compteur fabriqué (cahier §8).
 */
export default function BoutonAjouter({ produit }: { produit: Produit }) {
  const { ajouter } = usePanier();
  const [quantite, setQuantite] = useState(1);
  const [ajoute, setAjoute] = useState(false);

  if (!produit.enStock) {
    return (
      <p className={styles.indisponible}>
        Ce produit est en rupture de stock. Il ne peut pas être ajouté au panier.
      </p>
    );
  }

  function ajouterAuPanier() {
    ajouter(produit.id, quantite);
    setAjoute(true);
  }

  return (
    <div className={styles.bloc}>
      <div className={styles.ligne}>
        <SelecteurQuantite
          quantite={quantite}
          onChange={setQuantite}
          nomProduit={produit.nom}
        />
        <button type="button" className={styles.ajouter} onClick={ajouterAuPanier}>
          Ajouter au panier
        </button>
      </div>

      {ajoute && (
        <p className={styles.confirmation} role="status">
          Ajouté au panier.{" "}
          <Link href="/panier" className={styles.lien}>
            Voir le panier
          </Link>
        </p>
      )}
    </div>
  );
}
