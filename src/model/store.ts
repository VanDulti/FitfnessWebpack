import { BehaviorSubject } from "rxjs"
import { Exercise } from "./exercise"

export interface Model {
    readonly exercises: Exercise[]
}

const initialState: Model = {
    exercises: []
}

const store = new BehaviorSubject<Model>(initialState)

export default store