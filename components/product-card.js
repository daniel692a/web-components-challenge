class productCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode : 'open' });
    }
    static get observedAttributes() {
        return [ 'brand', 'img', 'product-name', 'price', 'collection', 'price-format'];
    }
    attributeChangedCallback(attr, oldValue, newValue) {
        const changeValue = oldValue !== newValue;
        if(attr === 'brand' && changeValue) {
            this.brand = newValue;
        }
        if(attr === 'img' && changeValue) {
            this.img = newValue;
        }
        if(attr === 'product-name' && changeValue) {
            this.productName = newValue;
        }
        if(attr === 'price' && changeValue) {
            this.price = newValue;
        }
        if(attr === 'collection' && changeValue) {
            this.collection = newValue;
        }
        if(attr === 'price-format' && changeValue) {
            this.priceFormat = newValue;
        }
    }
    getTemplate() {
        const template = document.createElement('template');
        const convertPrice = Intl.NumberFormat('en', {
            style : 'currency',
            currency : `${this.priceFormat}`,
        }).format(this.price);
        template.innerHTML = `
            <section class="container">
                <section class="show">
                    <h1>${this.brand}</h1>
                    <figure>
                    <img src="${this.img}" alt="${this.productName}">
                    </figure>
                </section>
                <section class="description">
                    <h2>${this.productName} <span>${this.collection}</span></h2>
                    <p><slot name="description"></slot></p>
                    <section class="buy">
                        <h3>${convertPrice}</h3>
                        <button>Buy Now</button>
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
                    --extra-size: 5rem;
                    --size-titles: 3rem;
                    --size-subtitle: 2.5rem;
                    --size-paragraph: 1.5rem;
                    --white: #efefef;
                    --width: auto;
                    width: 100%;
                }
                *{
                    padding: 0;
                    margin: 0;
                }
                .container {
                    padding: 2rem 0;
                    width: var(--width);
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .show {
                    background: var(--primary-color);
                }
                .show h1{
                    margin: 0;
                    padding: 2rem 0 0 3rem;
                    color: var(--secondary-color);
                    font-size: var(--extra-size);
                    text-transform: uppercase;
                    font-weight: 800;
                }
                .show figure{
                    margin: 0;
                }
                .show figure img{
                    width: 100%;
                }
                .description {
                    background: var(--white);
                    padding: 2rem;
                }
                .description h2 {
                    font-size: var(--size-titles);
                }
                .description h2 span {
                    font-size: var(--size-subtitle);
                    text-transform: uppercase;
                    color: gray;
                }
                .description p{
                    padding: 1rem;
                    font-size: var(--size-paragraph);
                }
                .description .buy{
                    margin-top: 2rem;
                    display: flex;
                    justify-content: space-around;
                }
                .description .buy h3{
                    font-size: 2rem;
                    color: gray;
                }
                .description .buy button{
                    padding: 1rem 2rem;
                    text-transform: uppercase;
                    font-weight: 600;
                    background: var(--primary-color);
                    outline: none;
                    border: none;
                    color: var(--white);
                    border-radius: 4rem;
                }
            </style>
        `;
    }
    connectedCallback() {
        this.render();
    }
}

customElements.define('product-card', productCard);