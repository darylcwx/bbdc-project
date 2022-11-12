<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>
        <h2 class="header">My History</h2>
        <div class="table row justify-center">
            <HistoryTable />
        </div>
    </div>

</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue'
import gsap from 'gsap'
export default {
    components: {
        HistoryTable
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('.header',
                { opacity: 0, x: -700, duration: 1, ease: 'back' })
            gsap.from('.table',
            { opacity: 0, y: 400, duration: 0.5, ease: 'power1' })
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