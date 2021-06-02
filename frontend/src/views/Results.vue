<template>
  <div class="flex flex-col min-h-screen align-center mb-20">
    <div class="text-white text-4xl text-center mt-10" v-if="searching && loadingPercent < 99.99">
      Searching for players: {{ loadingPercent > 99.99 ? 100 : loadingPercent }} %
    </div>
    <div class="text-white text-4xl text-center mt-10" v-if="fetching && loadingPercent > 99.99 && fetchPercent < 99.99">
      Fetching player info: {{ fetchPercent > 99.99 ? 100 : fetchPercent }} %
    </div>
    <div class="align-center justify-center mt-10">

      <div class="flex flex-col sm:flex-col md:flex-col lg:flex-col">

        <div class="flex justify-center mb-10 sm:mb-10 md:mb-10">
          <LobbyDivision
                  :averageKd="this.medianKd"
          >
          </LobbyDivision>
        </div>
      </div>
      <div class="flex align-center justify-center z-10 mb-px w-content">
        <div class="flex flex-wrap w-full justify-between sm:w-5/6 max-w-2xl bg-none rounded-lg">

          <LobbyStatCard
                  :title="'AVERAGE K/D'"
                  :value=averageKd.toString()
                  :searching="searching"
          >
          </LobbyStatCard>
          <LobbyStatCard
                  :title="'MEDIAN K/D'"
                  :value=medianKd.toString()
                  :searching="searching"
          >

          </LobbyStatCard>
          <LobbyStatCard
                  :title="'PLAYERS'"
                  :value="parsedData.length.toString().concat('/').concat(playerCount.toString())"
                  :searching="searching"
          >
          </LobbyStatCard>
          <LobbyStatCard
                  :title="'ACCURACY'"
                  :value="(playerCount > 0 ? ((parsedData.length/playerCount)*100).toFixed(2) : 0).toString().concat(' %')"
                  :searching="searching"
          >
          </LobbyStatCard>


        </div>
      </div>
    </div>

    <Chart
            class="flex mt-10 justify-center"
            :chartDataKdValues="this.chartData"
            :averageKd="this.averageKd"
            :medianKd="this.medianKd"
            :build="buildChart"
    >
    </Chart>

    <div class="flex align-center justify-center z-10 mb-px w-content mt-10">
      <div class="flex flex-col w-full sm:w-5/6 max-w-2xl rounded-lg players">
        <PlayerCard
            v-for="player in this.parsedData"
            :player="player"
            v-if="searching === false"
        >
        </PlayerCard>
      </div>
    </div>
  </div>
</template>

<script>
  import LobbyDivision from '../components/LobbyDivision';
  import LobbyStatCard from '../components/LobbyStatCard';
  import PlayerCard from '../components/player/PlayerCard';
  import PlayerOverview from '../components/player/PlayerOverview';
  import Chart from '../components/Chart';

  import axios from 'axios';
  axios.defaults.baseURL = process.env.VUE_APP_API;


  import { parseUsername, data } from '../helpers/index.js';
  import matchData from '../assets/data';
  const timer = ms => new Promise(res => setTimeout(res, ms));


  export default {
    name: 'app',
    components: {
      LobbyDivision,
      LobbyStatCard,
      PlayerCard,
      PlayerOverview,
      Chart,
    },
    props: {
      initSearch: Boolean,
    },
    data() {
      return {
        localMatch: localStorage.getItem('match?=' + this.$route.query[""]),
        searching: false,
        matchId: null,
        searchStatus: 1,
        showButtons: true,
        curSum: 0,
        averageKd: 0,
        medianKd: 0,
        matchIds: [],
        unknownPlayers: [],
        knownPlayers: [],
        testData: [],
        parsedData: [],
        players: [],
        playerCount: 0,
        matchData: matchData,
        playerIds: [],
        loadingPercent: 0,
        fetchPercent: 0,
        matchInfo: {
          id: '',
          mode: '',
        },
        playerUnoIds: {},
        chartData: [],
        fetching: false,
        buildChart: false,
      }
    },
    methods: {

      splitData: async function (getPlayer, players) {
        while (players.length > 0) {
          getPlayer(players.splice(0, 4));
        }
      },

      getMatchData: async function () {
        try {
          let response = await axios.get(`/match/${this.matchId}`);
          for (const player of response.data.data.allPlayers) {
            this.playerUnoIds[player.player.uno] = player.player.username;
          }

          response = await axios.get(`/matchstats/${this.matchId}`);
          let segments = response.data.data.segments;
          let playerCount = 0;

          for (let player of segments) {
            if (player.stats.percentTimeMoving.value === 0) continue;
            playerCount++;
            if (!(player.attributes.lifeTimeStats == null)) {
              let username = parseUsername(player.metadata.profileUrl);
              username = username.split('%23')[0];
              this.parsedData.push([username, player.attributes.lifeTimeStats.kdRatio]);
              this.updateParsedValues(player.attributes.lifeTimeStats.kdRatio);
            }
            else {
              let username = player.metadata.platformUserHandle;
              this.unknownPlayers.push(username);
            }
          }

          this.playerCount = playerCount;

          await this.searchPlayerId(this.unknownPlayers);
          await this.getPlayerKd(this.players);
        }
        catch (e) {
          console.log(e);
        }

      },

      /**
       * @param {float} a - kd value of player a
       * @param {float} b - kd value of player b
       * @return {number}
       */
      kdCompare: function (a, b) {
        if (a[1] < b[1]) {
          return 1
        }
        if (a[1] > b[1]) {
          return -1;
        }
        return 0
      },

      /**
       * @param {string} url - url of API request
       * @return {object} - json response
       */
      fecthPlayerInfo: async function (url) {
        try {
          const response = await axios.get(url);
          return response.data;
        }
        catch {
          return undefined;
        }
      },

      searchPlayerId: async function (players) {
        const requests = players.map((player) => {
          const url = `/search/${player}`;
          return this.fecthPlayerInfo(url).catch(e => e);

        });

        await Promise.all(requests)
          .then(foundPlayers => {
            for (const player of foundPlayers) {
              console.log(player);
              if (player.status === 'error') continue;
              if (typeof player.data == 'undefined') continue;
              for (const foundPlayer of player.data) {
                if (typeof this.playerUnoIds[foundPlayer.accountId] !== 'undefined') {
                  this.players.push(foundPlayer.username);
                  break;
                }
              }
            }
          })
      },


      getPlayerKd: async function (players) {
        const requests = players.map((player) => {
          let username = player.replace('#', '%23');

          const url = `/playerstats/${username}`;
          console.log(url);
          return this.fecthPlayerInfo(url).catch(e => e);
        });

        await Promise.all(requests)
          .then(response => {
            console.log(response);
            for (const res of response) {
              if (typeof res.data == 'undefined') continue;
              let kd = res.data.segments[1] !== 'undefined' ? res.data.segments[1].stats.kdRatio.value : 0;
              if (kd !== 0) {
                let player = res.data.platformInfo.platformUserIdentifier.split('#');
                this.parsedData.push([player[0], kd]);
                this.updateParsedValues(kd);
              }
            }
          });
      },
      updateParsedValues: function (kd) {
        this.parsedData.sort( this.kdCompare );
        this.curSum += parseFloat(kd);
        this.averageKd = (this.curSum/this.parsedData.length).toFixed(2);
        this.medianKd = (this.parsedData[Math.floor(this.parsedData.length/2)][1]);
      },

      initMatchSearch: async function () {
        this.searching = true;
        await this.getMatchData();
        this.searching = false;
        this.updateChartData();
        console.log(this.parsedData);
      },

      updateChartData: function () {
        this.chartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var kd = 3.00;
        var index = 12;
        for (const player of this.parsedData) {
          if (player[1] >= kd) {
            this.chartData[index]++;
          }
          else {
            index--;
            kd-=0.25;
            this.chartData[index]++
          }
        }
        this.buildChart = true;
      },

      reset() {
        this.showButtons = true;
        this.curSum = 0;
        this.averageKd = 0;
        this.matchIds = [];
        this.unknownPlayers = [];
        this.knownPlayers = [];
        this.testData = [];
        this.parsedData = [];
        this.players = [];
        this.playerCount = 0;
        this.matchData = matchData;
        this.playerIds = [];
        this.loadingPercent = 0;
        this.fetchPercent = 0;
        this.playerUnoIds = {};
        this.chartData = [];
        this.buildChart = false;
        this.fetching = false;
      },
    },
    watch: {
      initSearch (val, oldVal) {
        if (val) {
          this.reset();
          this.$emit('reset');
          this.initMatchSearch();
        }
      },
    },
    mounted() {
      this.initMatchSearch();
    },
    created() {
      this.matchId = this.$route.query[""];
      this.reset();
    }
  }
</script>

<style>

.player-block {
  width: 600px;
}
.card {
  background: #252a31;
}

.card-border {
  border-color: #171c23;
}
.card-hover {
  background: #2a2f36;
}
.players > div:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
</style>
