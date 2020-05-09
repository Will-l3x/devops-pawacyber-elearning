import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./config/store";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./navigation/main";
import $ from "jquery";
import "./App.css";
import "./assets/css/custom.css";
import M from "materialize-css";

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
    $("#task-card input:checkbox").each(function () {
      checkbox_check(this);
    });

    // Task check box
    $("#task-card input:checkbox").change(function () {
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
    const elem = $(".tooltipped");

    M.Tooltip.init(elem, {
      delay: 50,
    });
    const elem2 = $(".sidebar-collapse");
    M.Sidenav.init(elem2, {
      edge: "left",
    });
    const elem3 = $(".menu-sidebar-collapse");
    M.Sidenav.init(elem3, {
      menuWidth: 240,
      edge: "left", // Choose the horizontal origin
      //closeOnClick:true, // Set if default menu open is true
      menuOut: false, // Set if default menu open is true
    });
    const elem4 = $(".chat-collapse");
    M.Sidenav.init(elem4, {
      menuWidth: 300,
      edge: "right",
    });
    // Fullscreen
    function toggleFullScreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }

    $(".toggle-fullscreen").click(function () {
      toggleFullScreen();
    });
    function toggleCourseListIcon() {
      
      $(".collapsible-header").each(function (){
        if($(this).hasClass("active")){
           $(".active .material-icons").text("remove");
        }else{
           $(".active .material-icons").text("remove");
        }
      });
    }

    $(".collapsible-header").click(function () {
      $(this).toggleClass("active");
      toggleCourseListIcon();
    });

    // Toggle Flow Text
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
      <Provider store={store}>
        <div id="loader-wrapper">
          <div id="loader"></div>
          <div className="loader-section section-left"></div>
          <div className="loader-section section-right"></div>
        </div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <Main />
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </Provider>
    );
  }
}

export default App;
