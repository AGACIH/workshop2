import styles from "./Badge.module.css";

type Variante = "nouveau" | "rupture" | "stock";

/**
 * Les pastilles d'information du catalogue.
 * Une couleur ne porte jamais seule l'information : le texte la dit aussi
 * (DESIGN.md §8).
 */
export default function Badge({
  variante,
  children,
}: {
  variante: Variante;
  children: React.ReactNode;
}) {
  return <span className={`${styles.badge} ${styles[variante]}`}>{children}</span>;
}
