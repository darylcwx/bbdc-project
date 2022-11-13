<template>
  <div class="q-pa-md col-10">
    <q-table
      class="my-sticky-header-table font"
      title="All Bookings"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :seperator="separator"
      no-data-label="You don't have any sessions! Book a lesson now!"
      selection="single"
      v-model:selected="selected"
      :selected-rows-label="getSelectedString"
    />
    <div class="col-10 justify-end row">
    <q-btn
      v-if="selected.length > 0"
      @click="onCancel"
      label="Cancel Booking"
      type="submit"
      color="light-blue-8"
      rounded
      no-caps
      class="q-my-md"
    />
  </div>
  </div>

  

  <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
</template>

<script>
import { ref } from 'vue'
import { getDatabase, ref as FBref, onValue, set, update } from "firebase/database";
import { useStore } from "@/pinia_store";
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router";

var today = new Date().toLocaleDateString("sv").replaceAll("-", "/");
// console.log(today)

const columns = [
  {
    name: 'sn',
    required: true,
    label: "SN." ,
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    // sortable: true
  },
  { name: 'Type', align: 'center', label: 'Type', field: 'type' },
  { name: 'Date', align: 'center', label: 'Date', field: 'date' },
  { name: 'Status', label: 'Status', field: 'status'},
  { name: 'Price', label: 'Price', field: 'price' },
  
  // { name: 'Status', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]


export default {
  

  setup () {
    // Pinia
  const store = useStore();
  var userID = store.userID;
  // var lessonType = store.lessonType;

  // Firebase
  const db = getDatabase();
  const userRef = FBref(db, "users/" + userID);
  var userData = {}
  var userBookings = {}
  var serialNumber = 1
  const selected = ref([]);

  const $q = useQuasar()
  const router = useRouter()

  onValue(userRef, (snapshot) => {
    userData = snapshot.val();
    userBookings = userData.bookings
  })

  const rows = [
  ]

  if (userBookings != undefined) {
    for (var key in userBookings) {
      let first = key.slice(0, 4);
      let second = key.slice(4, 6);
      let third = key.slice(6, 8);
      let formatted = first + "/" + second + "/" + third
      let displayed = third + "/" + second + "/" + first;
      let status = ""

      if (formatted > today) {
        status = "UPCOMING"
      } else if (formatted == today) {
        status = "TODAY"
      } else {
        status = "PAST"
      }

      rows.push({
        name: serialNumber,
        type: userBookings[key].type.toUpperCase(),
        date: displayed,
        status: status,
        price: userBookings[key].price
      })

      serialNumber += 1
    }
  }

    return {
      seperator: ref('cell'),
      columns,
      rows,
      selected: selected,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""
          } selected of ${rows.length}`;
      },

      onCancel() {

        var date = selected.value[0].date.replaceAll("/", "")
        let first = date.slice(0, 2);
        let second = date.slice(2, 4);
        let third = date.slice(4, 8);
        let formatted = third + second + first
        var type = selected.value[0].type.toLowerCase()
        var price = selected.value[0].price
        var status = selected.value[0].status

        if (status == "UPCOMING" || status == "TODAY") {
          set(FBref(db, "users/" + userID + "/bookings/" + formatted), {
              null: null
            })
          .then(() => {
            var refund = 0

            if (status == "UPCOMING") {
            refund = price
            var newBalance = userData.wallet + refund
            }
            else {
              refund = price * 0.5
              var newBalance = userData.wallet + refund
            }

            update(userRef, {
              wallet: parseFloat(newBalance)
            })

            $q.notify({
            message: `You have successfully cancelled your booking! $${ refund } has been refunded to your wallet.`,
            color: 'light-blue-8',
            icon: 'check_circle',
            position: 'center',
            progress: true,
            timeout: 3000,
            })

            router.push('/summary')
          })
          .catch((error) => {
            console.log(error);
            console.log(error.message);
          });
        }
        else if (status == "PAST") {
          $q.notify({
            message: 'You cannot cancel past bookings!',
            color: 'light-blue-8',
            position: 'center',
            icon: 'warning',
            progress: true,
            timeout: 1000,
          })
      }
    }
  }
  }
}


</script>

<style lang="scss" scoped>
.my-sticky-header-table{
  /* height or max-height is important */
  height: 70vh;
}

  .q-table__top, .q-table__bottom, thead tr:first-child th{
    /* bg color is important for th; just specify one */
    background-color: $light-blue-8;
    color: white;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
      top: 0;  
  }
    
.font {
  font-family: 'Open Sans', sans-serif;
}
  /* this is when the loading indicator appears */
  .q-table--loading thead tr:last-child th {
      /* height of all previous header rows */
    top: 48px
  }
    
</style>