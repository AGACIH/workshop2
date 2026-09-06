/**
 * Contrôle d'intégrité du catalogue — règles du chapitre 3 du cahier des charges.
 * Exécution : `npm run verifier`.
 *
 * Le script importe directement `data/produits.ts` : Node retire les annotations
 * de type tout seul depuis la version 22.18. C'est la même source que
 * l'application, donc le contrôle porte sur les données réellement affichées.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = fileURLToPath(new URL("..", import.meta.url));
const { PRODUITS } = await import(new URL("../data/produits.ts", import.meta.url));

/** R1 — les dix identifiants attendus, figés par le cahier §3 (version 1.1). */
const ATTENDUS = [
  "tshirt-signature",
  "hoodie-atelier",
  "casquette-brodee",
  "mug-ceramique",
  "tote-bag-toile",
  "gourde-inox",
  "housse-14-pouces",
  "carnet-bleu-nuit",
  "coque-silicone",
  "planche-stickers",
];

const CATEGORIES = ["Textile", "Bureau", "Accessoires"];
const signalements = [];
const signaler = (regle, message) => signalements.push(`${regle} : ${message}`);

// R1 — dix produits, identifiants uniques et conformes au tableau du cahier.
const ids = PRODUITS.map((p) => p.id);
if (PRODUITS.length !== 10) signaler("R1", `${PRODUITS.length} produits au lieu de 10`);
if (new Set(ids).size !== ids.length) signaler("R1", "identifiants dupliqués");
for (const id of ATTENDUS) {
  if (!ids.includes(id)) signaler("R1", `identifiant manquant — ${id}`);
}
for (const id of ids) {
  if (!ATTENDUS.includes(id)) signaler("R1", `identifiant inattendu — ${id}`);
}

for (const p of PRODUITS) {
  // R2 — la photo existe réellement, et elle est bien dans public/produits/.
  if (!p.photo.startsWith("/produits/")) {
    signaler("R2", `${p.id} : la photo doit être sous /produits/ — ${p.photo}`);
  } else if (!existsSync(join(RACINE, "public", p.photo))) {
    signaler("R2", `photo introuvable — public${p.photo}`);
  }

  if (p.photoGrande !== undefined && !existsSync(join(RACINE, "public", p.photoGrande))) {
    signaler("R2", `grande photo introuvable — public${p.photoGrande}`);
  }

  // R3 — exactement trois caractéristiques, aucune vide.
  if (!Array.isArray(p.caracteristiques) || p.caracteristiques.length !== 3) {
    signaler("R3", `${p.id} n'a pas exactement trois caractéristiques`);
  } else if (p.caracteristiques.some((c) => typeof c !== "string" || c.trim() === "")) {
    signaler("R3", `${p.id} a une caractéristique vide`);
  }

  // R6 — description présente et d'au moins 80 caractères.
  if (!p.description || p.description.length < 80) {
    signaler("R6", `description absente ou trop courte — ${p.id}`);
  }

  // Règles de STACK.md : prix en centimes entiers, texte de remplacement descriptif.
  if (!Number.isInteger(p.prix) || p.prix <= 0) {
    signaler("R7", `${p.id} : le prix doit être un entier de centimes — ${p.prix}`);
  }
  if (!p.photoAlt || p.photoAlt.trim() === "") {
    signaler("R8", `${p.id} : texte de remplacement de la photo manquant`);
  } else if (/\b(image|photo)\b/i.test(p.photoAlt)) {
    signaler("R8", `${p.id} : le texte de remplacement dit « image » ou « photo »`);
  }

  // La catégorie doit être l'une des trois.
  if (!CATEGORIES.includes(p.categorie)) {
    signaler("R4", `${p.id} : catégorie inconnue — ${p.categorie}`);
  }
}

// R4 — au moins deux produits par catégorie.
for (const categorie of CATEGORIES) {
  const nombre = PRODUITS.filter((p) => p.categorie === categorie).length;
  if (nombre < 2) signaler("R4", `la catégorie ${categorie} ne contient que ${nombre} produit(s)`);
}

// R5 — exactement deux nouveautés et un seul produit en rupture.
const nouveautes = PRODUITS.filter((p) => p.nouveaute === true).length;
if (nouveautes !== 2) signaler("R5", `${nouveautes} nouveauté(s) au lieu de 2`);

const ruptures = PRODUITS.filter((p) => p.enStock === false).length;
if (ruptures !== 1) signaler("R5", `${ruptures} produit(s) en rupture au lieu d'un seul`);

if (signalements.length > 0) {
  console.error(`Signalements :\n- ${signalements.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Catalogue conforme : 10 produits, ${nouveautes} nouveautés, ${ruptures} rupture, photos présentes.`,
);
