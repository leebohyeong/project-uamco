const DropdownSelect = class {
    constructor(target) {
        this.select = typeof target === 'string' ? document.querySelector(`${target}`) : target;
        this.selectActive = 'dropdown--active';
        this.result = document.querySelector('.dropdown__result');
        this.control = this.select.querySelector('.dropdown__control');
        this.controlHeight = this.control.clientHeight;
        this.title = this.select.querySelector('.dropdown__title');
        this.container = this.select.querySelector('.dropdown__container');
        this.list = this.select.querySelector('.dropdown__list');
        this.items = Array.from(this.select.querySelectorAll('.dropdown__item'));
        this.buttons = Array.from(this.select.querySelectorAll('.dropdown__button'));
        this.name = '.dropdown__name';
        this.duration = (this.items.length * 0.2).toFixed(1);

        this.init();
        this.onEvents();
    }

    init() {
        this.container.style.transitionDuration = `${this.duration}s`;
    }

    toggle() {
        const isToggle = this.select.classList.contains(`${this.selectActive}`);
        const isClassListMethod = isToggle ? 'remove' : 'add';

        this.select.classList[isClassListMethod](`${this.selectActive}`);
        this.container.style.height = `${isToggle ? this.controlHeight : this.control.clientHeight + this.list.clientHeight}px`;
    }

    close() {
        this.select.classList.remove(`${this.selectActive}`);
        this.container.style.height = `${this.controlHeight}px`;
    }

    onEvents() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.title.textContent = button.querySelector(`${this.name}`).textContent;
                this.result.value = button.value;
            });
        });

        document.addEventListener('click', (event) => {
            if (!!event.target.closest('.dropdown')) {
                this.toggle();

                return;
            }

            this.close();
        });
    }
}

export default DropdownSelect;