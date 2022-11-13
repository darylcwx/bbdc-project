<template>
  <div style="width: 100%">
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <h5 class="step1 font text-white">Step 1: Choose your date!</h5>
        <div class="q-pa-md calendar-body text-center ">
          <q-form @submit="onSubmit">
            <div class='placement'>
              <q-date class="text-dark" landscape v-model="date" event-color="orange" :events="events"
                color="light-blue-8" today-btn :options="
                  (date) =>
                    date >=
                    new Date().toLocaleDateString('sv').replaceAll('-', '/')
                " name="booking-date" style="border-radius: 20px;" />
              <q-btn class="btn q-my-md" label="Submit" type="submit" color="primary" rounded no-caps>
              </q-btn>
            </div>
          </q-form>
        </div>
      </div>

      <div v-if="submitResult != ''" class="col-12 col-md-6 step2">
        <h5 class="font text-white">Step 2: Choose your timings!</h5>
        
          <div class="q-pa-md">
            <div class='placement'>
            <q-table title="" :rows="rows" :columns="columns" row-key="name"
              :selected-rows-label="getSelectedString" selection="single" v-model:selected="selected"
              style="border-radius: 20px;" />
              <q-btn @click="onConfirm" label="Confirm" type="submit" color="primary" rounded no-caps class="q-my-md">
            </q-btn>
          </div>
          
          <div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref } from "vue";
import { getDatabase, ref as FBref, onValue, set, update } from "firebase/database";
import { useStore } from "@/pinia_store";
import gsap from "gsap";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";


var today = new Date().toLocaleDateString("sv").replaceAll("-", "/");

// TABLE SESSION PICKER
const columns = [
  {
    name: "timeslot",
    required: true,
    label: "Timeslot",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "price",
    align: "center",
    label: "Price",
    field: "price",
    sortable: true,
  }
];

export default {
  setup() {
    // Pinia
    const store = useStore();
    var userID = store.userID;
    var lessonType = store.lessonType;
    

    // Firebase
    const db = getDatabase();
    const lessRef = FBref(db, "lessons/" + lessonType);
    const userRef = FBref(db, "users/" + userID)
    
    const router = useRouter();
    const $q = useQuasar();

    var accountBalance = ref(0)
    var userBookings = ref({})
    var userData = {}
    var dates = []

    onValue(userRef, (snapshot) => {
      userData = snapshot.val();
      accountBalance = userData.wallet
      userBookings = userData.bookings
    })

    let userArrKeys = Object.keys(userData)
    // let userArr = Object.entries(userData)

    if (userBookings != undefined) {
      let userBookingsArr = Object.keys(userBookings)

      for (let i in userBookingsArr) {
        let pre_str = userBookingsArr[i];
        let first = pre_str.slice(0, 4);
        let second = pre_str.slice(4, 6);
        let third = pre_str.slice(6, 8);
        let post_str = first + "/" + second + "/" + third;
        dates.push(post_str);
      }
    }


    // Populate the table
    const rows = [];

    onValue(lessRef, (snapshot) => {
      var lessData = snapshot.val();

      for (const [key, value] of Object.entries(lessData)) {
        rows.push({
          name: key,
          price: value,
        });
      }
    });

    // CALENDAR
    const submitResult = ref([]);

    // FOR TABLE PICKER
    const selected = ref([]);

    return {
      splitterModel: ref(50),
      date: ref(today),
      events: dates,

      submitResult,

      onSubmit(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }
        submitResult.value = data;
        console.log(submitResult.value)
        // const bookingRef = FBref(db, "users/" + userID + "/booking");
        

        // console.log("ok");
        gsap.from(".step2", {
          opacity: 0,
          x: 400,
          duration: 1,
          ease: "power1",
        }); // not working
      },

      // FOR TABLE PICKER
      selected,
      columns,
      rows,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""
          } selected of ${rows.length}`;
      },

      // CONFIRMING
      onConfirm() {

        
        if (selected.value[0] == null) {
          $q.notify({
            message: `Please choose a timeslot!`,
            color: 'light-blue-8',
            position: 'center',
            icon: 'warning',
            progress: true,
            timeout: 1000,
            })
        }
        else {
          var chosenDate = submitResult.value[0].value
          var pricing = selected.value[0].price
          var cleanedDate = chosenDate.split("/").join("")
          var bookingData = {};
          var remainingBalance = accountBalance - selected.value[0].price

          bookingData = {
            date: cleanedDate,
            timeslot: selected.value[0].name,
            price: pricing
          };
        }

        if (remainingBalance >= 0) {
          if (!userArrKeys.includes("bookings")) {
            set(FBref(db, "users/" + userID + "/bookings/" + cleanedDate), {
              time: bookingData.timeslot,
              type: lessonType,
              price: bookingData.price,
            })
              .then(() => {
                update(userRef, {
                  wallet: remainingBalance,
                });

                store.currentBal = remainingBalance
                store.lessonDate = chosenDate
                store.lessonTime = selected.value[0].name

                router.push("/confirmation");
              })
              .catch((error) => {
                console.log(error);
                console.log(error.message);
              });
          }
          else if (!(Object.keys(userBookings).includes(cleanedDate))) {
            set(FBref(db, "users/" + userID + "/bookings/" + cleanedDate), {
              time: bookingData.timeslot,
              type: lessonType,
              price: bookingData.price,
            })
              .then(() => {
                update(userRef, {
                  wallet: remainingBalance,
                });

                store.currentBal = remainingBalance
                store.lessonDate = chosenDate
                store.lessonTime = selected.value[0].name

                router.push("/confirmation");
              })
              .catch((error) => {
                console.log(error);
                console.log(error.message);
              });
          }
          else {
            $q.notify({
            message: `You already have a booking on this date! Please choose another date`,
            color: 'light-blue-8',
            position: 'center',
            icon: 'warning',
            progress: true,
            timeout: 2500,
            })
          }
        } 
        else if (accountBalance == 0) {
          $q.notify({
            message: `Your wallet has no credits. Please top up to proceed`,
            color: 'light-blue-8',
            position: 'center',
            icon: 'warning',
            progress: true,
            timeout: 2500,
            })
        }

        else if (remainingBalance < 0) {
          $q.notify({
            message: `You do not have enough credits in your wallet. Please top up to proceed`,
            color: 'light-blue-8',
            position: 'center',
            icon: 'warning',
            progress: true,
            timeout: 2500,
            })
        }
      },
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    animate() {
      gsap.from('.step1',
        { opacity: 0, x: -400, duration: 0.5, ease: 'power1' })
      gsap.from('.calendar-body',
        { opacity: 0, x: -400, duration: 0.5, ease: 'power1', delay: 0.2 })
      gsap.from('.btn',
        { opacity: 0, x: -400, duration: 0.5, ease: 'power1', delay: 0.4 })

    }
  }
};
</script>
  
<style>
h5 {
  font-weight: 100;
  padding: 0 0 0 0;

}

.q-table th {
  font-weight: bold;
  font-size: 18px;
}

.font {
  font-family: 'Open Sans', sans-serif;
}

.placement {
  display: grid;
  place-items: center;
}
</style>