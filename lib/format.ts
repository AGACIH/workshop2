/**
 * Le seul endroit du projet où un montant devient du texte (STACK.md §8).
 * Aucun composant ne formate un prix lui-même.
 */

const FORMAT_EURO = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

/**
 * Formate un montant **en centimes** : formaterPrix(2900) → « 29,00 € ».
 * L'espace avant l'euro est une espace insécable, comme l'exige le cahier §4.
 */
export function formaterPrix(centimes: number): string {
  return FORMAT_EURO.format(centimes / 100);
}
