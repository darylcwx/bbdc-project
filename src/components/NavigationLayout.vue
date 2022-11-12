<template>
  <!-- v-if="this.$route.path !== '/' && this.$route.path !== '/dev-team' && this.$route.path !== '/location'
    && this.$route.path !== '/login' && this.$route.path !== '/register'" -->
  <q-layout view="hHh LpR lFf">

    <q-header :class="['text-white', getClassFromRouteName]">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="q-mr-sm" v-if="this.$route.path !== '/' && this.$route.path !== '/dev-team' && this.$route.path !== '/location'
        && this.$route.path !== '/login' && this.$route.path !== '/register'" />

        <q-avatar>
          <img src="@/assets/bbdc-small.png">
        </q-avatar>

        <q-toolbar-title
          v-if="this.$route.path !== '/' && this.$route.path !== '/dev-team' && this.$route.path !== '/location'  && this.$route.path !== '/login'">
          Bukit Better Driving Centre
        </q-toolbar-title>

        <q-space />
        <q-tabs>
          <q-route-tab v-if="signInCheck == 'no'" class="tab" no-caps name="home" label="Home" to="/" />
          <q-route-tab v-else class="tab" no-caps name="home" label="Home" to="/summary" />
          <q-route-tab class="tab" no-caps name="location" label="Locate Us" to="/location" />
          <q-route-tab class="tab" no-caps name="dev-team" label="Dev Team" to="/dev-team" />
          <q-route-tab class="tab" no-caps name="login" label="Login" to="/login" v-if="this.$route.path === '/' || this.$route.path === '/dev-team' || this.$route.path === '/location'
          || this.$route.path === '/login' || this.$route.path === '/register'" />
          <q-route-tab v-if="signInCheck == 'yes'" class="tab" no-caps name="logout" label="Logout" @click="logout" to="/"  />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="this.$route.path !== '/' && this.$route.path !== '/dev-team' && this.$route.path !== '/location'
    && this.$route.path !== '/login' && this.$route.path !== '/register'" show-if-above v-model="drawer"
      :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = true" :width="180" :breakpoint="500"
      side="left" class="bg-light-blue-8">
      <!-- <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;"> -->
      <!-- drawer content -->
      <q-list white>

        <router-link to="/summary" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'home'"
            @click="link = 'home'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="home" size="lg"></q-icon>
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/theory" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'theory'"
            @click="link = 'theory'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="edit" size="lg"></q-icon>
            </q-item-section>

            <q-item-section>
              Theory
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/simulator" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'simulator'"
            @click="link = 'simulator'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="computer" size="lg"></q-icon>
            </q-item-section>

            <q-item-section>
              Simulator
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/practical" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'practical'"
            @click="link = 'practical'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="directions_car" size="lg"></q-icon>
            </q-item-section>
            <q-item-section>
              Practical
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/wallet" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'wallet'"
            @click="link = 'wallet'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="account_balance_wallet" size="lg"></q-icon>
            </q-item-section>
            <q-item-section>
              Wallet
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="/history" class="link">
          <q-item clickable v-ripple active-class="active-link" :active="link === 'history'"
            @click="link = 'history'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="history" size="lg"></q-icon>
            </q-item-section>
            <q-item-section>
              History
            </q-item-section>
          </q-item>
        </router-link>

        <!-- <router-link to="/info" class="link">
          <q-item clickable v-ripple :active="link === 'info'" @click="link = 'info'; leftDrawerOpen = 'false'">
            <q-item-section avatar>
              <q-icon name="info" size="lg"></q-icon>
            </q-item-section>
            <q-item-section>
              Information
            </q-item-section>
          </q-item>
        </router-link> -->

        <!-- <q-item class="absolute-bottom" clickable v-ripple :active="link === 'test'"
            @click="link = 'test'; leftDrawerOpen = 'false'" active-class="my-menu-link">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <router-link to="/testing" class="link">Test DB</router-link>
            </q-item-section>
          </q-item> -->

        <!-- <q-separator /> -->

        <!-- <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
          </q-avatar>
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item> -->

        <!-- <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item> -->
      </q-list>
      <!-- </q-scroll-area>
      <q-img class="absolute-top bg-pic">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-md">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Dr. Shar Lwin Khin</div>
          <div>@profSLK</div>
        </div>
      </q-img> -->

    </q-drawer>

    <!-- <q-page-container>
      <router-view v-slot="{ Something }"> 
        <transition name="route" mode="out-in">
          <component :is="Something">
          
          </component>
        </transition>
      </router-view>
    </q-page-container> -->

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    // const leftDrawerOpen = ref(false)
    // sessionStorage.setItem('signInCheck', 'initial')
    // console.log('sessionStorage', sessionStorage.getItem('signInCheck'))

    return {
      // leftDrawerOpen,
      // toggleLeftDrawer() {
      //   leftDrawerOpen.value = !leftDrawerOpen.value
      // },
      drawer: ref(false),
      miniState: ref(true),
      link: ref('home'),
      signInCheck: sessionStorage.getItem('signInCheck')
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      console.log('logout')
    }
  },
  computed: {
    getClassFromRouteName() {
      if (this.$route.path === '/') {
        return 'homepage'
      } else if (this.$route.path === '/dev-team') {
        return 'dev-team'
      } else if (this.$route.path === '/location') {
        return 'location'
      } else if (this.$route.path === '/login'){
        return 'login'
      } else {
        return 'bg-light-blue-8'
      }
    },
    check() {
      console.log(sessionStorage.getItem('signInCheck'))
      return sessionStorage.getItem('signInCheck')
    }
    // getRGBfromBG(){
      
    // }
  }
}
</script>

<style lang="scss" scoped>



// link related
.link {
  text-decoration: none;
}
.q-tab::v-deep .q-tab__label {
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  font-size: 18px;
}
.q-toolbar {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 18px;
}
.q-item {
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color:white;
  padding: 20px 0 20px 10px;
}
.active-link {
  background-color: $light-blue-6;
}

// navbar colors for main pages
.homepage {
  background-color: rgb(47, 48, 50);
  opacity: 1;
}

.dev-team {
  background-color: rgb(89, 107, 115);
  opacity: 1;
}
.login {
  background-color: rgb(1, 0, 1);
  opacity: 1;
}
.location {
  background-color: rgb(75, 75, 75);
  opacity: 1;
}

// Route transition
.route-enter-from {
  opacity: 0;
  transform: translateX(100px)
}

.route-enter-active {
  transition: all 0.3 ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.3 ease-in;
}




// .my-menu-link {

//   color: white;
//   background: rgb(59, 59, 59);
// }



// .bg-pic {
//   background: rgb(2, 0, 36);
//   background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(104, 164, 254, 1) 80%);
//   height: 150px;
// }
</style>