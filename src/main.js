import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import firebase from 'firebase/compat/app'
import { createPinia } from 'pinia'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
// library.add(faHatWizard)
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


var firebaseConfig = { 
    apiKey: "AIzaSyBvEpibElqKQRrkFCimOqD_ZDiqwr55nkk",
    authDomain: "bukitbetter.firebaseapp.com",
    projectId: "bukitbetter",
    storageBucket: "bukitbetter.appspot.com",
    messagingSenderId: "997754798444",
    appId: "1:997754798444:web:86d507d2b5a6cf4506f349",
    measurementId: "G-5BRPJMG8KC",
    databaseURL: "https://bukitbetter-default-rtdb.asia-southeast1.firebasedatabase.app/" 
    }

firebase.initializeApp(firebaseConfig)


const vm = createApp(App)
vm.use(Quasar, quasarUserOptions).use(router).use(createPinia())
vm.mount('#app')