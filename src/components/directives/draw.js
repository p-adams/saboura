import vue from "vue";
import * as d3 from "d3";
import { DB } from "../../firebase";
import firebase from "firebase";

export const Draw = {
  componentUpdated(el, binding, vnode) {
    const vm = vnode.context;
    let svg;
    let activeLine;
    let drawProps = {
      stroke: "",
      strokeWidth: ""
    };

    let className;
    const renderPath = d3.svg
      .line()
      .x(function(d) {
        return d[0];
      })
      .y(function(d) {
        return d[1];
      })
      .tension(0)
      .interpolate("cardinal");

    function dragstarted() {
      activeLine = svg
        .append("path")
        .datum([])
        .style("fill", "none")
        .style("stroke", drawProps.stroke)
        .style("stroke-width", drawProps.strokeWidth);
      activeLine.datum().push(d3.mouse(this));
    }
    function dragged() {
      activeLine.datum().push(d3.mouse(this));
      activeLine.attr("d", renderPath);
    }
    function dragended() {
      vm.$firebaseRefs.drawing.child("paths").push({
        path: activeLine[0][0].attributes.d.value,
        style: activeLine[0][0].attributes.style.value
      });
      activeLine = null;
    }
    // if in drawing mode, draw on whiteboard
    if (
      binding.value.selectedTool === "draw" ||
      binding.value.selectedTool === undefined
    ) {
      drawProps.stroke = `#${binding.value.getColorOption}`;
      // console.log(binding.value.getColorOption);
      drawProps.strokeWidth = binding.value.getPenThicknessOption;
      svg = d3.select(el).call(
        d3.behavior
          .drag()
          .on("dragstart", dragstarted)
          .on("drag", dragged)
          .on("dragend", dragended)
      );
    } else if (binding.value.selectedTool === "erase") {
      drawProps.stroke = "white";
      drawProps.strokeWidth = 22;
      svg = d3.select(el).call(
        d3.behavior
          .drag()
          .on("dragstart", dragstarted)
          .on("drag", dragged)
          .on("dragend", dragended)
      );
    } else {
      // if other toolbar option selected, remove draw behavior
      svg = d3.select(el).call(
        d3.behavior
          .drag()
          .on("dragstart", null)
          .on("drag", null)
          .on("dragend", null)
      );
    }
  }
};
