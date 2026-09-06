# ATELIER SITE H

Projet **H Store** — la boutique en ligne de démonstration des produits dérivés de la marque H.
Projet autonome, sans lien avec ATELIER SA CRM.

## Documents de référence

| Fichier | Rôle | Source |
| --- | --- | --- |
| [CAHIER-DES-CHARGES.md](CAHIER-DES-CHARGES.md) | Le *quoi* : produit, périmètre, données, règles de gestion, écrans, cas limites, définition de terminé | [Google Docs](https://docs.google.com/document/d/1Z-mHD7ECM5Hc2kV8D0Jxu50hb82V1HzC3v9U8nVy1ts/edit) |
| [STACK.md](STACK.md) | Le *comment* : socle technique, styles, état, arborescence, déploiement, interdits | [Google Docs](https://docs.google.com/document/d/1Qw5VAyLsmRmcoJoN58fhKpIlU4wbReEgrtczGw5oB7Y/edit) |
| [DESIGN.md](DESIGN.md) | L'intention visuelle et les valeurs exactes de `tokens.css` | Relevé dans la maquette livrée |
| [CLAUDE.md](CLAUDE.md) | Les règles permanentes de travail | — |
| [PLAN.md](PLAN.md) | L'ordre des lots et les vérifications de sortie | — |
| [maquette/ECARTS.md](maquette/ECARTS.md) | Les écarts cahier ↔ maquette, et les décisions prises | — |

## Rappel qui prime sur tout

Chapitre 8 du cahier des charges : **aucun champ de paiement**, sous aucune forme, même désactivé
ou grisé. La mention de démonstration doit être visible sans défiler sur les pages Commande
et Confirmation.

## Adresses

| | |
| --- | --- |
| Dépôt | https://github.com/AGACIH/workshop2 |
| Projet Vercel | https://vercel.com/agaci-test/workshop2-lf1x |
| **Production** | **https://workshop2-lf1x.vercel.app** |

> Le premier projet Vercel (`workshop2`) avait été importé avant que le socle Next.js n'existe :
> il ne servait aucune page. Il a été remplacé par `workshop2-lf1x`, qui déploie correctement.
> **Le premier projet est à supprimer** tant qu'il reste relié au dépôt, sinon chaque publication
> déclenche deux constructions.
>
> L'adresse publique est celle **sans suffixe d'équipe**. La variante
> `workshop2-lf1x-agaci-test.vercel.app` reste protégée par la connexion Vercel : ne pas la
> communiquer comme adresse de production.
>
> `workshop2.vercel.app` appartient à un autre compte Vercel, sans rapport avec ce projet.

## Socle installé

| | |
| --- | --- |
| Next.js | **16.3.4** (App Router, Turbopack) |
| React | 19.2.8 |
| TypeScript | 5, mode strict |
| Node | `.nvmrc` fixe **22** pour le déploiement, conformément au §2 de STACK.md |

Installé avec la commande du §2 de STACK.md. Elle a été exécutée dans un dossier de travail puis
recopiée ici, parce que `create-next-app` refuse de s'installer dans un dossier contenant déjà des
fichiers autres que `README.md`, `.gitignore` et `docs/`. Le résultat est identique.

`package-lock.json` est versionné.

## Commandes

```bash
npm run dev        # développement
npm run verifier   # contrôle d'intégrité du catalogue — aucun signalement attendu
npm run lint       # doit passer sans avertissement
npm run build      # vérification technique — doit passer sans erreur
```

## État

**Lot 0 terminé** : les cinq écarts entre le cahier et la maquette sont tranchés
(voir `maquette/ECARTS.md`), le cahier est passé en version 1.1, `DESIGN.md` et `CLAUDE.md` sont
écrits, le dépôt est ouvert, le socle Next.js est en place et `npm run build` passe.

**Lot 1 terminé** : `tokens.css`, Plus Jakarta Sans par `next/font/google`, les onze photos dans
`public/produits/`, le catalogue en TypeScript (prix en centimes), `lib/format.ts`, le script de
contrôle, la barre du haut, le pied de page, la vitrine, les filtres et la recherche.

**Lot 2 terminé** : la boutique est en ligne et publique. Vérifié sur l'adresse de production le
6 septembre 2026 — **les dix photos s'affichent**, le logo et la photo du bandeau aussi (12 images
sur 12, aucun échec), les filtres et la recherche répondent, aucun défilement latéral.

**Lots 3 et 4 terminés, ensemble** : fiche produit, produits similaires, et le panier complet —
ajout, quantités, totaux, franco de port, persistance dans le navigateur, état vide.

Les deux lots ont été faits d'un coup parce que le cahier §5.2 demande une confirmation visible et
un panier mis à jour après l'ajout : livrer un bouton « Ajouter au panier » qui ne fait rien aurait
été exactement le genre de chose que le chapitre 8 interdit.

**Lot 5 terminé** : commande et confirmation, avec les garde-fous du chapitre 8. Bandeau de
démonstration visible sans défiler sur les deux pages, formulaire d'adresse validé en français,
numéro de commande tiré au hasard, panier vidé après la confirmation.

**Aucun champ de paiement n'existe dans le projet.** Le seul `<input>` en dehors des sept champs
d'adresse est la recherche de la barre du haut.

**Lot 6 terminé** : passe finale. Toutes les valeurs de taille qui restaient en dur dans les
composants sont passées dans `tokens.css`, le champ de recherche réaffiche le terme cherché, et les
dix cas limites du chapitre 9 ont été rejoués un par un.

## Livraison

Les six lots sont fusionnés dans `main` et en production. La définition de terminé du chapitre 10 du
cahier des charges a été passée point par point sur **l'adresse de production**, le 6 septembre 2026 :

- `npm run build`, `npm run lint` et `npm run verifier` passent sans rien signaler.
- Les cinq écrans répondent, plus la page introuvable qui renvoie bien un 404.
- **Les dix photos s'affichent en ligne**, vérifiées une par une.
- Filtres, recherche et effacement de la recherche fonctionnent en production.
- Deux produits ajoutés puis page rechargée : le panier est intact.
- Modifier une quantité met à jour la ligne, le total et la pastille.
- Au-dessus de 50 € de sous-total, la livraison passe à « Offerte ».
- Commande passée en production : confirmation `H-2026-5796`, 65,00 €, adresse affichée, **panier
  vidé**.
- Une recherche du mot « carte » dans tout le projet ne trouve **aucun champ de saisie de carte
  bancaire**. Le site compte huit champs : la recherche et les sept champs d'adresse.
- La mention de démonstration est visible sans défiler sur la commande et la confirmation, à 1280 px
  comme à 390 px.
- Les dix cas limites du chapitre 9 sont traités.
- À 390 px, aucune page ne défile latéralement.
- Aucune couleur, taille ou espacement en dur : tout vient de `tokens.css`.
- Aucune image en dehors de `public/produits/`, aucun domaine tiers.
- Trois dépendances : `next`, `react`, `react-dom`. Aucune n'a été ajoutée en cours de route.

> Note : Node 25.2.1 est installé sur le poste alors que STACK.md impose Node 22. Le `.nvmrc`
> aligne le déploiement sur 22 ; installer Node 22 en local reste à faire pour être aligné des
> deux côtés.
