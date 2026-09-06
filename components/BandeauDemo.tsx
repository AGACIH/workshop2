import styles from "./BandeauDemo.module.css";

/**
 * **Le composant le plus important du projet** (cahier §8).
 *
 * Il est placé en premier élément de `main` sur les pages Commande et
 * Confirmation, pour être visible **sans défiler**, y compris à 390 px.
 *
 * Sa raison d'être : un visiteur ne doit jamais pouvoir croire qu'il achète
 * quelque chose. Ne pas le déplacer plus bas dans la page, ne pas le replier,
 * ne pas le rendre discret.
 */
export default function BandeauDemo({ children }: { children: React.ReactNode }) {
  return (
    <aside className={styles.bandeau} role="note">
      <p className={styles.surtitre}>Démonstration</p>
      <p className={styles.texte}>{children}</p>
    </aside>
  );
}
