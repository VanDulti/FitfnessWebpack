import Navigo from 'navigo';
import { html, render } from "lit-html"
import "./exercise-table-component"
import "./exercise-detail-component"

const appComponentTemplate = html`   
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

    <div class="card" style=""> 
        <div class="card-content">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <img src="Logo.png" width="150"/>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item" style="font-family: Inter, sans-serif;" href="/" data-navigo>
                            &nbsp;&nbsp;&nbsp;&nbsp;Home
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