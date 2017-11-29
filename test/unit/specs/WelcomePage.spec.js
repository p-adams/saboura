import Vue from "vue";
import WelcomePage from "@/components/welcome-page";

describe("WelcomePage.vue", () => {
  it("should render correct app tagline", () => {
    const Constructor = Vue.extend(WelcomePage);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector(".tagline").textContent).to.equal(
      "Our collaborative, interactive whiteboards make sharing ideas with colleagues a breeze"
    );
  });
});
