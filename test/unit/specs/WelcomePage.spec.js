import Vue from "vue";
import WelcomePage from "@/components/welcome-page";

describe("WelcomePage.vue", () => {
  it("should render corrent app tagline", () => {
    const Constructor = Vue.extend(WelcomePage);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(".tagline").textContent).to.equal(
      "Welcome to Saboura"
    );
  });
});
