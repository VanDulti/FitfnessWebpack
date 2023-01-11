import { html, render } from "lit-html"
import exerciseService from "../exercise-service"
import { Exercise } from "../model/exercise"
import store from "../model/store"

const template = html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="/src/css/exercise-detail.css"/>

    <div id="card" class="card"> 
         <div class="card-content">
            <h1 id="name" class="title"></h1>
            <div id="image-div">
                <img id="image">
            </div>
            <table>
                <tr>
                    <th>Category:</th>
                    <td id="category"></td>
                </tr>
                <tr>
                    <th>Bodypart:</th>
                    <td id="bodypart"></td>
                </tr>
                <tr>
                    <th>Description:</th>
                    <td id="description"></td>
                </tr>
            </table>
        </div>
    </div>`

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
        if (exercise == undefined) return
        const name = this.shadowRoot.querySelector('#name')
        const bodypart = this.shadowRoot.querySelector('#bodypart')
        const category = this.shadowRoot.querySelector('#category')
        const description = this.shadowRoot.querySelector('#description')
        const image: HTMLImageElement = this.shadowRoot.querySelector('#image')

        name.textContent = exercise.name;
        bodypart.textContent = exercise.body;
        category.textContent = exercise.category;
        description.textContent = exercise.description;
        image.src = exercise.image;
    }
}

customElements.define("exercise-detailed", ExerciseDetailComponent)
