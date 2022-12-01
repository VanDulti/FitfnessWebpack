import {html, render} from "lit-html"
import "./bodypart-table-component"
import "./exercice-component"

const appComponentTemplate = html`
    <bodypart-table-component id="table"></bodypart-table-component>
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
        const userTableComponent = this.shadowRoot.getElementById("table")
        const userComponent: HTMLElement = this.shadowRoot.querySelector("exercice-component")
        userTableComponent.addEventListener("exercice-selected", (e: CustomEvent) => {
            const user = e.detail.user
            console.log("user selected", user)
            userComponent.setAttribute("id", user.id)
            userTableComponent.style.display = "none"
            userComponent.style.display = "block"
        })
    }
}
 
customElements.define("app-component", AppComponent)