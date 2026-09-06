"use client";

import Image from "next/image";
import Link from "next/link";
import SelecteurQuantite from "@/components/SelecteurQuantite";
import { formaterPrix } from "@/lib/format";
import { usePanier } from "@/lib/panier";
import type { Produit } from "@/lib/types";
import styles from "./LignePanier.module.css";

/**
 * Une ligne du panier : vignette, nom, prix unitaire, quantité, prix de la
 * ligne et retrait (cahier §5.3).
 *
 * Le sélecteur descend jusqu'à 0 : la ligne disparaît alors, et le total se
 * recalcule tout de suite (cahier §9, cas 3).
 */
export default function LignePanier({
  produit,
  quantite,
}: {
  produit: Produit;
  quantite: number;
}) {
  const { definirQuantite, retirer } = usePanier();

  return (
    <li className={styles.ligne}>
      <Link href={`/produit/${produit.id}`} className={styles.vignette}>
        <Image
          src={produit.photo}
          alt={produit.photoAlt}
          width={640}
          height={640}
          sizes="96px"
          className={styles.photo}
        />
      </Link>

      <div className={styles.details}>
        <Link href={`/produit/${produit.id}`} className={styles.nom}>
          {produit.nom}
        </Link>
        <p className={styles.unitaire}>{formaterPrix(produit.prix)} l&apos;unité</p>
      </div>

      <SelecteurQuantite
        quantite={quantite}
        onChange={(valeur) => definirQuantite(produit.id, valeur)}
        minimum={0}
        nomProduit={produit.nom}
      />

      <p className={styles.total}>{formaterPrix(produit.prix * quantite)}</p>

      <button
        type="button"
        className={styles.retirer}
        onClick={() => retirer(produit.id)}
        aria-label={`Retirer ${produit.nom} du panier`}
      >
        Retirer
      </button>
    </li>
  );
}
