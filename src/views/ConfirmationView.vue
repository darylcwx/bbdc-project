<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <q-card class="card q-mx-auto" bordered dark>
            <q-card-section class="text-center">
                <q-icon id="check" name="check" size="10vh" />
                <h3 class="header q-py-md">Booking Confirmed</h3>
                <div class="info font">We are pleased to inform you that your booking has been confirmed! See you
                    then! 😊
                </div>
            </q-card-section>

            <q-card-section>
                <div class="color font">
                    <!-- Package name, date and timing data retrive from firebase db -->
                    <div class="row justify-center items-center" style="height: 100%;">
                        <div class="col-10 col-md-4 text-center q-my-md">
                            Package
                            <div class="formatText">
                                {\{ Package name here }\}
                            </div>
                        </div>
                        <div class="col-10 col-md-4 text-center q-my-md">
                            Date
                            <div class="formatText">
                                Friday, November 11th
                            </div>
                        </div>
                        <div class="col-10 col-md-4 text-center q-my-md">
                            Timing
                            <div class="formatText">
                                6pm-8pm
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
            <q-card-actions class="justify-center q-pa-md">
                <!-- when making another booking, go back to the original page  -->
                <q-btn label="Make another booking" type="submit" color="primary" rounded no-caps class="q-mx-md q-mb-md btn1">
                    <router-link :to="{ path: '/simulator' }" />
                </q-btn>

                <!-- when it close go to the homepage -->
                <q-btn label="Confirm (?? confirm alr no meh)" type="Back" color="primary" rounded no-caps
                    class="q-mx-md q-mb-md btn2">
                    <router-link :to="{ path: '/' }" />
                </q-btn>

            </q-card-actions>
        </q-card>
    </div>
</template>

<script>

// import 
import { useStore } from "@/pinia_store"
import gsap from 'gsap'

// pinia 
const store = useStore();
// how to find lesson tyoe => store.lessonType
console.log(store)

export default {
    name: 'confirm-card',
    // props: 
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('.card',
                { opacity: 0, x: -400, duration: 0.5, ease: 'power1' })
            gsap.from('.header',
                { opacity: 0, x: 200, duration: 0.5, ease: 'power1', delay: 0.2 })
            gsap.from('.info',
                { opacity: 0, x: 200, duration: 0.5, ease: 'power1', delay: 0.4 })
            gsap.from('.color',
                { opacity: 0, x: 200, duration: 0.5, ease: 'power1', delay: 0.6 })
            gsap.from('.btn1',
                { opacity: 0, y: 400, duration: 0.5, ease: 'power1', delay: 0.8 })
            gsap.from('.btn2',
                { opacity: 0, y: 400, duration: 0.5, ease: 'power1', delay: 1 })
        }
    }
}
</script>

<style lang="scss">
.container{
    margin-top: 200px;
}
.info {
    padding: 0 20%;
    text-align: center;
}

.color {
    border-radius: 15px;
    background-color: rgb(50, 50, 50);
    height: 100%;
}

.formatText {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}

.font {
    font-family: 'Open Sans', sans-serif;
}

.card {
    border-radius: 30px;
    width: 70vw;
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

