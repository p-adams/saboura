import Vue from "vue";
import ToolbarIcon from "@/components/toolbar-icon";

describe("ToolbarIcon", () => {
  it("has data hook", () => {
    expect(ToolbarIcon.data).to.be.a("function");
  });
});
