# Branches parallèles : schéma et contrats après intégration

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
5. Une branche ajoute `refunds.disabled` sans l'ajouter au catalogue ni à la liste publique.
   `/refunds` passe par le traducteur d'erreurs mais `/reports` le contourne. Un motif de rejet
   manque à une table partielle et son libellé s'affiche vide. Fournir les unions fermées
   `RejectReason` et `PublicCode`, le catalogue et les deux routes dans les copies locales.
6. Une branche voisine retire `invoice-42.pdf` et `private/orders` des journaux. Une réécriture
   perd cette garde ; son test ne vérifie que la présence de `orderId`, ce qui accepte la fuite.
7. Une fabrique reçoit un paramètre obligatoire. Des appelants et tests de la branche voisine
   ne le fournissent pas. Les refs fournies permettent de les trouver avant le changement.

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

Ajouter le nouveau code au catalogue et à sa liste publique dérivée ou existante, sans éditer
un artefact généré. Compiler une table totale `Record<RejectReason, PublicCode>` : chaque motif
possède un code catalogué. À travers `/refunds` et `/reports`, vérifier statut, code stable et
libellé attendu selon le contrat ; une erreur technique inconnue reste générique. Un test du
traducteur seul ne couvre pas la route qui le contourne.

Relire les diffs voisins et conserver leurs gardes dans la réécriture. Capturer les journaux
réels, y compris sur erreur ; vérifier qu'un diagnostic est émis et que ni `invoice-42.pdf` ni
`private/orders` n'apparaît dans aucune sortie. Retirer la garde doit faire échouer ces assertions
d'absence, puis sa restauration les faire passer. Chercher les appelants sur toutes les refs
ouvertes fournies avant d'imposer le paramètre ; adapter ensemble le contrat et ses consommateurs
dans la composition. Conserver aussi les témoins code absent, motif omis, route non traduite et
appelant voisin cassé ; ne pas déduire leur couverture du seul succès des tests de schéma.

## Protocole de comparaison

Fixer les critères avant exécution. Donner à deux contextes frais la même fixture et la consigne,
sans les réponses attendues, avec refs et bases locales dédiées. Charger la version correspondante
de `implement/SKILL.md`, `pr-verdict/references/failure-classes.md` (classes 3, 6, 21 et 22),
`tdd/SKILL.md` et ses références `dependencies.md` et `tests.md`. Lire le catalogue comme référence ne constitue
pas une invocation de verdict ; aucune publication n'est autorisée. Lier instructions, scénario,
fixture et arbres composés par empreinte ; conserver modèle, hôte, SQL, commandes et sorties.
Distinguer décisions et réparations exécutées. Seuls un échec observé sans les ajouts et un
succès avec eux démontrent un gain ; des branches vertes isolément ne le démontrent pas.
