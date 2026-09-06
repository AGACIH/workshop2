import Link from "next/link";
import BandeauAccueil from "@/components/BandeauAccueil";
import EtatVide from "@/components/EtatVide";
import FiltresCategorie from "@/components/FiltresCategorie";
import GrilleProduits from "@/components/GrilleProduits";
import {
  compterParFiltre,
  estCategorie,
  filtrerProduits,
  TOUTES_CATEGORIES,
  type FiltreCategorie,
} from "@/lib/catalogue";
import styles from "./page.module.css";

/**
 * La vitrine. Composant serveur : le filtre et la recherche vivent dans
 * l'adresse, donc rien ici n'a besoin de JavaScript côté navigateur.
 */
export default async function Vitrine({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string; q?: string }>;
}) {
  const { categorie, q } = await searchParams;

  const filtreActif: FiltreCategorie = estCategorie(categorie) ? categorie : TOUTES_CATEGORIES;
  const recherche = (q ?? "").trim();

  const produits = filtrerProduits(filtreActif, recherche);
  const comptes = compterParFiltre(recherche);

  return (
    <main>
      <BandeauAccueil />

      <section id="catalogue" className={styles.catalogue}>
        <div className={styles.entete}>
          <h2 className={styles.titre}>Le catalogue</h2>
          <FiltresCategorie actif={filtreActif} comptes={comptes} recherche={recherche} />
        </div>

        <p className={styles.resultat} aria-live="polite">
          {produits.length === 0
            ? "Aucun produit"
            : `${produits.length} produit${produits.length > 1 ? "s" : ""}`}
          {recherche !== "" && (
            <>
              {" pour « "}
              <span className={styles.terme}>{recherche}</span>
              {" » "}
              <Link
                href={filtreActif === TOUTES_CATEGORIES ? "/" : `/?categorie=${filtreActif}`}
                className={styles.effacer}
              >
                Effacer la recherche
              </Link>
            </>
          )}
        </p>

        {produits.length === 0 ? (
          <EtatVide
            titre="Aucun produit ne correspond"
            explication={
              recherche === ""
                ? "Cette catégorie ne contient encore aucun produit."
                : "Essayez un autre mot, ou revenez au catalogue complet."
            }
            libelleLien="Voir tout le catalogue"
          />
        ) : (
          <GrilleProduits produits={produits} />
        )}
      </section>
    </main>
  );
}
