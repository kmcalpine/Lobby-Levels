<template>
    <div class="flex align-center justify-center z-10 mb-px w-content ">
        <div class="flex flex-col w-full sm:w-5/6 max-w-2xl card rounded-lg p-5">

            <canvas id="kd-chart" class="flex"></canvas>

        </div>

    </div>
</template>

<script>
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);


export default {
  name: 'Chart',
  props: {
      chartDataKdValues: {
          type: Array,
          required: true
      },
      averageKd: {
          type: [String, Number],
          required: true
      },
      medianKd: {
          type: [String, Number],
          required: true
      },
      build: {
          type: Boolean,
          required: true
      }
  },
  data() {
    return {
    }
  },
  methods: {
      drawChart: function () {
          var ctx = document.getElementById('kd-chart').getContext('2d');

          this.chart = new Chart(ctx, ({
              type: "line",
              data: {
                  labels: ["0", "0.25", "0.5", "0.75", "1", "1.25", "1.5", "1.75", "2", "2.25", "2.5", "2.75", "3 +"],
                  datasets: [
                      {
                          label: 'KD',
                          data: this.chartDataKdValues,
                          backgroundColor: "#6366f1",
                          borderColor: "#6366f1",
                          borderWidth: 2,


                      }
                  ]
              },
              options: {
                  scales: {
                      y: {
                          display: true,
                          ticks: {
                              font: {
                                  family: 'Work Sans',
                                  size: 13,
                                  weight: 'normal',
                                  lineHeight: 1.2,
                              },
                              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                              callback: function(val, index) {
                                  // Hide the label of every 2nd dataset
                                  return index % 2 === 0 ? this.getLabelForValue(val) : '';
                              },
                              color: 'rgba(107, 114, 128)',

                          }
                      },
                      x: {
                          ticks: {
                              font: {
                                  family: 'Work Sans',
                                  size: 13,
                                  weight: 'normal',
                                  lineHeight: 1.2,
                              },
                              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                              callback: function(val, index) {
                                  // Hide the label of every 2nd dataset
                                  return index % 2 === 0 ? this.getLabelForValue(val) : '';
                              },
                              color: 'rgba(107, 114, 128)',
                          },

                      }


                  },
                  plugins: {
                      legend: {

                        display: false,
                      },
                      autocolors: false,
                      annotation: {
                          annotations: {

                              mdn: {
                                  type: 'line',
                                  xMin: this.medianKd * 4,
                                  xMax: this.medianKd * 4,
                                  borderColor: 'rgb(20,225,120)',
                                  borderWidth: 2,
                                  label: {
                                      color: 'rgba(207, 214, 228)',
                                      content: "MEDIAN",
                                      enabled: true,
                                      position: "up"
                                  }
                              },
                          }
                      }
                  },
                  responsive: true,
                  lineTension: 0.3,



              }
          }));
          console.log(this.chart);
      },
      destroyChart: function () {
          this.chart.destroy();
      }
  },
    computed: {

    },
    mounted() {
      //this.drawChart();
    },
    watch: {
        build(oldVal, newVal) {
            console.log(oldVal);
            console.log(newVal);
            if (oldVal) {
                this.drawChart();
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');

    .card {
        background: #252a31;
    }
</style>
