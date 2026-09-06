# H Store — plan de construction

Version 1.0 · Rédigé le 6 septembre 2026, avant la première ligne de code.

Ce plan applique **CAHIER-DES-CHARGES.md** (le quoi) et **STACK.md** (le comment), et intègre les
arbitrages relevés dans **maquette/ECARTS.md**. Il suit l'ordre des lots du chapitre 12 du cahier,
en y ajoutant un **lot 0** : rien ne peut être écrit tant que les écarts ne sont pas tranchés et
que DESIGN.md et CLAUDE.md n'existent pas.

---

## 0. État constaté du dossier

| Élément | État |
| --- | --- |
| `CAHIER-DES-CHARGES.md`, `STACK.md` | Présents, version 1.0 |
| `DESIGN.md` | **Absent** — référencé comme source de vérité visuelle par les deux documents |
| `CLAUDE.md` | **Absent** — référencé comme règles permanentes de travail |
| Application Next.js | Non initialisée |
| Dépôt git / GitHub / Vercel | Aucun |
| Maquette livrée | `maquette/livraison/` — boutique HTML, `catalogue.json`, 11 photos, 3 planches PNG |
| Écarts cahier ↔ maquette | Relevés dans `maquette/ECARTS.md`, **aucun tranché** |
| `docs/` | Vide |

### Deux points d'environnement à signaler

1. **Node.js installé : v25.2.1.** STACK.md §2 impose **Node 22** et dit « ne pas changer de version ».
   L'écart est réel. Deux issues : installer Node 22 et le fixer dans un `.nvmrc`, ou acter Node 25
   par écrit dans STACK.md. Recommandation : **`.nvmrc` avec `22`**, parce que Vercel choisit la
   version d'exécution et qu'un écart local / production sur Next.js coûte cher à déboguer.
2. **Photos livrées en 640 px** (sauf `hoodie-lg.jpg`, 960 px). STACK.md §5 impose
   `next/image width={900} height={900}` : la fiche produit afficherait une source de 640 px agrandie.
   `hoodie-lg.jpg` prouve que la maquette prévoyait une grande version pour la fiche. À trancher au
   lot 1, avant d'écrire `CarteProduit` : soit on aligne les attributs sur la taille réelle des
   fichiers, soit on produit les dix grandes versions.

---

## 1. Lot 0 — Trancher, poser les règles, ouvrir le dépôt

**Rien d'autre ne démarre avant.** Le script de contrôle du catalogue échoue dès le lot 1 si les
identifiants ne sont pas décidés.

### 1.1 Les cinq arbitrages d'ECARTS.md — recommandations

| # | Question | Recommandation | Pourquoi |
| --- | --- | --- | --- |
| 1 | Identifiants, noms, catégories, prix : cahier ou maquette ? | **Maquette**, et on met le cahier à jour | Les textes, photos et prix existent déjà et sont cohérents entre eux. Réécrire dix descriptions crédibles pour retrouver les valeurs du cahier est du travail perdu. |
| 2 | Noms de fichiers photo | **Garder les noms livrés** (`cap.jpg`, `bottle.jpg`, `sleeve.jpg`, `notebook.jpg`, `phonecase.jpg`) et assouplir le cahier | Renommer casse la correspondance avec `catalogue.json` et le contrôle livré, pour un gain nul à l'écran. |
| 3 | Sélecteur de quantité sur la fiche produit | **Le garder** (cahier §5.2) | C'est une exigence fonctionnelle, pas un détail visuel ; la maquette est en retard, pas en désaccord. Le composant `SelecteurQuantite` sert de toute façon au panier. |
| 4 | Variantes taille / couleur au panier | **Décoratives → supprimées** | Le modèle du cahier est `{ produitId, quantité }`. Introduire des variantes change la clé de ligne, la règle d'incrément et la persistance : c'est un autre projet. |
| 5 | Troisième caractéristique : couleur ou entretien ? | **Couleur** (cahier §3) | Les données de `catalogue.json` sont déjà dans l'ordre matière / dimensions / couleur. Seuls les **libellés** de la maquette sont faux : afficher MATIÈRE / TAILLE / COULEUR. |

Ajouts de la maquette (ECARTS §8) : **conserver** le bandeau « Collection 2026 », le compteur du
filtre actif (« Tout · 10 ») et le pied de page avec adresse. **Écarter** le lien « Guide des tailles »
(page inexistante) et la mention « Livraison en 48 h — retours gratuits sous 30 jours » (promesse
commerciale invérifiable, hors périmètre, contraire à l'esprit du chapitre 8).

### 1.2 Livrables du lot 0

- `DESIGN.md` — intention visuelle, dérivée de la maquette : dégradé de marque
  (`#0C2484` → `#0C54E4` → `#3CCCFC`), neutres (`#0B1220`, `#4A5566`, `#7A8697`, `#E6E9EF`, `#F7F8FA`),
  ambre de démonstration (`#FBF1DF` / `#EBD9B4` / `#8A5A05`), vert de disponibilité, rouge d'erreur
  `#B3261E`, échelle d'espacements, rayons, typographie Plus Jakarta Sans 400–800.
- `CLAUDE.md` — règles permanentes : français partout, chapitre 8 non négociable, aucune dépendance
  sans accord écrit, vérification manuelle obligatoire avant chaque publication, aucun `any`,
  aucun `console.log`, composants de moins de 150 lignes.
- Mise à jour de `CAHIER-DES-CHARGES.md` §3 avec le tableau des dix produits **réellement retenus**
  (identifiants et fichiers photo de la maquette), avec une note de version expliquant l'arbitrage.
- `maquette/ECARTS.md` complété : chaque point marqué **tranché**, avec la décision.
- Dépôt : `git init`, `.gitignore` Next.js, dépôt GitHub via `gh repo create`, branche `main`.

### 1.3 Vérification de sortie

- Les cinq questions d'ECARTS.md ont une réponse écrite.
- `DESIGN.md` et `CLAUDE.md` existent et sont cohérents avec STACK.md.
- `git log` montre un premier commit contenant les cinq documents.

---

## 2. Lot 1 — Socle, charte, catalogue, vitrine

Branche `lot-1-socle-vitrine`.

### Contenu

1. **Initialisation**, commande exacte de STACK.md §2 :
   `npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*"`
   Noter la version de Next.js installée dans `README.md`, versionner `package-lock.json`.
2. **`tokens.css`** à la racine, importé une seule fois dans `app/layout.tsx`. Toutes les valeurs de
   DESIGN.md en `--h-*`. `app/globals.css` : remise à zéro, typographie de base, body.
3. **Police** : `next/font/google` Plus Jakarta Sans 400–800, exposée en variable CSS, consommée
   par `--h-font`. Aucun appel à un domaine tiers.
4. **Photos** : copier `maquette/livraison/produits/*` vers **`public/produits/`** (et `logo-h.png`
   vers `public/`). C'est le piège n°1 du projet : aucune autre destination ne fonctionne en production.
5. **Types et données** : `lib/types.ts` (`Produit`, `Categorie`, `LignePanier`),
   `data/produits.ts` — portage de `catalogue.json` en TypeScript, prix **en centimes entiers**
   (`2900`, `1400`, …) conformément à STACK.md §8.
6. **`lib/format.ts`** : `formaterPrix()` avec `Intl.NumberFormat('fr-FR', …)`, plus les utilitaires
   de catégorie dans `lib/catalogue.ts`. Aucun composant ne formate un prix lui-même.
7. **`scripts/verifier-catalogue.mjs`** : portage ESM du contrôle livré, lisant `data/produits.ts`
   et vérifiant les six règles du cahier §3 — dont l'existence réelle des fichiers dans
   `public/produits/`. Exposé en `npm run verifier`.
8. **Écrans** : `Header` (barre collante, logo, catégories, recherche, pastille panier),
   `Footer` (mention de démonstration permanente), `CarteProduit`, `GrilleProduits`, `Badge`,
   `FiltresCategorie`, bandeau d'accueil avec le dégradé de marque. Vitrine = `app/page.tsx`.
   Seuls les filtres et la recherche sont `"use client"`.

### Vérification de sortie

- `npm run build` et `npm run lint` : zéro erreur, zéro avertissement.
- `npm run verifier` : aucun signalement.
- Les quatre filtres fonctionnent, le compteur suit, le filtre actif est visible.
- Le badge « Nouveau » apparaît sur les deux produits concernés, « Rupture de stock » sur
  `gourde-inox`, qui n'est pas ajoutable.
- Un nom de produit artificiellement allongé passe à la ligne sans déborder de sa carte (cas limite 10).
- `grep -rn "#[0-9a-fA-F]\{6\}" app components` : aucune couleur en dur hors `tokens.css`.

---

## 3. Lot 2 — Mise en ligne Vercel

Branche `lot-2-deploiement`, ou publication directe de `main` après fusion du lot 1.

### Contenu

- Connecter le dépôt GitHub à Vercel. Aucune configuration, aucune variable d'environnement.
- Première publication sur `main`.

### Vérification de sortie — la seule qui compte à ce stade

- **Les dix photos s'affichent sur l'adresse de production**, ouvertes une par une, pas seulement
  en local.
- La police est servie depuis le domaine du site (onglet Réseau : aucun appel à `fonts.googleapis.com`).
- Adresse de production notée dans `README.md`.

> Ce lot est volontairement isolé. Découvrir un problème d'images au lot 6, avec cinq écrans écrits
> par-dessus, coûte dix fois plus cher.

---

## 4. Lots 3 et 4 — Fiche produit et panier

Branche `lot-3-fiche-et-panier`. **Les deux lots ont été réunis**, décision prise le 6 septembre 2026 :
le cahier §5.2 exige qu'après l'ajout, une confirmation soit visible et le panier mis à jour. Livrer
la fiche sans le panier aurait donc voulu dire livrer un bouton qui ne fait rien — ce que le
chapitre 8 interdit. Le panier étant écrit, il fallait aussi que l'écran panier dise la vérité.

### Contenu

- `app/produit/[id]/page.tsx` : composant serveur, `generateStaticParams` sur les dix identifiants.
- Deux colonnes à partir de 900 px, photo au-dessus en dessous. `priority` sur cette photo uniquement.
- Fil d'ariane, nom, catégorie, prix, disponibilité, description, trois caractéristiques libellées
  **MATIÈRE / TAILLE / COULEUR** (arbitrage 5).
- `SelecteurQuantite` (arbitrage 3) et `BoutonAjouter` pleine largeur, tous deux `"use client"`.
  Confirmation visible après l'ajout.
- Quatre produits similaires, même catégorie en priorité, complétés par d'autres si la catégorie
  n'en contient pas assez.
- `app/not-found.tsx` : appelée par `notFound()` quand l'identifiant n'existe pas (cas limite 5).
- `alt` descriptif sur chaque image, jamais « image » ni « photo ».

### Vérification de sortie

- Les dix fiches répondent ; `/produit/inconnu` affiche la page introuvable, pas une erreur brute.
- La fiche de `gourde-inox` montre la rupture et n'offre pas l'ajout (cas limite 4).
- `npm run build`, `npm run lint`, `npm run verifier` : propres.

---

## 5. Lot 4 — Panier

Branche `lot-4-panier`. **C'est la seule vraie complexité du projet** (STACK.md §6).

### Contenu

1. **`lib/panier.tsx`** : React Context et `useReducer`, hook `usePanier()`, aucune bibliothèque
   d'état. Actions : `ajouter`, `changerQuantite`, `retirer`, `vider`, `restaurer`.
2. **Fonction pure de calcul**, appelée partout : sous-total, livraison (490 centimes, offerte à
   partir de 5000), total, manque pour le franco de port. Tout en centimes entiers.
3. **Persistance** — les quatre règles de STACK.md §6, dans cet ordre : état initial **toujours
   vide** → lecture de `localStorage` dans un `useEffect` après montage → `try / catch` sur toute
   lecture et toute écriture → **la pastille n'affiche rien** tant que la restauration n'a pas eu
   lieu, jamais `0`. Clé `h-store-panier-v1`.
4. **Filtrage à la restauration** : une ligne dont le `produitId` n'existe plus au catalogue est
   ignorée sans faire planter la page (cas limite 6).
5. Bornes de quantité **1 à 10** ; passer à 0 retire la ligne ; ajouter un produit déjà présent
   incrémente sa ligne au lieu de la dupliquer.
6. Écran `app/panier/page.tsx` : `LignePanier`, `RecapitulatifPanier`, `EtatVide`.
   Aucune variante taille / couleur (arbitrage 4).

### Vérification de sortie — à faire réellement, dans un navigateur

- J'ajoute deux produits, **je recharge la page** : ils sont là, avec les bonnes quantités.
- Modifier une quantité met à jour la ligne, le total **et** la pastille.
- Une quantité ramenée à 0 fait disparaître la ligne ; si c'était la dernière, l'état vide s'affiche
  (cas limite 3).
- Panier à une seule ligne : la mise en page tient (cas limite 1 et 2).
- Sous-total franchissant 50 € : la livraison passe à « offerte » et le message franco de port
  disparaît immédiatement (cas limite 8).
- En navigation privée avec le stockage bloqué, la boutique fonctionne sans planter.
- Aucun total écrit en dur nulle part.

---

## 6. Lot 5 — Commande et confirmation

Branche `lot-5-commande`. **Le chapitre 8 gouverne ce lot.**

### Contenu

- `components/BandeauDemo.tsx` : bandeau ambre, **visible sans défiler**, en haut des pages Commande
  et Confirmation.
- `app/commande/page.tsx` : formulaire nom, prénom, email, adresse, code postal, ville, pays. Champs
  obligatoires signalés, erreurs explicites en français à côté du champ concerné, la commande ne part
  pas si le formulaire est incomplet (cas limite 9). Récapitulatif avec le total. Bouton
  **Confirmer la commande**.
- `app/commande/confirmation/page.tsx` : numéro `H-2026-XXXX` (quatre chiffres tirés au hasard),
  récapitulatif, adresse de livraison, la phrase exacte du cahier §5.5, panier vidé, bouton de retour
  à la boutique.
- Le numéro est tiré **côté client après montage**, sinon le rendu serveur et le rendu client diffèrent.

### Garde-fous — non négociables

- Aucun champ de carte bancaire : ni numéro, ni date d'expiration, ni cryptogramme, **même désactivé,
  même grisé, même présenté comme un exemple**.
- Aucun logo de moyen de paiement, aucune mention d'un prestataire.
- Aucun bouton laissant croire qu'un paiement a lieu.
- Aucun faux compteur de stock, aucun compte à rebours, aucun avis client inventé.

### Vérification de sortie

- `grep -rin "carte\|cvv\|cvc\|iban\|visa\|mastercard\|paiement\|stripe\|paypal" app components lib data`
  → **aucun champ de saisie**, seulement les mentions de démonstration qui disent qu'il n'y en a pas.
- Sur un écran de 390 px, le bandeau de démonstration est lisible **sans défiler** sur les deux pages.
- La commande aboutit à une confirmation et le panier est vidé.

---

## 7. Lot 6 — Recherche, page introuvable, responsive, cas limites

Branche `lot-6-finitions`.

### Contenu

- Recherche sur le nom, la catégorie et la description ; résultats dans la grille de la vitrine,
  nombre de résultats affiché, moyen d'effacer, état « aucun résultat » explicite (cas limite 7).
- Passe responsive à 390 / 640 / 900 / 1200 px : grille à une ou deux colonnes, barre du haut réduite,
  panier toujours accessible, **aucun défilement latéral**, boutons principaux d'au moins 44 px.
- Relecture des dix cas limites du chapitre 9, un par un, en cochant.
- Passe finale « aucune valeur en dur » : couleurs, tailles, espacements — tout vient de `tokens.css`.

### Vérification de sortie

Les points du chapitre 10 du cahier, cochés un par un, réellement exécutés.

---

## 8. Rituel de fin de lot — identique pour chaque branche

1. `npm run verifier` — aucun signalement.
2. `npm run lint` — zéro avertissement.
3. `npm run build` — zéro erreur.
4. `npm run dev`, ouvrir les écrans touchés, **constater**.
5. Vérifier à 390 px : aucun défilement latéral.
6. Commit, `git push`, demande de publication avec un **résumé en français simple** : ce qui a été
   fait, ce qui a été vérifié, ce qui reste ouvert.
7. Fusion dans `main` → Vercel publie → **rouvrir la production** et vérifier l'écran livré.

`main` reste déployable en permanence : aucun travail en cours n'y est fusionné.

---

## 9. Risques identifiés, et la parade

| Risque | Où il frappe | Parade |
| --- | --- | --- |
| Images invisibles en production | Lots 1–2 | Photos dans `public/produits/` uniquement, vérification en ligne dès le lot 2 |
| `localStorage` lu pendant le rendu serveur | Lot 4 | État initial vide, lecture en `useEffect`, `try / catch` |
| Pastille qui saute de 0 à N au chargement | Lot 4 | La pastille n'affiche rien tant que la restauration n'a pas eu lieu |
| Centimes flottants (`64,999999 €`) | Lot 4 | Montants en entiers, conversion à l'affichage seulement |
| `"use client"` en tête d'une page entière | Lots 1, 3, 4 | Isoler l'interactif dans de petits composants |
| Rendu serveur ≠ rendu client sur le numéro de commande | Lot 5 | Tirage après montage |
| Dérive de dépendance (« juste une petite bibliothèque ») | Partout | STACK.md §12 : signaler et proposer une alternative, ne pas installer |
| Écart de version Node local ↔ Vercel | Lot 2 | `.nvmrc`, décision prise au lot 0 |
| Écarts cahier ↔ maquette rouverts en cours de route | Lots 1, 3, 4 | Tranchés et écrits au lot 0, ECARTS.md fait foi |

---

## 10. Ce qui est livré à la fin

- L'adresse du dépôt GitHub, `main` déployable en permanence.
- L'adresse de production Vercel.
- Six branches fusionnées, une demande de publication par lot, chacune avec son résumé en français.
- Le chapitre 10 du cahier des charges coché, point par point, en l'ayant réellement fait.

> En cas de temps limité, les lots 1 à 3 forment une boutique démontrable (cahier §12).
