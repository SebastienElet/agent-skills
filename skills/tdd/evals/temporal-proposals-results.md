# Dates et propositions : état de l'évaluation

## Résultat observé

Comparaison sans/avec instruction **non exécutée en vraie session**. Aucun contexte frais
base ou candidat n'a été lancé pour cette évaluation ; aucun mini-dépôt n'a été construit ni
exécuté. Aucun échec de base, succès candidat, témoin négatif ou taux d'activation n'est observé.
Le critère « échoue sans l'instruction et passe avec » reste non démontré.

Export tardif, jours limites, proposition validée et table canonique des pays : ces comportements sont spécifiés dans le scénario, pas observés.
L'auteur a confronté les ajouts aux règles existantes et au texte fourni des leçons. Cette
inspection ne démontre pas un changement de comportement des agents. Les contrôles du dépôt
portent sur le format, les outils exécutables existants et la santé des skills, pas sur cette
fixture. Une éventuelle revue indépendante du diff ne remplace pas la comparaison en session.

## Liaison des entrées

Base locale `origin/main` : `3262df60b7b9b01537494f2c74db65cf85b7b79a`. Le candidat est lié aux octets
finaux par SHA-256, sans prétendre à leur exécution. Chemins relatifs à `skills/`.

| Entrée                                       | SHA-256 base                                                       | SHA-256 candidat                                                   |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `tdd/SKILL.md`                               | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/tests.md`                    | `984bfa4bd1fdaeaa296cc509a786d012d404668e71495c00a51a8ec12369996c` | `7a504dfd8c1abfe86114cd7dd2f98bde3c896dc76af59c61c4c90b77acc30dc9` |
| `tdd/references/dependencies.md`             | `6db8ae3de4c3b6f2ec8e2e03ed8f3417207987b6a3b75c7d7f0c8420b51c7f8e` | `dcaa2beb1aa80fe591dc12f52d3c415831a012708bbff4a088c7bdb55d91c3f4` |
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `80762ed9777d428e0d439ce6659cea961b3f83ef553dbfd734439d9549f2d608` | `f4a8a4f6fcbacc942101e2bf74df85ee318fb0a0c6d289f35fc218aa18163abf` |
| `tdd/evals/temporal-proposals.md`            | Nouveau scénario identique pour les deux sessions                  | `acbe460105bc752ca1f1da84427abc35f107d308d4819711a0f988a4d969dd2d` |

Les empreintes couvrent les instructions et le scénario. Aucune fixture exécutable n'existe
encore ; son empreinte et celles des arbres expérimentaux devront être conservées au lancement,
avec les commandes, sorties et observations prévues par le scénario.

Les empreintes candidat sont actualisées pour les références enrichies ; la version précédente
reste dans le commit antérieur. Aucune session ni observation nouvelle n'est ajoutée.

## Environnement et limites

Rédaction : Codex ; version exacte du modèle servi et paramètres d'échantillonnage indisponibles.
Commandes locales sur macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
Aucun modèle évaluateur ni environnement SQL de scénario n'a été utilisé. Linux x64 glibc de
la CI, Bun 1.4.3 et activation dans Claude Code, Codex ou Cursor non exercés par ce cas.
Les faits fictifs ne constituent aucune preuve d'opération sur un service réel.
