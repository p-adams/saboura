import Vue from "vue";
import AppBar from "@/components/app-bar";

describe("AppBar", () => {
  it("Has correct navDrawerItems", () => {
    const vm = new Vue(AppBar).$mount();
    expect(vm.navDrawerItems).to.deep.include(
      { title: "Home", path: "/", icon: "home" },
      { title: "Dashboard", path: "/dashboard-page", icon: "dashboard" },
      { title: "Account", path: "/user-account", icon: "account_box" }
    );
  });
  it("Confirm that drawer is not open", () => {
    const vm = new Vue(AppBar).$mount();
    expect(vm.drawerIsOpen).to.equal(true);
  });
});
