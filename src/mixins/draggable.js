export default (Draggable = {
  data() {
    return {
      x: "",
      y: "",
      coords: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    handleMouseMove(e) {
      const xDiff = this.coords.x - e.pageX;
      const yDiff = this.coords.y - e.pageY;
      this.coords.x = e.pageX;
      this.coords.y = e.pageY;
      this.x = this.x - xDiff;
      this.y = this.y - yDiff;
    },
    handleMouseDown(e) {
      this.coords = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      document.removeEventListener("mousemove", this.handleMouseMove);
      this.coords = {};
    }
  }
});
