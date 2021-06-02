<template>
  <div class="flex flex-col min-h-screen align-center mb-10 ">
    <div class="align-center justify-center mt-10">



      <div class="flex flex-col justify-center">
        <MatchCard
                v-for="match of matches"
                :key="match.id"
                :match="match"
        >
        </MatchCard>
      </div>
    </div>



  </div>
</template>

<script>
  import MatchCard from '../components/profile/MatchCard.vue';


  import axios from 'axios';
  import { parseUsername, data } from '../helpers/index.js';
  import matchData from '../assets/data';
  const timer = ms => new Promise(res => setTimeout(res, ms));
  export default {
    name: 'app',
    components: {
      MatchCard
    },
    props: {
    },
    data() {
      return {
        matches: [],
        platform: '',
        username: '',
      }
    },
    methods: {
      splitData: async function (getPlayer, players) {
        while (players.length > 0) {
          getPlayer(players.splice(0, 4));
        }
      },

      reset:function () {
        this.matches = [];
      },

      getMatchData: async function () {
        try {
          let response = await axios.get(`/playermatches/${this.platform}/${this.username}`);
          console.log(response.data.data);

          for (const match of response.data.data.matches) {
            let matchInfo = {
              id: match.attributes.id,
              mode: match.attributes.modeId,
              time: match.metadata.timestamp,
              rank: null,
              player: {
                username: '',
                position: match.segments[0].stats.placement.value,
                kills: null,
                deaths: null,
                damage: null,
              }
            };
            this.matches.push(matchInfo);
          }
          console.log(this.matches);
        }
        catch (e) {
          console.log(e);
        }

      },
      readLocal: function () {
        console.log('reading local');

        var retrievedMatches = localStorage.getItem('matches');

        if (retrievedMatches === 'undefined') {
          var matches = {
            13: {
              rank: 'diamond',
              players: null,
              chart: null,
            },
          };
          localStorage.setItem('matches', JSON.stringify(matches));
        }


        var retrievedMatches = localStorage.getItem('matches');


        console.log(JSON.parse(retrievedMatches));
      }
    },

    mounted() {
      console.log('here');
      let params = this.$route.path.split('/');
      console.log(params);
      this.platform = params[1];
      this.username = params[2];

      this.getMatchData();
    },
  }
</script>

<style>

.player-block {
  width: 600px;
}
.card {
  background: #252a31;
}


</style>
