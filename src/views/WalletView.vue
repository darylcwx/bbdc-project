<template>
    <div class="container q-pa-xl">
        <div class="bg"></div>

        <!-- top up -->

        <q-btn class="how-much font" no-caps rounded color="light-blue-8" label="How much do I top-up?"
            @click="popup = true">
            <q-dialog v-model="popup">
                <q-card>
                    <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">How much do I top up?</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-card-section>
                        <p>Do check out &nbsp;
                            <q-btn no-caps color='primary' rounded @click="redirToRates"
                                target='_blank' rel='noopener noreferrer' v-close-popup>
                                this link
                            </q-btn>&nbsp; for our detailed rates!</p> (The link
                        opens a new tab <span>&#128578;)</span>
                    </q-card-section>
                </q-card>
            </q-dialog>

        </q-btn>
        <h2 class="header1">My Wallet</h2>
        <div class="font row items-center one">
            <div class="col-6 text-right q-pa-sm">Current Balance:</div>
            <q-input class="col-6 q-pa-sm" readonly v-model="currBal" dark :type="wantToSee ? 'text' : 'password'"
                prefix="$">
                <template v-slot:append>
                    <q-icon :name="wantToSee ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                        @click="wantToSee = !wantToSee" />
                </template>
            </q-input>
        </div>
        <div class="font row items-center two">
            <div class="col-6 text-right q-pa-sm">Amount to Top-up:</div>
            <div class="col-6 q-pa-sm">
                <q-input dark v-model="amount" type="number" prefix="$" />
            </div>
        </div>
        <div class="font row items-center three">
            <div class="col-6 text-right q-pa-sm">Balance <u>after</u> Top-up:</div>
            <q-input class="col-6 q-pa-sm" readonly v-model="newBal" dark :type="wantToSee ? 'text' : 'password'"
                prefix="$">
                <template v-slot:append>
                    <q-icon :name="wantToSee ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                        @click="wantToSee = !wantToSee" />
                </template>
            </q-input>
        </div>
        <div class="font text-center q-pa-md four">
            <q-btn class="q-px-lg" no-caps rounded color="light-blue-8" label="Submit" @click="submit = true">
            </q-btn>

            <q-dialog v-model="submit">
                <q-card>
                    <q-card-section class="row items-center">
                        <div class="text-h6">Confirm Top Up</div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-card-section>
                        <img src="@/assets/paynow.jpg" style="width: 100%;">
                        <div class="text-center">
                            Please scan the above QR to top up ${{ amount }}.
                        </div>
                    </q-card-section>
                    <q-card-section class="text-center">
                        <q-btn no-caps rounded color="light-blue-8" label="Done!" @click="topUp" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </div>
        <q-btn class="historyBtn font" no-caps rounded color="light-blue-8" label="Show / Hide history"
            @click="toggleHistory()">
            <q-tooltip class="text-center bg-light font" style="font-size:15px;" anchor="center left" self="center right">To
                respect your privacy, we have temporarily hidden your top up history. <br>Click here if you'd like to
                see it!</q-tooltip>
        </q-btn>

        <hr class="hr" color="white">
        <!-- top up history -->
        <h2 class="header2">Top-Up History</h2>
        <div class='font history row w-40 justify-center'>
            <div class="col-12">
                <q-table :rows="rows" :columns="columns" row-key="date">
                    <template v-slot:bottom-row>
                        <q-tr no-hover>
                            <q-td class="text-bold">Total Topped Up:</q-td>
                            <q-td colspan="100%" class="text-left text-bold">${{ sum }}</q-td>
                        </q-tr>
                    </template>
                </q-table>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue'
import { getDatabase, ref as FBref, onValue, update, set } from "firebase/database";
import { useStore } from "@/pinia_store";
import gsap from 'gsap'

const db = getDatabase()
const store = useStore()

var userID = store.userID
const userRef = FBref(db, 'users/' + userID)
const walletRef = FBref(db, 'users/' + userID + '/wallet')
const topUpRef = FBref(db, 'users/' + userID + '/topup')
var balance = 0


onValue(walletRef, (snapshot) => {
    balance = +snapshot.val()
    balance = balance.toFixed(2)
});

const rows = []
onValue(topUpRef, (snapshot) => {
    let data = snapshot.val()
    for (let row in data) {
        let topup = {
            num: +row+1,
            date: data[row].date,
            amount: data[row].amount
        }
        rows.push(topup)
    }
})

const columns = [
    { name: 'num', label: 'No', align: 'left', field: 'num', sortable: false },
    { name: 'date', required: true, label: 'Date', align: 'left', field: 'date', format: val => `${val}`, sortable: true },
    { name: 'amount', label: 'Amount', align: 'left', field: 'amount', sortable: true },
]
// const rows = [
//     { num: 1, date: '01/10/2022', amount: '$50' },
//     { num: 2, date: '05/10/2022', amount: '$60' },
//     { num: 3, date: '09/10/2022', amount: '$65' }
// ]
// console.log(rows)

export default {
    name: 'app',
    components: {

    },
    data() {
        return {
            amount: 0,
            currBal: balance,  // get wallet value
            isActive: true,
            wantToSee: false
        }
    },
    setup() {
        return {
            columns,
            rows,
            submit: ref(false),
            popup: ref(false),
            tl: gsap.timeline({ paused: true }),
        }
    },
    computed: {
        newBal() {
            if (this.amount == "") {
                return this.currBal
            }
            var newBal = (+this.currBal + parseFloat(this.amount)).toFixed(2)
            return newBal
        },
        sum() {
            var total = 0
            for (let i = 0; i < this.rows.length; i++) {
                total += parseFloat(this.rows[i].amount.slice(1))
            }
            return total
        }
    },
    mounted() {
        this.animate();
    },
    methods: {
        topUp() {
            update(userRef, {
                wallet: parseFloat(this.newBal)
            })
            var thisTopUp = 0
            var todayDate = new Date()
            onValue(topUpRef, (snapshot) => {
                var data = snapshot.val();
                let lastTopUp = +Object.keys(data).pop();
                thisTopUp = lastTopUp + 1
                console.log(typeof todayDate)
                let dd = todayDate.getDate()
                console.log(dd)
                let mm = todayDate.getMonth()+1
                console.log(mm)
                let yyyy = todayDate.getFullYear()
                console.log(yyyy)
                if(dd<10) 
                    {
                        dd='0'+dd;
                    } 

                    if(mm<10) 
                    {
                        mm='0'+mm;
                    } 
                todayDate = dd.toString()+'/'+mm.toString()+'/'+yyyy.toString()
                console.log(todayDate)
            });
            const rowRef = FBref(db, 'users/' + userID + '/topup/' + thisTopUp)
            // let todayString = todayDate.toString()
            set(rowRef, {
                date: todayDate,
                amount: this.amount
            })
            this.submit = false
            
        },
        confirm() {
            // setTimeout(event.$parent)
            // hide (event) => void 0
            // alert()
        },
        redirToRates() {
            let route = this.$router.resolve({ path: '/', query: { to: 'our-rates'} });
            window.open(route.href, '_blank')
        },
        animate() {
            gsap.from('.header1',
                { opacity: 0, x: -400, duration: 1, ease: 'back', delay: 0 })
            gsap.from('.one',
                { opacity: 0, x: -400, duration: 0.5, ease: 'power1', delay: 0.2 })
            gsap.from('.two',
                { opacity: 0, x: -400, duration: 0.5, ease: 'power1', delay: 0.4 })
            gsap.from('.three',
                { opacity: 0, x: -400, duration: 0.5, ease: 'power1', delay: 0.6 })
            gsap.from('.four',
                { opacity: 0, y: 400, duration: 0.5, ease: 'power1', delay: 0.8 })

            this.tl
                .from('.header2',
                    { opacity: 0, y: 300, duration: 0.5, ease: 'power1' }, 0)

                .from('.history',
                    { opacity: 0, x: -300, duration: 0.5, ease: 'power1' }, 0)

                .from('.hr',
                    { opacity: 0 }, 0)
                .reverse()

        },
        toggleHistory() {
            this.tl.reversed(!this.tl.reversed());
        }
    }
}


</script>

<style>
.container {
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: white;
}

.how-much {
    position: fixed;
    top: 80px;
    right: 30px;
}
.historyBtn {
    position: fixed;
    top: 50vh;
    right: 30px;
}

.q-field:v-deep .q-field__control {
    border: none;
}

hr {
    width: 80vw;
    border: none;
    height: 1px;
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