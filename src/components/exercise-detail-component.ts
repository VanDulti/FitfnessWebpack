import { html, render } from "lit-html"
import exerciseService from "../exercise-service"
import { Exercise } from "../model/exercise"
import store from "../model/store"

const template = html`
    <div class="close p-strawberry-300-color">⬤</div>
    <h1 id="name">Exercise Name</h1>
    <img id="image">
    <table>
        <tr>
            <th>Category</th>
            <td id="category"></td>
        </tr>
        <tr>
            <th>Bodypart</th>
            <td id="bodypart"></td>
        </tr>
    </table>
    <h2>Description</h2>
    <p id="description"></p>
`

class ExerciseDetailComponent extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }
    attributeChangedCallback(name: string, oldValue: string, value: string) {
        console.log(`attribute ${name} changed: ${oldValue} -> ${value}`)
        const id = parseInt(value)
        const exercise = store.value.exercises.find((value) => value.id == id)
        this.render(exercise)
    }
    connectedCallback() {
        console.log("ExerciseDetailComponent connected")
        exerciseService.fetch()
        store.subscribe(model => {
            const id = parseInt(this.getAttribute("id"))
            const exercise = model.exercises.find((value) => value.id == id)
            return this.render(exercise)
        })
    }
    private render(exercise: Exercise) {
        render(template, this.shadowRoot)
        if(exercise == undefined) return;
        const name = this.shadowRoot.querySelector('#name');
        const bodypart = this.shadowRoot.querySelector('#bodypart');
        const category = this.shadowRoot.querySelector('#category');
        const description = this.shadowRoot.querySelector('#description');
        const image: HTMLImageElement = this.shadowRoot.querySelector('#image');

        name.textContent = exercise.name;
        bodypart.textContent = exercise.body;
        category.textContent = exercise.category;
        description.textContent = exercise.description;
        image.src = exercise.image;
    }
}

customElements.define("exercise-detailed", ExerciseDetailComponent)
