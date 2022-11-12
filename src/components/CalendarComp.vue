<template>
  <div style="width: 100%;">
    <q-splitter
      v-model="splitterModel"
      style="height: 450px;"
      :limits="[50, 50]"
      class="q-pa-lg font"
    >
      <template v-slot:before>
        <div class="calendar-body text-center">
          <q-date
            class="text-dark"
            landscape
            v-model="date"
            :events="events"
            event-color="orange"
            color="light-blue-8"
            today-btn
            :options="
              (date) =>
                date >= new Date().toLocaleDateString('sv').replaceAll('-', '/')"
              style="border-radius: 20px;"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          style="border-radius: 20px;"
          class="q-mx-lg"
        >

          <q-tab-panel
            v-for="(booking, date) of bookings"
            :key="date"
            :name="date"
            class="text-dark panel"
          >
            <div class="text-h4 q-mb-md">{{ capitalizeTitle(booking.type) }}</div>
            <strong><p>
              Timeslot: {{ booking.time }}
            </p></strong>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              praesentium cumque magnam odio iure quidem, quod illum numquam
              possimus obcaecati commodi minima assumenda consectetur culpa fuga
              nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import { capitalize, ref } from "vue";
import { getDatabase, ref as FBref, onValue, get } from "firebase/database";
import { useStore } from "@/pinia_store";
import gsap from 'gsap'
const store = useStore();

var userID = store.userID;

var today = new Date().toLocaleDateString("sv").replaceAll("-", "/");

export default {
  setup() {
    const db = getDatabase();
    const bookingRef = FBref(db, 'users/'+userID+'/bookings')
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
    }, (error) => {console.log(error)})
    

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
  mounted(){
    this.animate()
  },
  methods: {
    animate(){
      gsap.from('.calendar-body',
        {opacity: 0, x: -400, duration: 1, ease: 'power1'})
    },
    capitalizeTitle(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
};
</script>

<style>
.font {
  font-family: 'Open Sans', sans-serif;
}
</style>