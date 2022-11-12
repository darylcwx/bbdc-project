<template>

  <div class="container q-pa-xl">
    <div class="bg"></div>
    <h2 class="header">Meet our team...</h2>
    <div class="cards row justify-center items-top">
      <div v-for="(dev, index) of this.devs" :key='index' class="col-10 col-sm-5 col-lg-2 q-ma-md ani"
        :class="'dev' + index">
        <dev-team-comp :name='dev.name' :description="dev.description" :title="dev.title" :pic="dev.pic"
          :insta="dev.insta" :tele="dev.tele">
        </dev-team-comp>
      </div>
    </div>
  </div>
</template>
  
<script>
import DevTeamComp from '@/components/DevTeamComp.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


export default {
  name: 'DevTeam',
  components: {
    DevTeamComp
  },
  data() {
    return {
      devs:
        [{
          id: 0, name: 'Raphael Goh', title: 'Bug Catcher', pic: 'dv-raphael.jpg',
          insta: 'https://www.instagram.com/raphaelgoh.wx/', tele: 'http://t.me/raphaelgohwx',
          description: `Raphael created the Github repository and taught us how to use Vue Single File Components(SFC), the Vue CLI, and onboarded the Quasar Library. This made us hate him, yet grateful at the same time, because this is a life skill every programmer will need. Raphael also incorporated a Chatbot API, and used a Calendar API which allows users to track their bookings.`
        },
        {
          id: 1, name: 'Benita Leonardi', title: 'Frontend Developer', pic: 'dv_benita.jpg',
          insta: 'https://www.instagram.com/benitaleonardi/', tele: 'http://t.me/Benitaa_l',
          description: `Benita designed the skeleton of the project, found better background images, and came up with reusable components for the project.`
        },
        {
          id: 2, name: 'Jeremy Goh', title: 'Database Deviser', pic: 'dv_jeremy.jpg',
          insta: 'https://www.instagram.com/jeremygmc_/', tele: 'http://t.me/jeremyyg',
          description: `Jeremy was responsible for the back-end of this project. He introduced Firebase and Pinia into the project, which made our lives easier, and his, miserable. He taught us how to retrieve data, and gather data from inputs and store them in the real time Firebase DB`
        },
        {
          id: 3, name: 'Daryl Chua', title: 'GSAP Documentation Reader', pic: 'dv_daryl.jpg',
          insta: 'https://www.instagram.com/dryl.c/', tele: 'http://t.me/damnsope',
          description: `Daryl attended to the front end design of this project. His responsibility was to beautify the pages through the use of GSAP, CSS, and Google Fonts. Daryl used the Google Maps API for the location page. He also learned that he has a burning desire to learn more about animation.`
        },],
    }
  },
  mounted() {
    this.animate();
  },
  methods: {
    animate() {
      gsap.from('.header',
        { opacity: 0, x: -700, duration: 1, ease: 'back' })

      let dly = 0.2
      for (let dev of this.devs) {
        console.log(dev.id)
        gsap.from('.dev' + dev.id,
          { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: dly * dev.id })
      }
    }
  }
}
</script>
<style>
.bg {
  position: absolute;
  background: url('@/assets/dev-team-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: -1;
  filter: brightness(30%);
}

.header {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}

.container {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.cards {
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  color: black;
}
</style>
  