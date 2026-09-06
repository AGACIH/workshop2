# Écarts entre le cahier des charges et la maquette

Relevé fait le 6 septembre 2026, à l'import de `H Store mockups.zip`.
Le cahier des charges dit une chose, la maquette livrée en fait une autre.

> **Tous les points sont tranchés depuis le 6 septembre 2026.** Les décisions sont en bas de ce
> document, au chapitre « Ce qui a été tranché ». Le cahier des charges est passé en version 1.1
> pour les intégrer. Ce relevé est conservé tel quel comme trace de ce qui a été arbitré et pourquoi.

## 1. Les identifiants et les noms des dix produits

Le chapitre 3 du cahier les déclare « figés ». La maquette en utilise d'autres.

| Cahier des charges | Maquette | Catégorie (cahier → maquette) | Prix (cahier → maquette) |
| --- | --- | --- | --- |
| `tshirt` — T-shirt H | `tshirt-signature` — T-shirt Signature | Textile | 29 € |
| `hoodie` — Hoodie H | `hoodie-atelier` — Hoodie Atelier H | Textile | 65 € |
| `casquette` — Casquette H | `casquette-brodee` — Casquette brodée | Textile → **Accessoires** | 25 € → **24 €** |
| `mug` — Mug H | `mug-ceramique` — Mug céramique | Bureau | 15 € → **14 €** |
| `tote` — Tote bag H | `tote-bag-toile` — Tote bag toile | Bureau → **Accessoires** | 19 € → **18 €** |
| `gourde` — Gourde isotherme H | `gourde-inox` — Gourde inox 500 ml | Bureau → **Accessoires** | 32 € |
| `housse` — Housse ordinateur H | `housse-14-pouces` — Housse 14 pouces | Bureau | 45 € |
| `carnet` — Carnet H | `carnet-bleu-nuit` — Carnet bleu nuit | Bureau | 18 € → **22 €** |
| `coque` — Coque téléphone H | `coque-silicone` — Coque silicone | Accessoires | 22 € → **19 €** |
| `stickers` — Planche de stickers H | `planche-stickers` — Planche de stickers | Accessoires → **Bureau** | 8 € |

Conséquence sur la répartition : le cahier donne Textile 3 / Bureau 5 / Accessoires 2, la maquette donne Textile 2 / Bureau 4 / Accessoires 4. Les deux respectent la règle « au moins deux produits par catégorie ».

## 2. Les noms de fichiers photo

Le cahier impose des noms français, la maquette livre des noms anglais.

| Cahier | Fichier réellement livré |
| --- | --- |
| `produits/casquette.jpg` | `produits/cap.jpg` |
| `produits/gourde.jpg` | `produits/bottle.jpg` |
| `produits/housse.jpg` | `produits/sleeve.jpg` |
| `produits/carnet.jpg` | `produits/notebook.jpg` |
| `produits/coque.jpg` | `produits/phonecase.jpg` |

`tshirt.jpg`, `hoodie.jpg`, `mug.jpg`, `tote.jpg`, `stickers.jpg` sont conformes. La maquette ajoute deux fichiers non prévus : `hoodie-lg.jpg` (960 px, pour la fiche produit) et `logo-h.png`.

## 3. Ce qui est en rupture, ce qui est nouveau

Conforme : deux nouveautés (`hoodie-atelier`, `planche-stickers`) et un seul produit en rupture (`gourde-inox`). Le cahier ne désignait pas lequel — la maquette tranche pour la gourde.

## 4. La fiche produit

- Le cahier impose les trois caractéristiques dans l'ordre **matière / dimensions ou taille / couleur**. Le `catalogue.json` respecte cet ordre, mais l'écran de la maquette affiche les libellés **MATIÈRE / COUPE / ENTRETIEN** — et la ligne « entretien » ne correspond à aucune des trois données.
- Le cahier exige **un sélecteur de quantité** sur la fiche (§5.2). La maquette n'en a pas : le bouton « Ajouter au panier » est seul.
- La maquette ajoute un lien « Guide des tailles » et la mention « Livraison en 48 h — retours gratuits sous 30 jours », absents du cahier.

## 5. Le panier

- La maquette affiche des **variantes** par ligne (« T-shirt Signature — Noir, M », « Mug céramique — 350 ml »). Le cahier définit une ligne comme `{ produitId, quantité }`, sans variante. Soit on ajoute la notion de taille/couleur au modèle, soit ces mentions sont décoratives et doivent disparaître.
- La planche PNG `03-panier.png` annonce « Livraison offerte dès **60 €** d'achat ». La règle du cahier est **50 €**, et le code de la maquette utilise bien 50. **La planche PNG est fausse sur ce point.**

## 6. Les planches PNG sont en retard sur le code

Les trois PNG ne montrent pas la mention de démonstration en pied de page. Le fichier `H Store - Boutique.dc.html`, lui, l'affiche bien (ligne ambre sous l'adresse). En cas de désaccord entre une planche et le code, **c'est le code de la maquette qui est à jour**.

## 7. Écarts avec STACK.md

Ce ne sont pas des conflits, seulement le travail de portage à prévoir :

- La maquette stocke le catalogue en **JSON**, STACK.md impose **TypeScript** (`data/produits.ts`) pour que les erreurs soient attrapées à la compilation.
- Le script de contrôle livré est en CommonJS (`controle-catalogue.js`), STACK.md attend `scripts/verifier-catalogue.mjs`.
- La maquette charge Plus Jakarta Sans depuis `fonts.googleapis.com`. STACK.md l'interdit : passer par `next/font/google`.
- Tous les styles de la maquette sont en attributs `style=` inline. STACK.md impose CSS Modules + `tokens.css`.

## 8. Ce que la maquette apporte et que le cahier ne mentionnait pas

À conserver ou à écarter, mais à décider : le bandeau « Collection 2026 — À porter, à emporter », le tri « Nouveautés » en haut de grille, le compteur dans le filtre actif (« Tout · 10 »), le pied de page avec adresse postale.

---

## Ce qui a été tranché

Décisions prises le 6 septembre 2026, avant la première ligne de code. Elles ne se rediscutent plus :
toute demande contraire est signalée avant d'être mise en œuvre.

| # | Question | Décision | Motif |
| --- | --- | --- | --- |
| 1 | Identifiants, noms, catégories, prix | **La maquette**, et le cahier passe en version 1.1 | Textes, prix et photos existent déjà et sont cohérents ; les réécrire serait du travail perdu. |
| 2 | Noms de fichiers photo | **Les noms livrés sont conservés** : `cap.jpg`, `bottle.jpg`, `sleeve.jpg`, `notebook.jpg`, `phonecase.jpg` | Renommer casse la correspondance avec le catalogue et le contrôle livrés, pour un gain nul à l'écran. |
| 3 | Sélecteur de quantité sur la fiche produit | **Gardé** (cahier §5.2) | Exigence fonctionnelle, pas un détail visuel. Le composant sert de toute façon au panier. |
| 4 | Variantes taille / couleur au panier | **Décoratives → supprimées** | Le modèle reste `{ produitId, quantité }`. Des variantes changeraient la clé de ligne, l'incrément et la persistance. |
| 5 | Troisième caractéristique | **Couleur** (cahier §3) | Les données sont déjà dans l'ordre matière / dimensions / couleur ; seuls les libellés de la maquette étaient faux. Affichage : MATIÈRE / TAILLE / COULEUR. |

### Ajouts de la maquette (chapitre 8 ci-dessus)

**Conservés** : le bandeau « Collection 2026 — À porter, à emporter », le compteur dans le filtre
actif (« Tout · 10 »), le pied de page avec adresse postale.

**Écartés** : le lien « Guide des tailles » (il mènerait à une page inexistante) et la mention
« Livraison en 48 h — retours gratuits sous 30 jours » (promesse commerciale invérifiable, hors
périmètre, contraire à l'esprit du chapitre 8 du cahier).

### Rappels qui découlent de ces décisions

- La règle du franco de port est **50 €**. La planche `03-panier.png` annonce 60 € : elle est fausse,
  c'est le code de la maquette qui fait foi.
- Le portage technique du chapitre 7 reste à faire : catalogue en TypeScript, script de contrôle en
  `.mjs`, police par `next/font/google`, styles en CSS Modules et `tokens.css`.
