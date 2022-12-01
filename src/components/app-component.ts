import {html, render} from "lit-html"

const appComponentTemplate = html`
    <h1>Helloo, World!</h1>
`

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }
    connectedCallback() {
        console.log("connected")
        this.render()
    }
    render() {
        render(appComponentTemplate, this.shadowRoot)    
    }
}
 
customElements.define("app-component", AppComponent)