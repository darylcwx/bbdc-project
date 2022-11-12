<template>
  <q-card class="card q-pb-md" style="width: 100%;" flat>
    <q-card-section horizontal class="bg-image">
      <q-card-section class="progress text-center">
        <q-circular-progress rounded v-if="value !== value" indeterminate show-value class="text-light-blue-8 text-bold"
          size="25vw" :thickness="0.2" color="light-blue-8"><span class="" style="font-size: 50%;">Loading...</span>
        </q-circular-progress>


        <q-circular-progress rounded v-else show-value class="text-light-blue-8 text-bold" :value="value" size="25vw"
          :thickness="0.2" color="light-blue-8" animation-speed='300'>
          {{ value }}%
          <div id="complete-text">complete</div>
        </q-circular-progress>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
// import { ref, computed } from 'vue'
import { getDatabase, ref as dbref, onValue } from "firebase/database"
import gsap from 'gsap'
const db = getDatabase()
const usersRef = dbref(db, "users")

export default {
  name: 'SummaryView',
  setup() {
    let value = getProgress()

    console.log(value)
    return {
      value
    }
  },
  mounted() {
    this.animate()
  },
  methods: {
    animate() {
      gsap.from('.bg-image',
        { opacity: 0, x: 500, duration: 1, ease: 'power1', delay: 0 })
        gsap.from('.progress',
        { opacity: 0.5, x: 100, duration: 1, ease: 'power1', delay: 0.2 })
    }
  }
}

// Helper Functions
function getProgress() {
  var userProgress = ""

  onValue(usersRef, (snapshot) => {
    var data = snapshot.val()
    userProgress = data[0].progress
  })

  return parseInt(userProgress)
}
</script>

<style scoped>
.card {
  height: auto;
  border-radius: 40px;
  background-color: black;
}

.bg-image {
  background-image: url("@/assets/summary-dash.jpg");
  background-size: 90%;
  background-repeat: no-repeat;
  background-position: right;
}

.progress {
  background-image: linear-gradient(to right, rgba(255, 255, 255) 40%, rgba(255, 255, 255, 0));
  padding: 30px
}
/* .q-circular-progress:v-deep q-circular-progress__text {
  font-family: 'Open Sans', sans-serif;
} */
#complete-text {
  font-size: 75%;
  font-family: 'Oooh Baby', cursive;
}
</style>

