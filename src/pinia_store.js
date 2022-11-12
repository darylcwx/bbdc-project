import { defineStore } from "pinia";

export const useStore = defineStore('currentUser', {
    state: () => { 
        return {
            fullName: "", 
            userID: 0,
            progress: 0,
            lessonType: "",
        }
    },
    getters: {

    },
    actions: {

    }
})