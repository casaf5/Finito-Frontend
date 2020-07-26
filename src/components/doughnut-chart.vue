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
          backgroundColor: ['#3399FF', '#3366CC', '#003366', '#79BEDB', '#10C8CD', 'gray'],
          data: this.data
        }
      ],
    });
  },
};
</script>