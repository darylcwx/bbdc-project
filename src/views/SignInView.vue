<template>
  <div class="container q-pa-xl">
    <div class="bg"></div>

    <div class="row full-width justify-evenly">
      <!-- panel -->
      <div class="half row justify-center items-center">
        <div class="svg-container">
          <svg
            class="svg"
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <!-- <clipPath id="myClip">
            <rect width="100" height="100" />
          </clipPath>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0" style="stop-color:black;stop-opacity:1">
                <animate attributeName="stop-color" dur="2.5775s" values="blue;black;" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs> -->
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="black"
            >
              <!-- bigger number bigger path -->
              <path
                class="left1"
                d="M270 4500 c24 -19 46 -20 773 -20 708 0 748 1 745 18 -3 16 -49 17 -773 19 -766 3 -770 3 -745 -17z"
              />
              <path
                class="left2"
                d="M637 4185 l28 -35 563 0 562 0 0 35 0 35 -590 0 -591 0 28 -35z"
              />
              <path
                class="left3"
                d="M820 3955 c0 -3 16 -30 36 -60 l37 -55 453 0 454 0 0 60 0 60 -490 0 c-269 0 -490 -2 -490 -5z"
              />
              <path
                class="left4"
                d="M1012 3605 l32 -65 378 0 378 0 0 65 0 65 -410 0 -410 0 32 -65z"
              />
              <path
                class="left5"
                d="M1092 3408 c3 -7 17 -50 32 -95 l28 -83 329 0 330 0 -3 93 -3 92 -359 3 c-285 2 -357 0 -354 -10z"
              />
              <path
                class="left6"
                d="M1180 3121 c0 -8 22 -127 36 -188 l4 -23 295 0 295 0 0 110 0 110 -315 0 c-178 0 -315 -4 -315 -9z"
              />
              <path
                class="left7"
                d="M1234 2763 c4 -43 9 -102 12 -130 l5 -53 285 0 285 0 -3 128 -3 127 -293 3 -294 2 6 -77z"
              />
              <path
                class="left8"
                d="M1246 2388 c-4 -79 -14 -195 -22 -258 -79 -603 -378 -1162 -787 -1471 l-78 -59 745 0 746 0 0 168 c0 92 -7 513 -15 937 -8 424 -15 782 -15 798 l0 27 -284 0 -283 0 -7 -142z"
              />
              <path
                class="right8"
                d="M2645 4510 c345 -36 690 -208 878 -438 201 -245 262 -557 176 -897 -52 -203 -192 -413 -361 -540 l-60 -45 801 0 801 0 0 51 c0 139 -61 416 -131 594 -241 617 -740 1056 -1379 1214 -176 43 -327 60 -583 65 -154 3 -197 2 -142 -4z"
              />
              <path
                class="right7"
                d="M3362 2453 c44 -43 101 -106 126 -140 l46 -63 667 0 667 0 6 63 c3 34 7 97 10 140 l4 77 -803 0 -803 0 80 -77z"
              />
              <path
                class="right6"
                d="M3604 2122 c19 -37 40 -86 48 -110 l13 -42 572 0 572 0 11 40 c16 65 28 113 34 148 l6 32 -645 0 -644 0 33 -68z"
              />
              <path
                class="right5"
                d="M4238 1913 l-557 -3 9 -32 c5 -17 12 -64 16 -104 l7 -74 498 0 c274 0 500 4 503 9 5 8 87 214 83 209 -1 -2 -253 -4 -559 -5z"
              />
              <path
                class="right4"
                d="M3705 1558 c-2 -7 -6 -37 -10 -65 l-6 -53 438 0 438 0 38 60 c20 33 37 62 37 65 0 3 -209 5 -465 5 -364 0 -466 -3 -470 -12z"
              />
              <path
                class="right3"
                d="M3597 1195 l-27 -55 373 0 373 0 35 38 c75 80 110 72 -333 72 l-394 0 -27 -55z"
              />
              <path
                class="right2"
                d="M3342 894 l-44 -34 319 0 318 0 55 35 55 35 -330 -1 -330 -1 -43 -34z"
              />
              <path
                class="right1"
                d="M2950 629 c-378 -10 -480 -26 -174 -28 211 -1 405 11 469 29 17 4 21 8 10 7 -11 -1 -148 -4 -305 -8z"
              />
            </g>

            <use clip-path="url(#myClip)" fill="red" />
          </svg>
        </div>
      </div>
      <!-- sign in -->
      <div class="col-8 col-sm-4 left" :style="{ zIndex: placement }">
        <h2 class="header text-left first0">Sign In</h2>

        <div class="switch text-left first1">
          Don't have an account yet?&nbsp;&nbsp;
          <q-btn
            size="lg"
            style="background-color: rgb(32, 39, 52)"
            rounded
            no-caps
            @click="swapPlace"
            label="Register"
          />
        </div>

        <div class="inputGroup first2">
          <q-input
            rounded
            standout
            dark
            label="Login ID"
            type="text"
            hint="Your login ID is now the last 4 digits of your NRIC, plus your
        birthday in DDMMYYYY format"
            name="login"
            v-model="uname"
            placeholder="123A01012000"
          />
        </div>

        <div class="inputGroup first3">
          <q-input
            rounded
            standout
            dark
            label="Password"
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            placeholder="Your Password here"
          > <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template></q-input>
        </div>

        <div
          class="error q-mx-auto q-mb-md text-negative text-center"
          id="errorLogin"
        ></div>

        <div class="text-center first4">
          <q-btn
            size="lg"
            rounded
            style="background-color: rgb(32, 39, 52)"
            no-caps
            id="submit"
            @click="signInUser"
            label="Sign In"
          />
        </div>
      </div>

      <!--  register -->
      <div class="col-8 col-sm-4 right">
        <!-- blocker thing -->
        <h2 class="header text-right">Register</h2>

        <div class="switch text-right">
          Already have an account?&nbsp;&nbsp;
          <q-btn
            size="lg"
            style="background-color: rgb(32, 39, 52)"
            rounded
            no-caps
            @click="swapPlace"
            label="Sign in"
          />
        </div>

        <div class="inputGroup">
          <div class="row">
            <div class="col q-pr-sm">
              <q-input
                rounded
                standout
                label="First name"
                type="text"
                v-model="fName"
                placeholder="John"
                dark
              />
            </div>
            <div class="col q-pr-sm">
              <q-input
                rounded
                standout
                label="Last name"
                type="text"
                v-model="lName"
                placeholder="Smith"
                dark
              />
            </div>
          </div>
        </div>

        <div class="inputGroup">
          <q-input
            rounded
            standout
            label="NRIC"
            v-model="nric"
            type="text"
            placeholder="S0000000A"
            dark
          />
        </div>

        <div class="inputGroup">
          <q-input
            rounded
            standout
            dark
            label="Birthday"
            v-model="birthday"
            mask="date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    dark
                    v-model="birthday"
                    default-view="Years"
                    color="blue-grey-10"
                    :navigation-max-year-month="this.today"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="inputGroup">
          <q-input
            rounded
            standout
            label="Password"
            v-model="password"
            type="password"
            placeholder="Choose a strong password!"
            dark
          />
        </div>

        <div
          class="error q-mx-auto q-mb-md text-negative text-center"
          id="errorReg"
        ></div>

        <div class="text-center">
          <q-btn
            size="lg"
            rounded
            style="background-color: rgb(32, 39, 52)"
            no-caps
            id="submit"
            @click="createUser"
            label="Register"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useRouter } from "vue-router"; // import router
import { useStore } from "@/pinia_store";
import gsap from "gsap";


var today = new Date();
var mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
var todayDate = yyyy + "/" + mm;

export default {
  data() {
    return {
      uname: "",
      password: "",
      isPwd: true,
      fName: "",
      lName: "",
      logIn: true,
      tl: 0,
      nric: "",
      birthday: "",
      placement: 3,
      router: useRouter(),
      today: todayDate,
    };
  },
  setup() {
    sessionStorage.setItem("signInCheck", "no");
    console.log(sessionStorage.getItem("signInCheck"));
    return {
      tl: gsap.timeline({ paused: true, defaults: { ease: "back.inOut" } }),
      logoTL: gsap.timeline({ play: true, repeat: -1, repeatDelay: 0.2 }),
    };
  },
  mounted() {
    this.animate();
  },
  methods: {
    // function signInUser that checks db for username and pw
    // return errors for failed sign in, return username and pw for correct sign in

    // getData() {
    //   const db = getDatabase();
    //   const usersRef = ref(db, "users");
    //   onValue(usersRef, (snapshot) => {
    //     let userDB = snapshot.val();
    //     console.log(userDB)
    //     return userDB
    //   });
    // },
    signInUser() {
      const store = useStore();
      const db = getDatabase();
      const usersRef = ref(db, "users");
      let success = false;

      let userDB = {};
      let userArr = [];

      onValue(
        usersRef,
        (snapshot) => {
          userDB = snapshot.val();
          userArr = Object.entries(userDB);
        },
        (error) => console.log(error)
      );

      // get(usersRef)
      //   .then((snapshot) => {
      //     userDB = snapshot.val();
      //     userArr = Object.entries(userDB);
      //   }).catch((error) => {
      //     console.log(error)
      //   });

      // let userDB = this.getData()
      console.log(userDB);
      console.log(userArr);

      if (this.uname && this.password) {
        let errors = this.checkErrors();
        if (errors == null) {
          for (let i = 0; i < userArr.length; i++) {
            if (
              userArr[i][1].username == this.uname &&
              userArr[i][1].password == this.password
            ) {
              console.log(this.router);
              this.router.push("/summary");
              store.$patch({
                userID: i,
                fullName: userArr[i][1].fullName,
              });
              sessionStorage.setItem("signInCheck", "yes");
              console.log(sessionStorage.getItem("signInCheck"));
              success = true;
              return console.log("success");
            }
          }
          document.getElementById("errorLogin").innerText =
            "Your profile is not found.";
        } else {
          document.getElementById("errorLogin").innerText = errors;
        }
      } else {
        document.getElementById("errorLogin").innerText =
          "Please enter your credentials.";
      }
      if (!success) {
        gsap.to(".error", { scale: 1.2, duration: 0.25, ease: "power1" });
        gsap.to(".error", {
          scale: 1,
          duration: 0.25,
          ease: "power1",
          delay: 0.25,
        });
      }
    },
    // helper function checkErrors that checks username and pw as input for errors
    // return errors if found, else return null
    checkErrors() {
      let nric1 = this.uname.slice(0, 3);
      let nric2 = this.uname.slice(3, 4);
      let birthday = this.uname.slice(4, this.uname.length);

      let errors = "";

      if (isNaN(nric1) || nric2 instanceof String || isNaN(birthday)) {
        errors += "Your Login ID does not follow the conventions above.\n";
      }
      if (this.uname.length > 12 || this.uname.length < 12) {
        errors += "Your Login ID is too short or too long.\n";
      }
      if (this.password.length < 8) {
        errors += "Your Password is too short.\n";
      }

      if (errors) {
        return errors;
      } else {
        return null;
      }
    },
    createUser() {
      const store = useStore();
      const db = getDatabase();
      const usersRef = ref(db, "users");
      let success = false;
      let lastUser = 0;
      onValue(usersRef, (snapshot) => {
        var data = snapshot.val();
        lastUser = +Object.keys(data).pop();
      });

      if (this.password && this.fName && this.lName && this.nric && this.birthday) {
        let errors = this.checkRegErrors();
        if (errors == null) {
          let birthday = this.birthday.replaceAll('/', '')
          let shortIC = this.nric.slice(5, this.nric.length)
          let yyyy = birthday.slice(0,4)
          let mm = birthday.slice(4,6)
          let dd = birthday.slice(6, birthday.length)
          let uname = shortIC + dd + mm + yyyy

          set(ref(db, "users/" + (lastUser + 1)), {
            username: uname,
            password: this.password,
            fullName: this.fName.trim() + ' ' + this.lName.trim(),
            wallet: 0,
            progress: 0,
          })
            .then(() => {
              this.router.push("/summary");
              store.$patch({
                userID: lastUser + 1,
                fullName: this.fName,
              });
              localStorage.setItem("signInCheck", "yes");
              success = true
              return console.log("success");
            })
            .catch((error) => {
              // failed
              console.log(error);
              console.log(error.message);
            });
        } else {
          document.getElementById("errorReg").innerText = errors;
        }
      } else {
        document.getElementById("errorReg").innerText =
          "Please enter your credentials.";
      }
      if (!success) {
        gsap.to(".error", { scale: 1.2, duration: 0.25, ease: "power1" });
        gsap.to(".error", {
          scale: 1,
          duration: 0.25,
          ease: "power1",
          delay: 0.25,
        });
      }
    },
    // helper function checkErrors that checks username and pw as input for errors
    // return errors if found, else return null
    checkRegErrors() {
      let nric = this.nric;
      let nricEnds = nric[0] + nric[nric.length-1]
      let first = this.fName;
      let last = this.lName;
      let birthday = this.birthday;

      let errors = "";

      if (nric.length > 9 || nric.length < 9 ) {
        errors += "Your NRIC is incorrect.\n";
      }
      if (this.password.length < 8) {
        errors += "Your Password is too short.\n";
      }
      if (/\d/.test(first) || +first == NaN || /\d/.test(last) || +last == NaN) {
        errors += "Name is not valid / contains non-alphabet characters.\n";
      }

      if (errors) {
        return errors;
      } else {
        return null;
      }
    },
    animate() {
      // on page load
      let dly = 0.2;
      for (let i = 0; i < 4; i++) {
        gsap.from(".first" + i, {
          opacity: 0,
          x: 500,
          duration: 0.5,
          ease: "power1",
          delay: dly * i,
        });
      }
      gsap.from(".first4", {
        opacity: 0,
        y: 500,
        duration: 0.5,
        ease: "power1",
        delay: 0.8,
      });

      let center = document.querySelector(".half").offsetWidth;

      // logo
      dly = 0.1;
      let count = 0;
      for (let i = 8; i > 0; i--) {
        this.logoTL.from(
          ".left" + i,
          { opacity: 0, y: 2000, duration: 1, ease: "back" },
          dly * count
        );
        count++;
      }
      count = 0;
      for (let i = 8; i > 0; i--) {
        this.logoTL.from(
          ".right" + i,
          { opacity: 0, y: -2000, duration: 1, ease: "elastic" },
          dly * count
        );
        count++;
      }
      dly = 0.2;
      count = 0;
      for (let i = 8; i > 0; i--) {
        this.logoTL.fromTo(
          ".left" + i,
          { opacity: 1 },
          { opacity: 0, duration: 0.5, ease: "power1" },
          2 + dly * count
        );
        count++;
      }
      count = 0;
      for (let i = 8; i > 0; i--) {
        this.logoTL.fromTo(
          ".right" + i,
          { opacity: 1 },
          { opacity: 0, duration: 0.5, ease: "power1" },
          2 + dly * count
        );
        count++;
      }
      this.logoTL.fromTo(
        ".svg",
        { opacity: 1 },
        { opacity: 1, duration: 1, scale: 1.25, rotation: 360, ease: "power1" },
        2
      );

      //sign up sign in ani
      this.tl
        .fromTo(
          ".half",
          { x: 0, duration: 0.5 },
          { x: -center, duration: 0.7 },
          0
        )

        .fromTo(
          ".left",
          { opacity: 1, x: 0 },
          { opacity: 0, x: center, duration: 0.7 },
          0
        )

        .fromTo(
          ".right",
          { opacity: 0, x: -center },
          { opacity: 1, x: 0, duration: 0.7 },
          0
        )
        .reverse();
    },
    swapPlace() {
      this.tl.reversed(!this.tl.reversed());
      if (this.placement == 3) {
        this.placement = 0;
      } else {
        this.placement = 3;
      }
    },
  },
};
</script>

<style>
.container {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;
  font-family: "Raleway", sans-serif;
}

.header {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.title {
  font-family: "Raleway", sans-serif;
  font-size: 20px;
}

.q-input::v-deep .q-input__input {
  border: none;
}

.half {
  background-color: rgb(32, 39, 52);
  width: calc(33.333% + 100px);
  height: 75vh;
  position: absolute;
  left: 50%;
  z-index: 5;
  opacity: 1;
  border-radius: 20px;
}

.svg-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
}

.inputGroup {
  padding: 20px 0;
  color: white;
}

.switch {
  padding: 20px 0;
}

.bg {
  position: absolute;
  background: url("@/assets/login-page-bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: -1;
  filter: brightness(40%);
}
</style>