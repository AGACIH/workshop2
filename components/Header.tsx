import Image from "next/image";
import Link from "next/link";
import BoutonPanier from "@/components/BoutonPanier";
import { CATEGORIES } from "@/lib/catalogue";
import styles from "./Header.module.css";

/**
 * La barre du haut, commune à tous les écrans (cahier §5).
 * Composant serveur : la recherche est un formulaire GET natif, les catégories
 * sont des liens. Rien ici n'a besoin de JavaScript.
 */
export default function Header() {
  return (
    <header className={styles.barre}>
      <div className={styles.contenu}>
        <Link href="/" className={styles.marque}>
          <Image src="/logo-h.png" alt="" width={96} height={96} className={styles.logo} />
          <span className={styles.nom}>H Store</span>
        </Link>

        <nav className={styles.nav} aria-label="Catégories">
          {CATEGORIES.map((categorie) => (
            <Link
              key={categorie}
              href={`/?categorie=${encodeURIComponent(categorie)}`}
              className={styles.lien}
            >
              {categorie}
            </Link>
          ))}
        </nav>

        <form className={styles.recherche} action="/" role="search">
          <svg className={styles.loupe} viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
          </svg>
          <input
            type="search"
            name="q"
            className={styles.champ}
            placeholder="Rechercher un produit"
            aria-label="Rechercher un produit"
          />
        </form>

        <BoutonPanier className={styles.panier} />

      </div>
    </header>
  );
}
