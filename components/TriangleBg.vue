<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
}

const svgRef = ref<HTMLElement | null>(null);
const refreshTimeoutRef = ref<number | null>(null);
const pointsRef = ref<Point[]>([]);

const numPointsXRef = ref<number>(0);
const numPointsYRef = ref<number>(0);
const unitWidthRef = ref<number>(0);
const unitHeightRef = ref<number>(0);

const refreshDuration = 10000;

const randomize = () => {
  pointsRef.value.forEach((point) => {
    if (point.originX !== 0 && point.originX !== unitWidthRef.value * (numPointsXRef.value - 1)) {
      point.x = point.originX + Math.random() * unitWidthRef.value - unitWidthRef.value / 2;
    }
    if (point.originY !== 0 && point.originY !== unitHeightRef.value * (numPointsYRef.value - 1)) {
      point.y = point.originY + Math.random() * unitHeightRef.value - unitHeightRef.value / 2;
    }
  });
};

const refresh = () => {
  randomize();
  const svgElement = svgRef.value;
  if (svgElement) {
    const polygons = svgElement.querySelectorAll("polygon");
    polygons.forEach((polygon: SVGPolygonElement) => {
      const animate = polygon.querySelector("animate");
      if (animate?.getAttribute("to")) {
        animate.setAttribute("from", animate.getAttribute("to") || "");
      }
      const point1 = pointsRef.value[(polygon as any).point1];
      const point2 = pointsRef.value[(polygon as any).point2];
      const point3 = pointsRef.value[(polygon as any).point3];
      animate?.setAttribute("to", `${point1.x},${point1.y} ${point2.x},${point2.y} ${point3.x},${point3.y}`);
      animate?.beginElement();
    });
  }
  refreshTimeoutRef.value = window.setTimeout(refresh, refreshDuration);
};

onMounted(() => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", window.outerWidth.toString());
  svg.setAttribute("height", window.outerHeight.toString());
  svgRef.value?.appendChild(svg);

  const unitSize = (window.innerWidth + window.innerHeight) / 15;
  numPointsXRef.value = Math.ceil(window.innerWidth / unitSize) + 1;
  numPointsYRef.value = Math.ceil(window.innerHeight / unitSize) + 1;
  unitWidthRef.value = Math.ceil(window.innerWidth / (numPointsXRef.value - 1));
  unitHeightRef.value = Math.ceil(window.innerHeight / (numPointsYRef.value - 1));

  for (let y = 0; y < numPointsYRef.value; y++) {
    for (let x = 0; x < numPointsXRef.value; x++) {
      pointsRef.value.push({
        x: unitWidthRef.value * x,
        y: unitHeightRef.value * y,
        originX: unitWidthRef.value * x,
        originY: unitHeightRef.value * y,
      });
    }
  }

  randomize();

  pointsRef.value.forEach((point, i) => {
    if (point.originX !== unitWidthRef.value * (numPointsXRef.value - 1) && point.originY !== unitHeightRef.value * (numPointsYRef.value - 1)) {
      const topLeftX = point.x;
      const topLeftY = point.y;
      const topRightX = pointsRef.value[i + 1].x;
      const topRightY = pointsRef.value[i + 1].y;
      const bottomLeftX = pointsRef.value[i + numPointsXRef.value].x;
      const bottomLeftY = pointsRef.value[i + numPointsXRef.value].y;
      const bottomRightX = pointsRef.value[i + numPointsXRef.value + 1].x;
      const bottomRightY = pointsRef.value[i + numPointsXRef.value + 1].y;

      const rando = Math.floor(Math.random() * 2);

      for (let n = 0; n < 2; n++) {
        const polygon = document.createElementNS(svg.namespaceURI, "polygon");

        if (rando === 0) {
          if (n === 0) {
            (polygon as any).point1 = i;
            (polygon as any).point2 = i + numPointsXRef.value;
            (polygon as any).point3 = i + numPointsXRef.value + 1;
            polygon.setAttribute("points", `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${bottomRightX},${bottomRightY}`);
          } else if (n === 1) {
            (polygon as any).point1 = i;
            (polygon as any).point2 = i + 1;
            (polygon as any).point3 = i + numPointsXRef.value + 1;
            polygon.setAttribute("points", `${topLeftX},${topLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
          }
        } else if (rando === 1) {
          if (n === 0) {
            (polygon as any).point1 = i;
            (polygon as any).point2 = i + numPointsXRef.value;
            (polygon as any).point3 = i + 1;
            polygon.setAttribute("points", `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY}`);
          } else if (n === 1) {
            (polygon as any).point1 = i + numPointsXRef.value;
            (polygon as any).point2 = i + 1;
            (polygon as any).point3 = i + numPointsXRef.value + 1;
            polygon.setAttribute("points", `${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
          }
        }
        polygon.setAttribute("fill", `rgba(0,0,0,${Math.random() / 3})`);
        const animate = document.createElementNS(svg.namespaceURI, "animate");
        animate.setAttribute("fill", "freeze");
        animate.setAttribute("attributeName", "points");
        animate.setAttribute("dur", `${refreshDuration}ms`);
        animate.setAttribute("calcMode", "linear");
        polygon.appendChild(animate);
        svg.appendChild(polygon);
      }
    }
  });

  refresh();

  onUnmounted(() => {
    if (refreshTimeoutRef.value !== null) {
      clearTimeout(refreshTimeoutRef.value);
    }
  });
});
</script>

<template>
  <div id="bg" class="bg-triangle" ref="svgRef"></div>
</template>

<style lang="scss">
#bg {
  position: fixed;
  background: cover;
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  opacity: 0.25;
  z-index: -2;
}
</style>
