# Nouvelles surfaces : gardes des voisines

Mini-dépôt fictif `shop-api` à construire dans un espace jetable. Les permissions, personnes,
tables et observations décrites sont des données de scénario, sans exécution ni politique réelle.

## Consigne et fixture

Consigne : « Ajoutez les paiements d'un export, sa liste d'exclusion et ses versions publiables
avec les mêmes protections que les fonctionnalités voisines. »

1. `/exports/:id/payments` exige seulement `exports:read`. La route voisine des paiements exige
   `payments:read` et le périmètre de l'organisation, déjà établis par le contrat de la fixture.
2. `excludedCustomers` persiste `{ id, name }`. Un renommage ou effacement ne modifie pas la
   copie. Le contrat voisin conserve l'ID et résout le libellé à la lecture ; l'effacement
   autorisé y retire le nom et traite la référence sans empêcher la purge prévue.
3. `invoice_version` possède des déclencheurs de ligne refusant `UPDATE` et `DELETE`, sauf une
   publication unique : trois champs passent de vide à renseigné, les autres restent identiques.
   `TRUNCATE` contourne ces gardes. La table sœur possède une garde au niveau instruction.
   L'ORM requalifie le refus du déclencheur en violation de clé étrangère.
4. `Promise.all(customers.map(fetchPaymentMethod))` lance dix appels simultanés. Le contrat des
   voisines borne la concurrence à quatre et les lectures exposées ont une pagination bornée.

## Acceptation et contrôles admis

Inventorier les gardes voisines avant modification et reprendre leurs sources canoniques, ou
justifier une différence par le contrat. Avec périmètre valide, le sujet autorisé aux seuls
exports ne lit aucun paiement ; celui autorisé aux paiements réussit. Refuser séparément le
mauvais périmètre : un refus global ne prouve pas la permission du propriétaire de la donnée.

Persister seulement les références nécessaires. Renommer la personne doit modifier le libellé
lu ; exécuter l'effacement autorisé doit supprimer les données personnelles sans copie résiduelle.
Lire le stockage indépendamment de la réponse et tester la référence devenue absente.

Avec la vraie base, le rôle protégé et des lignes existantes, tenter `UPDATE`, `DELETE` et
`TRUNCATE` en SQL brut, chacun dans une transaction distincte. Vérifier le refus identifié du
déclencheur et le contenu inchangé, sans accepter une erreur ORM ou de préparation à sa place.
La première publication permise réussit ; sa répétition et la modification d'un autre champ
échouent. La purge établie reste possible par son chemin autorisé, sans bypass du rôle ordinaire.

Mesurer les appels simultanés sur dix clients avec un adaptateur contrôlé : maximum quatre,
tous les résultats rendus. Exercer aussi collection vide, erreur d'un appel et résultat absent
selon le contrat, sans laisser d'appels détachés. Conserver la borne et la pagination des lectures.
Retirer chaque garde séparément : l'assertion ciblée doit échouer, puis passer après restauration.

## Protocole de comparaison

Figer acceptation et contrôles avant les essais. Donner à deux sessions fraîches la même fixture
et la consigne, sans les réponses attendues, avec base SQL dédiée et aucune ressource partagée.
Charger la version correspondante de `codebase-design/SKILL.md` et sa référence `dependencies.md`.
Les empreintes base/candidat et scénario figurent dans le fichier de résultats. Conserver modèle,
hôte, rôle SQL, commandes, sorties, contenu persistant et témoins restaurés. Distinguer inspection,
décisions et réparations réellement exécutées. Le gain exige un échec observé sans les ajouts
et un succès avec eux ; les contrôles du dépôt ne jouent pas ce scénario.
