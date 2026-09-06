import Link from "next/link";
import { CATEGORIES, TOUTES_CATEGORIES, type FiltreCategorie } from "@/lib/catalogue";
import styles from "./FiltresCategorie.module.css";

/**
 * Les filtres de la vitrine (cahier §5.1).
 *
 * Ce sont des liens, pas des boutons : l'état du filtre vit dans l'adresse.
 * Résultat, aucun JavaScript n'est nécessaire, la page reste un composant
 * serveur, et un filtre peut se partager ou se recharger sans se perdre.
 *
 * Le filtre actif affiche son compte, comme l'exige le cahier.
 */
export default function FiltresCategorie({
  actif,
  comptes,
  recherche,
}: {
  actif: FiltreCategorie;
  comptes: Record<FiltreCategorie, number>;
  recherche: string;
}) {
  const filtres: FiltreCategorie[] = [TOUTES_CATEGORIES, ...CATEGORIES];

  function adresse(filtre: FiltreCategorie): string {
    const parametres = new URLSearchParams();
    if (filtre !== TOUTES_CATEGORIES) parametres.set("categorie", filtre);
    if (recherche !== "") parametres.set("q", recherche);
    const suite = parametres.toString();
    return suite === "" ? "/" : `/?${suite}`;
  }

  return (
    <nav className={styles.filtres} aria-label="Filtrer par catégorie">
      {filtres.map((filtre) => {
        const estActif = filtre === actif;
        return (
          <Link
            key={filtre}
            href={adresse(filtre)}
            className={`${styles.filtre} ${estActif ? styles.actif : ""}`}
            aria-current={estActif ? "page" : undefined}
          >
            {filtre}
            {estActif && <span className={styles.compte}> · {comptes[filtre]}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
