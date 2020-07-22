<script>
import VueCharts from 'vue-chartjs';
import { Doughnut } from 'vue-chartjs';

export default {
  props: ['labels', 'data'],
  extends: Doughnut,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: "GitHub Commits",
          // make more colors
          backgroundColor: ['yellow', 'green', 'blue', 'purple', 'brown', 'orange'],
          data: this.data
        }
      ],
    });
  },
};
</script>