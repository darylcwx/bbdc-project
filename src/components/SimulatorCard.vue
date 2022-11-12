<template>
  <q-card bordered style="border-radius: 10px; height: 100%;">
    <q-img :src="require(`@/assets/${pic}`)" />
    <q-card-section>
      <h5 class="text-dark">{{ name }}</h5>
    </q-card-section>
    <q-card-section class="q-py-none text-dark" style="white-space: pre-wrap;">{{ desc }}</q-card-section>
    <q-card-section class="row justify-center">
      <q-btn rounded elevated class="q-px-xl" color="light-blue-8" label="Book" icon="booking"
        to="/simulator-booking" @click="setPinia"/>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from "@/pinia_store";

// Pinia
const store = useStore();
// store.$reset();
// var lessonType = "simulator";
// store.lessonType = lessonType;
// // store.$patch({lessonType: lessonType});

export default {
  props: ['name', 'desc', 'pic'],
  methods: {
    setPinia() {
      var lessonType = "simulator";
      store.lessonType = lessonType;
      console.log(store.lessonType)
    }
  }

}
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5 {
  padding: 0;
}
</style>
