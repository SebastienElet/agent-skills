# Schéma partagé : état de l'évaluation

## Résultat observé

Comparaison sans/avec instruction **non exécutée en vraie session**. Aucun contexte frais
base ou candidat n'a été lancé pour cette évaluation ; aucun mini-dépôt n'a été construit ni
exécuté. Aucun échec de base, succès candidat, témoin négatif ou taux d'activation n'est observé.
Le critère « échoue sans l'instruction et passe avec » reste non démontré.

Ordre des migrations, union cumulative des états, port complet et contrôles de la composition : ces comportements sont spécifiés dans le scénario, pas observés.
L'auteur a confronté les ajouts aux règles existantes et au texte fourni des leçons. Cette
inspection ne démontre pas un changement de comportement des agents. Les contrôles du dépôt
portent sur le format, les outils exécutables existants et la santé des skills, pas sur cette
fixture. Une éventuelle revue indépendante du diff ne remplace pas la comparaison en session.

## Liaison des entrées

Base locale `origin/main` : `3262df60b7b9b01537494f2c74db65cf85b7b79a`. Le candidat est lié aux octets
finaux par SHA-256, sans prétendre à leur exécution. Chemins relatifs à `skills/`.

| Entrée                                     | SHA-256 base                                                       | SHA-256 candidat                                                   |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `implement/SKILL.md`                       | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` |
| `pr-verdict/references/failure-classes.md` | `1ff96008e4622ba1fdf45fde9ab6e3521cf23e44e7d4a8ec68694e6f0179157a` | `8e7ef13a6d8b841e4e77fe924bf3bd61735ae86ed7c813d3bfb4d7d74dc89ebf` |
| `tdd/SKILL.md`                             | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/dependencies.md`           | `6db8ae3de4c3b6f2ec8e2e03ed8f3417207987b6a3b75c7d7f0c8420b51c7f8e` | `dcaa2beb1aa80fe591dc12f52d3c415831a012708bbff4a088c7bdb55d91c3f4` |
| `pr-verdict/evals/parallel-schema.md`      | Nouveau scénario identique pour les deux sessions                  | `32ca7c2df1792f6d0349af2e4f553f89a015ec9bb3e15b028d367e28c5331671` |

Les empreintes couvrent les instructions et le scénario. Aucune fixture exécutable n'existe
encore ; son empreinte et celles des arbres expérimentaux devront être conservées au lancement,
avec les commandes, sorties et observations prévues par le scénario.

## Environnement et limites

Rédaction : Codex ; version exacte du modèle servi et paramètres d'échantillonnage indisponibles.
Commandes locales sur macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
Aucun modèle évaluateur ni environnement SQL de scénario n'a été utilisé. Linux x64 glibc de
la CI, Bun 1.4.3 et activation dans Claude Code, Codex ou Cursor non exercés par ce cas.
Les faits fictifs ne constituent aucune preuve d'opération sur un service réel.
