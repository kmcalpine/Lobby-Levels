<template>
    <div class="flex flex-row px-7 py-5 border-bottom card-hover ">
        <div class="my-auto font-work-sans font-medium text-sm text-indigo-50">
            <span class="w-10 break-all">{{ this.player[0] }}</span>
        </div>
        <div class="flex w-3/5 tracking-wider ml-auto">
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

        }
    },
    methods: {

    },
    created() {
        console.log(this.player);
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.border-bottom {
    border-bottom: 1px solid #1e232c;
}
    .card-hover:hover {
        background: #2a2f36;
    }
</style>
