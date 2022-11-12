<template>
  <div class="row justify-evenly calendar-body text-center font" style="width: 100%;">
    <div class="col-12 col-md-5 q-py-md">
      <q-date class="text-dark" v-model="date" @click="animatePanel" :events="events" event-color="orange"
        color="light-blue-8" today-btn
        :options="(date) => date >= new Date().toLocaleDateString('sv').replaceAll('-', '/')"
        style="border-radius: 20px; width: 100%;" />
    </div>

    <div class="col-12 col-md-5 q-py-md">
      <q-tab-panels v-model="date" class='panels' animated style="border-radius: 20px; width: 100%;">
        <q-tab-panel v-for="(booking, date) of bookings" :key="date" :name="date" class="text-dark"
          style="border-radius: 20px;">
          <h3 class="q-pb-sm text-left font">{{ capitalizeTitle(booking.type) }}</h3>
          <h5 class="q-pb-md text-left font">{{ booking.time }}</h5>
          <p class="font text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.</p>
        </q-tab-panel>

      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { capitalize, ref } from "vue";
import { getDatabase, ref as FBref, onValue, get } from "firebase/database";
import { useStore } from "@/pinia_store"
import gsap from 'gsap'
const store = useStore();

var userID = store.userID;

var today = new Date().toLocaleDateString("sv").replaceAll("-", "/");

export default {
  data() {
    return {
      onload: true,
      width: window.innerWidth
    }
  },
  setup() {
    const db = getDatabase();
    const bookingRef = FBref(db, 'users/' + userID + '/bookings')
    // const bookingRef = FBref(db, "bookings");

    var dates = [];
    var bookings = {};
    var data = {};
    var pre_dates = [];

    onValue(bookingRef, (snapshot) => {
      data = snapshot.val();
      pre_dates = Object.keys(data);
      for (let index in pre_dates) {
        let pre_str = pre_dates[index];
        let first = pre_str.slice(0, 4);
        let second = pre_str.slice(4, 6);
        let third = pre_str.slice(6, 8);
        let post_str = first + "/" + second + "/" + third;
        dates.push(post_str);
      }
    }, (error) => { console.log(error) })


    // get(bookingRef).then((snapshot) => {
    //   data = snapshot.val();
    //   pre_dates = Object.keys(data);
    //   for (let index in pre_dates) {
    //     let pre_str = pre_dates[index];
    //     let first = pre_str.slice(0, 4);
    //     let second = pre_str.slice(4, 6);
    //     let third = pre_str.slice(6, 8);
    //     let post_str = first + "/" + second + "/" + third;
    //     dates.push(post_str);
    //   }
    // }).catch((error) => {
    //   console.log(error)
    // });

    for (let i = 0; i < pre_dates.length; i++) {
      bookings[dates[i]] = data[pre_dates[i]];
    }

    return {
      splitterModel: ref(50),
      date: ref(today),
      events: dates,
      bookings: bookings,
    };
  },
  mounted() {
    this.animate()
  },
  methods: {
    animate() {
      gsap.from('.calendar-body',
        { opacity: 0, x: -400, duration: 1, ease: 'power1' })
    },
    capitalizeTitle(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
    animatePanel() {
      if (this.onload == true) {
        gsap.from('.panels',
          { opacity: 0, y: 500, duration: 0.5, ease: 'power1' })
      }
      this.onload = false
    }
  },
};
</script>

<style>
.font {
  font-family: 'Open Sans', sans-serif;
}

h3,
h5 {
  color: black;
  padding: 0;
}
</style>