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
          label:"Incompleted Tasks",
          backgroundColor: ['red', 'red', 'red', 'red', 'red', 'red', 'red','red','red', 'red', 'red', 'red', 'red', 'red'],
         //   sent as a prop the right data
          data: this.data
        },
                {
          label:"Completed Tasks",
          backgroundColor: ['green','green','green','green','green','green','green','green','green','green','green','green'],
        //   send as a prop the right data
          data: [7,5,3,4,5]
        }
                 ],
               
             },
     this.options)
  }
}

</script>