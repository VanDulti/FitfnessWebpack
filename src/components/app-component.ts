import {html, render} from "lit-html"
import "./exercise-table-component"
import "./exercise-component"

const appComponentTemplate = html`
    <exercise-table-component id="table"></exercise-table-component>
    <exercise-component></exercise-component>
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
        const exerciseTable = this.shadowRoot.getElementById("table")
        const exerciseComponent: HTMLElement = this.shadowRoot.querySelector("exercise-component")
        exerciseTable.addEventListener("exercise-selected", (e: CustomEvent) => {
            const exercise = e.detail?.exercise
            console.log("exercise-selected", exercise)
            exerciseComponent.setAttribute("id", exercise.id)
            exerciseTable.style.display = "none"
            exerciseComponent.style.display = "block"
        })
    }
}
 
customElements.define("app-component", AppComponent)