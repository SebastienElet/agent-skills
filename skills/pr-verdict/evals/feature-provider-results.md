# Fournisseur de fonctionnalité : état de l'évaluation

## Résultat observé

Comparaison sans/avec instruction **non exécutée en vraie session**. Aucun contexte frais
base ou candidat n'a été lancé pour cet exercice ; aucun mini-dépôt n'a été construit ni
exécuté. Aucun échec de base, succès candidat, témoin négatif ou taux d'activation n'est observé.
Le critère « échoue sans l'instruction et passe avec » reste non démontré.

Fournisseur livré, ouverture sans simulation et fermeture de production prévue au contrat : comportements spécifiés, pas observés.
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

| Entrée                                       | SHA-256 base                                                       | SHA-256 candidat                                                   |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `pr-verdict/SKILL.md`                        | `66cf12ef59ef8db36960621afa602af115933e0cf8c1ff597c0419da7032f097` | `66cf12ef59ef8db36960621afa602af115933e0cf8c1ff597c0419da7032f097` |
| `pr-verdict/references/behavior-evidence.md` | `fbaeb2066dbac1123476d9cd8b61d1dffeeb9d9747e9164a60368411f55d21fa` | `f43b6ccb4df46df97f69fd06b905d00ebc9582e3a1101da1722384d9582cd6ac` |
| `pr-verdict/evals/feature-provider.md`       | Scénario actuel identique pour les deux sessions                   | `41101a4dde2ed065065380ad2a20ccae869cdad23ae9f614ef660fda2882d466` |

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
