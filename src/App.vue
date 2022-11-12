<template>
  <NavigationLayout />
  <ChatBot />
  <!-- <q-page-container>
      <router-view v-slot="{ Component }"> 
        <transition name="route" mode="out-in">
          <component :is="Component">
          
          </component>
        </transition>
      </router-view>
  </q-page-container> -->

  <!-- <router-view/> -->
  <!-- <Footer /> -->
</template>

<script>
// import AppNavigation from '@/components/AppNavigation.vue';
import NavigationLayout from "@/components/NavigationLayout.vue";
import ChatBot from "@/components/ChatBot.vue";
// import CalendarComp from './components/CalendarComp.vue';


export default {
  name: 'App',
  components: {
    NavigationLayout,
    ChatBot
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Oooh+Baby&family=Open+Sans:wght@100;400&family=Raleway:wght@100;400&family=Roboto:wght@100;400&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


/* headers Raleway */
/* content Open Sans */
/* special Lato & Oooh Baby */
/* default Roboto */
h1,
h2,
h3,
h4,
h5 {
  padding: 75px 0;
  color: white;
  /* font-size: clamp(4em, 2vw, 4em); */
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  margin: 0;
}


</style>
