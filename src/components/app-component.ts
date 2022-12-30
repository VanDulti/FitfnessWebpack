import Navigo from 'navigo';
import { html, render } from "lit-html"
import "./exercise-table-component"
import "./exercise-detail-component"

const appComponentTemplate = html`
    <h1>Fitfness</h1>
    <nav><a href="/" data-navigo>Home</a></nav>
    <div id="content">
        <exercise-table></exercise-table>
        <exercise-detailed></exercise-detailed>
    </div>
`

const router = new Navigo('/');

class AppComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        console.log("AppComponent connected")
        this.render()
        router.on({
            '/': () => {
                console.log("/")
                this.showTable()
            },
            '/exercises/:id': ({ data }: any) => {
                console.log(data.id);
                this.showDetails(data.id)
            }
        }).notFound(function () {
            console.log("/not found");
        }).resolve();
    }

    showDetails(id: number) {
        const table: HTMLElement = this.shadowRoot.querySelector("exercise-table")
        table.style.display = "none"

        const details: HTMLElement = this.shadowRoot.querySelector("exercise-detailed")
        details.setAttribute("id", id.toString())
        details.style.display = "block"
    }

    showTable() {
        const details: HTMLElement = this.shadowRoot.querySelector("exercise-detailed")
        details.style.display = "none"

        const table: HTMLElement = this.shadowRoot.querySelector("exercise-table")
        table.style.display = "block"
    }

    render() {
        render(appComponentTemplate, this.shadowRoot)
    }
}

export default router

customElements.define("app-component", AppComponent)