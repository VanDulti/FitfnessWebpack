import { html, render } from "lit-html"

import { Exercise } from "../model/exercise"
import exerciseService from "../exercise-service"
import store from "../model/store"
import router from "./app-component"

const tableTemplate = html`
    <link rel="stylesheet" href="/src/css/exercise-table.css"/>

    <div>
        <h1 class="title">Übungsübersicht</h1>
        <div style="font-family: Inter, sans-serif">
        <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" placeholder="Search by name or category" id="search-input">
            </div>
            <div class="control">
                <button class="button is-info" id="search-button">
                    Search
                </button>
            </div>
        </div>
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
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`

const rowTemplate = (exercise: Exercise) => html
    `<td>
        ${exercise.id}
    </td> 
    <td>
        ${exercise.name}
    </td>
    <td>
        ${exercise.category}
    </td> 
    <td>
        ${exercise.body}
    </td>`

class ExerciseTableComponent extends HTMLElement {
    private root: ShadowRoot
    private exerciseList: Exercise[] = []

    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        console.log("ExerciseTableComponent connected")

        exerciseService.fetch()
        store.subscribe(model => {
            this.exerciseList = model.exercises
            this.render(model.exercises)
        })

        const searchButton = this.root.querySelector("#search-button")
        searchButton.addEventListener("click", () => {
            const searchInput = this.root.querySelector("#search-input") as HTMLInputElement
            const searchTerm = searchInput.value.toLocaleLowerCase()
            const filteredExercises = this.exerciseList.filter(exercise => exercise.name.toLowerCase().includes(searchTerm))
            this.render(filteredExercises)
        })
    }
    private render(exercises: Exercise[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        body.innerHTML = ''
        exercises.forEach(exercise => {
            const row = body.insertRow()
            row.onclick = () => router.navigate(`/exercises/${exercise.id}`)
            render(rowTemplate(exercise), row)
        })
    }
}

customElements.define("exercise-table", ExerciseTableComponent)