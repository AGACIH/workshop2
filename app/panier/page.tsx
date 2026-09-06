import EtatVide from "@/components/EtatVide";

/**
 * Le panier — état vide seulement, pour l'instant.
 *
 * Le panier lui-même (ajout, quantités, totaux, persistance) est le lot 4.
 * Cette page existe dès le lot 1 pour que le bouton panier de la barre du haut
 * mène quelque part : il est accessible en permanence (cahier §7), et un lien
 * qui tombe sur une page introuvable serait un défaut visible.
 */
export default function Panier() {
  return (
    <main>
      <EtatVide
        commeTitre
        titre="Votre panier est vide"
        explication="Parcourez le catalogue et ajoutez un produit : il restera dans ce navigateur si vous revenez plus tard."
        libelleLien="Voir le catalogue"
      />
    </main>
  );
}
