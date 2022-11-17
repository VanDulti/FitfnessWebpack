import { Exercise } from "./model/"
import model from "./model/store"
import store from "./model/store"
import produce from "immer"
const url = "http://localhost:3000/exercises"

class ExerciseService {
    async fetchUsers() {
        const response = await fetch(url)
        let model = store.getValue()
        let users: [] = await response.json()
        let nextState = produce(model, draft=>{draft.users = users})
        store.next(nextState)
    }
}

const userService = new ExerciseService()
export default userService 