<template>
  <div id="app"
       class="relative flex flex-col tracking-wide min-h-screen align-center "
  >


    <div class="flex align-center justify-center z-10">
      <div class="flex flex-col w-full sm:w-5/6 max-w-2xl">
        <div class="flex flex-col sm:flex-row mt-10">
          <div class="flex w-full h-16">
            <div
                    class="flex card-small rounded-none sm:rounded-l-lg align-center mr-px w-24 min-w-24 cursor-pointer"
                    v-on:click="dropDownIsHidden = !dropDownIsHidden"
            >


              <div class="flex w-24 align-center justify-center m-auto">
                <img
                        :src="activePlatform"
                        class="w-8 h-8"
                >
              </div>
            </div>
              <div class="absolute mt-2 card rounded-lg z-10 shadow-xl" v-if="!dropDownIsHidden">

                <div
                        class="flex  w-24 buttons rounded-lg text-white p-2 align-center justify-center cursor-pointer "
                        v-for="platform in platforms"
                        v-on:click="selectPlatform(platform)"
                >
                  <img
                          :src="platform.src"
                          class="w-8 h-8"

                  >
                </div>
              </div>

            <input
                    class="flex w-full tracking-wider pl-5 card text-sm text-gray-300 outline-none font-work-sans"
                    placeholder="Enter platform username"
                    v-model="username"
                    v-on:keyup.enter="setInit"
            >
          </div>

          <div class="">
            <router-link
                    :to="'/' + platform + '/' + username"

            >
              <div
                      class="flex text-lg sm:text-lg w-38 text-white buttons selector h-16 bg-indigo-500 hover:bg-indigo-600  text-indigo-200 p-5 rounded-none sm:rounded-r-lg align-center justify-center cursor-pointer"
                      v-on:click="setInit"
              >

                <div class="ml-2 mr-2 text-indigo-200 font-bebas">

                  SEARCH

                </div>

              </div>
            </router-link>
          </div>

        </div>



      </div>


    </div>



    <router-view
    >
    </router-view>
  </div>
</template>

<script>
  import LobbyDivision from './components/LobbyDivision';
  import LobbyStatCard from './components/LobbyStatCard';
  import Results from './views/Results';
  import Profile from './views/Profile';
  import axios from 'axios';

  const timer = ms => new Promise(res => setTimeout(res, ms));
  export default {
    name: 'app',
    components: {
      LobbyDivision,
      LobbyStatCard,
      Results,
      Profile,
    },
    data() {
      return {

        platforms: {

          bNet: {
            id: 'battlenet',
            src: require('./assets/logos/bnet.svg'),
          },
          psn: {
            id: 'psn',
            src: require('./assets/logos/PlayStation_logo.svg'),
          },
          xbl: {
            id: 'xbl',
            src: require('./assets/logos/bnet.svg'),
          },

        },
        initSearch: false,
        selected: 'BATTLE',
        options: [
          { text: 'BATTLE', value: 'battlenet' },
          { text: 'ATVI', value: 'atvi' },
          { text: 'PSN', value: 'psn' },
          { text: 'XBL', value: 'xbl' }
        ],
        dropDownIsHidden: true,
        username: '',
        platform: 'battlenet',
        matchId: null,
        activePlatform: require('./assets/logos/bnet.svg'),
      }
    },
    methods: {
      setInit: function () {
        console.log('set init');
        this.initSearch = true;
        console.log(this.initSearch);
      },
      reset: function () {
        console.log('resetting');
        this.initSearch = false;
      },
      selectPlatform: function (platform) {
        this.platform = platform.id;
        this.dropDownIsHidden = true;
        this.activePlatform = platform.src;
      },
    },
    created() {
    }
  }
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  .font-bebas {
    font-family: 'Bebas Neue', cursive;
  }
  .font-work-sans {
    font-family: 'Work Sans', sans-serif;
  }
  #app {

    background: #1e232a;
  }
  .card {
    background: #252a31;
  }
  .card-small {
    background: #252a31;
  }
  .card-hover:hover {
    background: #30353c;
  }
  .selector {
    background: #090b12;
  }

</style>
