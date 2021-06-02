<template>
    <div class="flex flex-col  ">


        <div
                class=" flex card border-bottom  "
        >
            <div
                    class="w-2 bg-indigo-500 -mr-2"
                    v-if="this.playerOverview"
            >
            </div>
            <div class="flex flex-row px-7 py-5 w-full pointer">
                <div class="my-auto font-work-sans font-medium text-sm text-indigo-50 " >
                    <span class="w-10 break-all">{{ this.player[0] }}</span>
                </div>
                <div class="flex w-3/5 justify-end tracking-wider ml-auto">
                    <div class="flex flex-col w-24 align-center justify-center ml-auto pr-2 border-r-2 border-gray-700">
                        <div class="ml-auto text-xs text-gray-500 font-work-sans">
                            KD
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ml-auto">{{ this.player[1] }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col align-center w-24 justify-center ml-auto pr-2 border-r-2 border-gray-700">
                        <div class="ml-auto text-xs text-gray-500 font-work-sans">
                            KILLS
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ml-auto">13</span>
                        </div>
                    </div>
                    <div class="flex flex-col w-24 align-center justify-center ml-auto pr-2 border-r-2 border-gray-700">
                        <div class="ml-auto text-xs text-gray-500 font-work-sans">
                            DEATHS
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ml-auto">0</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>




        <div
                class="w-full h-5/6 border-top px-7 py-5 card-overview"
                v-if="this.playerOverview"
        >

            <div class="flex flex-col recent-games text-md">
                <div class="text-xs text-gray-500 font-work-sans">
                    RECENT MATCHES
                </div>
                <div class="flex flex-row mb-4 text-indigo-100">
                    <div class="flex w-10 h-10 card mr-px mt-2">
                        <div class="m-auto">
                            <span class="">3</span>
                            <span class="text-xs">rd</span>
                        </div>

                    </div>
                    <div class="flex w-10 h-10 card mr-px mt-2">
                        <div class="m-auto">
                            <span class="">22</span>
                            <span class="text-xs">nd</span>
                        </div>
                    </div>
                    <div class="flex w-10 h-10 bg-green-400 mr-px mt-2">
                        <div class="m-auto">
                            <span class="text-green-800">1</span>
                            <span class="text-xs text-green-800">st</span>
                        </div>                    </div>
                    <div class="flex w-10 h-10 card mr-px mt-2">
                        <div class="m-auto">
                            <span class="">8</span>
                            <span class="text-xs">th</span>
                        </div>                    </div>
                    <div class="flex w-10 h-10 card mr-px mt-2 ">
                        <div class="m-auto">
                            <span class="">35</span>
                            <span class="text-xs">th</span>
                        </div>                    </div>
                </div>

                <div class="flex w-full justify-start tracking-wider">
                    <div class="flex flex-col w-24 align-center justify-center pl-2 border-l-2 mr-4 border-gray-700">
                        <div class=" text-xs text-gray-500 font-work-sans">
                            AVG KD
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ">{{ this.player[1] }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col align-center w-24 justify-center pl-2 border-l-2 mr-4 border-gray-700">
                        <div class=" text-xs text-gray-500 font-work-sans">
                            AVG KILLS
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ">13</span>
                        </div>
                    </div>
                    <div class="flex flex-col w-24 align-center justify-center pl-2 border-l-2 mr-4 border-gray-700">
                        <div class=" text-xs text-gray-500 font-work-sans">
                            AVG DEATHS
                        </div>
                        <div class="flex font-bebas text-white text-xl">
                            <span class="text-indigo-50 ">0</span>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    </div>

</template>

<script>
export default {
    name: 'PlayerCard',
    props: {
        player: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            playerOverview: false,
        }
    },
    methods: {
        setPlayerOverview: function () {
            this.playerOverview = !this.playerOverview;

        },
    },
    created() {
    },
    watch: {
        player: {
            deep: true,
            handler() {
            }

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.border-bottom {
    border-bottom: 1px solid #1b1f26;
}
.card {
    background: #252a31;
}
.card:hover {
    background: #2c323a;
}
.card-overview {
    background: #1b1f26;
}
.pointer:hover {
    cursor:pointer;
}

</style>
