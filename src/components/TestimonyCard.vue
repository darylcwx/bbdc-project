<template>
    <q-card class="my-card q-pa-none q-ma-md" bordered>
        <q-img :src="require(`@/assets/${image}`)"/>
        <q-card-section class="text-h5 text-bold q-pb-none">
            {{ name }}
        </q-card-section>
        <q-card-section class="q-pt-none">
                {{ testimony }}
        </q-card-section>
    </q-card>
    
</template>
  
<script>
import { ref } from 'vue'

export default {
    setup() {
        return {
            expanded: ref(false),
        }
    },
    props: ['name', 'image', 'testimony']
}
</script>
  
<style lang="scss" scoped>

.my-card {
    max-width: 300px;
}

</style>