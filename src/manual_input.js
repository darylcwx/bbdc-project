import { getDatabase, ref, set } from "firebase/database";

const db = getDatabase();

export default function manual_input() {

    const modRef = ref(db, 'modules')

    set(modRef, {
        type: {
            E: 'Evaluation',
            L: 'Lesson',
            P: 'Practice',
            T: 'Test'
        },
        E1: {
            modName: 'Evaluation 1',
            price: 25,
            status: 'Pending'
        },
        L1: {
            modName: 'Lesson 1',
            price: 25,
            status: 'Pending'
        },
        P1: {
            modName: 'Practice 1',
            price: 20,
            status: 'Pending'
        }
    })

}