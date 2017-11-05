export const Draggable = {
  data() {
    return {
      x: "",
      y: "",
      coordinates: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    handleMouseMove(e) {
      const xDiff = this.coordinates.x - e.pageX;
      const yDiff = this.coordinates.y - e.pageY;
      this.coordinates.x = e.pageX;
      this.coordinates.y = e.pageY;
      this.x = this.x - xDiff;
      this.y = this.y - yDiff;
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
