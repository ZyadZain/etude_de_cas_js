# Documentation — Supplement.js

## Vue d'ensemble
- **But** : Fournir des utilitaires optionnels pour améliorer l'interface (formulaire, messages temporisés, bouton burger, style de navbar).
- **Rôle** : complémentaire à `Menu`; aucune méthode de `Supplement` n'est strictement nécessaire au fonctionnement de base du `Menu`.

## Constructeur `constructor(duration = 0, messageTemplate = "")`
- **Pourquoi** : initialise une instance destinée à afficher un message temporisé (compte à rebours) avec un modèle de texte.
- **Sinon** : les messages temporisés seraient impossibles à instancier proprement.

## Méthode statique `InputForm(labelText, placeholder = "")`
- **Pourquoi** : crée et retourne un composant DOM (label + input + bouton) centré, utilisé par `Menu.addItemAt` pour saisir un nouveau label.
- **Sinon** : l'ajout interactif via une UI simple ne serait pas disponible ; il faudrait une autre UI.

## Méthode d'instance `startMessage()`
- **Pourquoi** : affiche une `div` positionné, lance un intervalle décrémentant le compte à rebours et met à jour le texte à chaque seconde.
- **Sinon** : le feedback visuel de compte à rebours (posté au-dessus du contenu) n'existerait pas.

## Méthode d'instance `stopMessage()`
- **Pourquoi** : arrête l'intervalle et supprime le `div` du DOM.
- **Sinon** : risque de fuite d'intervalle (boucle continue).

## Méthode privée `_formatMessage(seconds)`
- **Pourquoi** : formate proprement le message en tenant compte du pluriel. Ex : remplace `{seconds}` et `{s}` dans le template.
- **Sinon** : message moins soigné.

## Méthode statique `btnBurgerForDisp(menu, valeur = "☰")`
- **Pourquoi** : crée un bouton visuel qui bascule l'orientation du `menu` (`menu.setDisp(...)`). Ajoute des effets visuels (scale au survol).
- **Sinon** : pas de contrôle visuel simple pour basculer `disp`.

## Méthode statique `styleMenuAsNavbar(ul)`
- **Pourquoi** : applique un style visuel global à l'élément `<ul>` (bord, padding, boxShadow, etc.) et ajoute des handlers de hover aux `<li>`.
- **Sinon** : le `Menu` présenterait un rendu par défaut moins travaillé.

## Conséquences de l'absence de `Supplement`
- Fonctionnalités optionnelles désactivées : formulaire modal (`InputForm`), messages temporisés (`startMessage`), bouton burger (`btnBurgerForDisp`) et style de navbar (`styleMenuAsNavbar`).
- Aucune rupture majeure pour les opérations essentielles du `Menu`, mais perte d'ergonomie et de retours visuels.

## Recommandations
- `Supplement` est une couche d'amélioration UI : la garder permet d'enrichir l'expérience sans lier fortement `Menu` à des dépendances lourdes.
- Toujours appeler `stopMessage()` si `startMessage()` est utilisé pour éviter fuites d'intervalle.
