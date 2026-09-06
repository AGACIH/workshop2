// Contrôle d'intégrité du catalogue — chapitre 3 du cahier des charges.
// Exécution : dans le dossier du projet, `node controle-catalogue.js`.
const fs = require('fs');
const path = require('path');

const ATTENDUS = [
  'tshirt-signature', 'hoodie-atelier', 'casquette-brodee', 'mug-ceramique', 'tote-bag-toile',
  'gourde-inox', 'housse-14-pouces', 'coque-silicone', 'carnet-bleu-nuit', 'planche-stickers'
];

const produits = JSON.parse(fs.readFileSync(path.join(__dirname, 'catalogue.json'), 'utf8')).produits;
const signalements = [];
const ids = produits.map((p) => p.id);

if (produits.length !== 10) signalements.push('R1 : ' + produits.length + ' produits au lieu de 10');
if (new Set(ids).size !== ids.length) signalements.push('R1 : identifiants dupliqués');
ATTENDUS.forEach((id) => { if (!ids.includes(id)) signalements.push('R1 : identifiant manquant — ' + id); });

produits.forEach((p) => {
  if (!fs.existsSync(path.join(__dirname, p.photo))) signalements.push('R2 : photo introuvable — ' + p.photo);
  if (!Array.isArray(p.caracteristiques) || p.caracteristiques.length !== 3) signalements.push('R3 : ' + p.id + ' n\'a pas exactement trois caractéristiques');
  if (!p.description || p.description.length < 80) signalements.push('R6 : description absente ou trop courte — ' + p.id);
});

['Textile', 'Bureau', 'Accessoires'].forEach((c) => {
  const n = produits.filter((p) => p.categorie === c).length;
  if (n < 2) signalements.push('R4 : la catégorie ' + c + ' ne contient que ' + n + ' produit(s)');
});

const nouveautes = produits.filter((p) => p.nouveaute === true).length;
if (nouveautes !== 2) signalements.push('R5 : ' + nouveautes + ' nouveauté(s) au lieu de 2');

const ruptures = produits.filter((p) => p.enStock === false).length;
if (ruptures !== 1) signalements.push('R5 : ' + ruptures + ' produit(s) en rupture au lieu d\'un seul');

if (signalements.length) {
  console.error('Signalements :\n- ' + signalements.join('\n- '));
  process.exit(1);
}
console.log('Catalogue conforme : 10 produits, ' + nouveautes + ' nouveautés, ' + ruptures + ' rupture, photos présentes.');
