<template>
  <div>
    <div class="loader-container w-100 d-flex align-items-center justify-content-center">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style lang="scss">
.loader-container {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background-color: black;
  .loader {
    --R: 30px;
    --g1: #514b82 96%, #0000;
    --g2: #eeeeee 96%, #0000;
    width: calc(2 * var(--R));
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    mask: linear-gradient(#000 0 0);
    -webkit-mask: linear-gradient(#000 0 0);
    animation: l30 2s infinite linear;
  }
  .loader::before,
  .loader::after {
    content: "";
    grid-area: 1/1;
    width: 50%;
    background: radial-gradient(farthest-side, var(--g1)) calc(var(--R) + 0.866 * var(--R) - var(--R)) calc(var(--R) - 0.5 * var(--R) - var(--R)), radial-gradient(farthest-side, var(--g1)) calc(var(--R) + 0.866 * var(--R) - var(--R)) calc(var(--R) - 0.5 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g2)) calc(var(--R) + 0.5 * var(--R) - var(--R)) calc(var(--R) - 0.866 * var(--R) - var(--R)), radial-gradient(farthest-side, var(--g1)) 0 calc(-1 * var(--R)), radial-gradient(farthest-side, var(--g2)) calc(var(--R) - 0.5 * var(--R) - var(--R)) calc(var(--R) - 0.866 * var(--R) - var(--R)),
      radial-gradient(farthest-side, var(--g1)) calc(var(--R) - 0.866 * var(--R) - var(--R)) calc(var(--R) - 0.5 * var(--R) - var(--R)), radial-gradient(farthest-side, var(--g2)) calc(-1 * var(--R)) 0, radial-gradient(farthest-side, var(--g1)) calc(var(--R) - 0.866 * var(--R) - var(--R)) calc(var(--R) + 0.5 * var(--R) - var(--R));
    background-size: calc(2 * var(--R)) calc(2 * var(--R));
    background-repeat: no-repeat;
  }
  .loader::after {
    transform: rotate(180deg);
    transform-origin: right;
  }

  @keyframes l30 {
    100% {
      transform: rotate(-1turn);
    }
  }
}
</style>
