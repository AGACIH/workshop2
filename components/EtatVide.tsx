import Link from "next/link";
import styles from "./EtatVide.module.css";

/**
 * L'écran qu'on voit quand il n'y a rien à voir : panier vide, recherche sans
 * résultat, page introuvable. Jamais une page nue (cahier §9, cas 1 et 7).
 *
 * `commeTitre` rend le titre en `h1` : à utiliser quand ce bloc est tout le
 * contenu de la page, pour qu'elle ait bien un titre et un seul.
 */
export default function EtatVide({
  titre,
  explication,
  commeTitre = false,
  lien = "/",
  libelleLien = "Retour à la boutique",
}: {
  titre: string;
  explication: string;
  commeTitre?: boolean;
  lien?: string;
  libelleLien?: string;
}) {
  return (
    <div className={styles.bloc}>
      {commeTitre ? (
        <h1 className={styles.titre}>{titre}</h1>
      ) : (
        <p className={styles.titre}>{titre}</p>
      )}
      <p className={styles.explication}>{explication}</p>
      <Link href={lien} className={styles.action}>
        {libelleLien}
      </Link>
    </div>
  );
}
