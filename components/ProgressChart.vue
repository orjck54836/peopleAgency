<script setup lang="ts">
import type { ApexOptions } from "apexcharts";
import VueApexCharts from "vue3-apexcharts";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps<{
  progress: number;
}>();

const chartRef = ref<HTMLDivElement | null>(null);
const progressValue = ref(0)

// Use IntersectionObserver to detect visibility
onMounted(() => {
  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressValue.value=props.progress          
          } 
        });
      },
      { threshold: 0.5 } // 50% of the element must be visible to trigger
    );

    if (chartRef.value) {
      observer.observe(chartRef.value);
    }

    onBeforeUnmount(() => {
      if (chartRef.value) {
        observer.unobserve(chartRef.value);
      }
    });
  }
});

// Dynamically update the chart options when in view
const options = computed<ApexOptions>(() => ({
  chart: {
    type: "radialBar",
    width: 250,
    height: 250,
    sparkline: {
      enabled: false,
    },
    animations: {
      enabled: true,
      speed: 2000,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1350,
      },
    },
  },
  series:  [progressValue.value], 
  legend: {
    show: false,
  },
  stroke: {
    lineCap: "butt",
  },
  colors: ["#000000"],
  plotOptions: {
    radialBar: {
      dataLabels: {
        value: {
          show: false,
        },
        name: {
          offsetY: 15,
          fontSize: "44px",
        },
      },
      hollow: {
        size: "80%",
      },
    },
  },
  labels: [`${props.progress}%`],
  grid: {
    padding: {
      top: -16,
      bottom: -20,
    },
  },
}));

</script>

<template>
  <div ref="chartRef">
  <ClientOnly>
      <VueApexCharts :options="options" :series="options.series" type="radialBar" width="100%" :height="250" />
    </ClientOnly>
  </div>
</template>
