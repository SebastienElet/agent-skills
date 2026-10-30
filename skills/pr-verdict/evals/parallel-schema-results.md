# Branches parallèles : schéma et contrats : état de l'évaluation

## Résultat observé

Comparaison sans/avec instruction **non exécutée en vraie session**. Aucun contexte frais
base ou candidat n'a été lancé pour cet exercice ; aucun mini-dépôt n'a été construit ni
exécuté. Aucun échec de base, succès candidat, témoin négatif ou taux d'activation n'est observé.
Le critère « échoue sans l'instruction et passe avec » reste non démontré.

Schéma cumulatif, ports complets, codes publics, table totale, gardes et absence dans les journaux : comportements spécifiés, pas observés.
L'auteur a confronté les ajouts au texte fourni et aux règles existantes. Cette inspection
ne démontre pas un changement de comportement des agents. Les contrôles du dépôt exercent
le format, les outils exécutables existants et la santé des skills, pas les comportements du
mini-dépôt. Une revue statique indépendante ne remplace pas une comparaison en session.

## Liaison des entrées

Base locale avant enrichissement : `90acc586ed50f76b18b93e60ea28796d9be62ca0`. Le candidat est lié aux
situations décrites par les octets finaux des instructions et du scénario, sans preuve d'exécution.
Chemins relatifs à `skills/` ; les références d'instructions modifiées ou nécessaires à la
comparaison sont ci-dessous. Conserver aussi les autres références effectivement chargées au
lancement d'une session, qui n'existe pas encore.

| Entrée                                     | SHA-256 base                                                       | SHA-256 candidat                                                   |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `implement/SKILL.md`                       | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` | `8c6cf63cb9a4241353e14f0a6ae0d0876f7463c7905e775793a08ed48f490d27` |
| `pr-verdict/references/failure-classes.md` | `8e7ef13a6d8b841e4e77fe924bf3bd61735ae86ed7c813d3bfb4d7d74dc89ebf` | `6b9d421d32b19062dadbeb08453ee6d30cff5e299bd22edf0216f365ca1702d8` |
| `tdd/SKILL.md`                             | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` | `93f1cb0cc44f99935d95b9ae6ac450a4426c4ea7ead7c95a75a5f3c36d897687` |
| `tdd/references/dependencies.md`           | `dcaa2beb1aa80fe591dc12f52d3c415831a012708bbff4a088c7bdb55d91c3f4` | `dcaa2beb1aa80fe591dc12f52d3c415831a012708bbff4a088c7bdb55d91c3f4` |
| `tdd/references/tests.md`                  | `4ce57b83deeb0b9f7c47aa7bd81ef17ab3f9e8251f3c62f72846ab7d391d2099` | `7a504dfd8c1abfe86114cd7dd2f98bde3c896dc76af59c61c4c90b77acc30dc9` |
| `pr-verdict/evals/parallel-schema.md`      | Scénario actuel identique pour les deux sessions                   | `3568399fb9490afaedb31b0e0715951666ce7b48b30158d5816af80b3f169d07` |

Le même scénario actuel doit être fourni aux deux sessions, même lorsqu'il enrichit un cas déjà
présent à la base. Les empreintes des anciennes versions restent consultables dans ce commit
antérieur ; aucune observation d'exécution n'y est remplacée. Aucune fixture exécutable n'existe
encore : conserver son empreinte et celles des arbres expérimentaux au lancement, ainsi que les
commandes, sorties et observations exigées par le protocole.

## Environnement et limites

Rédaction : Codex ; version exacte du modèle servi et paramètres d'échantillonnage indisponibles.
Commandes locales : macOS ARM64 (`Darwin arm64`), zsh, Bun 1.4.4, Arnes 0.0.3.
Aucun modèle évaluateur ni environnement SQL de scénario utilisé. Linux de la CI, Bun 1.4.3 et
activation dans Claude Code, Codex ou Cursor non exercés par ce cas. Aucun accès réseau ni service
réel ; les observations fictives ne constituent pas une preuve d'opération externe.
