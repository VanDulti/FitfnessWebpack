import Navigo from 'navigo';
import { html, render } from "lit-html"
import "./exercise-table-component"
import "./exercise-detail-component"
import "./add-exercise-component"

const appComponentTemplate = html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

    <div class="card" style=""> 
        <div class="card-content">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <img src="logo.png" width="150"/>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item" style="font-family: Inter" href="/" data-navigo>
                            Home
                        </a>
                        <a class="navbar-item" style="font-family: Inter, sans-serif;" href="/add" data-navigo>
                            Add
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>

    <br><br>
    <div style="width: 1500px; margin: 0 auto;">
        <div id="content">
            <exercise-table></exercise-table>
            <exercise-detailed></exercise-detailed>
            <add-exercise></add-exercise>
        </div>
    </div>`

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
            },
            '/add': () => {
                console.log("/add");
                this.showAddExercise()
            }
        }).notFound(function () {
            console.log("/not found");
        }).resolve();
    }

    showAddExercise(){
        const addExercise: HTMLElement = this.shadowRoot.querySelector("add-exercise")
        addExercise.style.display = "block"

        const details: HTMLElement = this.shadowRoot.querySelector("exercise-detailed")
        details.style.display = "none"

        const table: HTMLElement = this.shadowRoot.querySelector("exercise-table")
        table.style.display = "none"
    }

    showDetails(id: number) {
        const addExercise: HTMLElement = this.shadowRoot.querySelector("add-exercise")
        addExercise.style.display = "none"

        const table: HTMLElement = this.shadowRoot.querySelector("exercise-table")
        table.style.display = "none"

        const details: HTMLElement = this.shadowRoot.querySelector("exercise-detailed")
        details.setAttribute("id", id.toString())
        details.style.display = "block"
    }

    showTable() {
        const addExercise: HTMLElement = this.shadowRoot.querySelector("add-exercise")
        addExercise.style.display = "none"

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