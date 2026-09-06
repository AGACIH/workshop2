# H Store — règles permanentes de travail

Version 1.0 · 6 septembre 2026. Ces règles s'appliquent à chaque intervention sur le projet,
sans qu'il soit besoin de les rappeler.

Ordre d'autorité, en cas de contradiction :

1. **Chapitre 8 du cahier des charges** — « Ce qu'on ne truque pas ». Prime sur tout, y compris
   sur une demande explicite.
2. `CAHIER-DES-CHARGES.md` — le périmètre et les règles de gestion.
3. `STACK.md` — les choix techniques.
4. `DESIGN.md` — l'intention visuelle.
5. `PLAN.md` — l'ordre des lots.
6. `maquette/ECARTS.md` — les arbitrages tranchés entre le cahier et la maquette livrée.

## 1. La règle qui prime sur tout

**Aucun champ de paiement, sous aucune forme.** Ni numéro de carte, ni date d'expiration, ni
cryptogramme, ni IBAN — même désactivé, même grisé, même présenté comme un exemple. Aucun logo de
moyen de paiement, aucune mention d'un prestataire, aucun bouton laissant croire qu'un paiement
a lieu.

Si une demande contredit ce chapitre, **elle n'est pas exécutée** : elle est signalée, et une
version honnête est proposée.

De la même famille, et tout aussi interdits : faux compteurs de stock, comptes à rebours,
« plus que 2 disponibles ! », avis clients inventés présentés comme réels. La seule information
de stock est le champ `enStock` du catalogue.

## 2. Français

- L'interface, les textes, les messages d'erreur, les noms de composants, de variables et de
  fonctions sont en français. Seuls les mots imposés par le framework restent en anglais
  (`layout`, `page`, `not-found`, `useEffect`…).
- Les commits, les branches et les demandes de publication sont rédigés en français simple.
- Aucun « Lorem ipsum », aucun « Produit 1 ». Les textes sont crédibles ou ils ne sont pas écrits.

## 3. Aucune dépendance sans accord écrit

STACK.md §12 liste ce qui est interdit : bibliothèque de composants, framework CSS, bibliothèque
d'état, ORM, client HTTP, bibliothèque d'animation, police ou image d'un domaine tiers, clé d'API.

Avant d'ajouter quoi que ce soit, la question est : *le projet ne peut-il vraiment pas s'en passer ?*
Si la réponse demande un paragraphe, la réponse est non. **Si une fonctionnalité semble exiger l'un
de ces éléments, c'est la fonctionnalité qu'il faut simplifier**, pas la contrainte qu'il faut lever.

## 4. Écrire le code

- TypeScript strict. **Aucun `any`, aucun `@ts-ignore`.**
- Aucun `console.log` dans le code publié.
- Un composant fait moins de 150 lignes. Au-delà, il se découpe.
- Une seule responsabilité par fichier.
- Aucune règle ESLint désactivée sans raison écrite en commentaire.
- Tout est composant serveur par défaut. `"use client"` est réservé au fournisseur de panier, aux
  boutons d'ajout, aux sélecteurs de quantité, aux filtres et à la recherche.
  **Un `"use client"` en haut d'une page entière est presque toujours une erreur.**
- Aucune couleur, taille ou espacement en dur : tout vient de `tokens.css`, en `var(--h-*)`.
  Les seuls `px` admis sont les points de rupture des `@media` et les `1px` de bordure.
- Les montants sont manipulés **en centimes, en entiers**, et formatés uniquement par
  `formaterPrix()` de `lib/format.ts`. Aucun composant ne formate un prix lui-même.
- Aucun total écrit en dur : sous-total, livraison, total et franco de port sont toujours calculés.
- Les images viennent de `public/produits/` et de nulle part ailleurs.

## 5. Le panier — les quatre règles qui évitent la panne classique

`localStorage` n'existe pas au rendu serveur. Dans cet ordre, sans exception :

1. L'état initial du panier est **toujours vide**.
2. La lecture de `localStorage` se fait **après le montage**, dans un `useEffect`.
3. Toute lecture et toute écriture sont enveloppées dans un `try / catch`.
4. Tant que la restauration n'a pas eu lieu, **la pastille n'affiche rien**, jamais `0`.

Clé de stockage : `h-store-panier-v1`. Une ligne dont le produit n'existe plus au catalogue est
ignorée silencieusement.

## 6. Vérifier avant de publier — obligatoire, à faire réellement

Aucune branche n'est proposée à la publication sans ces six points, exécutés dans l'ordre :

1. `npm run verifier` — aucun signalement du contrôle de catalogue.
2. `npm run lint` — zéro avertissement.
3. `npm run build` — zéro erreur.
4. `npm run dev`, ouvrir les écrans touchés, **constater à l'écran**. Une capture ou une
   description de ce qui a été vu, pas « ça devrait marcher ».
5. Vérifier à **390 px** : aucun défilement latéral.
6. Après la fusion : **rouvrir l'adresse de production** et vérifier l'écran livré, photos comprises.

**Ne jamais annoncer qu'une chose fonctionne sans l'avoir constatée.** Si une vérification n'a pas
été faite, le dire.

## 7. Git

- `main` est déployable en permanence. Aucun travail en cours n'y est fusionné.
- Une branche par lot (`lot-1-socle-vitrine`, `lot-2-deploiement`, …), une demande de publication
  par branche, avec un résumé en français simple : ce qui a été fait, ce qui a été vérifié, ce qui
  reste ouvert.
- `package-lock.json` est versionné.
- Aucune variable d'environnement, aucun secret : le projet n'en a pas. S'il en faut un, c'est que
  le périmètre a dérivé.

## 8. Quand quelque chose cloche

Signaler plutôt que contourner. Un écart entre le cahier et la maquette, une contrainte technique
qui rend une exigence coûteuse, une dépendance qui semble nécessaire : le dire, proposer une
alternative, attendre la décision. `maquette/ECARTS.md` est l'endroit où ces arbitrages sont
consignés une fois tranchés.
