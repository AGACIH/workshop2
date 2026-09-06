# H Store — stack technique

Version 1.0 · Complète CAHIER-DES-CHARGES.md et CLAUDE.md. Ce document fixe les choix techniques. **Ils ne se rediscutent pas en cours de route** : toute proposition d'écart doit être signalée avant d'être mise en œuvre.

> Source : Google Docs `1Qw5VAyLsmRmcoJoN58fhKpIlU4wbReEgrtczGw5oB7Y` — importé le 6 septembre 2026.

## 1. Le principe qui gouverne tous les choix

**Le moins de pièces possible.** Chaque dépendance ajoutée est une chose de plus à comprendre, à mettre à jour et à déboguer — pour un produit qui tient en cinq écrans et dix produits.

Le test avant d'ajouter quoi que ce soit : *est-ce que le projet ne peut vraiment pas s'en passer ?* Si la réponse demande un paragraphe, la réponse est non.

## 2. Socle

| Élément | Choix | Pourquoi |
| --- | --- | --- |
| **Exécution** | Node.js 22 | Présent par défaut dans l'environnement. Ne pas changer de version. |
| **Framework** | Next.js, **App Router** | Déploiement Vercel sans configuration. Pas de Pages Router, pas de mélange des deux. |
| **Langage** | TypeScript, mode strict | Le catalogue et le panier sont typés : c'est ce qui attrape les erreurs de données avant l'écran. |
| **Paquets** | npm | Le `package-lock.json` est versionné. |
| **Rendu** | Serveur par défaut, client là où c'est nécessaire | Voir §6. |

**Version de Next.js** : celle installée par `create-next-app` au moment de la création du projet. La noter dans le README.md, et **versionner le fichier de verrouillage** pour que tout le monde ait la même.

### Initialisation

```bash
npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*"
```

Les réponses sont volontairement toutes explicites : aucune question interactive, donc aucune divergence entre deux installations.

## 3. Styles — CSS Modules, pas de framework CSS

**Pas de Tailwind. Pas de bibliothèque de composants.**

La raison est structurelle, pas une préférence : `tokens.css` est déclaré source de vérité visuelle unique. Un framework CSS introduirait une seconde source — sa propre échelle d'espacements, ses propres couleurs — et la règle « aucune valeur en dur » deviendrait invérifiable.

| Élément | Choix |
| --- | --- |
| Jetons de design | `tokens.css`, importé une seule fois dans `app/layout.tsx` |
| Styles globaux | `app/globals.css` — remise à zéro, typographie de base, body |
| Styles de composant | **CSS Modules** : `Composant.module.css` à côté du composant |
| Valeurs | Uniquement `var(--h-*)`. Aucun `#hex`, aucun `px` arbitraire |

**Les seuls `px` admis en dur** sont ceux qui ne relèvent pas du design : les points de rupture des `@media`, et les valeurs `1px` de bordure.

### Points de rupture

Trois, pas plus : `640px`, `900px`, `1200px`. Écrits en `@media (min-width: …)`, conception mobile d'abord.

## 4. Polices

`next/font/google` pour **Plus Jakarta Sans**, poids 400 à 800. Chargée dans `app/layout.tsx`, exposée en variable CSS, consommée par `--h-font`.

Avantage décisif ici : la police est servie depuis le domaine du site, donc elle fonctionne même si l'accès aux services externes est restreint pendant la construction.

## 5. Données et images

### Le catalogue

Un fichier **TypeScript**, pas un JSON :

```
data/produits.ts   →  export const PRODUITS: Produit[] = [...]
lib/types.ts       →  type Produit, type Categorie, type LignePanier
```

Pourquoi TypeScript plutôt que JSON : le catalogue est vérifié à la compilation. Une catégorie mal orthographiée ou une caractéristique manquante devient une erreur de build, pas un écran cassé.

### Les images — l'endroit exact compte

**Les dix photos vont dans `public/produits/`.**

C'est la seule façon d'obtenir des adresses stables (`/produits/tshirt.jpg`) qui fonctionnent **en développement comme en production**. Une image placée ailleurs peut s'afficher en local et disparaître une fois en ligne : c'est le piège numéro un de ce projet.

- Affichage avec `next/image`, `width={900} height={900}`.
- `priority` sur la photo de la fiche produit uniquement.
- Le `alt` décrit le produit, jamais « image » ni « photo ».
- Aucune configuration de domaine distant : toutes les images sont locales.

## 6. État de l'application

### Le panier — la seule vraie complexité du projet

- Un **React Context** (`lib/panier.tsx`), consommé par un hook `usePanier()`.
- Aucune bibliothèque de gestion d'état. Pour un panier de dix produits, `useState` et `useReducer` suffisent largement.

### La persistance, et le piège à éviter

Le panier vit dans `localStorage`. **Next.js rend les pages sur le serveur, où `localStorage` n'existe pas.** Lire cette valeur pendant le rendu fait planter la page — c'est l'erreur classique de ce projet.

La règle :

1. L'état initial du panier est **toujours vide**.
2. La lecture de `localStorage` se fait **après le montage**, dans un `useEffect`.
3. Toute lecture et toute écriture sont enveloppées dans un `try / catch` : la navigation privée et les navigateurs qui bloquent le stockage doivent dégrader proprement, pas casser la boutique.
4. Tant que la restauration n'a pas eu lieu, **la pastille du panier n'affiche pas `0`** : elle n'affiche rien. Sinon le visiteur voit son panier passer de vide à plein sous ses yeux à chaque chargement.

Clé de stockage : `h-store-panier-v1`. Le suffixe de version permet d'ignorer proprement un panier d'un ancien format.

### Composants serveur et composants client

Par défaut, tout est composant serveur. `"use client"` est réservé à ce qui en a réellement besoin : le fournisseur de panier, les boutons d'ajout, les sélecteurs de quantité, les filtres, la recherche.

**Un `"use client"` en haut d'une page entière est presque toujours une erreur** : c'est le signe qu'il faut isoler la partie interactive dans un composant plus petit.

## 7. Arborescence

```
app/
  layout.tsx              barre du haut, pied de page, police, tokens
  page.tsx                vitrine
  globals.css
  produit/[id]/page.tsx   fiche produit
  panier/page.tsx         panier
  commande/page.tsx       formulaire de commande
  commande/confirmation/page.tsx
  not-found.tsx           page introuvable

components/
  Header.tsx  Footer.tsx  CarteProduit.tsx  GrilleProduits.tsx
  FiltresCategorie.tsx  BoutonAjouter.tsx  SelecteurQuantite.tsx
  LignePanier.tsx  RecapitulatifPanier.tsx  Badge.tsx  EtatVide.tsx
  BandeauDemo.tsx
  (chaque composant a son .module.css)

lib/
  types.ts        panier.tsx        format.ts        catalogue.ts

data/
  produits.ts

public/
  produits/*.jpg  logo.png

scripts/
  verifier-catalogue.mjs

tokens.css   DESIGN.md   CAHIER-DES-CHARGES.md   CLAUDE.md   STACK.md
```

Les composants portent des noms français, comme l'interface. Les mots imposés par le framework restent en anglais.

## 8. Formats et calculs

Un seul endroit : `lib/format.ts`.

```
formaterPrix(15)    →  "15,00 €"
formaterPrix(4.9)   →  "4,90 €"
```

Implémenté avec `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })`, pas à la main. **Aucun composant ne formate un prix lui-même.**

Les montants sont manipulés **en centimes, en nombres entiers**, et convertis seulement à l'affichage. C'est ce qui évite qu'un total affiche `64,999999 €` après trois additions.

Les calculs de panier (sous-total, livraison, total, franco de port) vivent dans une fonction pure de `lib/panier.tsx`, testable et appelée partout.

## 9. Vérification

**Pas de framework de test.** Pour ce projet, il coûterait plus qu'il n'apporte. À la place, deux niveaux :

1. **`scripts/verifier-catalogue.mjs`** — contrôle les règles d'intégrité du chapitre 3 du cahier des charges : identifiants, existence réelle des fichiers photo sur le disque, trois caractéristiques, un seul produit en rupture. Lancé avec `node scripts/verifier-catalogue.mjs`, exposé en `npm run verifier`.
2. **La vérification manuelle obligatoire de CLAUDE.md** : lancer l'application, ouvrir les pages, constater.

`npm run build` et `npm run lint` doivent passer sans erreur ni avertissement avant toute publication.

## 10. Qualité de code

- ESLint dans la configuration livrée par `create-next-app`. Aucune règle désactivée sans raison écrite en commentaire.
- Aucun `any`. Aucun `@ts-ignore`.
- Aucun `console.log` dans le code publié.
- Composants de moins de 150 lignes : au-delà, découper.
- Une seule responsabilité par fichier.

## 11. Déploiement

- **Vercel**, connecté au dépôt GitHub. Aucune configuration : Next.js est détecté automatiquement.
- **Aucune variable d'environnement.** Le projet n'a aucun secret : s'il en faut une, c'est que le périmètre a dérivé.
- Chaque publication sur `main` met la production à jour.
- Après chaque déploiement : **vérifier que les dix photos s'affichent en ligne**, pas seulement en local.

## 12. Ce qui est explicitement interdit

Sans accord préalable et écrit :

- toute bibliothèque de composants (MUI, shadcn, Chakra…) ;
- tout framework CSS (Tailwind, Bootstrap…) ;
- toute bibliothèque de gestion d'état (Redux, Zustand, Jotai…) ;
- tout ORM, toute base de données, tout client HTTP ;
- toute bibliothèque d'animation ou de carrousel ;
- toute police ou image chargée depuis un domaine tiers ;
- toute clé d'API, tout service externe, tout webhook.

**Si une fonctionnalité semble exiger l'un de ces éléments, c'est presque toujours la fonctionnalité qu'il faut simplifier**, pas la contrainte qu'il faut lever. Le signaler et proposer une alternative.
