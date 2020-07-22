<script>
import VueCharts from 'vue-chartjs';
import { Bar } from 'vue-chartjs';

export default {
  props: ['labels', 'data', 'options'],
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: ['yellow', 'green', 'blue', 'purple', 'brown', 'orange'],
          data: this.data
        }
               ]
             },
     this.options)
  }
}

</script>