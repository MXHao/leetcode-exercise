<template>
  <div id="alertOverlay">
    <div></div>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  props: {},
  data() {
    return {
      visible: false,
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
        this.setAlertState(true);
      });
  },
  
  methods: {
    ok() {
      // this.$emit('ok')
      this.visible = false;
    },
    setAlertState(active) {
      var alertOverlay = document.getElementById("alertOverlay");
      if (active) {
        alertOverlay.classList.add("alert-active");
      } else {
        alertOverlay.classList.remove("alert-active");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

:root {
  --alert-size: 120px;
}

#alertOverlay::before,
#alertOverlay::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 100%;
}

#alertOverlay > div::before,
#alertOverlay > div::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 120px;
}

#alertOverlay::before {
  background: linear-gradient(to right, red, transparent);
  top: 0;
  left: 0;
  transform: rotate(0deg);
}

#alertOverlay::after {
  background: linear-gradient(to left, red, transparent);
  top: 0%;
  left: 100%;
  transform: rotate(0deg) translate(calc(-120px), 0px);
}

#alertOverlay > div::before {
  background: linear-gradient(to top, red, transparent);
  top: 0;
  left: 0;
  transform: rotate(180deg);
}

#alertOverlay > div::after {
  background: linear-gradient(to top, red, transparent);
  top: 100%;
  left: 0;
  transform: rotate(0deg) translate(0px, calc(-120px));
}

#alertOverlay {
  // position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.5s;
  pointer-events: none;
  z-index: 1;
}

.alert-active {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
</style>

