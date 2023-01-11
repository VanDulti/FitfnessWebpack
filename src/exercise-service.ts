import { Exercise } from "./model/exercise"
import store from "./model/store"
import produce from "immer"
const url = "http://localhost:3000/exercises"

class ExerciseService {
    async fetch() {
        const response = await fetch(url)
        console.log(response)
        const model = store.getValue()
        const exercises: [Exercise] = await response.json()
        const nextState = produce(model, draft => { draft.exercises = exercises })
        store.next(nextState)
    }
}

const exerciseService = new ExerciseService()
export default exerciseService 