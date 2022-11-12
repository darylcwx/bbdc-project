<template>
    <q-layout class="body">
        <section class="con0 q-pa-xl" id="top">
            <div class="bg bg1"></div>
            <!-- <transition appear 
            @before-enter="beforeTitleEnter"
            @enter = "titleEnter"
            > -->
            <h1 class="hello1 q-py-none text-center">
                <div class="special text-left q-mx-auto">Hello.</div>
            </h1>
            <h2 class="hello2 q-py-none q-pt-sm text-center">
                <div class="special text-left q-mx-auto">Welcome to Bukit Better Driving Center.</div>
            </h2>
            <h2 class="firstTitle">Join us and turn your dreams of driving
                <span class="magic">
                    <span class="text"> into reality.</span>
                </span>
            </h2>
            <!-- </transition> -->
            <div class="down">&darr;</div>
        </section>
        <!-- <hr> -->
        <section class="con1 q-pa-xl" id="our-rates">
            <div class="bg bg2"></div>
            <h2 class="title t1">Our Rates</h2>
            <div class="c1 row q-px-xl justify-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <q-table title="Rates" :rows=this.rows :columns=this.columns :pagination=this.pagination
                        row-key="index" hide-bottom />
                </div>
            </div>

        </section>

        <!-- <hr> -->
        <section class="con2 q-pa-xl">
            <div class="bg bg3"></div>
            <h2 class="title t2">Testimonials</h2>
            <div class="c2 row q-px-xl">
                <div v-for="(detail, index) in this.details" :key="index" class="col-6 col-md-6 col-xl-3 q-px-sm"
                    ref="cards">
                    <tCard class="q-mx-auto" :name="detail.name" :image="detail.image" :testimony="detail.testimony">
                    </tCard>
                </div>
            </div>
        </section>

        <img src="@/assets/white-up-arrow.png" class="backToTop" @click="scrollBackToTop">
    </q-layout>
</template>


<script>
import tCard from '@/components/TestimonyCard.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

export default {
    components: {
        tCard
    },
    data() {
        return {
            activeItem: null,
            details: [
                { id: 0, name: 'Selena Gomez', image: 'testimonial1.jpg', testimony: 'BBDC is great!! I recommend all my fans to take lessons with them. This is totally not a paid promo. Also, I can park better than Justin ever did.' },
                { id: 1, name: 'Henry Cavill', image: 'testimonial2.jpg', testimony: 'Leaving a review here because I was given a Bentley for doing so. Catch me in \'Black Adam\', Netflix\'s \'The Witcher\' and \'The Flash\' in 2023.' },
                { id: 2, name: 'Kanye West', image: 'testimonial3.jpg', testimony: 'I usually don\'t drive, I get driven. Also, I did not authorize this photo of me to be taken... Gotta love the paparazzi.' },
                { id: 3, name: 'Thomas Shelby', image: 'testimonial4.jpg', testimony: 'With the boys on me way to burn down a house and then drinks at the garrison. By order of the peaky blinders.' }
            ],
            columns: [
                {
                    name: 'category',
                    label: 'Category',
                    align: 'left',
                    field: row => row.category,
                    sortable: true
                },
                { name: 'name', align: 'left', label: 'Lesson Type', field: 'name', sortable: true },
                { name: 'price', align: 'left', label: 'Price', field: 'price' }
            ],
            rows: [
                {
                    index: 0,
                    category: 'Theory',
                    name: 'Lessons',
                    price: '$40'
                },
                {
                    index: 1,
                    category: 'Theory',
                    name: 'Evaluation',
                    price: '$40'
                },
                {
                    index: 2,
                    category: 'Theory',
                    name: 'Test',
                    price: '$40'
                },
                {
                    index: 3,
                    category: 'Simulator',
                    name: 'Lessons',
                    price: '$40'
                },
                {
                    index: 4,
                    category: 'Practical',
                    name: 'Lessons',
                    price: '$40'
                },
                {
                    index: 5,
                    category: 'Practical',
                    name: 'Test (Class 3)',
                    price: '$40'
                },
                {
                    index: 6,
                    category: 'Practical',
                    name: 'Test (Class 2)',
                    price: '$40'
                },
            ],
            pagination: {
                page: 1,
                rowsPerPage: 10
            }
        }
    },
    mounted() {
        this.scrollAnimation();
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        scrollAnimation() {
            gsap.fromTo('.hello1',
                { opacity: 0, y: 400 },
                { opacity: 1, y: 50, duration: 1, ease: 'power1', delay: 0.5 })
            gsap.fromTo('.hello2',
                { opacity: 0, y: 400 },
                { opacity: 1, y: 50, duration: 1, ease: 'power1', delay: 1 })

            gsap.to('.hello1',
                { opacity: 0, y: -500, duration: 1, ease: 'power1', delay: 3 })

            gsap.to('.hello2',
                { opacity: 0, y: -500, duration: 1, ease: 'power1', delay: 3.5 })

            gsap.fromTo('.firstTitle',
                { opacity: 0, y: 400 },
                { opacity: 1, y: -200, duration: 1, ease: 'power1', delay: 4 })

            gsap.from('.text',
                { opacity: 0, duration: 2, ease: 'power1', delay: 6 })

            let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
            gsap.utils.toArray("section").forEach((section, i) => {
                section.bg = section.querySelector(".bg");
                gsap.fromTo(section.bg, {
                    backgroundPosition: () => i
                        ? `50% ${-window.innerHeight * getRatio(section)}px`
                        : "50% 0px"
                }, {
                    backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: () => i ? "top bottom" : "top top",
                        end: "bottom top",
                        scrub: true,
                        invalidateOnRefresh: true // to make it responsive
                    }
                });
            });
        },
        scrollBackToTop() {
            let sbtt = gsap.to(window, {
                scrollTo: '#top',
                //scrollTo: { y: 0 },
            })
            return sbtt
        },
        handleScroll() {
            let bot = document.querySelector('.backToTop')
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                //bot.style.display = "block";
                gsap.to(bot, { opacity: 1 })
            } else {
                //bot.style.display = "none";
                gsap.to(bot, { opacity: 0 })
            }
        },
    },
}

</script>

<style scoped>
.body {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.body2 {
    height: 100%;
    width: 100%;
    overflow: auto;
}

.down {
    position: absolute;
    font-size: 50px;
    bottom: 100px;
    left: 50%;
    z-index: 1;
    color: white;
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
}

.bg1 {
    background: url('@/assets/bg1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(20%);
}

.bg2 {
    background: url('@/assets/bg3.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(40%);
}

.bg3 {
    background: url('@/assets/bg2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(30%);
}

section {
    position: relative;
    height: 100vh;
    margin: 0;
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

.backToTop {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    z-index: 1;
    opacity: 0;
}

.backToTop:hover {
    background-color: rgb(53, 53, 53);
    border-radius: 25px;
}

.special {
    width: 70vw;
}
.firstTitle>.magic>.text {
    background: linear-gradient(to right,
            blue,
            deepskyblue,
            cyan,
            lightblue,
            cyan,
            deepskyblue,
            blue);
    background-size: 200%;
    animation: background-pan 3s linear infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Oooh Baby', cursive;
    font-size: 80px;
}

@keyframes background-pan {
    from {
        background-position: 0% center;
    }

    to {
        background-position: -200% center;
    }
}
</style>