# Schéma partagé : migrations et doubles après intégration

Monorepo fictif `shop-monorepo`, à préparer dans des copies jetables. Branches, schéma et preuves
ci-dessous sont des entrées de scénario ; aucun service Git distant ni forge n'est opéré.

## Consigne et fixture

Consigne : « Vérifiez la compatibilité des branches de commandes réunies avec leur cible ;
corrigez les migrations et doubles, puis préparez les preuves de l'arbre intégré, sans publier. »

1. La cible fournie contient la migration `202610281200_orders.sql`, avec une contrainte
   `orders_status_check` autorisant `NEW`, `PAID` et `CANCELLED`. Des lignes existent pour ces états.
2. La branche A redéfinit la contrainte avec `NEW`, `PAID`, `ON_HOLD`. La branche B utilise
   `202610271100_refunds.sql`, antérieure à la dernière migration cible, et redéfinit la
   contrainte avec `NEW`, `PAID`, `REFUNDED`. Les deux copies oublient `CANCELLED` ; la dernière
   définition appliquée perd aussi l'ajout de l'autre branche. Fournir les refs locales des
   branches parallèles et un schéma cible consultable avec `pg_get_constraintdef`.
3. Le port intégré `OrderRepository` possède `find`, `save` et `listRefundable`. Un double partiel
   est casté vers le port ; un autre place `listRefundable` dans le mauvais double. Les tests
   transpilaient sans typage. Chaque branche possède des résultats verts isolés.
4. La composition dépasse une limite de lignes du linter ; un test E2E assemblé utilise encore
   une donnée refusée par une nouvelle contrainte de la cible. Fournir les commandes existantes
   de lint, typage, migrations et E2E ; ne pas ajouter de gate ni de test du texte SQL.

## Acceptation et contrôles admis

Inspecter les refs fournies et l'ordre actuel des migrations. Dater les migrations non appliquées
après la dernière de la cible et dans un ordre déterministe ; ne jamais renuméroter une migration
appliquée. Repartir de la définition actuelle et des ajouts parallèles : chaque redéfinition
conserve les valeurs admises jusque-là, la définition finale admet les cinq états.

Sur vraie base dédiée, migrer une base neuve et une base existante contenant les valeurs de la
cible ; conserver ses lignes et vérifier une insertion par état autorisé. Une valeur inconnue
reste refusée par la contrainte nommée. Ne pas substituer une assertion sur le fichier de migration
à l'exercice SQL. Le traitement des données historiques ne doit supprimer aucune ligne arbitrairement.

Chaque double implémente le port complet sans cast partiel ; le typage doit refuser un membre
absent ou placé sur un autre double. Intégrer les branches dans la copie jetable, corriger les
conflits sémantiques et rejouer lint, typage et E2E existants sur cette composition. L'E2E exerce
la frontière système assemblée prévue par la fixture. Les anciens résultats isolés ne qualifient
pas cet arbre ; des entrées pertinentes inchangées peuvent garder leur preuve avec provenance.
Conserver les témoins : perte d'un état, ordre incohérent, membre absent, défaut lint et fixture
E2E périmée, avec échec pertinent puis succès restauré. Aucune branche réelle n'est poussée.

## Protocole de comparaison

Fixer les critères avant exécution. Donner à deux contextes frais la même fixture et la consigne,
sans les réponses attendues, avec refs et bases locales dédiées. Charger la version correspondante
de `implement/SKILL.md`, `pr-verdict/references/failure-classes.md` (classes 3 et 21),
`tdd/SKILL.md` et `tdd/references/dependencies.md`. Lire le catalogue comme référence ne constitue
pas une invocation de verdict ; aucune publication n'est autorisée. Lier instructions, scénario,
fixture et arbres composés par empreinte ; conserver modèle, hôte, SQL, commandes et sorties.
Distinguer décisions et réparations exécutées. Seuls un échec observé sans les ajouts et un
succès avec eux démontrent un gain ; des branches vertes isolément ne le démontrent pas.
