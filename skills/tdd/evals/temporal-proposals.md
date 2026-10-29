# Dates transmises et valeurs proposées

Dépôt fictif `shop-api`. Il s'agit d'une spécification de mini-dépôt, sans exécution implicite,
sans données personnelles ni service de transport réel.

## Consigne et fixture

Consigne : « Corrigez la préparation et l'export des livraisons ; toute date proposée doit être
acceptée et les règles d'adresse doivent rester cohérentes avec la facturation. »

1. `confirmDelivery()` refuse une date passée. `exportToCarrier()` transmet la date conservée
   sans la revérifier plusieurs jours plus tard.
2. Le contrat exige deux jours ouvrés de délai. `proposeDeliveryDate()` ne prend que le jour
   ouvré suivant. Fournir un calendrier explicite avec week-end, jour férié et fermeture :
   vendredi 2026-05-01 férié et lundi 2026-05-04 fermé. Depuis jeudi 2026-04-30, les deux jours
   ouvrés suivants sont mardi 5 et mercredi 6 mai ; la proposition attendue est le 6 mai.
3. La source canonique du module de facturation exige un code postal pour `FR`, `DE` et `ES`.
   Le nouveau validateur d'adresse ne l'exige que pour `FR`.

## Acceptation et contrôles admis

Avec une horloge injectée, confirmer une livraison au 6 mai puis avancer au 7 mai : l'export
refuse la date devenue passée, sans fichier ni transmission. Le même export avec une date
encore admissible réussit. Exercer le jour limite admis et le premier jour refusé à chaque
étape productrice ou transmettrice, selon la même règle métier.

Pour chaque date d'une plage couvrant ces fermetures et leurs veilles, faire passer la valeur
réellement proposée au vrai validateur avec la même horloge et le même calendrier. Vérifier
séparément l'exemple attendu du 6 mai ; ne pas recalculer l'attendu avec l'algorithme testé.
Une proposition produite auparavant repasse le validateur avec l'horloge de la transmission.

Réutiliser la source canonique des pays. Pour chacun des trois pays, refuser l'absence de code
postal et accepter une adresse valide ; un pays sans cette exigence reste accepté selon son
contrat. Ne pas recopier la table sous un autre nom. Ces règles appartiennent au seul cas fictif.
Conserver un témoin par défaut : export sans recontrôle, délai réduit et pays omis ; chaque
variante échoue par l'assertion pertinente, puis passe après restauration.

## Protocole de comparaison

Figer les critères avant les essais. Donner à deux contextes frais des copies jetables identiques
de `shop-api`, la consigne et le calendrier sans la section d'acceptation. Charger les versions
base et candidate de `tdd/SKILL.md`, `tdd/references/tests.md`, `tdd/references/dependencies.md`,
`codebase-design/SKILL.md` et `codebase-design/references/dependencies.md`. Les entrées sont liées
dans le fichier de résultats ; le scénario et la fixture restent identiques entre les sessions.
Conserver empreintes, modèle, hôte, fuseau, horloges, commandes, sorties et témoins restaurés.
Distinguer décision proposée et réparation exécutée. Un gain exige un échec observé sans les
ajouts et un succès avec eux ; un scénario écrit ou formaté ne démontre aucune amélioration.
