import { Exercise } from "./model/exercise"
import model from "./model/store"
import store from "./model/store"
import produce from "immer"
const url = "http://localhost:3000/exercises"

class ExerciseService {
    async fetchUsers() {
        const response = await fetch(url)
        let model = store.getValue()
        let exercises: [] = await response.json()
        let nextState = produce(model, draft=>{draft.exercises = exercises})
        store.next(nextState)
    }
}

const exerciseService = new ExerciseService()
export default exerciseService 