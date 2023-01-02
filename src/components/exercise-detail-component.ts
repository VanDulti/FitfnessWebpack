import { html, render } from "lit-html"
import exerciseService from "../exercise-service"
import { Exercise } from "../model/exercise"
import store from "../model/store"

const template = html`
    <head>    
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    </head>

    <h1 id="name" class="title" style="font-family: Verdana, sans-serif;width: 1000px;margin: 0 auto;"></h1>
    <br>

    <div class="card" style="font-family: Verdana, sans-serif;width: 1000px;margin: 0 auto;"> 
        <div class="card-content" style="font-family: Verdana, sans-serif;margin: 0 auto;">
            <div style="text-align: center;">
            <img id="image">
            </div>
            <table style="font-family: Verdana, sans-serif;">
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
                    <td id="description" style="white-space:pre-line;"></td>
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
