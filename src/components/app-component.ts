import Navigo from 'navigo';
import { html, render } from "lit-html"
import "./exercise-table-component"
import "./exercise-detail-component"
import { Console } from 'console';

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
        console.log("connected")
        this.render()
        router.on({
            '/': () => {
                console.log("/")
                this.renderContent("exercise-table")
            },
            '/exercises/:id': ({ data }: any) => {
                console.log(data.id); // { id: 'xxx' }
                this.renderContent("exercise-detailed")
            }
        }).notFound(function () {
            console.log("/not found");
        }).resolve();
    }
    renderContent(selector: string) {
        const content = this.shadowRoot.querySelector("#content")
        for (const e of content.children) {
            (e as HTMLElement).style.display = "none"
        }
        const selected: HTMLElement = content.querySelector(selector)
        selected.style.display = "block"
    }
    render() {
        render(appComponentTemplate, this.shadowRoot)
    }
}

export default {router}

customElements.define("app-component", AppComponent)