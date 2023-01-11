import { html, render } from "lit-html"

import { Exercise } from "../model/exercise"
import exerciseService from "../exercise-service"
import store from "../model/store"
import Navigo from "navigo"
import router from "./app-component"

const tableTemplate = html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="/src/css/exercise-table.css"/>

    <div>
        <h1 class="title">Übungsübersicht</h1>
        <div class="card"> 
            <div class="card-content">
                <table class="table">    
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Bodypart</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>`

const rowTemplate = (exercise: Exercise) => html
    `<td>${exercise.id}</td> <td>${exercise.name}</td><td>${exercise.category}</td> <td>${exercise.body}</td>`

class ExerciseTableComponent extends HTMLElement {
    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        console.log("ExerciseTableComponent connected")
        
        exerciseService.fetch()
        store.subscribe(model => this.render(model.exercises))
    }
    private render(exercises: Exercise[]) {      
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        exercises.forEach(exercise => {
            const row = body.insertRow()
            row.onclick = () => router.navigate(`/exercises/${exercise.id}`)
            render(rowTemplate(exercise), row)
        })
    }
}
customElements.define("exercise-table", ExerciseTableComponent)