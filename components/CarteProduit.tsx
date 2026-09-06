import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/Badge";
import { formaterPrix } from "@/lib/format";
import type { Produit } from "@/lib/types";
import styles from "./CarteProduit.module.css";

/**
 * Une carte de la grille. Toute la carte est cliquable et mène à la fiche (cahier §5.1).
 *
 * Les photos livrées font 640 × 640 : c'est la taille déclarée ici, plutôt que
 * les 900 de STACK.md §5, pour ne pas demander au navigateur d'agrandir une
 * source qui n'existe pas. Écart consigné dans maquette/ECARTS.md.
 */
export default function CarteProduit({ produit }: { produit: Produit }) {
  return (
    <Link href={`/produit/${produit.id}`} className={styles.carte}>
      <div className={styles.cadre}>
        <Image
          src={produit.photo}
          alt={produit.photoAlt}
          width={640}
          height={640}
          sizes="(min-width: 900px) 300px, (min-width: 640px) 50vw, 100vw"
          className={styles.photo}
        />
        {produit.nouveaute && (
          <span className={styles.marqueur}>
            <Badge variante="nouveau">Nouveau</Badge>
          </span>
        )}
        {!produit.enStock && <p className={styles.rupture}>Rupture de stock</p>}
      </div>

      <div className={styles.texte}>
        <p className={styles.categorie}>{produit.categorie}</p>
        <h3 className={styles.nom}>{produit.nom}</h3>
        <p className={styles.prix}>{formaterPrix(produit.prix)}</p>
      </div>
    </Link>
  );
}
