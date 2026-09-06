import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import BoutonAjouter from "@/components/BoutonAjouter";
import GrilleProduits from "@/components/GrilleProduits";
import { PRODUITS } from "@/data/produits";
import { trouverProduit } from "@/lib/catalogue";
import { formaterPrix } from "@/lib/format";
import { LIBELLES_CARACTERISTIQUES, produitsSimilaires } from "@/lib/similaires";
import styles from "./page.module.css";

type Parametres = { params: Promise<{ id: string }> };

/** Les dix fiches sont connues à l'avance : elles sont générées à la construction. */
export function generateStaticParams() {
  return PRODUITS.map((produit) => ({ id: produit.id }));
}

export async function generateMetadata({ params }: Parametres): Promise<Metadata> {
  const { id } = await params;
  const produit = trouverProduit(id);
  if (!produit) return { title: "Page introuvable — H Store" };
  return { title: `${produit.nom} — H Store`, description: produit.description };
}

export default async function FicheProduit({ params }: Parametres) {
  const { id } = await params;
  const produit = trouverProduit(id);

  // Une adresse de produit inexistante donne la page introuvable (cahier §9, cas 5).
  if (!produit) notFound();

  const grande = produit.photoGrande !== undefined;
  const similaires = produitsSimilaires(produit);

  return (
    <main>
      <nav className={styles.ariane} aria-label="Fil d'ariane">
        <Link href="/">Boutique</Link>
        <span aria-hidden="true">›</span>
        <Link href={`/?categorie=${encodeURIComponent(produit.categorie)}`}>
          {produit.categorie}
        </Link>
        <span aria-hidden="true">›</span>
        <span className={styles.arianeActuel}>{produit.nom}</span>
      </nav>

      <article className={styles.fiche}>
        <div className={styles.cadre}>
          <Image
            src={produit.photoGrande ?? produit.photo}
            alt={produit.photoAlt}
            width={grande ? 960 : 640}
            height={grande ? 960 : 640}
            sizes="(min-width: 900px) 520px, 100vw"
            priority
            className={styles.photo}
          />
        </div>

        <div className={styles.infos}>
          <p className={styles.categorie}>{produit.categorie}</p>
          <h1 className={styles.nom}>{produit.nom}</h1>
          <p className={styles.prix}>{formaterPrix(produit.prix)}</p>

          <p>
            {produit.enStock ? (
              <Badge variante="stock">En stock</Badge>
            ) : (
              <Badge variante="rupture">Rupture de stock</Badge>
            )}
          </p>

          <p className={styles.description}>{produit.description}</p>

          <dl className={styles.caracteristiques}>
            {produit.caracteristiques.map((valeur, rang) => (
              <div key={LIBELLES_CARACTERISTIQUES[rang]} className={styles.caracteristique}>
                <dt className={styles.libelle}>{LIBELLES_CARACTERISTIQUES[rang]}</dt>
                <dd className={styles.valeur}>{valeur}</dd>
              </div>
            ))}
          </dl>

          <BoutonAjouter produit={produit} />

          <p>
            <Link href="/" className={styles.retour}>
              ← Retour à la boutique
            </Link>
          </p>
        </div>
      </article>

      <section className={styles.similaires}>
        <h2 className={styles.titreSection}>Vous aimerez aussi</h2>
        <GrilleProduits produits={similaires} />
      </section>
    </main>
  );
}
