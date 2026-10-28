# Partager les leçons de revue avec l’implémentation

Recherche du 23 octobre 2026. **Proposition à arbitrer, pas une décision d’architecture adoptée ni une preuve de réduction des tours de revue.** Cette session ajoute uniquement ce document ; elle ne modifie ni skills, ni hooks, ni mesure, ni installation des consommateurs.

## 1. Recommandation et périmètre de preuve

Créer une référence commune de **risques et de preuves attendues**, consultée par surface avant l’implémentation puis avant livraison. Conserver dans `pr-verdict` la politique de verdict, l’indépendance du reviewer et les opérations de forge. Partager les questions ne signifie pas partager les conclusions de l’auteur.

La boucle proposée est :

```text
Constat de revue + correction traçable
                  |
          pr-feedback : faits
                  |
  harness-reflection : hypothèse falsifiable
                  |
        essai approuvé et comparé
                  |
  +---------------+----------------+
  |                                |
contrainte/type/test          jugement nécessaire
ou contrôle existant         référence par surface
  |                                |
  +---------------+----------------+
                  |
       implement : prévention
                  |
   auto-contrôle du candidat final
                  |
      revue indépendante inchangée
                  |
   récurrence rapportée à l’exposition
```

Le gain recherché est moins de corrections évitables au premier passage indépendant, sans masquer les défauts, déplacer artificiellement les tours en amont, ni multiplier les portes de validation.

### Sources et limites

Le dépôt local étudié est [SebastienElet/agent-skills au commit `27797c8a979ec9cd04dea3fa245161af72e9903d`][local-base], identique à la référence locale `origin/main` au début de la session. Cette égalité ne constitue pas une interrogation de la fraîcheur distante. Aucun `AGENTS.md`, `USER.md` ou ADR suivi n’a été trouvé dans cet instantané. Les instructions fournies pour la session s’appliquent au travail, mais ne sont pas présentées comme des fichiers distribués par le package.

Les sources externes ont été recherchées sur le web et GitHub, puis les fichiers pertinents lus via l’API GitHub en lecture seule. Les instantanés sont :

| Source                                   | Révision ou nature                              | Ce qu’elle permet d’affirmer                                                           |
| ---------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------- |
| `mattpocock/skills`                      | `5beb35b040e3de97e54fa9e386d7e42d15c295c2`      | Structure et instructions effectivement publiées à cette révision                      |
| `cursor/plugins`, répertoire `pstack`    | `8b3326d99fd4b993cb33a24dad8af03175c642c5`      | Contenu du plugin et de ses mécanismes décrits ; manifeste pstack `0.15.30`            |
| AI Hero, marketplace et docs officielles | Pages consultées le 23 octobre 2026, non figées | Présentation et contrats documentés, susceptibles d’évoluer                            |
| Dépôt local                              | Révision ci-dessus                              | Instructions, packaging et contrôles présents ; pas leur efficacité sur les futures PR |

Aucun plugin externe n’a été installé ou exécuté. Aucune campagne de PR, aucun transcript externe ni historique du second bot n’a été analysé. Les pages et fichiers démontrent des pratiques prescrites, pas un effet causal mesuré. Les exemples ci-dessous sont génériques.

## 2. Constats publics

### 2.1 Matt Pocock : composition, références conditionnelles et séparation du jugement

Le [README][matt-readme] présente des skills petits et composables. Son [AGENTS.md][matt-agents] organise les sources en `skills/engineering/`, `productivity/`, `misc/`, `in-progress/` et `deprecated/`. Les deux premiers groupes sont distribués par le manifeste du plugin et ont des pages humaines dans `docs/<groupe>/<skill>.md`. Les index doivent pointer vers les `SKILL.md`. L’invocation manuelle est exprimée par `disable-model-invocation` et par les métadonnées Codex correspondantes ; la disponibilité réelle dépend donc aussi de l’hôte.

[`writing-for-agents`][matt-writing] distingue les étapes à exécuter des références à consulter. Un pointeur indique **ce qu’il contient et dans quelles circonstances le lire**. Il recommande de garder en ligne ce dont toutes les branches ont besoin et de déplacer le reste derrière ces pointeurs. Il distingue coût de contexte permanent et coût de navigation humaine, recommande la colocalisation des règles d’un concept et l’élimination des instructions sans effet observable. C’est une inspiration directe pour un index de surfaces, pas la preuve qu’un tel index détectera tous les risques.

[`implement`][matt-implement] appelle `tdd` quand possible, lance types et tests, puis `code-review` et un commit. [`tdd`][matt-tdd] renvoie à `tests.md`, `mocking.md` et à `codebase-design` pour les interfaces ; il privilégie un comportement observable à la fois et des attendus indépendants de l’implémentation. Cette version demande l’accord préalable sur les frontières de test et réserve le refactoring à la revue. Ces choix ne sont pas ceux du `tdd` local, qui autorise les tests ordinaires et un petit refactoring après le vert : ils ne doivent pas être importés implicitement.

[`code-review`][matt-review] sépare deux lectures en sous-agents : standards du dépôt et conformité à la spécification. Il recherche notamment `CODING_STANDARDS.md` et `CONTRIBUTING.md`, traite les odeurs de conception comme heuristiques et écarte ce que l’outillage contrôle déjà. Il ne fournit pas, dans ce fichier, de catalogue universel de classes d’échec à partager avec l’implémenteur.

La boucle d’amélioration explicite est [`retro`][matt-retro], invoquée par l’utilisateur. Elle lit les traces de la session, cherche des améliorations de navigation, de contrôles, de standards et d’accès à l’information, puis présente les candidats par gravité. Elle demande d’abord de vérifier les contrôles existants. Pour une violation mécanique, elle préfère un contrôle déterministe ; les standards textuels sont réservés au jugement. **Elle dit expressément que les standards sont lus à la revue, pas à l’implémentation**, pour limiter la pression de contexte de l’implémenteur. Partager tout le catalogue en permanence irait donc à l’encontre de cette recommandation précise.

La page AI Hero [The /retro Skill][aihero-retro] confirme le rôle de proposition : une règle de jugement peut être proposée dans `CODING_STANDARDS.md`, qui n’est pas livré par défaut. L’[index AI Skills for Real Engineers][aihero-skills] donne accès au matériel pédagogique correspondant. Les instructions GitHub figées priment ici pour les détails : pages pédagogiques et source peuvent évoluer à des rythmes différents.

**Confiance élevée** sur ces prescriptions, lues dans les fichiers sources. **Non établi** : un système automatique d’apprentissage inter-PR, des statistiques de récurrence ou une réduction quantifiée des tours de revue. La proposition locale retient la composition et la priorité à l’automatisation, mais fait un choix distinct : exposer avant le code les risques de correction pertinents, sans charger tous les standards stylistiques.

### 2.2 « Potatoes » : correspondance très probable avec poteto / pstack

La recherche web `Cursor marketplace potatoes poteto plugin`, la recherche de dépôts `gh search repos 'potatoes cursor plugin'` et la recherche de code avec `"potatoes" "cursor" "plugin"` n’ont pas établi de plugin portant exactement ce nom ; les deux recherches GitHub littérales ont renvoyé une liste vide. Ce résultat borné ne prouve pas son inexistence.

La [fiche marketplace `poteto-help`][cursor-marketplace] nomme **pstack**, affiche `/add-plugin pstack` et relie son code à `cursor/plugins`. Le [README pstack][pstack-readme] se présente sous le pseudonyme **poteto** et le [manifeste][pstack-manifest] nomme **Lauren Tan**. Les recherches de code `poteto` dans ce dépôt retrouvent `poteto-mode` et `poteto-agent`. La route marketplace supposée `/marketplace/pstack` n’a pas été récupérée par l’outil web ; la fiche `poteto-help` et le code ont, eux, été lus.

**Confiance élevée** dans l’identité pstack ↔ poteto ↔ Lauren Tan. **Confiance élevée, mais inférentielle**, que c’est le « Potatoes » visé par la demande ; aucune source ne confirme cette orthographe comme alias.

Les mécanismes pertinents sont les suivants :

| Fichier lu                                   | Mécanisme confirmé                                                                                                                                                                                | Limite de transposition                                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [`poteto-mode/SKILL.md`][pstack-mode]        | Point d’entrée manuel, déclencheurs de spécialistes, index de principes ; lecture complète de la feuille de chaque principe appliqué et indication de la décision qu’il a changée                 | Ce sont des instructions à l’agent, pas un routeur de surfaces exécuté ni une preuve de chargement exhaustif                            |
| [Guide des principes][pstack-principles]     | Principes distincts adressables par leur nom, dont preuve, idempotence, frontières et encodage structurel des leçons                                                                              | Un catalogue de principes ne définit pas à lui seul la pertinence pour un diff                                                          |
| [`reflect/SKILL.md`][pstack-reflect]         | Transcript actif seulement, trois lectures jugement/outillage/divergence, synthèse Accepted/Rejected/Backlog ; approbation avant les edits acceptés ; candidats mécaniques redirigés vers Backlog | Ce fichier prescrit aussi la création immédiate des entrées Backlog : cette autorité n’est pas transférable au package local            |
| [`correct/SKILL.md`][pstack-correct]         | Classes établies après deux occurrences ; priorité architecture, types, lint/CI, tests, puis documentation ; preuve du contrôle sur une erreur historique ; table règle → mécanisme               | Aucun taux d’exposition ni estimation causale du gain n’est défini dans ce fichier ; le seuil de deux n’est pas une preuve d’efficacité |
| [`interrogate/SKILL.md`][pstack-interrogate] | Plusieurs reviewers, même intention et rubric, synthèse des désaccords puis jugement du lead ; pas de correction automatique                                                                      | Des modèles concordants peuvent partager un angle mort ; le consensus n’est pas un oracle                                               |

[`principle-encode-lessons-in-structure`][pstack-encode] demande une solution structurelle lorsqu’elle suffit, et une instruction illustrée lorsque le jugement reste nécessaire. Le README décrit aussi une projection Claude Code **générée** depuis pstack, avec contrôle de fraîcheur. Cela fournit un exemple concret de source canonique et d’adaptateurs, pas une raison d’importer son générateur dans ce dépôt.

Les obligations de modèles, outils Cursor, parallélisme et effets externes de pstack ne conviennent pas comme socle portable. Rien dans les fichiers examinés ne démontre que pstack réduit effectivement le nombre de tours de revue.

### 2.3 Docs officielles : chargement et hooks ne sont pas interchangeables

Les [skills Claude Code][claude-skills] documentent un `SKILL.md` court pointant vers des fichiers complémentaires chargés au besoin. Les [hooks Claude Code][claude-hooks] documentent notamment `PreToolUse`, avant un appel d’outil, et ses décisions ; `FileChanged`, après une modification, ne peut pas bloquer cette écriture. Un hook ne couvre donc que ses événements et conditions d’exécution, pas toutes les modifications possibles du dépôt.

Les [rules Cursor][cursor-rules] disposent de modes permanent, manuel, par description et par `globs`. Un glob attache la règle quand un fichier correspondant entre dans le contexte ; un pointeur vers un autre fichier ne l’injecte pas automatiquement. **Déduction de conception** : les patterns de chemins peuvent aider la sélection, mais ne remplacent pas une analyse sémantique des consommateurs, suppressions et modifications indirectes.

Ces capacités sont propres aux hôtes. Le socle recommandé reste du Markdown lisible par tout bot, avec des adaptateurs optionnels. Aucun comportement Codex supplémentaire n’est supposé ici à partir des documentations Claude ou Cursor.

## 3. État du dépôt et comparaison

Le catalogue actuel contient **27 classes sur 587 lignes**, dans [failure-classes.md](../../skills/pr-verdict/references/failure-classes.md). Il dépasse les erreurs de code : intégrité des preuves, environnement, outils installés, données personnelles et retrait de composants y figurent aussi. Certaines classes mélangent plusieurs surfaces, par exemple collections et sélection CI dans la classe 14, environnement et fuseau DB dans la classe 21. La séparation par fichiers ne doit pas effacer ces recoupements.

| Sujet                  | État vérifié dans agent-skills                                                                                                                                                                                        | Pratiques externes pertinentes                                                | Écart et recommandation                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Catalogue de risques   | [`pr-verdict`](../../skills/pr-verdict/SKILL.md), phase 3, demande chaque question ; aucun appel du catalogue dans [`implement`](../../skills/implement/SKILL.md)                                                     | Principes à la demande de pstack ; pointeurs conditionnels de Pocock          | Faire arriver les questions pertinentes avant les décisions de code                                                |
| Principes déjà communs | [`tdd`](../../skills/tdd/SKILL.md), [`codebase-design`](../../skills/codebase-design/SKILL.md), [`code-enforcement`](../../skills/code-enforcement/SKILL.md) couvrent déjà frontières, vrais composants et refus      | Composition de spécialistes chez Pocock                                       | L’hypothèse « rien n’est partagé » serait fausse : mutualiser le catalogue, ne pas recopier leurs procédures       |
| Auto-contrôle          | `implement` vérifie unités et candidat complet ; revue indépendante optionnelle sauf obligation existante                                                                                                             | `implement` amont appelle systématiquement `code-review`                      | Compléter l’étape existante par risques/preuves, sans imposer une seconde revue                                    |
| Jugement indépendant   | `pr-verdict` exige un auditeur distinct, première lecture indépendante et preuves par comportement                                                                                                                    | Deux axes chez Pocock ; plusieurs modèles chez pstack                         | Conserver l’indépendance ; ne pas traiter l’auto-contrôle comme verdict                                            |
| Retour d’expérience    | [`pr-feedback`](../../skills/pr-feedback/SKILL.md) collecte et déduplique des faits de PR fusionnées ; [`harness-reflection`](../../skills/harness-reflection/SKILL.md) propose un essai falsifiable                  | `retro`, `reflect`, `correct`                                                 | Relier ces étapes par les identifiants de classes, sans fusionner collecte et prescription                         |
| Promotion              | `harness-reflection` prévoit approbation de l’essai, trois sessions indépendantes sans contradiction ; retrait après deux échecs, une régression de sécurité ou veto                                                  | `reflect` demande approbation des edits ; `correct` préfère la structure      | Réutiliser la politique locale ; ne pas faire de l’ajout d’une règle une conséquence automatique de deux remarques |
| Mesure                 | [`measurement.md`](../../skills/pr-verdict/references/measurement.md) spécifie verdict et comptes agrégés par PR/head, pas occurrences par classe                                                                     | Pas de mesure de récurrence comparable trouvée dans les fichiers externes lus | Étendre ultérieurement le contrat du compagnon, avec exposition et provenance                                      |
| Evals                  | [`cases.md`](../../skills/pr-verdict/references/cases.md), [`execution-evidence.md`](../../skills/pr-verdict/references/execution-evidence.md), scénarios et résultats historiques distinguent décisions et exécution | Essais de checks sur erreurs antérieures chez pstack                          | Ajouter des tâches d’implémentation, pas seulement des verdicts sur faits fournis                                  |
| Distribution           | [`README`](../../README.md) : sélection et projection de répertoires complets ; [`package.json`](../../package.json) publie `skills/`, pas `docs/`                                                                    | Plugin pstack et projection générée ; skills amont composables                | Déclarer la dépendance de sélection à la référence commune, sans chemin personnel ni outil privé                   |

### Ce que les contrôles actuels prouvent

`format:check` utilise Prettier sur `**/*.{md,json,yml,yaml,ts}` et `.github` : le futur `docs/research/` entre donc dans son périmètre. Le seul fichier de tests exécutables trouvé est [output-discipline-hook.test.ts](../../skills/output-discipline/scripts/output-discipline-hook.test.ts), et [tsconfig.json](../../tsconfig.json) ne vise que les scripts de ce skill. Ces tests et types ne qualifient pas le routage des classes.

Le seul workflow présent est [publish.yml](../../.github/workflows/publish.yml), déclenché manuellement, avec tests, types, format et packaging avant publication. L’instantané ne contient pas de workflow automatique de PR. Le README précise que l’interface du compagnon `agent-experiments` et l’évaluation CI restent à qualifier. Il serait faux de présenter les evals Markdown comme une barrière exécutée par `bun test`.

L’[évaluation des probes du 19 octobre](../../skills/pr-verdict/evals/2026-10-19-inconclusive-probes/README.md) est particulièrement instructive : base et candidat détectaient déjà les cas ; elle établit un routage explicite et des décisions préservées, **pas un gain d’efficacité**. Les résultats historiques n’établissent pas celui du package courant.

## 4. Architecture proposée

### 4.1 Une référence sélectionnable, deux consommateurs, des responsabilités séparées

Recommandation : un skill de référence `failure-guidance`, dépourvu d’effets, plutôt qu’un répertoire partagé caché à la racine. Ce choix s’aligne sur la sélection actuelle de dossiers de skills et rend la dépendance visible au second bot.

```text
skills/
  failure-guidance/
    SKILL.md                    sélection et mode de lecture
    references/
      index.md                  ID, question courte, surfaces, lien propriétaire
      evidence-states.md        quatre états et sens des preuves
      persistence.md            FC-01, 02, 03, 27
      authorization.md          FC-04, 05, 09, 25
      boundaries.md             FC-06, 08, 11, 12
      collections.md            FC-14
      claims.md                 FC-07, 10, 13, 15
      verification.md           FC-16, 19
      runtime.md                FC-17, 18, 20, 21, 23, 24
      lifecycle.md              FC-22
      time.md                   FC-26
  implement/SKILL.md            sélection avant code, réconciliation finale
  pr-verdict/SKILL.md           sélection indépendante et politique de verdict
  pr-verdict/references/
    failure-classes.md          renvoi transitoire, sans deuxième catalogue
    reporting-policy.md         gravité et conséquences sur le verdict
```

Les noms et le découpage sont une proposition à revalider avant réalisation. Chaque classe aurait **un seul texte propriétaire** ; les autres surfaces renverraient à son ID. `FC-01` à `FC-27` conserveraient une correspondance explicite avec les numéros historiques, sans réutilisation d’ID après retrait. Les politiques de gravité resteraient dans `pr-verdict`, pas dans les fiches de prévention.

Une fiche contiendrait : ID et question ; signaux de pertinence et contre-exemple ; mécanisme d’échec ; décision préventive ; frontière de preuve et limites ; références publiques utiles. Le mécanisme et le critère de levée actuels fournissent déjà l’essentiel. Éviter deux versions « pour auteur » et « pour reviewer » qui pourraient diverger.

`implement` reste propriétaire du déroulement ; `tdd` de la boucle de test ; `codebase-design` des interfaces ; `code-enforcement` des refus et contournements. Ils consomment les fiches pertinentes quand nécessaire, sans redéfinir le catalogue. La lecture de `failure-guidance` n’invoque jamais `pr-verdict`, ne crée pas d’issue et ne donne aucune autorité de publication.

### 4.2 Chargement par surface : sélection sémantique assistée par les chemins

Le petit index serait lu une fois au début, puis reconsulté après expansion du diff. La lecture initiale n’exigerait pas un diff déjà écrit : intention, contrats, consommateurs et sources localisés suffisent à proposer les surfaces. Le diff final sert à réconcilier cette sélection.

| Surface observée                             | Classes à envisager, en plus des transversales pertinentes  | Signal que les chemins seuls manqueraient                                                            |
| -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Écriture DB, transaction, migration, replay  | 1, 2, 3, 27 ; 22 si données personnelles ; 25 si références | Un handler modifié peut changer l’atomicité sans modifier le schéma                                  |
| Permissions, scope, éligibilité, exemptions  | 4, 5, 9, 25 ; 1 pour effet irréversible                     | Remplacer un loader peut supprimer une autorisation implicite                                        |
| Temps, périodes, dates métier                | 26, 21 ; 25 pour validité temporelle                        | Une date cachée derrière un mapper ou un type ne porte pas nécessairement un nom de fichier temporel |
| CI, cache, sélection de tâches, contrôles    | 14, 16, 19 ; 17, 21, 23 pour runtime et dépendances         | Suppression d’un manifeste ou changement de lockfile pouvant laisser un job vide                     |
| Collections, jointures, imports, pagination  | 14, 8, 25 ; 1, 2 si persistance                             | Comptes identiques mais mauvaises identités, doublons ou mauvais destinataire                        |
| Entrées externes, API, erreurs, sorties      | 6, 8, 9, 11, 12, 13                                         | Changement de bibliothèque qui altère une projection exportée                                        |
| Fichiers, installation, processus, retrait   | 17, 18, 20, 21, 23, 24                                      | Une installation existante conserve une référence retirée d’un checkout neuf                         |
| Cycle des données, caches, logs, queues      | 22, 12 ; 6 si contrat public modifié                        | Une réponse mise en cache copie des données absentes de la table principale                          |
| Docs, instructions, affirmations de garantie | 7, 10, 15 ; 13 pour « contrat inchangé »                    | Une phrase change le comportement autorisé sans changer le code                                      |

Cette table est une proposition de couverture, pas un classificateur validé. Les classes sont combinables. L’index doit permettre de voir les 27 questions, même si seules certaines fiches sont ouvertes.

1. Identifier les surfaces à partir du résultat attendu, des contrats et des consommateurs ; utiliser les chemins comme indices.
2. Lire les fiches sélectionnées et identifier les preuves pertinentes. Pour un risque inconnu ou ambigu, élargir la lecture ou consigner l’incertitude, jamais conclure automatiquement « non applicable ».
3. Refaire ce passage sur le diff complet, y compris suppressions, renommages et contrats transitifs. Les comportements non couverts par le catalogue restent dans l’inventaire fonctionnel existant.
4. En revue, refaire la sélection indépendamment. Conserver au départ la décision d’applicabilité pour chaque ID, comme aujourd’hui ; charger entièrement toute fiche applicable ou douteuse.

Un diagnostic éventuel de chemins pourrait suggérer des surfaces, mais pas certifier leur absence. Aucun nouveau scanner, routeur JSON ou hook n’est nécessaire pour le premier essai.

### 4.3 Installation et portabilité

Le package actuel ne garantit pas qu’un skill sélectionné entraîne l’installation de ses dépendances. Un simple lien `../failure-guidance/` serait cassé chez un consommateur qui copie seulement `implement`.

La migration doit donc documenter et essayer deux usages : dossiers frères complets dans le même espace de découverte, ou lecture explicite de la source canonique dans le package installé, à partir de son emplacement fourni par le consommateur. Ne jamais supposer un chemin de machine, un outil de déploiement particulier ou la résolution des liens symboliques par un hôte non testé. Une référence absente produit une limite explicite ; elle ne devient pas un auto-contrôle réussi.

Le bot open source doit pouvoir lire les mêmes fichiers avec ses outils ordinaires, sans sous-agent, MCP, CLI de mesure ou configuration personnelle obligatoire. Déclarer la sélection de `failure-guidance` avec `implement` et `pr-verdict`, épingler la même version et vérifier la résolution depuis les installations réelles. Le fonctionnement hors ligne doit rester possible après acquisition du package.

Autres options considérées :

| Option                                                    | Gain                                                          | Coût / raison du choix                                                                                                                            |
| --------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Skill commun sélectionné explicitement, recommandé        | Découvrable, inclus dans `skills/`, propriétaire identifiable | Un composant de plus à sélectionner et tester chez chaque consommateur                                                                            |
| Référence commune à la racine du package                  | Aucun nouveau skill visible                                   | Packaging et résolution hors des dossiers projetés à revoir ; fragile pour une copie isolée                                                       |
| Copies générées dans chaque skill                         | Dossiers autonomes même copiés seuls                          | Génération, provenance et contrôle de fraîcheur supplémentaires ; à envisager seulement si les consommateurs ne peuvent conserver les dépendances |
| Catalogue complet recopié dans `implement` ou `AGENTS.md` | Accès immédiat                                                | Dérive et contexte systématique ; déconseillé                                                                                                     |

## 5. Auto-contrôle avant PR, intégré à la vérification existante

Compléter `implement` aux étapes de préparation et de vérification, sans ajouter de skill de verdict ni de revue indépendante obligatoire. Le livrable interne est une petite correspondance **comportement → risque → preuve**, réutilisable dans la description de PR lorsqu’une publication est autorisée.

Exemple synthétique :

| Comportement / classes                          | Prévention et preuve observée                                                                                         | État / limite                                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Créer une réservation sans doublon, FC-01/02/03 | Contrainte d’unicité et test concurrent sur la DB réelle ; commande, résultat, arbre testé et environnement consignés | `holds because` uniquement pour l’invariant exercé                     |
| Refuser un accès hors scope, FC-04/05           | Cas avec permission requise mais scope différent ; aucun effet observé ; témoin négatif si garantie critique          | `unproven` si seul un cas administrateur a été exécuté                 |
| Appliquer un délai composé, FC-26               | Attendus tirés de la règle, fins de mois et années bissextiles                                                        | `broken by` si deux périodes sont additionnées malgré l’ordre prescrit |

Ce sont des formes de preuve attendues, **pas des résultats exécutés pendant cette recherche**. Les quatre états existants seraient conservés : `not applicable` motivé, `holds because` avec preuve, `unproven` avec manque précis, `broken by` avec séquence causale. Un même test peut couvrir plusieurs classes ; il ne faut pas le répéter pour remplir plusieurs lignes.

Avant livraison, l’auteur réconcilie les comportements et fiches avec le candidat final, corrige les défauts démontrés dans le périmètre autorisé et indique les preuves essentielles manquantes. L’identification inclut le commit ou, avant commit, la base et l’arbre indexé testé, la version du catalogue, la commande, son statut, l’environnement et les cibles non exercées. Une modification invalide seulement les preuves dont les entrées pertinentes ont changé.

Le reviewer reçoit d’abord le contrat et le candidat, établit son analyse indépendante puis rapproche les preuves fournies. Le registre de l’auteur ne devient ni sa sélection imposée, ni son verdict. Les frontières actuelles de publication et d’invocation de `pr-verdict` restent intactes.

## 6. Quoi automatiser, où, et avec quelles limites

Une classe générale ne se transforme pas en règle de lint universelle. Automatiser **un mécanisme précis**, au niveau qui possède l’invariant. Chercher dans l’ordre contrainte ou type existant, validation native, test ordinaire pertinent, puis seulement nouvel outillage justifié. Le package partage la leçon ; le dépôt applicatif possède ses invariants et ses tests.

| Classes                                                    | Contrôle mécanique pertinent à proposer selon le projet                                                                                                              | Jugement qui reste nécessaire                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 1, 2, 3, 27 : atomicité, replay, invariants, migration     | Contraintes DB et intégration concurrente avec vraie DB ; ancien jeu de données migré puis routines de purge/export exercées                                         | Frontière transactionnelle, choix d’isolation, effets non annulables ; le lint ne prouve pas l’atomicité             |
| 4, 5, 9, 25 : autorité, scope, confiance, référence valide | Tests de refus minimalement privilégiés, variantes de statut/scope et absence d’effet ; mécanismes d’isolation natifs quand applicables                              | Politique autorisée, exhaustivité des chemins et propriété des références                                            |
| 6, 8, 11, 12, 13 : frontières et contrats                  | Parseur/schema, types fermés, tableaux d’entrées hostiles, tests des sorties et erreurs, export public base/head lorsque l’égalité est promise                       | Compatibilité voulue et inventaire des sinks ; égalité des exports ne prouve pas toute compatibilité comportementale |
| 14 : sélection / collections                               | Tests de conservation par identité et occurrence, doublons et ambiguïté ; graphes/dry-runs natifs pour CI et cache                                                   | Ensemble attendu et règle d’éligibilité indépendante ; aucun test recopiant une liste de globs                       |
| 16, 19 : contrôles et probes                               | Contrôle depuis une base de confiance, cas timeout/statut incomplet/défaillance, témoin refusé et témoin autorisé                                                    | Indépendance de l’évaluateur et autorité du contrôle ; sa propre CI verte ne les établit pas                         |
| 17, 18, 20, 21, 23, 24 : runtime et opérations             | Smoke de l’exécutable réel, essais installation/retrait, liens symboliques et signaux ; builds et démarrage des images touchées ; vérification native de dépendances | Plateformes promises, appartenance des processus, restrictions de mise à niveau et limites de nettoyage              |
| 22 : données personnelles                                  | Tests de contenu réellement stocké, export/effacement et chemins de cache/log concernés                                                                              | Politique de conservation, autorisation et conformité : aucune promotion automatique en norme universelle            |
| 26 : temps                                                 | Cas calendaires indépendants du code, périodes appliquées successivement ; sessions DB non UTC pour la partie de 21 concernée                                        | Sens de la règle et convention temporelle en vigueur                                                                 |
| 7, 10, 15 : omissions, affirmations, amélioration          | Mesures comparatives déclarées à l’avance et vérifications existantes de l’artefact revendiqué                                                                       | Acceptabilité d’un report, force d’une promesse, interprétation du gain ; pas de validateur de prose                 |

Un lint existant peut prévenir une API interdite, une dépendance entre modules ou un état non traité si le langage et le contrat s’y prêtent. Un nouveau lint doit montrer un défaut qu’il détecte et un cas autorisé qu’il accepte ; un motif textuel ressemblant à une race n’établit pas une race.

Un hook est utile pour rappeler une surface ou lancer rapidement un contrôle existant. Il reste un accélérateur local contournable, sauf démonstration d’une autre propriété dans son périmètre réel. Ne pas analyser une chaîne `gh pr create` ou `git commit` comme barrière finale : aliases, API, autre bot ou autre hôte échappent à ce signal. Le contrôle obligatoire appartient au workflow CI et à la protection de branche **effectivement configurés**, quand le projet les exige.

La conception ne demande aucune nouvelle gate du déclaratif. Si un invariant important n’a ni validation native ni test existant suffisant, une éventuelle nouvelle infrastructure doit être proposée séparément avec invariant, source canonique, manque, risque et coût de maintenance. Les tests ordinaires d’un comportement possédé ne nécessitent pas ce checkpoint. Les règles de `code-enforcement` restent applicables à tout nouveau contrôle : échec visible, refus quand un contrôle obligatoire ne peut s’exécuter et tests de contournement.

## 7. Boucle de retour et mesure de la récurrence

### 7.1 Ne pas apprendre directement d’un commentaire

`pr-feedback` reste une collecte en lecture seule. Un constat retenu lie commentaire, mécanisme et correction observée ; commenter puis corriger le même défaut ne compte qu’une fois. Une remarque de style, une intégration de branche et une demande de preuve ne sont pas automatiquement des défauts fonctionnels. La causalité attribuée au harnais reste `inferred` tant qu’un essai ne la soutient pas.

`harness-reflection` vérifie ensuite si la cause est propre à la tâche, un défaut possédé, un incident externe, une capacité manquante ou un manque réutilisable du harnais. Pour ce dernier, proposer une seule intervention falsifiable : meilleure sélection, fiche plus précise, contrôle existant réactivé, test pertinent ou contrôle structurel. Une correction applicative ne doit pas être enregistrée comme workaround recommandé.

Conserver la politique locale d’essai et de promotion. Une leçon doit avoir un contre-exemple valide, une condition d’expiration et un propriétaire. Les versions du catalogue permettent d’associer les occurrences au texte réellement lu. La mesure peut révéler qu’une fiche n’est jamais chargée, qu’elle est lue mais ignorée, ou que sa preuve est inadéquate : ce sont trois corrections différentes.

### 7.2 Un contrat de données proposé, pas une CLI inventée

L’interface actuelle `agent-measure pr-verdict` ne stocke pas ces dimensions et ne déduit pas de causalité. Elle est un compagnon optionnel dont la qualification reste distincte. **Ne pas ajouter de flags imaginaires, ni écrire un second stockage de secours** dans les skills.

Une évolution du compagnon, dans son propre périmètre, pourrait accepter :

| Groupe         | Données minimales proposées                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identité       | Dépôt/PR, base/head, identifiant de constat et de passe, version du catalogue, classe principale et classes secondaires                                          |
| Exposition     | Surfaces effectivement touchées ; classes applicables, inapplicables ou inconnues ; fiches chargées ou statut inconnu ; stade avant code / auto-contrôle / revue |
| Observation    | Défaut démontré, preuve manquante ou préférence ; source publique ou référence locale autorisée ; fix associé et résultat constaté                               |
| Comparabilité  | Hôte et modèle connus ou inconnus, version du harnais, familles de changements et contrôles applicables                                                          |
| Réconciliation | Même constat persistant, résolu ou réapparu ; événement antérieur auquel la correction se rattache ; causalité inférée ou confirmée                              |

Pour éviter les faux doublons, une répétition du même constat sur trois heads d’une PR reste **un défaut et plusieurs passes**, pas trois récidives. Une nouvelle occurrence après résolution ou dans une autre PR peut être une récurrence, à vérifier par mécanisme. Une correction de classification ne réécrit pas l’histoire silencieusement ; elle référence l’observation corrigée.

Le contrat courant refuse des données différentes sur une même clé PR/head/type. L’évolution doit donc trancher les réévaluations au même SHA et introduire un type/version ou une identité d’événement adaptés avant ingestion. Le défaut de stockage reste distinct du verdict. Avant PR, conserver seulement le registre de travail ; une association durable pré-PR exige un contrat propre, pas une déduction depuis le chemin du worktree.

### 7.3 Indicateurs et expérience

| Indicateur                 | Définition proposée                                                                                             | Piège à éviter                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Récurrence d’une classe    | PR avec au moins un défaut confirmé de cette classe / PR où la classe est applicable et la revue a été observée | Compter toutes les PR comme exposées, ou un non-observé comme zéro           |
| Tours de correction        | Passes indépendantes nécessitant une correction, puis nouvelle passe, par PR                                    | Compter rebases, doublons de commentaires ou attente CI comme tours de revue |
| Défauts au premier passage | Défauts confirmés distincts au premier passage indépendant, stratifiés par surface                              | Amélioration apparente obtenue en assouplissant le reviewer                  |
| Détection précoce et coût  | Défauts trouvés avant PR, reprises locales, temps de vérification et volume de contexte                         | Déplacer les mêmes reprises avant PR et annoncer un gain global              |
| Contre-mesures             | Faux positifs, preuves essentielles manquantes, défauts découverts après approbation, données manquantes        | Réduire les retours en réduisant la couverture ou la collecte                |

Commencer par une petite cohorte prospective, par exemple **20 changements exposés avant et 20 après**, par famille de surface si le volume le permet. Ce nombre sert à dimensionner un pilote, pas à garantir une puissance statistique. Inclure les PR abandonnées et les suivis incomplets comme tels ; les seules PR fusionnées de `pr-feedback` introduiraient un biais de sélection. Rapporter numérateurs, dénominateurs et inconnus, pas seulement un pourcentage.

Pour évaluer le texte avant adoption, utiliser les mêmes tâches synthétiques avec et sans routage partagé, des contextes frais, ordre alterné, modèle/runtime/version connus et reviewer indépendant fixe. Réserver des cas non utilisés pour rédiger les fiches. Mesurer les décisions d’implémentation et le code obtenu, puis appliquer les mêmes tests comportementaux et la même revue aux deux groupes. Les tests ne doivent pas être produits à partir des conclusions de l’auteur.

Critères à fixer **avant** l’essai : aucune régression sur les cas de sécurité et les autorisations ; aucun nouveau faux blocage sur les témoins valides ; réduction du mécanisme ciblé sur les tâches exposées, avec coût et dispersion rapportés. La règle locale des trois sessions reste un minimum de promotion, pas une démonstration statistique. Ne pas généraliser le résultat au second bot ou à un autre hôte sans essai séparé. Sans amélioration distinguable, conserver le statut inconclusif et réviser ou abandonner l’intervention.

Aucune télémétrie distante automatique n’est proposée. Les données brutes restent chez le consommateur ; seuls des exemples synthétiques ou des constats explicitement publics et autorisés peuvent rejoindre le package. Rétention, partage et accès à la mesure sont des décisions distinctes de l’installation des skills.

## 8. Migration proposée et critères d’acceptation

Ce plan nomme les fichiers pour rendre le travail concret. Il ne vaut pas autorisation de les modifier ; leur état devra être redécouvert avant réalisation.

| Étape                                 | Fichiers / changements envisagés                                                                                                                                                                                                    | Résultat et preuve attendus                                                                                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Figement du contrat                | Inventorier les 27 classes, leurs sections transversales et les scénarios existants ; préparer le mapping d’IDs dans la future référence                                                                                            | Aucun risque ni règle de gravité perdu ; baseline de scénarios conservée ; politiques ambiguës signalées, pas normalisées au passage                                                                     |
| 2. Extraction sans changement de fond | Créer `skills/failure-guidance/SKILL.md` et `references/*` selon §4 ; déplacer le contenu canonique ; extraire `Reporting` vers `skills/pr-verdict/references/reporting-policy.md` ; ancien `failure-classes.md` réduit à un renvoi | Un seul corps par classe, renvois résolus depuis les usages supportés ; scénarios de verdict inchangés ; aucun gain comportemental revendiqué par le seul déplacement                                    |
| 3. Consommation                       | Modifier `skills/implement/SKILL.md` aux étapes 3–5 et `skills/pr-verdict/SKILL.md` phase 3 ; ajuster les pointeurs de `tdd`, `codebase-design`, `code-enforcement` seulement s’ils sont nécessaires ; README et index dérivé       | Sélection avant code, bilan final et revue indépendante ; invocation de `pr-verdict` inchangée ; zéro procédure dupliquée                                                                                |
| 4. Qualification et distribution      | Ajouter les scénarios à `skills/failure-guidance/evals/`, étendre ceux de `pr-verdict` ; documenter sélection conjointe, version et retour arrière dans README ; vérifier les liens des références historiques                      | Essais comportementaux base/candidat, témoins valides et manque de référence ; tarball local inspecté ; lecture depuis copie, lien et environnement du second bot ; aucune installation réelle implicite |
| 5. Pilote et mécanique                | Après essai approuvé, relier `pr-feedback` / `harness-reflection` aux IDs ; proposer l’évolution de `references/measurement.md` avec le compagnon ; réaliser au plus les contrôles justifiés dans les dépôts propriétaires          | Récurrence avec dénominateur ; refus/acceptation démontrés pour chaque contrôle ajouté ; retour arrière sur régression, sans réécrire l’historique                                                       |

Le premier déplacement doit préserver les nuances et les exemples, notamment preuves manquantes versus défauts, politique de gravité et portée des garanties. Les sous-thèmes hétérogènes pourront être séparés ultérieurement avec une correspondance d’IDs explicite ; ne pas mélanger cette décision au déplacement initial.

Scénarios minimaux du pilote : concurrence DB et replay ; période composée en fin de mois ; permission présente mais scope incorrect ; manifeste retiré et cache/sélection CI ; collection avec doublon et entrée ambiguë. Pour chaque famille, un défaut pertinent et un cas sûr. Ajouter des cas transversaux : renommage masquant la surface, catalogue absent, plusieurs surfaces, aucun risque applicable, comportement non répertorié, tentative de publication non autorisée et second bot sans CLI de mesure.

Les evals actuelles étant historiques et non exécutées par les tests du package, leur ajout ne crée pas une barrière automatique. Conserver les observations et limites dans `evals/` selon les conventions existantes ; ne pas inventer un nouveau runner uniquement pour cette migration. Un dispositif disponible et qualifié pourra être utilisé, sinon des essais manuels tracés suffisent à décrire ce qui a réellement été observé.

Côté packaging, `skills/` est déjà inclus : le nouveau skill y entrerait naturellement. `docs/research/` reste hors tarball selon le manifeste actuel, ce qui convient à ce document de conception. Régénérer `skills/README.md` seulement lorsqu’un skill est réellement ajouté. Préserver une version exacte et la sélection antérieure pour rollback ; ne retirer que les projections gérées du catalogue, jamais celles d’un autre utilisateur ou outil.

## 9. Compromis et décisions ouvertes

Le partage ciblé augmente le travail de sélection mais peut éviter des erreurs coûteuses avant qu’elles structurent le code. Il expose aussi auteur et reviewer aux mêmes catégories : l’analyse indépendante et les comportements hors catalogue doivent rester possibles. La source commune réduit la duplication éditoriale ; elle ne prouve ni que le fichier a été lu, ni que le bon risque a été sélectionné, ni qu’il a été correctement traité.

Les contrôles mécaniques limitent les répétitions lorsqu’ils visent un invariant précis, mais coûtent en exécution et maintenance. L’automatisation doit retirer des rappels devenus redondants, sans supprimer l’explication du périmètre non couvert. Les adaptateurs d’hôte facilitent l’usage, au prix de qualifications supplémentaires. Le bot externe doit garder un chemin fonctionnel sans ces adaptateurs.

Décisions proposées à Sébastien, sans effet sur les comportements actuels :

1. **Où réside la référence commune ?** A, recommandé : skill `failure-guidance` sélectionné avec ses consommateurs. B : ressource racine avec résolution explicite. C : copies générées autonomes. A minimise l’outillage, mais exige d’adapter la sélection du second bot ; C n’est justifié que si ses contraintes interdisent cette sélection.
2. **Quelle charge avant le code ?** A, recommandé : index complet court, fiches pertinentes, bilan au candidat final ; balayage d’applicabilité complet maintenu en revue. B : catalogue complet lu à chaque implémentation. C : prévention limitée aux contrôles mécaniques, jugement entièrement en revue comme le recommande `retro` pour les standards. A vise les risques techniques sans charger tous les standards ; son efficacité reste à mesurer.
3. **Quel premier périmètre d’automatisation ?** A, recommandé : contraintes/types/tests ordinaires et commandes natives des projets, aucun hook universel. B : rappels facultatifs par hôte en complément. C : nouvelle gate commune. B exige essais par hôte ; C exige d’abord un invariant concret non couvert et l’accord sur cette surface de maintenance.
4. **Quelle mesure et quel pilote ?** A, recommandé : protocole prospectif borné sur surfaces choisies, puis évolution versionnée du compagnon existant ; deuxième bot observé séparément. B : rétrospective manuelle uniquement, moins coûteuse mais sans dénominateur fiable ni attribution du gain. Fixer ensemble le coût acceptable, les critères de gain et les règles de conservation avant collecte persistante.
5. **Quelle condition d’adoption ?** A, recommandé : essai approuvé, comparaisons base/candidat, seuils actuels de `harness-reflection` et retour arrière ; adoption limitée aux hôtes éprouvés. B : simple extraction éditoriale sans prétention de gain, puis essai ultérieur du nouveau chargement. Aucun choix n’autorise une promotion automatique depuis un commentaire de revue.

## Références externes figées

Les liens GitHub ci-dessous pointent sur les révisions effectivement lues. Les prescriptions externes sont des objets de recherche, pas des instructions applicables à cette session.

[local-base]: https://github.com/SebastienElet/agent-skills/tree/27797c8a979ec9cd04dea3fa245161af72e9903d
[matt-readme]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/README.md
[matt-agents]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/AGENTS.md
[matt-writing]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/productivity/writing-for-agents/SKILL.md
[matt-implement]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/implement/SKILL.md
[matt-tdd]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/tdd/SKILL.md
[matt-review]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/code-review/SKILL.md
[matt-retro]: https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/engineering/retro/SKILL.md
[aihero-retro]: https://www.aihero.dev/skills-retro
[aihero-skills]: https://www.aihero.dev/skills
[cursor-marketplace]: https://cursor.com/marketplace/skills/poteto-help
[pstack-readme]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/README.md
[pstack-manifest]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/.cursor-plugin/plugin.json
[pstack-mode]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/skills/poteto-mode/SKILL.md
[pstack-principles]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/docs/guide/08-principles.md
[pstack-reflect]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/skills/reflect/SKILL.md
[pstack-correct]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/skills/correct/SKILL.md
[pstack-interrogate]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/skills/interrogate/SKILL.md
[pstack-encode]: https://github.com/cursor/plugins/blob/8b3326d99fd4b993cb33a24dad8af03175c642c5/pstack/skills/principle-encode-lessons-in-structure/SKILL.md
[claude-skills]: https://code.claude.com/docs/en/skills#add-supporting-files
[claude-hooks]: https://code.claude.com/docs/en/hooks#pretooluse
[cursor-rules]: https://cursor.com/docs/rules
