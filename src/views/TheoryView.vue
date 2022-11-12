<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">Theory</h2>
        <h5 class="font row justify-center text-center items-center select">
            I am a class&nbsp;&nbsp;
            <q-select @update:model-value="val => loadLessons(val)" style="width: 200px; margin-top: 20px;" rounded
                standout v-model="cls" :options="options" dark hint="Select your class">
            </q-select>
            &nbsp;&nbsp;student!
        </h5>
        <div class="font row justify-center text-center cards" :class="{ hidden: isActive }">
            <div v-for="(tt, index) of this.theoryTypes" :key='index' class="col-10 col-sm-5 col-md-3 col-lg-2 q-ma-md"
                :class="'tt' + index">
                <TheoryCard :name="tt.name" :desc="tt.desc" :pic="tt.pic" />
            </div>
        </div>
    </div>
</template>

<script>

import TheoryCard from '@/components/TheoryCard.vue';
import gsap from 'gsap'

export default {
    components: {
        TheoryCard
    },
    data() {
        return {
            isActive: true,
            cls: '',
            options: [
                '3 (motorcar)', '2 (motorcycle)'
            ],
            theoryTypes: [
                { id: 0, name: 'Basic Theory Lessons', desc: 'Learn the theory basics', pic: 'BTT.jpg' },
                { id: 1, name: 'Basic Theory Practice', desc: 'Unlimited practice on theory questions', pic: 'BTT.jpg' },
                { id: 2, name: 'Basic Theory Evaluation', desc: 'Theory evaluations', pic: 'BTT.jpg' },
                {id: 3, name: 'Basic Theory Test', desc: 'Good luck!', pic: 'BTT.jpg' },
                { id: 4, name: 'Final Theory Practice', desc: 'We\'re getting close!', pic: 'FTT.jpg' },
                { id: 5, name: 'Final Theory Evaluation', desc: 'Almost there!', pic: 'FTT.jpg' },
                { id: 6, name: 'Final Theory Test', desc: 'Good luck!', pic: 'FTT.jpg' },
            ]
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        loadLessons(value) {
            this.isActive = false
            // gsap.from('.cards',
            //     { opacity: 0, x: -700, duration: 1, ease: 'power1', delay: 1 })
            // { opacity: 0, x: -700, y: -100 },
            // { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power1', delay: 1 })
            let dly = 0.2
            for (let tt of this.theoryTypes) {
                gsap.from('.tt' + tt.id,
                    { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: dly * tt.id })
            }
        },
        animate() {
            gsap.from('.select',
                { opacity: 0, y: 300, duration: 1, ease: 'power1' })
            gsap.from('.header',
                { opacity: 0, x: -300, duration: 1, ease: 'back' })
            let dly = 0.2
            for (let tt of this.theoryTypes) {
                gsap.from('.tt' + tt.id,
                    { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: dly * tt.id })
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
}
h5 {
    padding: 0;
    display: flex;
    flex-direction: row;
    
}
.font {
    font-family: 'Open Sans', sans-serif;
}
.q-field {
    font-size: 20px;
}
.q-field::v-deep .q-field__native {
    justify-content: center;
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