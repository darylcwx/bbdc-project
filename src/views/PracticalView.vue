<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">Practical</h2>
        <h5 class="font row justify-center text-center items-center select text-white">
            I am looking to book a&nbsp;&nbsp;
            <q-select @update:model-value="val => loadLessons(val)" style="width: 200px; margin-top: 20px;" rounded
                standout v-model="type" :options="options" dark hint="Select type of booking">
            </q-select>
            &nbsp;&nbsp;
        </h5>


        <div :class="{ hidden: isActive }">
            <div class="font row justify-center text-center">
                <div v-for="(car, index) of this.motorcars" :key='index' class="col-10 col-sm-5 col-md-3 col-lg-2 q-ma-md"
                    :class="'car' + index">

                    <PracticalCard :name="car.name" :desc="car.desc" :pic="car.pic" />

                </div>
            </div>
            <div class="font row justify-center text-center">
                <div v-for="(cycle, index) of this.motorcycles" :key='index' class="col-10 col-sm-5 col-md-3 col-lg-2 q-ma-md"
                    :class="'cycle' + index">
                    <PracticalCard :name="cycle.name" :desc="cycle.desc" :pic="cycle.pic" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PracticalCard from '@/components/PracticalCard.vue';
import gsap from 'gsap'

export default {
    components: {
        PracticalCard
    },
    data() {
        return {
            motorcars: [
                { id: 0, name: 'Class 3 (Manual)', desc: `Motor cars of unladen weight not exceeding 3000 kg with not more than 7 passengers, exclusive of the driver. It includes motor tractors and other motor vehicles of unladen weight not exceeding 2500 kg.`, pic: 'manual.jpg' },
                {
                    id: 1, name: 'Class 3A (Auto)', desc: `Motor cars without clutch pedals of unladen weight not exceeding 3000 kg with not more than 7 passengers exclusive of the driver.
It includes motor tractors and other motor vehicles without clutch pedals of unladen weight not exceeding 2500 kg`, pic: 'auto.png'
                }],
            motorcycles: [
                { id: 0, name: 'Class 2B', desc: 'Motorcycles with a cylinder capacity that does not exceed 200CC', pic: 'class-2b.jpg' },
                { id: 1, name: 'Class 2A', desc: 'Motorcycles with a cylinder capacity that exceeds 200CC but does not exceed 400CC', pic: 'class-2a.jpg' },
                { id: 2, name: 'Class 2', desc: 'Motorcycles with a cylinder capacity that exceeds 400CC', pic: 'class-2.jpg' },

            ],
            isActive: true,
            type: '',
            options: [
                'lesson', 'test'
            ],
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        loadLessons(value) {
            this.isActive = false
            let dly = 0.2
            let mc = this.motorcars
            let count = 0
            for (let i = mc.length - 1; i >= 0; i--) {
                gsap.from('.car' + mc[i].id,
                    { opacity: 0, x: -200, duration: 0.5, ease: 'power1', delay: dly * count })
                count++
            }
            for (let cycle of this.motorcycles) {
                gsap.from('.cycle' + cycle.id,
                    { opacity: 0, x: 200, duration: 0.5, ease: 'power1', delay: dly + dly * cycle.id })
            }

        },
        animate() {
            gsap.from('.header',
                { opacity: 0, x: -700, duration: 1, ease: 'back' })
            gsap.from('.select',
                { opacity: 0, y: 300, duration: 1, ease: 'power1' })
            // let dly = 0.2
            // let mc = this.motorcars
            // let count = 0
            // for (let i = mc.length - 1; i >= 0; i--) {
            //     gsap.from('.car' + mc[i].id,
            //         { opacity: 0, x: -200, duration: 0.5, ease: 'power1', delay: dly * count })
            //     count++
            // }
            // for (let cycle of this.motorcycles) {
            //     gsap.from('.cycle' + cycle.id,
            //         { opacity: 0, x: 200, duration: 0.5, ease: 'power1', delay: dly + dly * cycle.id })
            // }

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
.q-field {
    font-size: 20px;
}
.q-field::v-deep .q-field__native {
    justify-content: center;
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