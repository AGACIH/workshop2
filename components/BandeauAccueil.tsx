import Image from "next/image";
import Link from "next/link";
import { PRODUITS } from "@/data/produits";
import styles from "./BandeauAccueil.module.css";

/** La photo mise en avant : la première nouveauté du catalogue. */
const VEDETTE = PRODUITS.find((produit) => produit.nouveaute) ?? PRODUITS[0];

/**
 * Le bandeau d'accueil de la vitrine (cahier §5.1), avec le seul dégradé
 * de marque du projet. Le texte est celui de la maquette.
 */
export default function BandeauAccueil() {
  return (
    <section className={styles.bandeau}>
      <div className={styles.texte}>
        <p className={styles.surtitre}>Collection 2026</p>
        <h1 className={styles.accroche}>À porter, à emporter.</h1>
        <p className={styles.phrase}>
          Dix objets dessinés autour du logo H, fabriqués en petites séries et choisis
          pour durer : du sticker au hoodie, en passant par le carnet et la gourde.
        </p>
        <Link href="#catalogue" className={styles.action}>
          Voir le catalogue
        </Link>
      </div>

      <div className={styles.cadre}>
        <Image
          src={VEDETTE.photo}
          alt={VEDETTE.photoAlt}
          width={640}
          height={640}
          sizes="(min-width: 900px) 320px, 60vw"
          className={styles.photo}
        />
      </div>
    </section>
  );
}
