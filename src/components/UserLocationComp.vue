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
            <div class="q-py-lg text-center text-white">
                <q-btn class='btn' size='lg' color="primary" id="getDirections" rounded no-caps
                    @click="calculateAndDisplayRoute(), animateTable()">
                    How do I get
                    here?
                </q-btn>
            </div>
            <div class="row justify-center" :class="{ hidden: isActive }">
                <div class="col">
                    <q-table id="table" title="Getting to BBDC" :rows=this.steps :columns=this.columns
                        :pagination=this.pagination row-key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import gsap from 'gsap'

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
            }
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            gsap.from('#mapAni',
                { opacity: 0, y: 200, duration: 1, ease: 'power1', delay: 0.4 })
            gsap.from('#addy',
                { opacity: 0, y: 200, duration: 1, ease: 'power1', delay: 0.6 })
            gsap.from('#getDirections',
                { opacity: 0, y: 200, duration: 1, ease: 'power1', delay: 0.8 })
        },
        animateTable() {

            gsap.from('#table',
                { opacity: 0, y: 200, duration: 1, ease: 'power1' })
            gsap.to(window, {
                scrollTo: '#table',
            })
        },
        calculateAndDisplayRoute() {
            const directionsService = new window.google.maps.DirectionsService()
            const directionsRenderer = new window.google.maps.DirectionsRenderer()
            // const directionsResult = new window.google.maps.DirectionsResult()
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
                            travelMode: window.google.maps.TravelMode.TRANSIT
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
                                this.steps = []
                                for (let i of response.routes[0].legs[0].steps) {
                                    var distance = i.distance.text
                                    var duration = i.duration.text
                                    var instructions = i.instructions
                                    this.steps.push({ 'directions': instructions, 'distance': distance, 'ett': duration })
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

<style scoped>
#map {
    height: 600px;
    -webkit-border-radius: 20px;
    overflow: hidden;
}

#addy {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

#getDirections {
    font-size: 20px;
    border-radius: 20px;
}

.btn {
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
}

#table {
    border-radius: 20px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 30px;
}
</style>