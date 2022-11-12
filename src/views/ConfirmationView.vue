<template>
    <div class="q-pa-l row justify-center items-start q-gutter-md">
        <div class="col text-center">     
        <q-card class="card" >
        <q-card-section class="bg-primary text-white">
            <!-- add a confirmation logo  -->
            <div>
                <div class="logo">
                    <q-icon name="check" size="10vh"/>
                </div>
                <h3 style="padding-top:10px; padding-bottom: 30px;">Booking Confirmed</h3>
                <div class="info">
                    <p>"We are please to inform you that booking request have been received and confirm! We can't wait to see you there!"</p>
                </div>
                <!-- <q-separator inset dark />   -->
            </div>
            </q-card-section>
            
            <q-card-section>

            <div class="text-left q-pa-sm">
                <h4 style="color:black; padding-bottom:0; padding-top:20px;">Booking Details</h4>
            </div>

            <!-- Package name, date and timing data retrive from firebase db -->

            <div class="font row w-40 items-center one">
                <div class="col-6 text-right q-pa-sm text-bold">Package</div>
                <div class="col-6 text-left q-pa-sm">Package name</div>
            </div>
            <div class="font row w-40 items-center one">
                <div class="col-6 text-right q-pa-sm text-bold">Date</div>
                <div class="text-subtitle2 col-6 text-left q-pa-sm">Friday, November 11th</div>
            </div>
            <div class="font row w-40 items-center one">
                <div class="col-6 text-right q-pa-sm text-bold">Timing</div>
                <div class="text-subtitle2 col-6 text-left q-pa-sm">6pm-8pm</div>
            </div>

            </q-card-section>
            <!-- <q-separator dark /> -->

            <div class='row w-40 justify-center one'>
            <q-card-actions style="display:flex">
                    <!-- when making another booking, go back to the original page  -->
                    <router-link :to="{ path: '/simulator' }" style="display: inline-block;text-decoration:none;">
                        <q-btn
                            label="Make another booking"
                            type="submit"
                            color="primary"
                            rounded
                            no-caps
                            class="q-my-md q-ma-md"
                        ></q-btn>
                    </router-link>
                
                    <!-- when it close go to the homepage -->
                    <router-link :to="{ path: '/'}" style="display: inline-block;text-decoration:none;">
                        <q-btn
                            label="Confirm"
                            type="Back"
                            color="primary"
                            rounded
                            no-caps
                            class="q-my-md"
                        ></q-btn>
                    </router-link>
                   
            </q-card-actions>
            </div> 
        
        </q-card>
    </div>
    </div>
</template>

<script>

// import 
import { useStore } from "@/pinia_store"

// pinia 
const store = useStore();
// how to find lesson tyoe => store.lessonType
console.log(store)

export default {
    name: 'confirm-card', 
    // props: 
}
</script>

<style lang="scss" scoped>
    .date{
        text-align: center;
        /* font-weight: 100; */
        padding-top: 20px;
    }

    .click{
        align-items: center;
        display: flex;
    }

    .info{
        padding-left: 20%;
        padding-right: 20%;
    }

    .font {
    font-family: 'Open Sans', sans-serif;
    margin:0;}

    .one{
        display: flex;
    }

    .card{
        border-radius: 30px;
        width: 65%;
    }

</style>

