import { defineStore } from "pinia";

export const useStore = defineStore('currentUser', {
    state: () => { 
        return {
            fullName: "", 
            userID: 0,
            progress: 0,
            lessonType: "",
            lessonDate: "",
            lessonTime: "",
        }
    },
    getters: {

    },
    actions: {

    }
})