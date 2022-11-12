<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table font"
      title="Account History"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :seperator="separator"
      no-data-label="You don't have any sessions! Book a lesson now!"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { getDatabase, ref as FBref, onValue, set, update } from "firebase/database";
import { useStore } from "@/pinia_store";

var today = new Date().toLocaleDateString("sv").replaceAll("-", "/");
console.log(today)

const columns = [
  {
    name: 'type',
    required: true,
    label: "Type" ,
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    // sortable: true
  },
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
        name: userBookings[key].type.toUpperCase(),
        date: displayed,
        status: status,
        price: userBookings[key].price
      })
    }
  }

    return {
      seperator: ref('cell'),
      columns,
      rows
    }
  }
}
</script>

<style lang="scss">
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