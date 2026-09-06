"use client";

import styles from "./ChampTexte.module.css";

/**
 * Un champ du formulaire de commande, avec son libellé et son erreur.
 *
 * Le message d'erreur se place **sous le champ concerné**, en français clair,
 * et le champ est relié à son message par `aria-describedby` pour que les
 * lecteurs d'écran l'annoncent (cahier §5.4, DESIGN.md §6).
 */
export default function ChampTexte({
  id,
  libelle,
  valeur,
  onChange,
  erreur,
  type = "text",
  autoComplete,
  large = false,
}: {
  id: string;
  libelle: string;
  valeur: string;
  onChange: (valeur: string) => void;
  erreur?: string;
  type?: "text" | "email";
  autoComplete?: string;
  large?: boolean;
}) {
  const idErreur = `${id}-erreur`;

  return (
    <p className={large ? styles.champLarge : styles.champ}>
      <label htmlFor={id} className={styles.libelle}>
        {libelle} <span aria-hidden="true">*</span>
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={valeur}
        onChange={(evenement) => onChange(evenement.target.value)}
        autoComplete={autoComplete}
        required
        aria-invalid={erreur !== undefined}
        aria-describedby={erreur !== undefined ? idErreur : undefined}
        className={`${styles.saisie} ${erreur !== undefined ? styles.enErreur : ""}`}
      />
      {erreur !== undefined && (
        <span id={idErreur} className={styles.erreur}>
          {erreur}
        </span>
      )}
    </p>
  );
}
