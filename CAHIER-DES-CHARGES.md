# H Store — cahier des charges

Version 1.1 · Document de référence du projet. Les règles permanentes de travail sont dans CLAUDE.md.

> Source : Google Docs `1Z-mHD7ECM5Hc2kV8D0Jxu50hb82V1HzC3v9U8nVy1ts` — importé le 6 septembre 2026.
>
> **Version 1.1 — 6 septembre 2026.** Le chapitre 3 est aligné sur la maquette livrée : identifiants,
> noms, catégories, prix et noms de fichiers photo. Motif : les textes, les prix et les onze photos
> existent déjà et sont cohérents entre eux ; les réécrire pour retrouver les valeurs de la version 1.0
> aurait été du travail perdu. Les arbitrages sont consignés dans `maquette/ECARTS.md`.

## 1. Le produit

**H Store est la boutique en ligne des produits dérivés de la marque H.** Dix articles, du sticker à 8 € au hoodie à 65 €.

**Visiteur type** : quelqu'un qui a croisé la marque et arrive sur la boutique sans intention précise. Il regarde, se laisse tenter par un ou deux articles, et commande. Il n'a pas de compte et n'en veut pas.

**Ce que le produit doit lui permettre de faire :**

- comprendre en un coup d'œil ce que vend la boutique ;
- parcourir le catalogue et le filtrer par catégorie ;
- voir un produit en détail, avec assez d'informations pour se décider ;
- constituer un panier, le modifier, et le retrouver s'il revient plus tard ;
- passer commande sans créer de compte.

**Un contraste assumé avec un outil de gestion :** ici le produit est la vedette. Les photos sont grandes, l'interface est discrète, l'espace vide est un choix. DESIGN.md détaille cette intention.

## 2. Périmètre

### Dans le périmètre

Cinq écrans : Vitrine, Fiche produit, Panier, Commande, Confirmation. Un panier conservé dans le navigateur. Une commande de démonstration.

### Hors périmètre — explicitement

- **Tout paiement.** Voir le chapitre 8 : ce n'est pas une simplification, c'est une interdiction.
- Comptes utilisateurs, connexion, historique de commandes.
- Base de données, serveur, back-office, gestion de stock réelle.
- Envoi d'emails, suivi de livraison, facturation.
- Codes promotionnels, parrainage, programme de fidélité.
- Multilingue, multidevise.

### Ce qui est simulé, et assumé comme tel

La commande ne part nulle part : elle affiche une confirmation avec un numéro inventé, et vide le panier. **Le visiteur doit le comprendre sans avoir à le deviner** — voir le chapitre 8.

## 3. Les données

### Le catalogue

Un fichier de données. Textes en français, crédibles, ton sobre de boutique de marque. **Jamais de « Lorem ipsum », jamais de « Produit 1 ».**

Chaque produit :

```
id · nom · catégorie · prix (€) · description (2 à 3 phrases) ·
caractéristiques[] (exactement 3) · photo · nouveaute (oui/non) · enStock (oui/non)
```

Les trois caractéristiques suivent le même ordre partout : **matière**, **dimensions ou taille**, **couleur**.

### Les dix produits — identifiants et fichiers figés

Valeurs de la maquette livrée, arrêtées le 6 septembre 2026. **Elles ne se rediscutent plus.**

| id | Nom | Catégorie | Prix | Photo |
| --- | --- | --- | --- | --- |
| tshirt-signature | T-shirt Signature | Textile | 29,00 € | produits/tshirt.jpg |
| hoodie-atelier | Hoodie Atelier H | Textile | 65,00 € | produits/hoodie.jpg |
| casquette-brodee | Casquette brodée | Accessoires | 24,00 € | produits/cap.jpg |
| mug-ceramique | Mug céramique | Bureau | 14,00 € | produits/mug.jpg |
| tote-bag-toile | Tote bag toile | Accessoires | 18,00 € | produits/tote.jpg |
| gourde-inox | Gourde inox 500 ml | Accessoires | 32,00 € | produits/bottle.jpg |
| housse-14-pouces | Housse 14 pouces | Bureau | 45,00 € | produits/sleeve.jpg |
| carnet-bleu-nuit | Carnet bleu nuit | Bureau | 22,00 € | produits/notebook.jpg |
| coque-silicone | Coque silicone | Accessoires | 19,00 € | produits/phonecase.jpg |
| planche-stickers | Planche de stickers | Bureau | 8,00 € | produits/stickers.jpg |

Répartition : Textile 2, Bureau 4, Accessoires 4 — chaque catégorie a bien au moins deux produits.

Les noms de fichiers photo sont ceux livrés avec la maquette : ils restent tels quels, y compris
`cap.jpg`, `bottle.jpg`, `sleeve.jpg`, `notebook.jpg` et `phonecase.jpg`. Deux fichiers s'ajoutent
aux dix photos : `hoodie-lg.jpg` (960 px, pour la fiche produit) et `logo-h.png`.

`nouveaute = oui` sur **`hoodie-atelier`** et **`planche-stickers`**. `enStock = non` sur
**`gourde-inox`** : c'est un cas limite volontaire, il doit exister dans le jeu de données.

### Le panier

Une liste de lignes `{ produitId, quantité }`, conservée dans le navigateur.

**Ce que cela implique, et qu'il faut assumer :** le panier appartient à *un navigateur sur un appareil*. Il ne suit pas le visiteur sur son téléphone, ce n'est pas un compte, et il disparaît s'il efface ses données. Ce n'est pas un défaut à masquer.

### Règles d'intégrité — à vérifier par un script

Écrire un petit script de contrôle, l'exécuter, corriger ce qu'il signale :

1. Les dix `id` sont uniques et correspondent au tableau ci-dessus.
2. Le fichier photo de chaque produit existe réellement dans `produits/`.
3. Chaque produit a exactement trois caractéristiques.
4. Chaque catégorie contient au moins deux produits.
5. Exactement un produit a `enStock = non`.
6. Aucune description vide, aucune description de moins de 80 caractères.

## 4. Règles de gestion

Les montants sont **toujours calculés**. Aucun total écrit en dur.

| Élément | Calcul |
| --- | --- |
| **Sous-total** | Somme de prix × quantité de chaque ligne. |
| **Livraison** | 4,90 €, **offerte à partir de 50 €** de sous-total. |
| **Total** | Sous-total + livraison. |
| **Pastille du panier** | Somme des quantités, pas le nombre de lignes. |

### Quantités

- Une ligne est comprise entre **1 et 10**.
- Descendre à 0 **retire la ligne**, avec une confirmation implicite : la ligne disparaît et le total se met à jour immédiatement.
- Ajouter un produit déjà présent **incrémente sa ligne**, il ne crée pas de doublon.

### Formats

- Prix : `29,00 €` — deux décimales, virgule, espace insécable avant €.
- Un prix barré prend la couleur d'atténuation, le nouveau prix la couleur de promotion.
- Numéro de commande : `H-2026-4821`, quatre chiffres tirés au hasard.

### Franco de port

Quand le sous-total est en dessous de 50 €, le panier indique combien il manque pour que la livraison soit offerte : *« Plus que 12,00 € pour la livraison offerte. »* Le montant est calculé, jamais approximatif.

## 5. Les écrans

Structure commune : barre du haut collante avec le logo H, les catégories, la recherche et l'icône panier avec sa pastille. Le détail visuel est dans DESIGN.md.

### 5.1 Vitrine

- Un bandeau d'accueil avec le dégradé de marque et une phrase d'accroche.
- Des filtres par catégorie : Tout, Textile, Bureau, Accessoires. Le filtre actif est visible, et le nombre de produits affichés l'est aussi.
- La grille des produits : photo carrée, catégorie en capitales, nom, prix. Badge « Nouveau » sur les deux produits concernés. Le produit en rupture affiche « Rupture de stock » et n'est pas ajoutable.
- Toute la carte est cliquable et mène à la fiche.
- Un pied de page sobre, avec la mention de démonstration.

### 5.2 Fiche produit

- Deux colonnes sur ordinateur : la photo à gauche, les informations à droite. Sur téléphone, la photo passe au-dessus.
- Fil d'ariane, nom, catégorie, prix, disponibilité.
- Description, puis les trois caractéristiques présentées lisiblement.
- Un sélecteur de quantité et un bouton **Ajouter au panier** pleine largeur. Après l'ajout, une confirmation visible et le panier mis à jour.
- Quatre produits similaires en bas — de la même catégorie si possible.
- Un chemin de retour vers la boutique.

### 5.3 Panier

- Une ligne par produit : vignette, nom, prix unitaire, sélecteur de quantité, prix de la ligne, bouton pour retirer.
- Un récapitulatif : sous-total, livraison, total, message franco de port.
- Bouton **Passer commande**.
- Panier vide : une phrase claire et un bouton vers la boutique.

### 5.4 Commande

- Un bandeau de démonstration, visible sans défilement (chapitre 8).
- Un formulaire : nom, prénom, email, adresse, code postal, ville, pays. Champs obligatoires signalés, erreurs de saisie explicites en français.
- Le récapitulatif de la commande, avec le total.
- Bouton **Confirmer la commande**.
- **Aucun champ de paiement, sous aucune forme.**

### 5.5 Confirmation

- Le numéro de commande, le récapitulatif, l'adresse de livraison.
- Une phrase sans ambiguïté : *« Ceci est une démonstration. Aucune commande n'a été enregistrée et aucun paiement n'a été demandé. »*
- Le panier est vidé.
- Un bouton pour retourner à la boutique.

### 5.6 Page introuvable

Une adresse de produit inexistante affiche une page claire, avec un retour vers la boutique. Jamais une erreur brute.

## 6. Recherche

La recherche de la barre du haut porte sur le nom, la catégorie et la description des produits. Résultats affichés dans la grille de la vitrine, avec le nombre de résultats et un moyen d'effacer la recherche. État « aucun résultat » explicite.

## 7. Comportement sur téléphone

Le produit doit rester utilisable sur un écran de 390 px :

- la grille passe à une ou deux colonnes ;
- la barre du haut se réduit, le panier reste accessible en permanence ;
- **la page ne défile jamais latéralement** ;
- le panier et la commande se lisent sans zoomer ;
- les boutons principaux font au moins 44 px de haut.

## 8. Ce qu'on ne truque pas

**Ce chapitre prime sur tous les autres.** Si une demande le contredit, elle n'est pas exécutée : elle est signalée, et une version honnête est proposée.

### Le paiement

Un agent est capable de produire en deux minutes un formulaire de paiement parfaitement crédible. Mis en ligne à une adresse publique, **un visiteur peut y saisir un vrai numéro de carte.** La boutique deviendrait un site d'hameçonnage sans que personne ne l'ait voulu.

En conséquence, et sans exception :

- **aucun champ de carte bancaire** — ni numéro, ni date d'expiration, ni cryptogramme, même désactivé, même grisé, même présenté comme un exemple ;
- **aucun logo de moyen de paiement**, aucune mention d'un prestataire ;
- **aucun bouton laissant croire qu'un paiement a lieu.**

### La démonstration doit se voir

- Un bandeau visible **sans défiler** sur la page Commande et sur la page Confirmation.
- Une mention permanente dans le pied de page de toutes les pages.
- La confirmation dit explicitement qu'aucun paiement n'a été demandé.

### Le reste

- Pas d'avis clients inventés présentés comme réels. Des avis d'exemple sont possibles s'ils sont **visiblement signalés** comme tels sur la page.
- Pas de faux compteur de stock, pas de compte à rebours, pas de « plus que 2 disponibles ! » fabriqué pour presser l'acheteur.
- La seule information de stock est le champ `enStock` du catalogue.

## 9. Cas limites à traiter

Ce sont eux qui cassent en démonstration.

1. **Panier vide** — message clair et bouton de sortie, jamais une page nue.
2. **Une seule ligne dans le panier** — la mise en page tient.
3. **Quantité ramenée à 0** — la ligne disparaît, le total se recalcule, et si c'était la dernière ligne, l'état vide s'affiche.
4. **Produit en rupture** — visible en vitrine et sur sa fiche, mais pas ajoutable au panier.
5. **Adresse de produit inexistante** — page introuvable propre.
6. **Panier restauré contenant un produit qui n'existe plus** au catalogue — la ligne est ignorée sans faire planter la page.
7. **Recherche ou filtre sans résultat** — message clair et moyen d'en sortir.
8. **Sous-total franchissant les 50 €** — la livraison passe à « offerte » et le message franco de port disparaît, immédiatement.
9. **Formulaire de commande incomplet** — erreurs en français, à côté des champs concernés, et la commande ne part pas.
10. **Nom de produit très long** — il passe à la ligne sans déborder de sa carte.

## 10. Définition de terminé

Le projet est livré quand **chacun** de ces points est vérifié, en le faisant réellement :

- La vérification technique (build) passe sans erreur.
- Les cinq écrans répondent, plus la page introuvable.
- Le script de contrôle du catalogue passe sans signalement.
- **Les dix photos s'affichent en ligne**, pas seulement en local.
- Les filtres par catégorie fonctionnent, et la recherche aussi.
- **J'ajoute deux produits, je recharge la page, ils sont toujours là avec les bonnes quantités.**
- Modifier une quantité met à jour la ligne, le total et la pastille.
- Passer le sous-total au-dessus de 50 € rend la livraison offerte.
- La commande aboutit à une confirmation, et le panier est vidé.
- **Une recherche du mot « carte » dans tout le projet ne trouve aucun champ de saisie de carte bancaire.**
- La mention de démonstration est visible sur la commande et la confirmation, sans avoir à défiler.
- Les dix cas limites du chapitre 9 sont traités.
- À 390 px de large, aucune page ne défile latéralement.
- Aucune couleur, taille ou espacement en dur : tout vient de tokens.css.
- Aucune image venue d'ailleurs que `produits/`.
- Aucune dépendance ajoutée sans accord.

## 11. Livraison

- Dépôt GitHub, branche `main` déployable en permanence.
- Une branche par lot de travail, une demande de publication par branche, avec un résumé en français simple.
- Déploiement Vercel connecté au dépôt : chaque publication sur `main` met la production à jour.
- Livrable final : **l'adresse du dépôt et l'adresse de production**.

## 12. Ordre de construction suggéré

Chaque lot est publiable et vérifiable seul. En cas de temps limité, les lots 1 à 3 forment une boutique démontrable.

| Lot | Contenu |
| --- | --- |
| 1 | Socle, charte, photos, catalogue, script de contrôle, barre du haut, vitrine, filtres |
| 2 | Mise en ligne Vercel — **vérifier les photos en production** |
| 3 | Fiche produit et produits similaires |
| 4 | Panier : ajout, quantités, totaux, persistance, état vide |
| 5 | Commande et confirmation, avec les garde-fous du chapitre 8 |
| 6 | Recherche, page introuvable, passe responsive, cas limites |
