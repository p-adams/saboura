<template>
    <g ref="gref">
        <rect
            width="50"
            height="300"
            :x="buttons.x"
            :y="buttons.y"
            fill="gray"
        >   
        </rect>
         <rect
            width="20"
            height="20"
            :x="buttons.x + 15"
            :y="buttons.y + 20"
            fill="white"
        >   
        </rect>
    </g>
</template>
<script>
export default {
  name: "DrawingToolbar",
  mounted() {
    this.$refs.gref.addEventListener("mousedown", this.handleMouseDown);
    this.$refs.gref.addEventListener("mouseup", this.handleMouseUp);
  },
  data() {
    return {
      buttons: {
        x: 300,
        y: 60
      },
      coords: {
        x: "",
        y: ""
      }
    };
  },
  methods: {
    closeDrawingToolbar() {
      this.$store.dispatch("setDrawingToolbarVisibility", false);
    },
    handleMouseMove(e) {
      const xDiff = this.coords.x - e.pageX;
      const yDiff = this.coords.y - e.pageY;

      this.coords.x = e.pageX;
      this.coords.y = e.pageY;

      this.buttons.x = this.buttons.x - xDiff;
      this.buttons.y = this.buttons.y - yDiff;
    },
    handleMouseDown(e) {
      this.coords = {
        x: e.pageX,
        y: e.pageY
      };
      this.$refs.gref.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      this.$refs.gref.removeEventListener("mousemove", this.handleMouseMove);
      this.coords = {};
    }
  }
};
</script>
<style scoped>
.close {
  cursor: pointer;
  background: red;
}
</style>
