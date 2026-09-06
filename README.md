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
| Production | *à renseigner au lot 2* |

## État

**Lot 0 terminé** : les cinq écarts entre le cahier et la maquette sont tranchés
(voir `maquette/ECARTS.md`), le cahier est passé en version 1.1, `DESIGN.md` et `CLAUDE.md` sont
écrits, le dépôt est ouvert.

**Prochaine étape — lot 1** : initialisation Next.js, `tokens.css`, catalogue TypeScript,
script de contrôle, barre du haut, vitrine et filtres. Commande exacte au §2 de STACK.md.

L'application Next.js n'est pas encore initialisée. La version de Next.js installée sera notée ici.
