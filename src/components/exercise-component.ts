import { html, render } from "lit-html"
import exerciseService from "../exercise-service"
import { Exercise } from "../model/exercise"
import store from "../model/store"

const template = html`
    <div id="exercise-details-container" class="p-shadow-2">
    <div class="close p-strawberry-300-color">⬤</div>
    <h1 class="name">Exercise Name</h1>
    <img class="image">
    <table>
        <tr>
            <th>Category</th>
            <td class="category"></td>
        </tr>
        <tr>
            <th>Bodypart</th>
            <td class="bodypart"></td>
        </tr>
    </table>
    <h2>Description</h2>
    <p class="description"></p>
    </div>
`

class ExerciseComponent extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log("TODO: display user", value)
    }
    connectedCallback() {
        exerciseService.fetch()
        store.subscribe(model => this.render(model.exercises[parseInt(this.getAttribute("id"))]))
        console.log("exercise details connected")
    }
    private render(exercise: Exercise) {
        const name = this.querySelector('.name');
        const bodypart = this.querySelector('.bodypart');
        const category = this.querySelector('.category');
        const description = this.querySelector('.description');
        const image = this.querySelector<HTMLImageElement>('.image');

        name.textContent = exercise.name;
        bodypart.textContent = exercise.body;
        category.textContent = exercise.category;
        description.textContent = exercise.description;
        image.src = exercise.image;

        render(template, this.shadowRoot)
    }
}

customElements.define("exercise-selected", ExerciseComponent)
