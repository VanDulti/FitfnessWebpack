import { html, render } from "lit-html"
import exerciseService from "../exercise-service"
import { Exercise } from "../model/exercise"
import store from "../model/store"

const template = html`
    <link rel="stylesheet" href="/src/css/add-exercise.css"/>

    <div id="div">
        <h1 class="title">Add exercise</h1>
        <div class="card"> 
            <div class="card-content">
                <form>
                    <div class="field">
                        <label class="label">ID</label>
                        <div class="control">
                            <input id="id" name="idinput" class="input" type="text" disabled>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input id="name" class="input" type="text" placeholder="Name">
                        </div>
                    </div>
                    
                    <div class="field">
                        <label class="label">Category</label>
                        <div class="control">
                            <div class="select">
                                <select id="categorySelect"></select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Body</label>
                        <div class="control">
                            <div class="select">
                                <select id="bodySelect"></select>
                            </div>
                        </div>
                    </div>
                
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea id="description" class="textarea" placeholder="Description"></textarea>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Image</label>
                        <div class="control">
                            <input id="image" class="input" type="text" placeholder="Imagelink">
                        </div>
                    </div>
                
                    <div class="field">
                        <div class="control">
                            <button id="submit" class="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>`


class AddExerciseComponent extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })

    }

    connectedCallback() {
        console.log("AddExerciseComponent connected")
        exerciseService.fetch()

        store.subscribe(model => {
            return this.render(model.exercises)
        })
    }

    private render(exercises: Exercise[]) {
        render(template, this.shadowRoot)

        const id: HTMLInputElement = this.shadowRoot.querySelector('#id')
        const name: HTMLInputElement = this.shadowRoot.querySelector('#name')
        const categorySelect: HTMLInputElement = this.shadowRoot.querySelector('#categorySelect')
        const bodySelect: HTMLInputElement = this.shadowRoot.querySelector('#bodySelect')
        const description: HTMLInputElement = this.shadowRoot.querySelector('#description')
        const image: HTMLInputElement = this.shadowRoot.querySelector('#image')

        //Set the ID inputfield
        id.value = Math.floor(Math.random() * 100000).toString()

        //Set the selectlist with categories
        categorySelect.innerHTML = ''
        const categories = new Set(exercises.map((exercise) => exercise.category))
        categories.forEach(category => {
            let opt = document.createElement('option')
            opt.value = category
            opt.innerHTML = category
            categorySelect.appendChild(opt)
        })

        //Set the selectlist with bodyparts
        bodySelect.innerHTML = ''
        const bodyparts = new Set(exercises.map((exercise) => exercise.body))
        bodyparts.forEach(body => {
            let opt = document.createElement('option')
            opt.value = body
            opt.innerHTML = body
            bodySelect.appendChild(opt)
        })

        this.shadowRoot.querySelector("form").addEventListener("submit", function () {
            const newExercise: Exercise = {
                id: parseInt(id.value),
                name: name.value,
                category: categorySelect.value,
                body: bodySelect.value,
                description: description.value,
                image: image.value
            }
            exerciseService.postData(newExercise)
        });
    }
}

customElements.define("add-exercise", AddExerciseComponent)