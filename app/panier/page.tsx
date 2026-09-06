import ContenuPanier from "@/components/ContenuPanier";

/**
 * Le panier (cahier §5.3).
 *
 * La page reste un composant serveur : tout ce qui dépend de l'état du panier
 * vit dans ContenuPanier, qui est le seul à avoir besoin du navigateur.
 */
export const metadata = { title: "Votre panier — H Store" };

export default function Panier() {
  return (
    <main>
      <ContenuPanier />
    </main>
  );
}
