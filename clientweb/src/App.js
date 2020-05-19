import React, { Component } from "react";
import Main from "./navigation/main";
import $ from "jquery";
import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./assets/css/custom.css";
import M from "materialize-css";
import store from "./config/store";

class App extends Component {
  componentDidMount() {
    M.AutoInit();
    $(window).on("load", function () {
      setTimeout(function () {
        $("body").addClass("loaded");
      }, 200);
    });
    //var window_width = $(window).width();

    // Search class for focus
    $(".header-search-input")
      .focus(function () {
        $(this).parent("div").addClass("header-search-wrapper-focus");
      })
      .blur(function () {
        $(this).parent("div").removeClass("header-search-wrapper-focus");
      });

    // Check first if any of the task is checked
    $(".task-card li input:checkbox").each(function () {
      checkbox_check(this);
    });

    // Task check box
    $(".task-card li input:checkbox").change(function () {
      checkbox_check(this);
    });

    // Check Uncheck function
    function checkbox_check(el) {
      if (!$(el).is(":checked")) {
        $(el).next().css("text-decoration", "none"); // or addClass
      } else {
        $(el).next().css("text-decoration", "line-through"); //or addClass
      }
    }
    // Set checkbox on forms.html to indeterminate
    var indeterminateCheckbox = document.getElementById(
      "indeterminate-checkbox"
    );
    if (indeterminateCheckbox !== null)
      indeterminateCheckbox.indeterminate = true;
    
    
    var toggleFlowTextButton = $("#flow-toggle");
    toggleFlowTextButton.click(function () {
      $("#flow-text-demo")
        .children("p")
        .each(function () {
          $(this).toggleClass("flow-text");
        });
    });

    // Detect touch screen and enable scrollbar if necessary
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (is_touch_device()) {
      $("#nav-mobile").css({
        overflow: "auto",
      });
    }
  }
  render() {
    return (
      <div>
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
        <Main store={store} />
      </div>
    );
  }
}

export default App;
