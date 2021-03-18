class productCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode : 'open' });
    }
    getTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="container">
                <section class="show">
                    <h1></h1>
                    <img src="" alt="">
                </section>
                <section class="description">
                    <h2></h2>
                    <p></p>
                    <section class="buy">
                        <h3></h3>
                        <button></button>
                    </section>
                </section>
            </section>
            ${this.getStyles()}
        `;
        return template;
    }
    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
    getStyles() {
        return `
            <style>
                :host {
                    --primary-color: #fff;
                    --secondary-color: #121212;
                    --size-titles: 3rem;
                    --size-subtitle: 2rem;
                    --size-paragraph: 1.5rem;
                    --width: auto;
                    width: var(--width);
                }
            </style>
        `;
    }
    connectedCallback() {
        this.render();
    }
}

customElements.define('product-card', productCard);