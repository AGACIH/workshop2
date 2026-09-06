import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/tokens.css";
import "./globals.css";

/**
 * La police est servie depuis le domaine du site : elle fonctionne même si
 * l'accès aux services externes est restreint (STACK.md §4).
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "H Store — boutique de démonstration",
  description:
    "Les produits dérivés de la marque H : dix objets, du sticker au hoodie. Boutique de démonstration, aucune commande n'est enregistrée.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
