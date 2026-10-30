# Chemins multiples : état de l'évaluation

## Résultat observé

Comparaison sans/avec instruction **non exécutée en vraie session**. Aucun contexte frais
base ou candidat n'a été lancé pour cet exercice ; aucun mini-dépôt n'a été construit ni
exécuté. Aucun échec de base, succès candidat, témoin négatif ou taux d'activation n'est observé.
Le critère « échoue sans l'instruction et passe avec » reste non démontré.

Mappeur partagé, lectures communes, variantes conservées et refus explicites : comportements spécifiés, pas observés.
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
| `codebase-design/SKILL.md`                   | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` | `a5a5f48eb7019bf3465c67bcec5241c744d4f23d1d3f413a66ef550f080ccbd3` |
| `codebase-design/references/dependencies.md` | `9bdf9fdb36df7102896c3d9baa1d13b80e9052cd0fb4f04e063cb797c1d4894d` | `f4a8a4f6fcbacc942101e2bf74df85ee318fb0a0c6d289f35fc218aa18163abf` |
| `codebase-design/evals/equivalent-paths.md`  | Scénario actuel identique pour les deux sessions                   | `d246ef4c6ca4d546479dffec0a80e05b56a36f3fe194a97547c13919cffcb4ee` |

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
