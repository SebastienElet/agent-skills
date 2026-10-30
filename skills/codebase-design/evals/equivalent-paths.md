# Chemins multiples : conserver les variantes et lectures

Mini-dépôt fictif `shop-api` à construire en copies jetables, sans données ni services réels.
Ce scénario spécifie un exercice ; sa présence ne constitue aucune exécution.

## Consigne et fixture

Consigne : « Ajoutez le paiement en lot et l'aperçu de facture en conservant le comportement
unitaire et celui du document produit ; refusez les variantes qui ne sont pas disponibles. »

1. `createPayment()` écrit `id`, `amount` et `matchMode` avec `toPaymentRow()`. Le contrat admet
   `AUTO` et `EXPLICIT`, qui n'ont pas la même signification. Le chemin en lot écrit seulement
   `id` et `amount` ; le défaut DB `AUTO` transforme silencieusement un paiement explicite.
2. La production de facture appelle `readCarriedAdjustments()`, avec deux ajustements de 20
   et -5 unités minimales pour une facture de 100. L'aperçu fournit une liste vide : il affiche
   100 au lieu de 115. L'export et le rejeu proposé reprennent aussi cette liste vide.
3. La variante `DEFERRED` est reconnue à l'entrée mais n'est pas encore prise en charge par les
   nouveaux chemins. Le contrat exige son refus explicite avant toute écriture ou transmission.
   Fournir les composants réels de lecture, mapping et rendu ; aucune API publique n'est appelée.

## Acceptation et contrôles admis

Inventorier les données lues et écrites du chemin existant avant de créer les autres. Réutiliser
le même mappeur d'écriture et la même lecture des ajustements lorsque le comportement est commun,
sans créer de framework générique. Pour chaque mode pris en charge, comparer les lignes réellement
persistées par les chemins unitaire et en lot, en neutralisant seulement les identifiants générés.
Comparer aperçu, export et document produit sur les mêmes données : mêmes ajustements et total 115.
Le rejeu conserve ces valeurs sans reproduire l'effet ; il ne remet pas les ajustements à zéro.

Refuser `DEFERRED` avec l'erreur prévue et sans effet partiel ; ne pas le rabattre vers `AUTO`.
Exercer aussi un lot mixte, une collection vide et une lecture d'ajustements en échec selon le
contrat fourni. Un défaut silencieux ne remplace pas un refus. Contrôles admis : `AUTO` reste
valide, absence réelle d'ajustements produit le même total sur tous les chemins, et un mode
explicitement non porté reste refusé tant que son contrat n'est pas implémenté.

Pour chaque perte d'option ou de lecture, conserver la variante fautive, l'échec de l'assertion
sur le résultat observable et le succès restauré. Une comparaison de fonctions ou du texte du
mappeur n'établit pas l'équivalence des écritures ni des documents.

## Protocole de comparaison

Figer les critères avant exécution. Donner à deux contextes frais des copies identiques de
`shop-api`, la consigne et la fixture sans les réponses attendues. Charger les versions base
et candidate de `codebase-design/SKILL.md` et `references/dependencies.md`, liées dans les
résultats. Utiliser une base SQL locale dédiée pour la preuve de persistance ; aucun système
partagé. Conserver empreintes des instructions, scénario et fixture, modèle, hôte, commandes,
sorties, données persistées et témoins restaurés. Distinguer décisions et réparations exécutées.
Un gain exige un échec observé sans les ajouts et un succès avec eux ; ni format ni inspection
seuls ne le démontrent. Aucune publication n'est autorisée.
