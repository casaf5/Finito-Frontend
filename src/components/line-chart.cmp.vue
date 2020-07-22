<script>
import VueCharts from 'vue-chartjs';
import { Line } from 'vue-chartjs'

export default {
  props: ['labels', 'data', 'options'],
  // prop , 'options'
  extends: Line,

  mounted () {
    this.renderChart({
             labels: this.labels,
              datasets: [
                        {
                label: 'Tasks Finished Per Month',
                backgroundColor: 'blue',
                data: this.data
                 }
               ]
             },
     this.options)
  }
}
</script>
