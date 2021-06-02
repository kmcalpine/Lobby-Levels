<template>
    <div class="flex justify-center w-1/2 sm:w-1/2 md:w-36 sm:mb-px mb-px">
        <div class="flex flex-col card rounded-none sm:rounded-none md:rounded-lg p-4 pl-5 w-screen sm:w-full border-l-8 border-indigo-500">
            <div class="title text-xs text-gray-500 mb-1 font-work-sans">
                {{ this.title }}
            </div>
            <div class="text-xl text-indigo-50">
                <div
                    class="mt-2"
                    v-if="searching">
                    <img
                        :src="loadingSvg"
                        class="w-5">
                </div>
                <div
                    class="font-bebas"
                    v-else>
                    {{ this.value }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LobbyStatCard',
  props: {

      title: String,
      value: {
          type: [String, Number],
          required: true
      },
      searching: Boolean,
  },
  data() {
    return {
        loadingSvg: require('../assets/tail-spin.svg'),
    }
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200&display=swap');
    .title {
        letter-spacing: 1px;
    }
    .card {
        background: #252a31;
    }
</style>
