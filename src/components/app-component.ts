import Navigo from 'navigo'
import { html, render } from "lit-html"
import "./exercise-table-component"
import "./exercise-detail-component"
import "./add-exercise-component"

const appComponentTemplate = html`
    <link rel="stylesheet" href="/src/css/main.css"/>

    <div class="card"> 
        <div class="card-content">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <a href="/" data-navigo><img src="/logo.png" width="150"/></a>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item"  href="/" data-navigo>
                            Home
                        </a>
                        <a class="navbar-item" href="/add" data-navigo>
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

const router = new Navigo('/')

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
                this.showTable()
                console.log("/")
            },
            '/exercises/:id': ({ data }: any) => {
                this.showDetails(data.id)
                console.log(data.id)
            },
            '/add': () => {
                console.log("/add");
                this.showAddExercise()
            }
        }).resolve()
    }

    render() {
        render(appComponentTemplate, this.shadowRoot)
    }

    showAddExercise() {
        const addExercise: HTMLElement = this.shadowRoot.querySelector("add-exercise")
        addExercise.style.display = "block"

        const details: HTMLElement = this.shadowRoot.querySelector("exercise-detailed")
        details.style.display = "none"

        const table: HTMLElement = this.shadowRoot.querySelector("exercise-table")
        table.style.display = "none"
    }

    showAddExercise() {
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
}

export default router

customElements.define("app-component", AppComponent)