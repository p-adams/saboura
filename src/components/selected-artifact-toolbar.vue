<template>
<svg>
<g ref="gref">
    <!-- toolbar rectangle -->
    <rect
        :x="position.x"
        :y="position.y"
        width="100"
        height="180"
        fill="#E8EAF6"
      >   
      </rect>
      <rect
        class="tarly"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        :x="position.x + 20"
        :y="position.y + 5"
        width="60"
        height="20"
        fill="#FF7043"
      >   
      </rect>
  
    
     <g>
       <path ref="icon" @click="meow" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
     </g>
    
    
      <!-- artifact toolbar buttons -->
  </g>
</svg>
</template>
<script>
export default {
  name: "SelectedArtifactToolbar",
  mounted() {
    this.$refs.icon.setAttribute(
      "transform",
      "translate(" + this.position.x + ", " + this.position.y + ")"
    );
    this.initializeButtons();
  },
  data() {
    return {
      position: {
        x: 0,
        y: 0
      },
      coordinates: {
        x: 0,
        y: 0
      },
      icons: [{}]
    };
  },
  methods: {
    meow() {
      alert("meow");
    },
    initializeButtons() {},
    moveIcon() {
      this.$refs.icon.setAttribute(
        "transform",
        "translate(" + this.position.x + ", " + this.position.y + ")"
      );
    },
    handleMouseMove(e) {
      const xDiff = this.coordinates.x - e.pageX;
      const yDiff = this.coordinates.y - e.pageY;
      this.coordinates.x = e.pageX;
      this.coordinates.y = e.pageY;
      this.position.x = this.position.x - xDiff;
      this.position.y = this.position.y - yDiff;
      this.moveIcon();
    },
    handleMouseDown(e) {
      this.coordinates = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      document.removeEventListener("mousemove", this.handleMouseMove);
      this.coordinates = {};
    }
  }
};
</script>
<style scoped>
.tarly {
  cursor: move;
}
</style>
