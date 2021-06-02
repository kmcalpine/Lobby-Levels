<template>


    <div class="flex flex-row w-full h-24 justify-center mb-4">



            <div class="flex flex-row rounded-none md:rounded-lg h-full w-full max-w sm:w-full md:w-4/6 lg:w-8/12 card tracking-wider">
                <router-link
                        :to="'/match?=' + match.id"
                        class="flex w-full justify-center"
                >
                <div class="flex flex-col w-8 rounded-none md:rounded-l-lg card-small">
                    <span class="text-blue-100 text-md rank-orientation m-auto "></span>
                </div>
                <div class="flex flex-row w-full justify-center m-auto ml-5 mr-8">
                    <div
                            class="flex flex-col w-12 h-12 card-small rounded-lg text-center justify-center"
                            v-if="match.player.position !== 1"
                    >
                        <span class="text-white text-lg font-bebas">{{ match.player.position }}</span>
                    </div>
                    <div
                            class="flex flex-col w-12 h-12 bg-green-500 rounded-lg text-center justify-center"
                            v-else
                    >
                        <span class="text-white text-lg">{{ match.player.position }}</span>
                    </div>
                    <div class="flex flex-col ml-5">
                        <span class="text-white text-lg font-bebas">{{ match.mode }}</span>
                        <div class="rounded-lg card-small text-center">
                            <span class="indigo-sm text-xs font-work-sans">{{ match.time }}</span>
                        </div>
                    </div>

                    <div class="flex flex-row ml-auto h-12 text-right justify-center">
                        <div class="flex flex-col text-center">
                            <div class="flex rounded-lg card-small text-center pt-1 pb-1 pl-2 pr-2">
                                <span class="indigo-sm text-xs font-work-sans">kills</span>
                            </div>
                            <span class="text-white text-lg font-bebas">13</span>
                        </div>

                        <div class="flex flex-col text-center ml-8">
                            <div class="flex rounded-lg card-small text-center pt-1 pb-1 pl-2 pr-2">
                                <span class="indigo-sm text-xs font-work-sans">deaths</span>
                            </div>
                            <span class="text-white text-lg font-bebas">0</span>
                        </div>

                        <div class="flex flex-col text-center ml-8">
                            <div class="flex rounded-lg card-small text-center pt-1 pb-1 pl-2 pr-2">
                                <span class="indigo-sm text-xs font-work-sans">damage</span>
                            </div>
                            <span class="text-white text-lg font-bebas">6313</span>
                        </div>


                    </div>
                </div>
                </router-link>
            </div>



    </div>


</template>

<script>
export default {
    name: 'MatchCard',
    props: {
      match: {
          type: Object,
          required: true
      }
    },
    data() {
    return {
        getMatchInfo: false
    }
    },
    methods: {
        matchSearch: function () {
            console.log('searciing match info');
            this.getMatchInfo = true;
        }
    },
    created() {
        var time = new Date(this.match.time);
        this.match.time = time.toLocaleTimeString('en-US');
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap');
    .card {
        background: #252a31;
    }
    .card-small {
        background: #2e363d;
    }
    .indigo-sm {
        color: #9ca5ac;
    }
    .rank-orientation {
        writing-mode: vertical-rl;
        text-orientation: upright;
    }
    .max-w {
        width: 750px;
    }
    @media only screen and (max-width: 600px) {
        .max-w {
            width: 600px;
        }
    }

</style>
