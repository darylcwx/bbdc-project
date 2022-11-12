<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">Driving Simulator</h2>
        <div class="font row justify-center">
            <div v-for="(sim, index) of this.simLessons" :key='index' class="col-10 col-md-5 q-ma-md" :class="'sim' + index">
                <SimulatorCard :name="sim.name" :desc="sim.desc" :pic="sim.pic" />
            </div>
        </div>
    </div>
</template>

<script>
import SimulatorCard from '@/components/SimulatorCard.vue';
import gsap from 'gsap'

export default {
    components: {
        SimulatorCard
    },
    data() {
        return {
            simLessons: [
                { id: 0, name: 'All Class 3 (Motorcar) students', desc: `Lesson 1: Driving simulator introduction\n\nLesson 2: Driving in wet weather and bad road conditions\n\nLesson 3: Experience how it is like driving while drunk and why you should never drink and drive`, pic: 'sim1.jpg' },
                { id: 1, name: 'All Class 2 (Motorcycle) students', desc: 'Lesson 1: Driving simulator introduction\n\nLesson 2: Driving in wet weather and bad road conditions\n\nLesson 3: Experience how it is like driving while drunk and why you should never drink and drive', pic: 'sim2.jpg' },
            ]
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('.header',
                { opacity: 0, x: -700, duration: 1, ease: 'back' })
            let dly = 0.2
            for (let sim of this.simLessons) {
                gsap.from('.sim' + sim.id,
                    { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: dly * sim.id })
            }
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
    color: black;
}
.font {
    font-family: 'Open Sans', sans-serif;
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