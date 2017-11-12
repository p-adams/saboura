import { mapActions } from "vuex";
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
    ...mapActions(["restorePreviousToolbarOption", "setToolbarOption"]),
    handleMouseMove(e) {
      const xDiff = this.coordinates.x - e.pageX;
      const yDiff = this.coordinates.y - e.pageY;
      this.coordinates.x = e.pageX;
      this.coordinates.y = e.pageY;
      this.x = this.x - xDiff;
      this.y = this.y - yDiff;
    },
    handleMouseDown(e) {
      // when mousedown on toolbar, previous mode needs
      // to be deselected
      this.setToolbarOption("none");
      this.coordinates = {
        x: e.pageX,
        y: e.pageY
      };
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      // when mouseup on toolbar, previous mode needs
      // to be restored. For example
      // this.setToolbarOption("mode_edit");
      this.restorePreviousToolbarOption();
      document.removeEventListener("mousemove", this.handleMouseMove);
      this.coordinates = {};
    }
  }
};
