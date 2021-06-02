<template>
    <div class="lobby-rank-wrapper w-full h-full sm:h-48 sm:w-48 relative overflow-hidden sm:rounded-xl shadow-xl">
      <div class="shine-wrapper">
        <div
              class="lobby h-48 sm:rounded-xl flex justify-center items-center"
              :class="this.theme[this.lobby]">
          <div class="lobby-rank text-4xl text-indigo-50 font-bold">
            <span class="font-bebas">{{ lobby }}</span>

          </div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'LobbyDivision',
  props: {
    averageKd: 0,
  },
  data() {
    return {
      lobby: '',
      theme: {
        'BRONZE':[`border-yellow-700`, `bg-yellow-800`],
        'SILVER':[`border-gray-300`, `bg-gray-400`],
        'GOLD':[`border-yellow-300`, `bg-yellow-400`],
        'DIAMOND':[`border-blue-300`, `bg-blue-400`],
      }
    }
  },
  methods: {
    lobbyRank: function (val) {
      if (val < 0.92) {
        this.lobby = 'BRONZE';
      }
      else if (val < 1.02) {
        this.lobby = 'SILVER';
      }
      else if (val  < 1.13) {
        this.lobby = 'GOLD';
      }
      else {
        this.lobby = 'DIAMOND';
      }
    },
  },
  created() {
    this.lobbyRank(this.averageKd);
  },
  watch: {
    averageKd (val, oldVal) {
      this.lobbyRank(val);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .rank {
        font-size: 9rem;
    }
  /* Shine */
  .shine-wrapper:after {
    content:'';
    top:0;
    transform: skew(-35deg) translateX(100%);
    width:100%;
    height: 100%;
    position: absolute;
    z-index:1;
    animation: slide 4s infinite;
    opacity: 0.85;

    /*
    CSS Gradient - complete browser support from http://www.colorzilla.com/gradient-editor/
    */
    background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.6)), color-stop(99%,rgba(128,186,232,0)), color-stop(100%,rgba(125,185,232,0))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.6) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.6) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.6) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* IE10+ */
    background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.6) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
  }


  /* animation */

  @keyframes slide {
    0% {transform:skew(-35deg) translateX(-100%); opacity: 0}
    50% {transform:skew(-35deg) translateX(-60%); opacity: 100}
    100% {transform:skew(-35deg) translateX(-60%); opacity: 0}
  }
</style>
