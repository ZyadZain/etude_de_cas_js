class Menu {


    constructor(labels = [], esp = 20, disp = 0){
        this.labels = [...labels];
        this.esp = esp;
        this.disp = disp;

        // Création de l'élément <ul>
        this.ul = document.createElement('ul');
        this.ul.style.listStyle = 'none';
        this.ul.style.padding = '0';
        this.ul.style.margin = '0';

        // Création des items
        this.labels.forEach((lablel, index) => {
            this._createItem(lablel, index);
        });
    }

    _createItem(label, index){
        const li = document.createElement('li');
        li.textContent = label;
        li.style.cursor = 'pointer';

        //Application de l'espacement et de l'orientation
        this._applyItemStyles(li);

        //Gestion du clic
        li.addEventListener('click', () => {
            const event = new CustomEvent('menu_click', {
                detail: {index: index}
            });
            this.ul.dispatchEvent(event);
        });
        this.ul.appendChild(li);
    }

    _applyItemStyles(li){
        if(this.disp === 0){
            li.style.display = 'inline-block';
            li.style.marginRight = this.esp + 'px';
        } else {
            li.style.display = 'block';
            li.style.marginBottom = this.esp + 'px';
        }
    }

    _refreshAllItemsStyles(){
        const items = this.ul.querySelectorAll('li');
        items.forEach(li => this._applyItemStyles(li));
    }

    getObjDOM(){
        return this.ul;
    }

    setEsp(esp){
        this.esp = esp;
        this._refreshAllItemsStyles();
        return this;
    }

    setDisp(disp){
        this.disp = disp;
        this._refreshAllItemsStyles();
        return this;
    }

    addItem(label){
        const index = this.labels.length;
        this.labels.push(label);
        this._createItem(label, index);
        return this;
    }
    
}



let labels = ["Accueil", "Produits", "Contact"];
let menu = new Menu(labels);
let menuObj = menu.getObjDOM();
menuObj.addEventListener('menu_click', evt =>
    console.log(`Clic sur ${menu.labels[evt.detail.index]}`));
document.body.appendChild(menuObj);

setTimeout(() => {
    menu.setEsp(100).setDisp(1).addItem('Test');
}, 5000);