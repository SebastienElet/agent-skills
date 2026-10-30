# Opérations en plusieurs étapes : ordre et reprise

Dépôt fictif `shop-api`, sans données ni services réels. Ce document spécifie un mini-dépôt
à construire ; aucun scénario n'est exécuté par sa seule présence.

## Consigne et fixture

Consigne : « Corrigez les remboursements et notifications sans doublon ni état bloqué ;
conservez la preuve des refus et des reprises après interruption. »

Fournir les mêmes données et défauts aux deux sessions :

1. `executeRefund()` écrit avant de réserver, puis passe de `VALIDATED` à `EXECUTED`.
   `cancelRefund()` peut gagner entre l'écriture et la transition. Un autre chemin réserve avant
   de contrôler période, permission et pièce ; un refus laisse `reserved_by` renseigné.
2. Pour une commande de 40 unités minimales, deux avoirs de 30 relisent tous deux le reste
   initial. Le résultat fautif est 60. Chaque écriture doit laisser un reste non négatif.
3. `onPaymentRejected()` annule l'écriture, marque l'événement reçu, puis échoue avant
   `notifySupport()`. Au rejeu, `seen(event.id)` provoque un retour anticipé.
4. Le total reversé est indexé par affectation technique. Après refus et réaffectation avec un
   nouvel ID pour la même paire commande/payeur, le même montant est compté deux fois.
   Le contrat calcule les affectations actives moins les reversements non libérés, par cette
   paire métier, avec un résultat jamais négatif.
5. Une demande liée reste traitée après annulation de son événement et interdit son remplacement.
   Un test de refus échoue sur un conflit de réservation au lieu de l'assertion métier attendue.
6. `POST /refunds` repose seulement sur `UNIQUE(request_id)` : le second envoi reçoit `409` au
   lieu de la réponse d'origine. Le mécanisme commun du dépôt conserve une réponse sans données
   personnelles et gère la reprise ; une route nouvelle l'a contourné.
7. Deux comparaisons utilisent `JSON.stringify()` : `{ amount: 10, orderId: 'o1' }` et
   `{ orderId: 'o1', amount: 10 }` sont considérés différents. Une interruption peut survenir
   pendant la création, avant ou après la persistance de l'effet, sans réponse reçue par le client.

## Acceptation et contrôles admis

Ordonner contrôles, réservation atomique, effet idempotent et transition. Sur une vraie base,
avec connexions distinctes et barrières déterministes, tenter une annulation entre chaque étape.
Si elle gagne avant réservation, aucun effet n'est écrit ; après réservation, elle ne peut
invalider l'écriture protégée. Chaque refus de contrôle laisse la demande non réservée et
reprenable. Un échec après réservation suit la récupération prévue, sans réservation abandonnée.

Les avoirs écrivent 30 puis 10, total 40, reste 0. Interrompre puis rejouer la notification :
l'annulation n'est pas répétée et la notification idempotente est finalement émise une fois.
Changer l'ID technique sans changer commande/payeur ne renouvelle pas le montant disponible ;
une autre paire métier reste indépendante. Annuler l'événement lié doit mettre à jour le statut
dérivé et permettre le remplacement prévu au contrat.

Par le mécanisme commun, le premier envoi crée une ligne et rend `201` avec un corps contenant
l'identifiant créé. Rejouer avec la même clé, y compris avec l'ordre des clés inversé : même
statut et corps, aucune seconde création ni réponse de conflit. Injecter une interruption avant
puis après la persistance et rejouer jusqu'à la réponse d'origine, sans effet doublé. Comparer
les charges par condensat canonique aux deux points de comparaison ; même clé avec montant 11
au lieu de 10 reçoit `422`, sans modification. Une autre clé métier reste indépendante. Lire la
réponse stockée pour vérifier l'absence des données personnelles prévues par la fixture.

Pour chaque oracle ajouté, conserver une variante fautive, l'échec de son assertion ciblée et
le succès après restauration. Une exception de conflit dans la préparation ne vaut pas ce témoin.
Contrôles admis : remboursement valide terminé, rejeu terminé sans doublon, annulation avant
réservation et correction d'une pièce refusée suivie d'une tentative réussie.

## Protocole de comparaison

Figer les critères avant exécution. Construire deux copies jetables identiques du mini-dépôt,
avec vraie base locale dédiée, sans ressource partagée. Fournir à deux contextes frais la même
consigne et la fixture, sans les réponses attendues ; charger, pour chaque version, `tdd/SKILL.md`,
ses références `tests.md` et `dependencies.md`, ainsi que `codebase-design/SKILL.md` et sa
référence `dependencies.md`. La base est la révision indiquée dans le fichier de résultats ;
le candidat est l'arbre indexé final. Aucun verdict de PR ni publication n'est demandé.
Conserver empreintes des instructions, fixture et scénario, version du modèle, hôte, base SQL,
commandes, sorties, états persistés et témoins. Comparer décisions et réparations exécutées
séparément. Seuls un échec observé sans les ajouts et un succès avec eux établissent un gain ;
une inspection ou des contrôles de format ne suffisent pas.
