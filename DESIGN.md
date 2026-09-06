# H Store — intention visuelle

Version 1.0 · Complète CAHIER-DES-CHARGES.md et STACK.md. Ce document décrit **ce qu'on veut voir à l'écran** et fournit les valeurs exactes que `tokens.css` doit contenir.

Les valeurs ci-dessous ne sont pas inventées : elles sont **relevées dans le code de la maquette livrée** (`maquette/livraison/source/H Store - Boutique.dc.html`), qui fait foi en cas de désaccord avec les planches PNG. Les quelques écarts assumés sont signalés par **⚠ écart assumé** avec leur raison.

---

## 1. L'intention

**Le produit est la vedette.** Le cahier des charges le pose en contraste avec un outil de gestion : ici, ce qu'on regarde, c'est une photo de vêtement, pas une interface.

Trois conséquences qui gouvernent chaque décision qui suit :

1. **La photo occupe le plus de place.** Carré plein, sans marge intérieure, sans cadre décoratif. La carte produit, c'est une photo avec trois lignes de texte dessous — rien d'autre.
2. **L'interface se retire.** Un seul bleu porte l'action. Les bordures sont à peine visibles. Aucune ombre portée qui attire l'œil au repos. Rien ne clignote, rien ne bouge sans qu'on l'ait touché.
3. **Le vide est un choix, pas un oubli.** Les grands espaces entre les blocs ne sont pas là à remplir. Une page de panier à une seule ligne reste aérée : c'est normal.

Le ton du texte suit la même règle — sobre, factuel, jamais commercial. Aucune urgence fabriquée, aucun superlatif (cahier §8).

---

## 2. Couleurs

Toutes les valeurs vivent dans `tokens.css` sous le préfixe `--h-`. **Aucun `#hex` ailleurs dans le projet** (STACK.md §3).

### La marque

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--h-bleu` | `#0C54E4` | La couleur d'action. Boutons principaux, prix, liens, filtre actif, pastille du panier. |
| `--h-bleu-fonce` | `#0C2484` | Survol des liens, extrémité sombre du dégradé. |
| `--h-bleu-clair` | `#0C84FC` | Étape intermédiaire du dégradé uniquement. |
| `--h-cyan` | `#3CCCFC` | Badge « Nouveau », extrémité claire du dégradé. |
| `--h-cyan-encre` | `#062338` | Le texte posé sur le cyan. Contraste 8,6:1. |
| `--h-sur-degrade` | `#DCE8FF` | Le surtitre posé sur le dégradé de marque. |

**Le dégradé de marque**, un seul dans tout le projet, pour le bandeau d'accueil :

```css
--h-degrade: linear-gradient(135deg, #0C2484 0%, #0C54E4 38%, #0C84FC 72%, #3CCCFC 100%);
```

Il ne sert nulle part ailleurs. Ni sur un bouton, ni derrière du texte long, ni sur une carte produit.

### Les neutres

| Jeton | Valeur | Usage | Contraste sur blanc |
| --- | --- | --- | --- |
| `--h-encre` | `#0B1220` | Titres, noms de produits, texte principal. | 18,6:1 |
| `--h-gris` | `#4A5566` | Texte courant, descriptions, navigation, libellés de formulaire. | 7,5:1 |
| `--h-atten` | `#7A8697` | Atténuation **décorative uniquement** — voir l'avertissement ci-dessous. | 3,7:1 |
| `--h-bord` | `#E6E9EF` | Toutes les bordures, toutes les séparations. |  |
| `--h-fond` | `#F7F8FA` | Le fond de la page. |  |
| `--h-surface` | `#FFFFFF` | Cartes, barre du haut, pied de page, champs au focus. |  |
| `--h-photo` | `#F1F3F7` | Le fond derrière une photo produit, le temps qu'elle charge. |  |

> **⚠ `--h-atten` ne passe pas l'accessibilité pour du texte** (3,7:1, il en faut 4,5). La maquette l'utilise pour la catégorie en capitales sur la carte produit et pour la ligne de copyright. C'est acceptable pour un libellé de 12 px en capitales qui double une information déjà présente, **et pour rien d'autre**. Toute information que le visiteur doit lire — une description, un prix unitaire, un message d'erreur, un état vide — prend `--h-gris`.

### Les états

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--h-vert` | `#0B7A55` | « En stock », « Offerte ». **⚠ écart assumé** : la maquette utilise `#0E8F63`, qui ne donne que 3,6:1 sur son propre fond. Assombri pour atteindre 4,7:1. |
| `--h-vert-fond` | `#E6F4EE` | Fond de la pastille de disponibilité. |
| `--h-ambre` | `#8A5A05` | Le texte du bandeau de démonstration. 5,3:1 sur son fond. |
| `--h-ambre-fond` | `#FBF1DF` | Le fond du bandeau de démonstration. |
| `--h-ambre-bord` | `#EBD9B4` | La bordure du bandeau de démonstration. |
| `--h-rouge` | `#B3261E` | Erreurs de formulaire, et rien d'autre. 6,5:1. |
| `--h-voile` | `rgba(11, 18, 32, 0.88)` | Le bandeau « Rupture de stock » posé sur la photo. |

**L'ambre est réservé à la démonstration.** Il n'est pas une couleur d'avertissement générique : quand le visiteur voit de l'ambre, cela veut dire « ceci n'est pas une vraie boutique » (cahier §8). Ne l'utiliser pour rien d'autre le rend reconnaissable.

---

## 3. Typographie

**Plus Jakarta Sans**, graisses 400 à 800, chargée par `next/font/google` et exposée en `--h-font` (STACK.md §4). Repli : `'Helvetica Neue', Helvetica, sans-serif`.

```css
--h-font: var(--font-jakarta), 'Helvetica Neue', Helvetica, sans-serif;
```

### L'échelle

| Jeton | Taille | Graisse | Interligne | Usage |
| --- | --- | --- | --- | --- |
| `--h-t-affiche` | 40 px | 800 | 1,05 | L'accroche du bandeau d'accueil. Une seule par site. |
| `--h-t-titre` | 32 px | 800 | 1,15 | Le titre d'un écran : « Panier », « Commande », le nom sur la fiche produit. |
| `--h-t-section` | 22 px | 800 | 1,3 | « Vous aimerez aussi », « Récapitulatif ». |
| `--h-t-sous-titre` | 20 px | 800 | 1,3 | Titres de bloc dans un formulaire. |
| `--h-t-prix` | 24 px | 800 | 1,3 | Le prix sur la fiche produit et le total du panier. |
| `--h-t-carte` | 17 px | 700 / 800 | 1,3 | Nom et prix sur une carte produit. |
| `--h-t-base` | 15 px | 400 / 600 | 1,6 | Le texte courant. La valeur par défaut du `body`. |
| `--h-t-petit` | 13 px | 600 / 700 | 1,5 | Libellés de formulaire, messages d'erreur, pied de page. |
| `--h-t-etiquette` | 12 px | 800 | 1,3 | Capitales espacées : catégories, « DÉMONSTRATION », en-têtes de caractéristiques. |

Trois graisses seulement : **600** pour la navigation et le texte semi-appuyé, **700** pour les noms et les libellés, **800** pour les titres, les prix et les boutons. Le 400 est réservé aux descriptions.

### Les capitales espacées

Le motif visuel signature du projet — catégorie sur la carte, libellé du bandeau de démonstration, en-tête de caractéristique :

```css
font-size: 12px; font-weight: 800;
letter-spacing: 0.1em; text-transform: uppercase;
```

L'espacement monte à `0.16em` sur le surtitre du bandeau d'accueil, seul endroit où il respire davantage.

### Les titres

`letter-spacing: -0.02em` à partir de 24 px, `-0.01em` entre 17 et 22 px. En dessous, aucun resserrement.

### Deux règles de texte non négociables

- `text-wrap: pretty` sur les titres et les descriptions : pas de mot seul en fin de paragraphe.
- `overflow-wrap: anywhere` sur les noms de produits. C'est le cas limite 10 du cahier : un nom très long passe à la ligne au lieu de déborder de sa carte.

---

## 4. Espacements, rayons, ombres

### L'échelle d'espacement

Cinq valeurs, pas plus. Tout espacement du projet en sort.

| Jeton | Valeur | Usage typique |
| --- | --- | --- |
| `--h-e1` | 8 px | Entre une étiquette et sa valeur. |
| `--h-e2` | 12 px | Padding de la barre du haut, écart entre éléments d'un même groupe. |
| `--h-e3` | 20 px | Padding d'une carte, gouttière de la grille, marge sous un titre de section. |
| `--h-e4` | 32 px | Padding du bandeau d'accueil, écart entre deux blocs d'un écran. |
| `--h-e5` | 48 px | Respiration avant une grande section, padding bas de la page. |

Les valeurs `4px`, `10px`, `14px` et `16px` apparaissent dans la maquette pour des ajustements internes (padding d'une carte produit, écart entre un logo et son nom). Elles restent admises **à l'intérieur d'un composant**, jamais pour structurer une page.

### Les rayons

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--h-r-s` | 14 px | Cartes, champs, boutons, blocs. La valeur par défaut. |
| `--h-r-l` | 22 px | Le bandeau d'accueil uniquement. |
| `--h-r-pill` | 99 px | Pastille du panier, badge « Nouveau », boutons de filtre. |

### Les ombres

| Jeton | Valeur | Quand |
| --- | --- | --- |
| `--h-ombre-repos` | `0 1px 2px rgba(11,18,32,0.04)` | Toute carte au repos. Quasi invisible, et c'est voulu. |
| `--h-ombre-survol` | `0 14px 30px rgba(11,18,32,0.12)` | Carte produit au survol, avec `translateY(-2px)`. |
| `--h-ombre-bleue` | `0 12px 26px rgba(12,36,132,0.28)` | Bouton principal au survol uniquement. |

**Aucune ombre au repos autre que `--h-ombre-repos`.** La profondeur apparaît quand on interagit, pas avant.

### Le mouvement

`transition: box-shadow .18s, transform .18s` sur les cartes, `background .18s, box-shadow .18s` sur les boutons. **C'est tout le mouvement du projet.** Aucune animation d'entrée, aucun défilement animé, aucun carrousel (STACK.md §12).

Respecter `prefers-reduced-motion: reduce` en ramenant ces durées à `0s`.

---

## 5. Mise en page

### Le gabarit

Largeur maximale **1240 px**, centrée, padding horizontal `--h-e3`. `main` prend `padding: var(--h-e4) var(--h-e3) var(--h-e5)`.

`html, body { overflow-x: hidden }` — filet de sécurité, pas une excuse : la page ne doit pas déborder à 390 px (cahier §7).

### La grille de produits

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
gap: var(--h-e3);
```

Cette seule règle produit tout le comportement attendu : cinq colonnes à 1240 px, deux colonnes vers 640 px, une seule à 390 px. **Ne pas la remplacer par des colonnes fixes par point de rupture.**

Les grilles de formulaire et de récapitulatif utilisent `repeat(auto-fit, minmax(300px, 1fr))`, les champs courts `minmax(180px, 1fr)`.

### Les points de rupture

Trois, imposés par STACK.md §3 : `640px`, `900px`, `1200px`, en `@media (min-width: …)`, conception mobile d'abord. Ils servent à :

- **640 px** — la barre du haut retrouve sa disposition sur une ligne ; le titre d'écran passe de 24 à 32 px.
- **900 px** — la fiche produit passe en deux colonnes (photo à gauche, informations à droite) ; le panier passe en deux colonnes (lignes à gauche, récapitulatif à droite).
- **1200 px** — rien de structurel, seulement le confort de la largeur maximale.

En dessous de 900 px, tout est en une colonne, dans l'ordre du document : la photo passe au-dessus des informations.

---

## 6. Les composants

### Barre du haut

Collante (`position: sticky; top: 0; z-index: 20`), fond `--h-surface`, bordure basse `--h-bord`. Logo 28 px + « H Store » en 18 px/800, les trois catégories en 15 px/600 `--h-gris` (bleu au survol), le champ de recherche qui prend la place restante, le bouton panier à droite.

Champ et bouton font **44 px de haut** — le minimum tactile du cahier §7. Au focus, le champ prend `border-color: var(--h-bleu)` et un fond `--h-surface`.

**La pastille du panier** : `min-width: 22px; height: 22px; border-radius: var(--h-r-pill)`, fond `--h-bleu`, texte blanc 12 px/800. Elle affiche la **somme des quantités** (cahier §4), et **rien du tout** tant que `localStorage` n'a pas été relu (STACK.md §6) — jamais `0`.

### Bandeau d'accueil

Le dégradé de marque, `border-radius: var(--h-r-l)`, `padding: var(--h-e4)`. À gauche : surtitre en capitales `--h-sur-degrade`, accroche en 40 px/800, une phrase de contexte, un bouton blanc à texte bleu. À droite : une photo produit sur fond blanc arrondi.

En dessous de 640 px la photo passe sous le texte, et l'accroche descend à 28 px.

### Carte produit

Fond `--h-surface`, bordure `--h-bord`, `--h-r-s`, `overflow: hidden`, `--h-ombre-repos`. Toute la carte est cliquable (cahier §5.1).

- **Photo** : `aspect-ratio: 1`, `object-fit: cover`, fond `--h-photo`.
- **Badge « Nouveau »** : en haut à gauche, 10 px des bords, fond `--h-cyan`, texte `--h-cyan-encre`, 11 px/800, capitales, `letter-spacing: 0.08em`, `--h-r-pill`.
- **Bandeau « Rupture de stock »** : en bas, 10 px des bords, fond `--h-voile`, texte blanc 12 px/800 en capitales, centré, rayon 10 px.
- **Texte** : `padding: var(--h-e2) 14px 16px`, écart de 4 px. Catégorie en capitales `--h-atten`, nom en 17 px/700 `--h-encre`, prix en 17 px/800 `--h-bleu`.
- **Survol** : `--h-ombre-survol` et `translateY(-2px)`.

Un produit en rupture reste cliquable et lisible, mais **n'est pas ajoutable** (cahier §9, cas 4).

### Filtres de catégorie

Boutons `--h-r-pill`, hauteur 40 px. Au repos : fond `--h-surface`, bordure `--h-bord`, texte `--h-gris`. Actif : fond `--h-bleu`, texte blanc, pas de bordure — et il affiche **son compte** (« Tout · 10 »), comme l'exige le cahier §5.1.

### Boutons

| Type | Spécification |
| --- | --- |
| **Principal** | Hauteur 56 px, `--h-r-s`, fond `--h-bleu`, texte blanc 16 px/800, sans bordure. Survol : `--h-bleu-fonce` + `--h-ombre-bleue`. Pleine largeur sur la fiche produit et dans le récapitulatif. |
| **Désactivé** | Même gabarit, fond `--h-photo`, bordure `--h-bord`, texte `--h-atten`, `cursor: not-allowed`. Utilisé pour un produit en rupture. |
| **Secondaire** | Hauteur 44 px, fond `--h-surface`, bordure `--h-bord`, texte `--h-encre` 15 px/700. Survol : bordure et texte en `--h-bleu`. |
| **Lien** | Texte seul en `--h-bleu` 15 px/700. « ← Retour à la boutique », « ← Continuer mes achats ». |

Tout élément cliquable fait **au moins 44 px de haut** (cahier §7).

### Sélecteur de quantité

Groupe de 44 px de haut, bordure `--h-bord`, `--h-r-s` : `−`, la valeur au centre en 15 px/700, `+`. Bornes **1 à 10** ; à 0 la ligne disparaît (cahier §4). Les deux boutons portent un `aria-label` explicite (« Diminuer la quantité »), pas seulement le signe.

### Champs de formulaire

Hauteur 48 px, fond `--h-fond`, bordure `--h-bord`, `--h-r-s`, padding horizontal 14 px, texte 15 px. Au focus : `border-color: var(--h-bleu)` et fond `--h-surface`.

Le libellé est au-dessus, en 13 px/700 `--h-gris`, avec un `*` pour l'obligatoire. **Le message d'erreur se place sous le champ concerné**, en 13 px/600 `--h-rouge`, formulé en français clair — jamais un code, jamais « invalid input ».

### Pastille de disponibilité

`--h-r-pill`, fond `--h-vert-fond`, texte `--h-vert` 12 px/800 en capitales : « EN STOCK ». Pour une rupture, fond `--h-photo` et texte `--h-gris`.

### Bandeau de démonstration

**Le composant le plus important du projet** (cahier §8).

Fond `--h-ambre-fond`, bordure `--h-ambre-bord`, `--h-r-s`, `padding: 16px var(--h-e3)`. Un surtitre « DÉMONSTRATION » en capitales `--h-ambre`, puis la phrase en 15 px/1,6 `--h-encre`.

Il est placé **en premier élément de `main`** sur les pages Commande et Confirmation, pour être visible sans défiler, y compris à 390 px. `role="note"`.

### Pied de page

Fond `--h-surface`, bordure haute `--h-bord`. À gauche : la ligne de copyright en 13 px `--h-atten`, **et en dessous la mention de démonstration permanente** en 13 px/700 `--h-ambre`. À droite : les liens secondaires en 13 px/600 `--h-gris`.

> Les trois planches PNG ne montrent pas cette seconde ligne : elles ont été rendues avant son ajout. **Le code de la maquette fait foi, la mention est obligatoire sur toutes les pages.**

### États vides

Bloc centré : une phrase en 17 px/700 `--h-encre`, une explication en 15 px `--h-gris`, un bouton principal vers la boutique. Jamais une page nue (cahier §9, cas 1 et 7).

---

## 7. Les images

Format carré, `object-fit: cover`, fond `--h-photo` pendant le chargement. `next/image` uniquement, sources dans `public/produits/` exclusivement (STACK.md §5).

`priority` sur la seule photo de la fiche produit. Toutes les autres se chargent paresseusement.

**Le `alt` décrit le produit** — « Hoodie Atelier H bleu nuit, logo H sérigraphié » — jamais « image », jamais « photo », jamais vide. Le logo de la barre du haut est décoratif : `alt=""`, le nom « H Store » étant déjà lu à côté.

> **Point ouvert** : les photos livrées font 640 × 640 (sauf `hoodie-lg.jpg`, 960 × 960) alors que STACK.md §5 impose `width={900} height={900}`. À trancher avant d'écrire `CarteProduit` — voir `PLAN.md` §0.

---

## 8. Accessibilité

Ce ne sont pas des options.

- **Contraste** : 4,5:1 pour tout texte porteur d'information. `--h-atten` est décoratif et ne sert qu'à des libellés qui doublent une information déjà présente.
- **Focus visible partout** : contour `2px` `--h-bleu` avec `2px` de décalage. Ne jamais écrire `outline: none` sans mettre autre chose à la place — la maquette le fait sur les champs, mais elle le compense par un changement de bordure et de fond.
- **Cibles tactiles** d'au moins 44 × 44 px.
- **Un seul `h1` par page**, hiérarchie de titres respectée.
- Le prix formaté (`29,00 €`) est lisible tel quel par un lecteur d'écran ; ne pas le découper en éléments séparés.
- Une couleur ne porte jamais seule une information : la rupture de stock est écrite, l'erreur de formulaire est écrite, le franco de port est écrit.

---

## 9. Ce que le design s'interdit

- Aucune valeur en dur dans un composant : ni couleur, ni taille de police, ni espacement, ni rayon. Tout vient de `tokens.css` (STACK.md §3). Seules exceptions : les points de rupture des `@media` et les `1px` de bordure.
- Aucun second dégradé, aucune seconde famille de police, aucune icône chargée depuis un domaine tiers.
- Aucune animation d'apparition, aucun carrousel, aucun défilement détourné.
- Aucun élément visuel qui presse à l'achat : pas de compte à rebours, pas de compteur de stock fabriqué, pas de bandeau d'urgence (cahier §8).
- Aucun logo de moyen de paiement, sous aucune forme, même en niveaux de gris, même en pied de page.
