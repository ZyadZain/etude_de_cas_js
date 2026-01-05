# Documentation — Menu.js

## Vue d'ensemble
- **But** : Fournir un menu dynamique et réutilisable (construction d'un <ul> avec <li> cliquables).
- **Rôle dans l'application** : central pour construire l'interface de navigation; il émet l'événement `menu_click` pour signaler les interactions.

## Constructeur `constructor(labels = [], esp = 20, disp = 0)`
- **Pourquoi** : initialise les labels, l'espacement (`esp`), l'orientation (`disp`) et crée automatiquement les éléments DOM.
- **Sinon** : on n'aurait pas d'objet `Menu` prêt à l'emploi — la solution serait de manuellement construire la liste DOM, attacher les listeners et gérer l'indexation.

## Méthode privée `_createItem(label, index)`
- **Pourquoi** : crée un `<li>` pour un label donné, lui attache un listener qui émet `menu_click` avec l'index.
- **Sinon** : la création d'items serait répétitive et sûrement dispersée.

## Méthode privée `_applyItemStyles(li)`
- **Pourquoi** : applique l'affichage (inline-block ou block) et les marges selon `disp` et `esp`.
- **Sinon** : le style serait appliqué manuellement à chaque item ou pourrait être non cohérent.

## Méthode privée `_refreshAllItemsStyles()`
- **Pourquoi** : réapplique `_applyItemStyles` à tous les `<li>` après un changement global (espacement/orientation).
- **Sinon** : appeler `setEsp` ou `setDisp` n'aurait pas d'effet visuel immédiat sur les éléments déjà créés.

## Méthode privée `_updateEventListeners()`
- **Pourquoi** : recrée les listeners click avec des indexes actualisés (utile après insertions/suppressions qui changent les index).
- **Sinon** : après une suppression ou insertion, les index transmis par `menu_click` seraient incorrects (décalage entre label et index), provoquant des erreurs logiques.

## `getObjDOM()`
- **Pourquoi** : retourne l'élément `<ul>` prêt à être inséré dans le DOM.
- **Sinon** : l'utilisateur de la classe n'aurait pas d'accès simple au conteneur DOM ; il devrait extraire ou reconstruire l'élément manuellement.

## `setEsp(esp)`
- **Pourquoi** : met à jour l'espacement puis rafraîchit les styles des items.
- **Sinon** : impossible d'ajuster dynamiquement l'espacement sans recréer les éléments du menu.

## `setDisp(disp)`
- **Pourquoi** : change l'orientation (horizontal/vertical) et rafraîchit le rendu.
- **Sinon** : l'orientation serait fixe à la création.

## `addItem(label)`
- **Pourquoi** : ajoute un élément à la fin, met à jour le tableau `labels`, attache le listener et applique le style. Si `Supplement` existe, applique un style navbar.
- **Sinon** : l'ajout se ferait manuellement (modifiable), avec risque d'oublier l'attachement de l'événement ou l'actualisation des indexes.

### À partir d'ici nous sortons du cadre des tâches demandées pour cette étude de cas pour essayer de rajouter quelques fonctionnalités supplémentaires non essentielles au fonctionnement de la classe Menu de départ ###


## `addItemAt(index = this.labels.length)`
- **Pourquoi** : ouvre un formulaire via `Supplement.InputForm` pour saisir un nouveau label et l'insère à la position donnée; met à jour l'UI et les listeners.
- **Sinon** : insertion interactive serait impossible; il faudrait fournir une alternative non visuelle pour insérer des éléments.
- **Remarque** : dépend de `Supplement`. Si `Supplement` est absent, la méthode avertit et ne fait rien.

## `applyNavbarStyle()`
- **Pourquoi** : délègue le styling global à `Supplement.styleMenuAsNavbar` (si présent) pour uniformiser l'apparence.
- **Sinon** : le menu garderait son style minimal par défaut ; on perdrait l'amélioration visuelle fournie par `Supplement`.

## `messageShutdown(duration)`
- **Pourquoi** : crée et lance une instance de `Supplement` pour afficher un message temporisé (compte à rebours), utilisé ici pour avertir d'un changement.
- **Sinon** : il n'y aurait pas de mécanisme intégré pour afficher un message de compte à rebours/alerte lié au menu.

## Interdépendances et conséquences globales
- `Menu` fonctionne seul pour les fonctions de base (clic avec message sur la console + changement d'orientation au bout de 5 secondes).
- Plusieurs méthodes appellent `Supplement` si disponible (styles, formulaires, messages, bouton burger). Sans `Supplement`, les fonctionnalités facultatives (formulaire d'insertion interactive, bouton burger, message visuel, style navbar) sont désactivées ou remplacées par des avertissements console.

