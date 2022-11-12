<template>

    <q-btn @click="getLocation()" class="text-white">
    Call Weather
    </q-btn>

</template>

<script>
export default {
    setup() {


        return {
            
        }

    },
    data() {
        return {
            finalResult: {},
            api_key: "b15210f72f1ac7b474488b9bfb16831d",
            weather_url_base: "https://api.openweathermap.org/data/2.5/weather?",
            location_url_base: "http://api.openweathermap.org/geo/1.0/direct?q=Singapore&limit=1&appid="
        }
    },
    methods: {
        getWeather(lat, lon) {
            fetch(`${this.weather_url_base}lat=${lat}&lon=${lon}&appid=${this.api_key}`)
                .then(res => res.json())
                .then(data => {
                    this.weather = data;
                    console.log(this.weather);
                })
        },
        getLocation() {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Singapore&limit=1&appid=${this.api_key}`)
                .then(response => response.json())
                .then(data => {
                    var lat = data[0].lat
                    var lon = data[0].lon
                    this.getWeather(lat, lon)
                })
            }
        }
    }
</script>