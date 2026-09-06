import EtatVide from "@/components/EtatVide";

/**
 * Page introuvable (cahier §5.6) : une adresse inexistante donne une page
 * claire avec un retour vers la boutique, jamais une erreur brute.
 */
export default function PageIntrouvable() {
  return (
    <main>
      <EtatVide
        commeTitre
        titre="Cette page n'existe pas"
        explication="Le produit a peut-être changé d'adresse, ou le lien est incomplet. Le catalogue complet reste accessible."
      />
    </main>
  );
}
