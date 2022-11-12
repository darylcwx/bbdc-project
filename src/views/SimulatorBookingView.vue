<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">Simulator Booking</h2>
        <div class="font row justify-center" style="width: 100%;">

            <BookingCalendar />
        </div>
    </div>
</template>

<script>
import BookingCalendar from '@/components/BookingCalender.vue'
import { useStore } from "@/pinia_store";
import gsap from 'gsap'

// Pinia
const store = useStore();
// store.$reset();
// var lessonType = "simulator";
// store.$patch({lessonType: lessonType});
// store.lessonType = lessonType;
// console.log(store.lessonType)


export default {
    components: {
        BookingCalendar,
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('.header',
                { opacity: 0, x: -700, duration: 1, ease: 'back' })
        }
    }
}
</script>

<style scoped>
.container {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.font {
    font-family: 'Open Sans', sans-serif;
}

.bg {
    position: absolute;
    background: url('@/assets/booking-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
    filter: brightness(20%);
}
</style>