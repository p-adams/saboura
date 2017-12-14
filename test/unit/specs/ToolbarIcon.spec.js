import Vue from "vue";
import ToolbarIcon from "@/components/toolbar-icon";

function getRenderedIcon(Component, propsData) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData: propsData });
  return vm.$props.title;
}

describe("ToolbarIcon", () => {
  it("has data hook", () => {
    expect(ToolbarIcon.data).to.be.a("function");
  });

  it("has props", () => {
    expect(ToolbarIcon.props).to.be.a("object");
  });
  it("renders with title rectangle", () => {
    expect(
      getRenderedIcon(ToolbarIcon, {
        title: "rectangle"
      })
    ).to.equal("rectangle");
  });
});
