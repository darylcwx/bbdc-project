<template>
  <div style="width: 100%">
    <q-splitter v-model="splitterModel" :limits="[50, 50]" class="font">
      <template v-slot:before>
        <div>
          <h3>Step 1: Choose your date!</h3>
        </div>
        <div class="q-pa-md calendar-body text-center">
          <q-form @submit="onSubmit">
            <q-date
              class="text-dark"
              landscape
              v-model="date"
              event-color="orange"
              color="light-blue-8"
              today-btn
              :options="
                (date) =>
                  date >=
                  new Date().toLocaleDateString('sv').replaceAll('-', '/')
              "
              
              name="booking-date"
            />
             <q-btn class="q-my-md" label="Submit" type="submit" color="primary" rounded no-caps></q-btn>
          </q-form>
        </div>
      </template>

      <!-- <template v-slot:after>
          <q-tab-panels
            v-model="date"
            animated
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="2022/11/01">
              <div class="text-h4 q-mb-md">2019/02/01</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="2022/11/05">
              <div class="text-h4 q-mb-md">2019/02/05</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
  
            <q-tab-panel name="2022/11/06">
              <div class="text-h4 q-mb-md">2019/02/06</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
          </q-tab-panels>
        </template> -->

      <!-- <span v-for="(item, index) in submitResult" :key="index">
        {{ item.name }} = {{ item.value }}
      </span> -->

      <template v-if="submitResult != ''" v-slot:after>
        <div>
          <h3>Step 2: Choose your timings!</h3>
        </div>
        <div class="q-pa-md">
          <q-table
            :title="date"
            :rows="rows"
            :columns="columns"
            row-key="name"
            :selected-rows-label="getSelectedString"
            selection="single"
            v-model:selected="selected"
          />

          <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
        </div>
        <div>
          <span>Confirm your bookings!</span>
          <q-btn
            @click="onConfirm"
            label="Confirm"
            type="submit"
            color="primary"
            rounded
            no-caps
            class="q-my-md"
          ></q-btn>
        </div>
      </template>

      <!-- <span v-for="(item, index) in finalBooking" :key="index">
        {{ item.name }} = {{ item.value }}
         </span> -->
    </q-splitter>
  </div>
</template>
  
<script>
import { ref } from "vue";
import { getDatabase, ref as FBref, onValue, set, update } from "firebase/database";
import { useStore } from "@/pinia_store";
import gsap from "gsap";

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
  },
  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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

    var accountBalance = ref(0)
    var userBookings = ref({})
    var userData = {}

    onValue(userRef, (snapshot) => {
      userData = snapshot.val();
      accountBalance = userData.wallet
      userBookings = userData.bookings
    })

    let userArrKeys = Object.keys(userData)
    let userArr = Object.entries(userData)
    console.log(userArrKeys)
    console.log(userArr)
    console.log(userBookings)
    

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
      // events: ["2022/11/01", "2022/11/05", "2022/11/06"],

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
        // const bookingRef = FBref(db, "users/" + userID + "/booking");

        console.log("ok");
        gsap.from(".step2", {
          opacity: 0,
          x: 400,
          duration: 1,
          ease: "power1",
        });
      },

      // FOR TABLE PICKER
      selected,
      columns,
      rows,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },

      // CONFIRMING
      onConfirm() {

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

        if (remainingBalance >= 0) {
          if (!userArrKeys.includes("bookings")) {
            set(FBref(db, "users/" + userID + "/bookings/" + cleanedDate), {
            time: bookingData.timeslot,
            type: lessonType,
            })
            .then(() => {
              alert("booking success")

              update(userRef, {
              wallet: remainingBalance,
              });   
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
            })
            .then(() => {
              alert("booking success")

              update(userRef, {
              wallet: remainingBalance,
              });   
            })
            .catch((error) => {
              console.log(error);
              console.log(error.message);
            });
          }
          else {
            alert("You already have a booking on this date")
          }
        } else if (accountBalance < 0) {
          alert("You're broke bro")
        }

        else if (remainingBalance < 0) {
          alert("You do not have enough money to book this session")
        }
      },
    };
  },
  components: {
    // BookingTable,
  },
  methods: {},
};
</script>
  
<style>
h3 {
  font-weight: 100;
  padding: 50px 0 20px 0;
}
.font {
    font-family: 'Open Sans', sans-serif;
}
</style>