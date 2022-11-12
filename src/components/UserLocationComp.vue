<template>
    <div class="row" style="width: 100%;">
        <div class="col">
            <div id="mapAni">
                <GoogleMap id="map" api-key='AIzaSyAeEmsovQVqRoBAwYJHntgG49oPXkqmWgM' :center="bbdc" :zoom="15">
                    <Marker :options="{ position: bbdc }">
                        <InfoWindow :options="{ position: bbdc, content: 'We are located here!' }" />
                    </Marker>

                    <!-- <Marker :options="{ position: origin }"></Marker> -->
                </GoogleMap>
            </div>
            <h4 id="addy" class="q-py-md">815 Bukit Batok West Ave. 5, Singapore 659085</h4>
            <div id='mode' class="row justify-center q-py-lg text-white" style="width: 100%;">
                <q-select class="q-px-sm" dark rounded standout v-model="mode" :options="options" style="width: 50%;"
                    label="Select your mode of transport!"
                    @update:model-value="calculateAndDisplayRoute(), animateTable()"/>
                <!-- <q-btn class="q-px-sm" outlined rounded no-caps size='lg' style="width: 25%;" color="primary"
                    id="getDirections" @click="calculateAndDisplayRoute(), animateTable()">
                    How do I get
                    here?
                </q-btn> -->
            </div>
            <div class="row justify-center" :class="{ hidden: isActive }">
                <div class="col">
                    <q-table id="table" :title=this.totals :rows=this.steps :columns=this.columns
                        :pagination=this.pagination row-key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

export default {
    components: { GoogleMap, Marker, InfoWindow },
    data() {
        return {
            bbdc: { lat: 1.3669624737336636, lng: 103.7502063497038 },
            columns: [
                { name: 'directions', label: 'Directions', field: 'directions', align: 'left' },
                { name: 'distance', label: 'Distance', field: 'distance' },
                { name: 'ett', label: 'Estimated Time Required', field: 'ett' },

            ],
            steps: [],
            isActive: true,
            pagination: {
                page: 1,
                rowsPerPage: 10
            },
            mode: '',
            totals: '',
            options: [{ label: 'Driving', value: 'DRIVING' },
            { label: 'Public Transport', value: 'TRANSIT' },
            { label: 'Bicycle', value: 'BICYCLING' },
            { label: 'Walking', value: 'WALKING' }]

        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('#mapAni',
                { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: 0.2 })
            gsap.from('#addy',
                { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: 0.4 })
            gsap.from('#mode',
                { opacity: 0, y: 200, duration: 0.5, ease: 'power1', delay: 0.6 })
        },
        animateTable() {

            gsap.from('#table',
                { opacity: 0, y: 200, duration: 1, ease: 'power1', delay: 0.5 })
            gsap.to(window, {
                scrollTo: '#table', duration: 1, ease: 'power1', delay: 0.5,
            })
        },
        calculateAndDisplayRoute() {
            const directionsService = new window.google.maps.DirectionsService()
            const directionsRenderer = new window.google.maps.DirectionsRenderer()
            console.log(this.mode)
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    // success
                    (position) => {
                        // origin = current location
                        const origin = { lat: position.coords.latitude, lng: position.coords.longitude }
                        // desti = fixed at BBDC
                        const destination = this.bbdc //BBDC

                        directionsService.route({
                            origin: origin,
                            destination: destination,
                            travelMode: window.google.maps.TravelMode[this.mode.value]
                        })
                            .then((response) => {
                                directionsRenderer.setDirections(response)
                                const map = new window.google.maps.Map(document.getElementById('map'), {
                                    zoom: 7,
                                    center: destination
                                })
                                directionsRenderer.setMap(map)
                                // response = DirectionsResult
                                // accessing and storing step by step instructions
                                this.totals = "About " + response.routes[0].legs[0].distance.text + " away, around " + response.routes[0].legs[0].duration.text + " required"
                                this.steps = []
                                console.log(response.routes[0].legs[0].steps)
                                if (this.mode == 'WALKING') {
                                } else {

                                    for (let i of response.routes[0].legs[0].steps) {
                                        if (i.travel_mode == 'TRANSIT') {
                                            let instructions = ""
                                            let numstops = i.num_stops
                                            let ss = i.transit.departure_stop.name
                                            let es = i.transit.arrival_stop.name
                                            let distance = numstops + " stops"
                                            let duration = i.duration.text

                                            instructions = "Take MRT from " + ss + " to " + es
                                            this.steps.push({ 'directions': instructions, 'distance': distance, 'ett': duration })
                                        } else if (i.travel_mode == 'WALKING') {
                                            if (i.steps) {
                                                for (let step of i.steps) {
                                                    let instructions = step.instructions
                                                    let distance = step.distance.text
                                                    let duration = step.duration.text

                                                    instructions = instructions.replace(/<\/?[^>]+(>|$)/g, "");
                                                    if (instructions.includes('Destination')) {
                                                        let first = instructions.slice(0, instructions.indexOf('Destination'));
                                                        let second = instructions.slice(instructions.indexOf('Destination'))
                                                        this.steps.push({ 'directions': first, 'distance': distance, 'ett': duration })
                                                        this.steps.push({ 'directions': second, 'distance': '', 'ett': '' })
                                                    } else {

                                                        this.steps.push({ 'directions': instructions, 'distance': distance, 'ett': duration })
                                                    }
                                                }
                                            } else {
                                                let instructions = i.instructions
                                                let distance = i.distance.text
                                                let duration = i.duration.text
                                                instructions = instructions.replace(/<\/?[^>]+(>|$)/g, "");
                                                if (instructions.includes('Destination')) {
                                                    let first = instructions.slice(0, instructions.indexOf('Destination'));
                                                    let second = instructions.slice(instructions.indexOf('Destination'))
                                                    this.steps.push({ 'directions': first, 'distance': distance, 'ett': duration })
                                                    this.steps.push({ 'directions': second, 'distance': '', 'ett': '' })
                                                } else {

                                                    this.steps.push({ 'directions': instructions, 'distance': distance, 'ett': duration })
                                                }
                                            }
                                        } else { // driving
                                            let instructions = i.instructions
                                            let distance = i.distance.text
                                            let duration = i.duration.text
                                            instructions = instructions.replace(/<\/?[^>]+(>|$)/g, "");
                                            if (instructions.includes('Destination')) {
                                                let first = instructions.slice(0, instructions.indexOf('Destination'));
                                                let second = instructions.slice(instructions.indexOf('Destination'))
                                                this.steps.push({ 'directions': first, 'distance': distance, 'ett': duration })
                                                this.steps.push({ 'directions': second, 'distance': '', 'ett': '' })
                                            } else {

                                                this.steps.push({ 'directions': instructions, 'distance': distance, 'ett': duration })
                                            }
                                        }


                                    }
                                }

                                // unhide table
                                this.isActive = false
                            })
                            .catch((error) => {
                                window.alert("directions request failed due to " + error.message)
                            })
                    },
                    // failure
                    function (error) {
                        return error.message
                    },
                    // options
                    { timeout: 5000 })
            }
        },
    }
};
</script>

<style>
#map {
    height: 600px;
    -webkit-border-radius: 20px;
    overflow: hidden;
}

#addy {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

#table {
    border-radius: 20px;
    font-family: 'Open Sans', sans-serif;
}

.q-table th { 
    font-weight: bold;
    font-size: 18px;
}
</style>