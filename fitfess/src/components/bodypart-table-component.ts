import {html, render} from "lit-html"

import { User } from "../model/user"
import userService from "../user-service"
import store from "../model/store"


const tableTemplate = html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
   
    <h1>Fitfness </h1>
    <table class="w3-table w3-striped w3-bordered">    
        <thead>
            <tr>
            <th>Name</th><th>Bodypart</th><th>Category</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>`
    
 
const rowTemplate = (user: User) => html
`<td>${user.id}</td><td>${user.name}</td> <td>${user.username}</td>`

class UserTableComponent extends HTMLElement {
    //private model: Model
    private root: ShadowRoot
    constructor() {
        super()
        this.root = this.attachShadow({ mode: "closed" })
    }
    async connectedCallback() {
        userService.fetchUsers()
        store.subscribe(model => this.render(model.users))
        userService.fetchUsers();
    }
    private render(users: User[]) {
        render(tableTemplate, this.root)
        const body = this.root.querySelector("tbody")
        users.forEach(user => {
            const row = body.insertRow()
            row.onclick = () => {
                const event = new CustomEvent("exercice-selected", {detail: {user}})
                this.dispatchEvent(event)
            }
            render(rowTemplate(user), row)
        })
    }
}
customElements.define("bodypart-table-component", UserTableComponent)