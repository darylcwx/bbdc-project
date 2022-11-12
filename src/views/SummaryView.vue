<template>
  <div class="container">
    <div class="bg"></div>
    <div class="row justify-center q-pa-lg" style="width: 100%;">
      <SummaryCard />
    </div>
    <CalendarComp />
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
// import { ref, computed } from 'vue'
// import gsap from 'gsap'

export default {
  name: 'BookingView',
  components: {
    CalendarComp,
    SummaryCard
  },
  setup() {
    // const progress1 = ref(0.3)
    // const progress2 = ref(0.9)
    // const example = ref(false)

    // const beforeEnter = (el) => {
    //   el.style.transform = 'translateY(-60px)'
    //   el.style.opacity = 0
    // }

    // const enter = (el, done) => {
    //   gsap.to(el, {
    //     y:0,
    //     opacity: 1,
    //     duration: 3,
    //     ease: 'bounce.out',
    //     onComplete: done
    //   })
    // }

    // const afterEnter = () => {

    // }

    return {
      // progress1,
      // progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + '%'),

      // progress2,
      // progressLabel2: computed(() => (progress2.value * 100) + '%'),

      // value: 71,

      // example

      // beforeEnter,
      // enter,
      // afterEnter
    }


  },
}
</script>

<style>
/* .hello-enter-from{
    opacity: 0;
    transform: translateY(-60px);
  }

  .hello-enter-to{
    opacity: 1;
    transform: translateY(0);
  }
  .hello-enter-active{
    transition: all 2s ease;
    animation: wobble 0.5s ease;
  }
  .hello-leave-from{
    opacity: 1;
    transform: translateY(0);
  }
  .hello-leave-to{
    opacity: 0;
    transform: translateY(-60px);
  }
  .hello-leave-active{
    transition: all 2s ease; 
    animation: wobble 0.5s ease;
  }

  .hello-move {

  }

  @keyframes wobble {
    0% {
      opacity: 0;
      transform: translateY(-60px);
    }

    50% {
      opacity: 1;
      transform: translateY(0px);
    }

    60% {
      transform: translateX(8px)
    }
    70% {
      transform: translateX(-8px)
    }
    80% {
      transform: translateX(4px)
    }
    90% {
      transform: translateX(-4px)
    }
    100% {
      transform: translateX(0px)
    }

  } */
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
  filter: brightness(10%);
}
</style>