import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // La maquette livrée est de la documentation de référence, pas du code du projet :
    // elle n'est ni modifiée ni déployée, et son JavaScript d'origine n'a pas à passer
    // les règles de ce dépôt. Voir maquette/livraison/LISEZ-MOI.txt.
    "maquette/**",
  ]),
]);

export default eslintConfig;
