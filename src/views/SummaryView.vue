<template>
  <div class="container q-pa-xl">
    <div class="bg"></div>
    <div class="row justify-center" style="width: 100%;">
      <SummaryCard />
      <CalendarComp />
      <WeatherComp />
    </div>

  <!-- add in road map visual, carouselll?  -->




  <!-- <transition 
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      >
        <div><h1>HELLO</h1></div>
      </transition> -->

  <!-- <button @click="example = !example">toggle</button> -->


  <!-- <div class="q-pa-md">
        <q-linear-progress rounded size="50px" :value="progress2" color="primary" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge text-color="white" :label="progressLabel2" />
        </div>
        </q-linear-progress>
      </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import CalendarComp from '@/components/CalendarComp.vue'
import SummaryCard from '@/components/SummaryCard.vue'
import WeatherComp from '@/components/WeatherComponent.vue';

export default {
  name: 'BookingView',
  components: {
    CalendarComp,
    SummaryCard,
    WeatherComp
  },
}
</script>

<style>
.container {
  margin: 0;
}
.bg {
  position: absolute;
  background: url('@/assets/summary-bg.jpg');
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
</style>