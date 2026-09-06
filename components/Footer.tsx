import styles from "./Footer.module.css";

/**
 * Le pied de page, présent sur toutes les pages.
 * La mention de démonstration y est **permanente** : c'est une exigence
 * du chapitre 8 du cahier des charges, pas une décoration.
 */
export default function Footer() {
  return (
    <footer className={styles.pied}>
      <div className={styles.contenu}>
        <div>
          <p className={styles.copyright}>© 2026 H Store — 12 rue des Arts, 59000 Lille</p>
          <p className={styles.demo}>
            Démonstration : aucune commande n&apos;est enregistrée, aucun paiement n&apos;est demandé.
          </p>
        </div>
        <p className={styles.secondaire}>Boutique de démonstration de la marque H</p>
      </div>
    </footer>
  );
}
