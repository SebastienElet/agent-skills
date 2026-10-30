# Interrupteur : fournisseur livré et ouverture réelle

Mini-dépôt fictif `shop-api` à construire en copies jetables. Les environnements et la PR sont
fictifs ; aucune forge ni configuration personnelle d'agent n'est utilisée.

## Consigne et fixture

Consigne : « /pr-verdict sur la PR fictive des remboursements de `shop-api`, en lecture seule
et sans publication. Vérifiez que l'opération est utilisable dans les environnements prévus. »

1. L'opération refuse lorsque `flags.getBoolean('refunds.enabled', false)` est faux. Seuls ses
   tests installent un fournisseur simulé ouvert ; les tests sont verts. Le module réellement
   livré et l'amorçage n'enregistrent aucun fournisseur et toutes les exécutions restent fermées.
2. Le contrat de la fixture exige une ouverture hors production, en développement et en test,
   et une fermeture en production en attendant le service dédié. Le dépôt contient un
   `BootstrapFlagProvider` prévu à cet effet, mais non branché. Cette politique ne s'applique
   qu'à l'exercice ; aucune ouverture globale ne doit être déduite pour un autre dépôt.
3. Fournir une commande d'intégration chargeant le vrai module et son amorçage avec configuration
   isolée par environnement, sans fournisseur simulé. Un compteur persistant permet d'observer
   qu'un remboursement démarre, plutôt que seulement la valeur retournée par le flag.
4. Une copie de contrôle branche le fournisseur d'amorçage existant selon ce contrat. Le reviewer
   peut exécuter les commandes des deux copies sans les modifier ; aucun service distant requis.

## Acceptation et contrôles admis

Tracer l'enregistrement depuis l'amorçage livré jusqu'à l'opération. Identifier que le fournisseur
simulé masque l'absence du fournisseur réel. Sur la copie fautive, le test sans simulation doit
échouer par son assertion d'ouverture ; la seule réussite du test avec fournisseur simulé ne
prouve pas la disponibilité. Le rapport signale explicitement le défaut fermé sans fournisseur
et la preuve manquante dans la description de PR proposée, sans publier ni réparer le candidat.

Sur la copie corrigée fournie, charger le vrai module sans fournisseur de test : en développement
et en test, l'opération démarre et sa progression est observée ; en production, le refus prévu
persiste et aucun remboursement ne commence. Retenir les commandes, environnement et résultats.
Un interrupteur livré avec un fournisseur distant déjà conforme est aussi admissible sous son
contrat ; un substitut seul ne qualifie pas ce protocole distant. Ne pas imposer un second fournisseur.

Contrôles admis : production volontairement fermée, fournisseur réel déjà enregistré et contrat
prévoyant explicitement le report de disponibilité. Ne pas ouvrir tous les environnements pour
faire passer le test. Distinguer défaut démontré, preuve absente et décision de déploiement.

## Protocole de comparaison

Figer critères et contrôles. Deux contextes frais reçoivent les mêmes copies et la consigne sans
les réponses attendues. Charger la version correspondante de `pr-verdict/SKILL.md` et ses
références routées, en particulier `behavior-evidence.md`, selon les empreintes du fichier de
résultats. Le scénario autorise un verdict local sur des faits fictifs, aucune écriture externe.
Conserver empreintes des fixtures, instructions et scénario, modèle, hôte, configuration, commandes,
sorties, assertion fautive et contrôle corrigé. Comparer les constats et observations réelles ;
seul un échec observé sans les ajouts et un succès avec eux établissent un gain. Un scénario
écrit ou un test avec fournisseur simulé n'est pas cette comparaison.
