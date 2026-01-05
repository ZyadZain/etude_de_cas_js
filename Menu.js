/**
 * Classe Menu - Crée un menu navigable avec des éléments cliquables.
 * Cette classe est indépendante et peut fonctionner sans la classe Supplement.
 */
class Menu {
    /**
     * Constructeur de la classe Menu.
     * @param {string[]} labels - Tableau des labels pour les éléments du menu.
     * @param {number} esp - Espacement entre les éléments (en px).
     * @param {number} disp - Orientation : 0 pour horizontal, 1 pour vertical.
     */
    constructor(labels = [], esp = 20, disp = 0) {
        this.labels = [...labels];
        this.esp = esp;
        this.disp = disp;
        this.ul = document.createElement('ul');

        this.labels.forEach((label, index) => {
            this._createItem(label, index);
        });
    }

    /**
     * Crée un élément <li> pour un label donné.
     * @private
     * @param {string} label - Le texte du label.
     * @param {number} index - L'index de l'élément.
     * @returns {HTMLElement} L'élément <li> créé.
     */
    _createItem(label, index) {
        const li = document.createElement('li');
        li.textContent = label;
        li.style.cursor = 'pointer';
        this._applyItemStyles(li);

        li.addEventListener('click', () => {
            const event = new CustomEvent('menu_click', {
                detail: { index: index }
            });
            this.ul.dispatchEvent(event);
        });

        this.ul.appendChild(li);
        return li;
    }

    /**
     * Applique les styles d'espacement et d'orientation à un élément <li>.
     * @private
     * @param {HTMLElement} li - L'élément <li> à styler.
     */
    _applyItemStyles(li) {
        if (this.disp === 0) { // Horizontal
            li.style.display = 'inline-block';
            li.style.marginRight = this.esp + 'px';
            li.style.marginBottom = '0';
        } else { // Vertical
            li.style.display = 'block';
            li.style.marginBottom = this.esp + 'px';
            li.style.marginRight = '0';
        }
    }

    /**
     * Rafraîchit les styles de tous les éléments <li>.
     * @private
     */
    _refreshAllItemsStyles() {
        const items = this.ul.querySelectorAll('li');
        items.forEach(li => this._applyItemStyles(li));
    }

    /**
     * Met à jour les event listeners de tous les items avec les bons index.
     * @private
     */
    _updateEventListeners() {
        const items = this.ul.querySelectorAll('li');
        items.forEach((li, idx) => {
            const newLi = li.cloneNode(true);
            newLi.addEventListener('click', () => {
                const event = new CustomEvent('menu_click', {
                    detail: { index: idx }
                });
                this.ul.dispatchEvent(event);
            });
            li.replaceWith(newLi);
            this._applyItemStyles(newLi);
        });
    }

    /**
     * Retourne l'élément DOM <ul> du menu.
     * @returns {HTMLElement} L'élément <ul>.
     */
    getObjDOM() {
        return this.ul;
    }

    /**
     * Définit l'espacement entre les éléments.
     * @param {number} esp - L'espacement en px.
     * @returns {Menu} L'instance de Menu pour chaînage.
     */
    setEsp(esp) {
        this.esp = esp;
        this._refreshAllItemsStyles();
        return this;
    }

    /**
     * Définit l'orientation du menu.
     * @param {number} disp - 0 pour horizontal, 1 pour vertical.
     * @returns {Menu} L'instance de Menu pour chaînage.
     */
    setDisp(disp) {
        this.disp = disp;
        this._refreshAllItemsStyles();
        return this;
    }

    /**
     * Ajoute un nouvel élément à la fin du menu.
     * @param {string} label - Le label du nouvel élément.
     * @returns {Menu} L'instance de Menu pour chaînage.
     */
    addItem(label) {
        const index = this.labels.length;
        this.labels.push(label);
        this._createItem(label, index);

        if (typeof Supplement !== 'undefined') {
            Supplement.styleMenuAsNavbar(this.ul);
        }

        return this;
    }

    /*
       À partir d'ici nous sortons du cadre des tâches demandées pour cette étude
       de cas pour essayer de rajouter quelques fonctionnalités supplémentaires 
       non essentielles au fonctionnement de la classe Menu de départ
    */

    /**
     * Ajoute un nouvel élément à une position spécifique via un formulaire.
     * @param {number} index - L'index où insérer le nouvel élément.
     * @returns {Menu} L'instance de Menu pour chaînage.
     */
    addItemAt(index = this.labels.length) {
        if (typeof Supplement === 'undefined') {
            console.warn('Supplement non disponible pour addItemAt');
            return this;
        }

        const inputForm = Supplement.InputForm("Entité: ", "Entrez le nom de l'entité");
        const input = inputForm.querySelector('input');
        const submitButton = inputForm.querySelector('button');

        document.body.appendChild(inputForm);

        submitButton.addEventListener('click', () => {
            let number = 1;
            while (this.labels.includes(`Nouveau ${number}`)) {
                number++;
            }
            const newLabel = input.value.trim() || `Nouveau ${number}`;

            // Insertion dans le tableau
            this.labels.splice(index, 0, newLabel);

            // Création du nouvel item
            const newLi = document.createElement('li');
            newLi.textContent = newLabel;
            newLi.style.cursor = 'pointer';
            this._applyItemStyles(newLi);

            // Insertion dans le DOM
            const targetLi = this.ul.children[index];
            if (targetLi) {
                this.ul.insertBefore(newLi, targetLi);
            } else {
                this.ul.appendChild(newLi);
            }

            // Mise à jour des event listeners
            this._updateEventListeners();

            // Style optionnel
            if (typeof Supplement !== 'undefined') {
                Supplement.styleMenuAsNavbar(this.ul);
            }

            // Suppression du formulaire après un ajout 
            //inputForm.remove();
        });

        return this;
    }

    /**
     * Applique un style de navbar au menu.
     * @returns {Menu} L'instance de Menu pour chaînage.
     */
    applyNavbarStyle() {
        if (typeof Supplement !== 'undefined') {
            Supplement.styleMenuAsNavbar(this.ul);
        }
        return this;
    }

    /**
     * Affiche un message de compte à rebours.
     * @param {number} duration - La durée du compte à rebours en secondes.
     * @returns {Supplement} L'instance de Supplement pour le message.
     */
    messageShutdown(duration) {
        if (typeof Supplement === 'undefined') {
            console.warn('Supplement non disponible pour messageShutdown');
            return null;
        }

        const message = new Supplement(duration, "Le menu va changer de sens dans {seconds} seconde{s}...");
        message.startMessage();
        return message;
    }
}

let labels = ["Accueil", "Produits", "Contact"];
let menu = new Menu(labels, 50, 0);
let menuObj = menu.getObjDOM();

menuObj.addEventListener('menu_click', evt =>
    console.log(`Clic sur ${menu.labels[evt.detail.index]}`));

//Fonctionnalité Optionnelle - Appliquer le style navbar
menu.applyNavbarStyle();
document.body.appendChild(menuObj);

//Fonctionnalité Optionnelle - Ajouter un item à la position 1 (après "Accueil")
menu.setEsp(100).addItemAt(labels.length);

//Fonctionnalité Optionnelle - Message de countdown
menu.messageShutdown(5);

// Changement après 5 secondes
setTimeout(() => {
    menu.setEsp(100).setDisp(1).addItem('Test');
}, 5000);

//Fonctionnalité Optionnelle - Bouton burger
const burgerBtn = Supplement.btnBurgerForDisp(menu);
document.body.appendChild(burgerBtn);