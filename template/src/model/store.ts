import { BehaviorSubject } from "rxjs";
import {User} from "./user"

export interface Model {
    readonly users: User[]
}

const initialStaate: Model = {
    users: []
}

const store = new BehaviorSubject<Model>(initialStaate);

export default store; 