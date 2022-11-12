<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">Our center is located at</h2>
        <UserLocationComp></UserLocationComp>
        
    </div>
</template>

<script>
import UserLocationComp from '@/components/UserLocationComp.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export default {
    components: {
        UserLocationComp
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

<style>
.bg {
    position: absolute;
    background: url('@/assets/bg4.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
    filter: brightness(30%);
}
.header {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
}
.container {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>