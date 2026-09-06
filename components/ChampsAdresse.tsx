"use client";

import ChampTexte from "@/components/ChampTexte";
import type { Adresse, Erreurs } from "@/lib/commande";
import styles from "./ChampsAdresse.module.css";

/**
 * Les sept champs de l'adresse de livraison (cahier §5.4).
 *
 * **Il n'y a aucun champ de paiement ici, et il n'y en aura pas** : ni numéro
 * de carte, ni date d'expiration, ni cryptogramme, ni IBAN, même désactivé,
 * même en exemple (cahier §8).
 */
export default function ChampsAdresse({
  adresse,
  erreurs,
  onChange,
}: {
  adresse: Adresse;
  erreurs: Erreurs;
  onChange: (champ: keyof Adresse, valeur: string) => void;
}) {
  return (
    <div className={styles.champs}>
      <ChampTexte
        id="prenom"
        libelle="Prénom"
        valeur={adresse.prenom}
        onChange={(v) => onChange("prenom", v)}
        erreur={erreurs.prenom}
        autoComplete="given-name"
      />
      <ChampTexte
        id="nom"
        libelle="Nom"
        valeur={adresse.nom}
        onChange={(v) => onChange("nom", v)}
        erreur={erreurs.nom}
        autoComplete="family-name"
      />
      <ChampTexte
        id="email"
        libelle="Email"
        type="email"
        valeur={adresse.email}
        onChange={(v) => onChange("email", v)}
        erreur={erreurs.email}
        autoComplete="email"
        large
      />
      <ChampTexte
        id="adresse"
        libelle="Adresse"
        valeur={adresse.adresse}
        onChange={(v) => onChange("adresse", v)}
        erreur={erreurs.adresse}
        autoComplete="street-address"
        large
      />
      <ChampTexte
        id="codePostal"
        libelle="Code postal"
        valeur={adresse.codePostal}
        onChange={(v) => onChange("codePostal", v)}
        erreur={erreurs.codePostal}
        autoComplete="postal-code"
      />
      <ChampTexte
        id="ville"
        libelle="Ville"
        valeur={adresse.ville}
        onChange={(v) => onChange("ville", v)}
        erreur={erreurs.ville}
        autoComplete="address-level2"
      />
      <ChampTexte
        id="pays"
        libelle="Pays"
        valeur={adresse.pays}
        onChange={(v) => onChange("pays", v)}
        erreur={erreurs.pays}
        autoComplete="country-name"
        large
      />
    </div>
  );
}
