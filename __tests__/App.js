/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import "react-native";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

/**
 *  Testing our pages
 */
import SignupPage from "../src/pages/SignupPage/SignupPage";
describe("SignupPage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SignupPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

import LoginPage from "../src/pages/LoginPage/LoginPage";
describe("LoginPage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SignupPage />);
    expect(wrapper).toMatchSnapshot();
  });
});

import HomePage from "../src/pages/HomePage/HomePage";
describe("HomePage", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<SignupPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
