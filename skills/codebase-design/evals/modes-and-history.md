# Modes, historique et décisions explicites

Mini-dépôt fictif `shop-api` à préparer dans un espace jetable. Les modes et priorités décrits
sont le contrat de cet exercice, pas une politique validée pour un système réel.

## Consigne et fixture

Consigne : « Autorisez le nouveau mode de remboursement sans affaiblir l'ancien, restituez les
documents émis et conservez la désignation humaine avec les engagements existants. »

1. Le mode `A` impose `amount > 0` et une cible non nulle. Le nouveau mode `B` accepte zéro et
   l'absence de cible. Une migration remplace la contrainte commune par `amount >= 0`, sans
   enregistrer le mode, ce qui affaiblit aussi `A`. Les lignes anciennes sont toutes de mode `A`.
2. Un envoi émis possède `frozenSplit = [{ warehouse: 'w1', amount: 60 },
{ warehouse: 'w2', amount: 40 }]`. Le stock actuel produirait 40 et 60, même total 100.
   La restitution reconstruit depuis le stock courant au lieu des données figées à l'émission.
   Un envoi ancien sans snapshot dispose d'une lecture datée vérifiable à l'émission.
3. La facture `i1` porte une projection automatique du paiement `p1`, arrivé avant `p2`.
   La désignation humaine de `p2` vers `i1` était acceptée : libérer les affectations automatiques
   des autres paiements sur cette facture, puis les réaffecter dans l'ordre d'arrivée. Une
   nouvelle garde refuse désormais toute facture déjà affectée, y compris automatiquement.
4. Sur `i2`, une affectation est engagée par un plan explicite ; le refus de remplacement reste
   requis. Donner la provenance des affectations et les anciens tests d'acceptation, pour que
   projection automatique et engagement ne soient pas confondus.

## Acceptation et contrôles admis

Enregistrer le mode et limiter l'exception à `B`. Sur vraie base locale, accepter pour `A` un
montant positif avec cible ; refuser zéro, négatif ou cible absente. Pour `B`, accepter zéro
sans cible et un montant positif, refuser le négatif ; refuser un mode inconnu. Migrer les lignes
anciennes vers `A` sans perte ni exception rétroactive. Un test du texte SQL ne prouve pas cela.

Après modification du stock, restituer les lignes 60 et 40 du snapshot, pas seulement le total 100. Pour l'historique sans snapshot, utiliser la lecture à la date d'émission et comparer chaque
ligne si un recalcul est nécessaire. Si la preuve historique manque, ne pas présenter l'état
actuel comme l'historique ; rendre la limite explicite selon le contrat fourni.

La désignation humaine sur `i1` réussit, libère les seules projections concernées et réaffecte
selon l'ordre établi sans montant dupliqué. L'engagement du plan sur `i2` reste intact et le
remplacement refusé ne laisse aucune écriture partielle. Tout nouveau refus de l'ancien cas
accepté exige une justification par un changement de contrat et un test, pas une garde ajoutée
par commodité. Aucune modification de politique n'est autorisée dans ce scénario.

Contrôles admis : mode `A` inchangé, historique sans modification restitué à l'identique, autre
facture sans rapport préservée et engagement explicite toujours protégé. Pour chaque défaut,
observer l'assertion pertinente échouer sur la variante fautive puis passer après restauration.

## Protocole de comparaison

Figer les critères. Donner à deux sessions fraîches la même fixture et la consigne sans les
réponses attendues. Charger les versions base et candidate de `codebase-design/SKILL.md` et sa
référence `dependencies.md`, de `implement/SKILL.md` et du catalogue partagé
`pr-verdict/references/failure-classes.md` (classe 6), sans invoquer de verdict de PR.
Lier les instructions et le scénario selon les résultats ; conserver aussi empreintes de fixture,
modèle, hôte, rôle SQL, commandes, sorties et états avant/après. Base SQL dédiée, aucun service
partagé ni publication. Séparer décisions et réparations exécutées ; seul un échec observé sans
les ajouts et un succès avec eux établissent un gain. Une inspection seule ne le démontre pas.
