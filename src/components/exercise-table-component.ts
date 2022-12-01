import { html, render } from "lit-html"

import { Exercise } from "../model/exercise"
import exerciseService from "../exercise-service"
import store from "../model/store"


const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
   
    <h1>Fitfness </h1>
    <table class="w3-table w3-striped w3-bordered">    
        <thead>
            <tr>
            <th>Id</th><th>Name</th><th>Category</th><th>Bodypart</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>`


const rowTemplate = (exercise: Exercise) => html
    `<td>${exercise.id}</td> <td>${exercise.name}</td><td>${exercise.category}</td> <td>${exercise.body}</td>`

class ExerciseTableComponent extends HTMLElement {
    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        exerciseService.fetch()
        store.subscribe(model => this.render(model.exercises))
    }
    private render(users: Exercise[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        users.forEach(exercise => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("exercise-selected", { detail: { exercise: exercise } })
                this.dispatchEvent(event)
            }
            render(rowTemplate(exercise), row)
        })
    }
}
customElements.define("exercise-table-component", ExerciseTableComponent)