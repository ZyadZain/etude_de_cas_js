/**
 * Classe Supplement - Fournit des fonctionnalités supplémentaires optionnelles.
 */
class Supplement {
    /**
     * Constructeur pour les messages temporisés.
     * @param {number} duration - Durée en secondes.
     * @param {string} messageTemplate - Modèle du message avec {seconds} et {s}.
     */
    constructor(duration = 0, messageTemplate = "") {
        this.duration = duration;
        this.messageTemplate = messageTemplate;
        this.div = null;
        this.interval = null;
    }

    /**
     * Crée un formulaire d'entrée avec un label, un input et un bouton.
     * @static
     * @param {string} labelText - Texte du label.
     * @param {string} placeholder - Placeholder pour l'input.
     * @returns {HTMLElement} Le conteneur du formulaire.
     */
    static InputForm(labelText, placeholder = "") {
        const container = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const button = document.createElement('button');

        label.textContent = labelText;
        input.placeholder = placeholder;
        button.textContent = "Ajouter";
        
        Object.assign(container.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            border: '2px solid #333',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: '1000'
        });
        
        Object.assign(input.style, {
            marginLeft: '10px',
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
        });
        
        Object.assign(button.style, {
            marginLeft: '10px',
            padding: '5px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        });
        
        container.append(label, input, button);
        return container;
    }

    /**
     * Démarre l'affichage du message temporisé.
     * @returns {Supplement} L'instance pour chaînage.
     */
    startMessage() {
        this.div = document.createElement('div');
        Object.assign(this.div.style, {
            position: 'fixed',
            textAlign: 'center',
            top: '200px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'yellow',
            padding: '15px 25px',
            border: '2px solid #333',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px',
            zIndex: '1000'
        });
        document.body.appendChild(this.div);

        let seconds = this.duration;
        this.div.textContent = this._formatMessage(seconds);
        
        this.interval = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                this.stopMessage();
            } else {
                this.div.textContent = this._formatMessage(seconds);
            }
        }, 1000);
        
        return this;
    }

    /**
     * Arrête et supprime le message temporisé.
     */
    stopMessage() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if (this.div) {
            this.div.remove();
            this.div = null;
        }
    }

    /**
     * Formate le message avec le nombre de secondes restantes.
     * @private
     * @param {number} seconds - Nombre de secondes.
     * @returns {string} Le message formaté.
     */
    _formatMessage(seconds) {
        const s = seconds !== 1 ? 's' : '';
        return this.messageTemplate
            .replace('{seconds}', seconds)
            .replace('{s}', s);
    }

    /**
     * Crée un bouton burger qui bascule l'orientation du menu.
     * @static
     * @param {Menu} menu - L'instance de Menu à contrôler.
     * @param {string} valeur - Le texte du bouton (par défaut "☰").
     * @returns {HTMLElement} Le bouton créé.
     */
    static btnBurgerForDisp(menu, valeur = "☰") {
        const button = document.createElement('button');
        button.textContent = valeur;
        Object.assign(button.style, {
            fontSize: '28px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            transition: 'transform 0.2s'
        });
        
        button.addEventListener('click', () => {
            const newDisp = menu.disp === 0 ? 1 : 0;
            menu.setDisp(newDisp);
        });
        
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
        
        return button;
    }

    /**
     * Applique un style sobre et élégant au menu passé en paramètre.
     * @static
     * @param {HTMLElement} ul - L'élément <ul> du menu à styler.
     */
    static styleMenuAsNavbar(ul) {
        Object.assign(ul.style, {
            background: 'white',
            margin: '0',
            padding: '10px',
            listStyle: 'none',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            width: 'fit-content',
        });

        const items = ul.querySelectorAll('li');
        items.forEach(li => {
            // Ne PAS toucher au display - laissé à Menu
            Object.assign(li.style, {
                
                // background: '#f0f0f0',
                // color: '#333',
                //border: '10px solid #ccc',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px'
            });
            
            li.addEventListener('mouseover', () => {
                //li.style.background = '#e0e0e0';
                //li.style.borderColor = '#999';
                li.style.transform = 'translateY(-2px)';
            });
            
            li.addEventListener('mouseout', () => {
                //li.style.background = '#f0f0f0';
                //li.style.borderColor = '#ccc';
                li.style.transform = 'translateY(0)';
            });
        });
    }
}