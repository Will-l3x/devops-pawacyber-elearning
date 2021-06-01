import React, { Component } from "react";
import { Provider } from "react-redux";
// import { Router, Route, Switch } from "react-router";
import { HashRouter, Route } from "react-router-dom";
/** Screens */
import HomeScreen from "./views/home/HomeScreen";
import AboutScreen from "./views/about/AboutScreen";
import AdminScreen from "./views/admin/AdminScreen";
import StudentScreen from "./views/student/StudentScreen";
import TeacherScreen from "./views/teacher/TeacherScreen";
import TeacherSubjectContent from "./views/teacher/TeacherSubjectContent";
import SchoolManagement from "./views/admin/SchoolManagement";
import SubscriptionScreen from "./views/admin/SubscriptionScreen";
import RolesScreen from "./views/admin/Roles";
import UploadMaterial from "./views/teacher/TeacherUploadMaterial";
import EnrolStudent from "./views/teacher/EnrolStudent";
import ClassroomScreen from "./components/classroom/ClassroomScreen";
import SubjectContent from "./views/student/SubjectContent";
import StudentAssignments from "./views/student/StudentAssignments";
import TeacherAffiliateProgram from "./views/teacher/TeacherAffiliateProgram";
import LoginScreen from "./auth/LoginScreen";
import RegisterSuccessScreen from "./auth/RegistrationSuccess";
import RegistrationCanceled from "./auth/RegistrationCanceled";
import TeacherMarkClassroomScreen from "./views/teacher/TeacherMarkClassroomScreen";
import StudentSubmissionsScreen from "./components/teacher-mark/StudentSubmissionsScreen";
import RegisterScreen from "./auth/RegisterScreen";
import RegisterStudent from "./auth/RegisterStudent";

import SchoolScreen from "./views/school/SchoolScreen";
import SchoolStudentManagementScreen from "./views/school/SchoolStudentManagementScreen";
import SchoolTeacherManagementScreen from "./views/school/SchoolTeacherManagementScreen";
import ClassesScreen from "./views/school/ClassesScreen";
import SchoolCalendarScreen from "./views/school/SchoolCalendarScreen";
import UploadContent from "./views/admin/UploadContent";
import SuccessStudentUpgrade from "./components/student-components/SuccessStudentUpgrade";

import PackagePayment from "./views/student/PackagePayment";
import UploadNewAssignment from "./views/teacher/TeacherAssignments";
import SubadminScreen from "./views/admin/SubadminScreen";
import LivePlayer from "./components/LivePlayer";

import $ from "jquery";
import "materialize-css/dist/css/materialize.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import "./assets/css/custom.css";
import M from "materialize-css";

import "./assets/css/video-player.css";
import "./assets/css/profile.css";
import "./assets/css/loader.css";
import "./assets/css/bounceman-4th-loader.css";

import store from "./config/store";
//import history from "./history";
import Students from "./views/admin/Students";
import AllClasses from "./views/admin/Subjects";
import ProfileScreen from "./components/profile/ProfileScreen";
import TeacherStudents from "./views/teacher/TeacherStudents";
import RegisterAs from "./auth/RegisterAs";
import RegisterTeacher from "./auth/RegisterTeacher";
import RegisterLimitedTeacher from "./auth/RegisterLimitedTeacher";
import RegisterPremiumTeacher from "./auth/RegisterPremiumTeacher";
import TeacherRegistrationSuccess from "./auth/TeacherRegistrationSuccess";
import ProfileAccScreen from "./components/profile/ProfileAccScreen";
import FreeStudentAcc from "./components/student-components/FreeStudentAcc";
import StudentCoursework from "./views/student/StudentCoursework";
import StudentClassCoursework from "./views/student/StudentClassCoursework";
import AdsManagementScreen from "./views/admin/AdsManagementScreen";
import { AdminService } from "./services/admin";
import TeacherPromotionsScreen from "./views/admin/TeacherPromotionsScreen";
import StudentAssessment from "./views/student/StudentAssessment";
import QuizApp from "./views/Quiz/QuizApp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      draggable: document.querySelector(".draggable"),
      adverts: [],
      url: "",
      loading: true,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.getDashData();
    this.init();
    // const thus = this;
    // setInterval(() => {
    //   thus.download();
    // }, 120000);

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
  getDashData() {
    AdminService.get_all_resources().then((response) => {
      let adverts = response === undefined ? [] : response;
      adverts = adverts.filter((el) => el.obj === "Videos");
      this.setState({ adverts: adverts.slice(0, 12) });
    });
  }
  download() {
    const adverts = this.state.adverts;
    if (adverts.length < 1) {
    } else {
      const advert = adverts[Math.floor(Math.random() * adverts.length)];
      var data = {
        file: advert.file,
      };
      AdminService.download(data).then((response) => {
        try {
          const url = URL.createObjectURL(response);
          this.setState(
            {
              url,
            },

            () => {
              $("#ads_modal").removeClass("display-none");
              this.videoPlayer();
            }
          );
        } catch (error) {
          console.log(error);
          $("#ads_modal").addClass("display-none");
        }
      });
    }
  }

  videoPlayer() {
    $(".video-player-st").each(function (_, videoPlayer) {
      /**
       * get all the controlsdd
       **/
      let eleVideoObj = $(videoPlayer).find("video");
      let elePlayPauseBtn = $(videoPlayer).find(".toggle-play-pause");
      let eleStartTime = $(videoPlayer).find(".start-time");
      let eleEndTime = $(videoPlayer).find(".end-time");
      let eleVideoSeekbar = $(videoPlayer).find(".video-seekbar");
      let eleVideoProgress = $(eleVideoSeekbar).find(".progress");
      let eleToggleVolume = $(videoPlayer).find(".toggle-volume");
      let eleVolumeSeekbar = $(videoPlayer).find(".volume-seekbar");
      let eleVolumeProgress = $(eleVolumeSeekbar).find(".progress");

      let totalDurationInSeconds = 0;
      let currentTimeInSeconds = 0;
      let currentDuration = null;
      let totalDuration = null;
      let seekPercentage = 0;
      let volumeValue = 1;
      let volumePercentage = 100;

      /*-------------- HIDE / SHOW CONTROLS -----------*/
      $(videoPlayer).hover(
        () => $(videoPlayer).removeClass("hide-controls"),
        () => {
          if (eleVideoObj["0"] === undefined) {
            $(videoPlayer).addClass("hide-controls");
          } else {
            if (!eleVideoObj["0"].paused)
              $(videoPlayer).addClass("hide-controls");
          }
        }
      );
      /*--------------- HIDE / SHOW CONTROLS --------*/

      /*-------------- UPDATE FUNCTIONS ---------------*/
      const updateSeekbar = () => {
        seekPercentage = helper_getPercentage(
          currentTimeInSeconds,
          totalDurationInSeconds
        );
        $(eleVideoProgress).css({
          width: `${seekPercentage}%`,
        });
      };

      const updateVolumebar = () => {
        $(eleVolumeProgress).css({ width: `${volumePercentage}%` });
      };

      const updateTotalDuration = () => {
        $(eleEndTime).html(
          `${totalDuration.hours}:${totalDuration.minutes}:${totalDuration.seconds}`
        );
      };

      const updateCurrentTime = () => {
        $(eleStartTime).html(
          `${currentDuration.hours}:${currentDuration.minutes}:${currentDuration.seconds}`
        );
      };
      /*----------- UPDATE FUNCTIONS -----------------*/

      //1. update the total duration
      eleVideoObj.on("loadeddata", () => {
        totalDurationInSeconds = eleVideoObj["0"].duration;
        totalDuration = helper_calculateDuration(totalDurationInSeconds);
        updateTotalDuration();
        updateSeekbar();
        updateVolumebar();
      });

      // 2. update current time
      eleVideoObj.on("timeupdate", () => {
        currentTimeInSeconds = eleVideoObj["0"].currentTime;
        currentDuration = helper_calculateDuration(currentTimeInSeconds);
        updateCurrentTime();
        updateSeekbar();
      });
      //3. update volume
      eleVideoObj.on("volumechange", () => {
        volumePercentage = eleVideoObj["0"].volume * 100;
        updateVolumebar();
      });

      eleVideoObj.on("ended", () => {
        eleVideoObj["0"].currentTime = 0;
        $(elePlayPauseBtn).removeClass("pause").addClass("play");
        $(videoPlayer).removeClass("hide-controls");
        setTimeout(() => {
          $("#ads_modal").addClass("display-none");
        }, 3000);
      });
      /*----------------------user events ------------------------------*/

      //4. play the song
      $(elePlayPauseBtn).on("click", () => {
        $(elePlayPauseBtn).hasClass("play")
          ? eleVideoObj["0"].play()
          : eleVideoObj["0"].pause();
        $(elePlayPauseBtn).toggleClass("play pause");
      });

      //5. toggle volume
      $(eleToggleVolume).on("click", () => {
        eleVideoObj["0"].volume = eleVideoObj["0"].volume ? 0 : volumeValue;
        $(eleToggleVolume).toggleClass("on off");
      });

      //6. volume bar click
      $(eleVolumeSeekbar).on("click", (e) => {
        let tempVolumePosition =
          e.pageX - videoPlayer.offsetLeft - eleVolumeSeekbar["0"].offsetLeft;
        let tempVolumeValue =
          tempVolumePosition / eleVolumeSeekbar["0"].clientWidth;
        volumeValue = tempVolumeValue;
        eleVideoObj["0"].volume = tempVolumeValue.toFixed(1);
        volumePercentage = tempVolumeValue.toFixed(1) * 100;
        $(eleToggleVolume).addClass("on").removeClass("off");
      });
      //7. seekbar click
      $(eleVideoSeekbar).on("click", (e) => {
        let tempSeekPosition =
          e.pageX - videoPlayer.offsetLeft - eleVideoSeekbar["0"].offsetLeft;
        let tempSeekValue = tempSeekPosition / eleVideoSeekbar["0"].clientWidth;
        eleVideoObj["0"].currentTime = tempSeekValue * totalDurationInSeconds;
      });

      //8. scroll on seekbar
      $(eleVideoSeekbar).on("mousewheel", (e) => {
        e.deltaY === 1
          ? (eleVideoObj["0"].currentTime += 5)
          : (eleVideoObj["0"].currentTime -= 5);
      });

      //9. scroll on volumebar
      $(eleVolumeSeekbar).on("mousewheel", (e) => {
        let tempVolumeValue = eleVideoObj["0"].volume;
        if (e.deltaY === 1) {
          tempVolumeValue >= 1
            ? (tempVolumeValue = 1)
            : (tempVolumeValue += 0.1);
        } else {
          tempVolumeValue <= 0
            ? (tempVolumeValue = 0)
            : (tempVolumeValue -= 0.1);
        }
        volumeValue = tempVolumeValue.toFixed(1);
        eleVideoObj["0"].volume = tempVolumeValue.toFixed(1);
        if (eleVideoObj["0"].volume === 0)
          $(eleToggleVolume).addClass("off").removeClass("on");
        else $(eleToggleVolume).addClass("on").removeClass("off");
      });
    });
    const helper_getPercentage = (presentTime, totalTime) => {
      var calcPercentage = (presentTime / totalTime) * 100;
      return parseFloat(calcPercentage.toString());
    };

    const helper_calculateDuration = (duration) => {
      var seconds = parseInt(duration % 60);
      var minutes = parseInt((duration % 3600) / 60);
      var hours = parseInt(duration / 3600);

      return {
        hours: helper_pad(hours),
        minutes: helper_pad(minutes.toFixed()),
        seconds: helper_pad(seconds.toFixed()),
      };
    };

    const helper_pad = (number) => {
      if (number > -10 && number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    };
  }

  handleMouseDown() {
    const draggable = {
      style: { cursor: "move" },
    };
    this.setState({ draggable }, () => {
      this.state.draggable.addEventListener("mouseup", this.handleMouseUp);
      document.body.addEventListener("mousemove", this.handleMouseMove);
      document.body.addEventListener("mouseleave", this.handleMouseUp);
    });
  }

  handleMouseUp() {
    const draggable = {
      style: { cursor: "default" },
    };
    this.setState({ draggable }, () => {
      document.body.removeEventListener("mousemove", this.handleMouseMove);
      document.body.removeEventListener("mouseleave", this.handleMouseUp);
    });
  }

  handleMouseMove(e) {
    const dragableBox = this.state.draggable.getBoundingClientRect();
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    if (dragableBox.top + e.movementY < 0) {
      this.state.draggable.style.top = 0;
      this.state.draggable.style.left = `${dragableBox.left + e.movementX}px`;
    } else if (dragableBox.left + e.movementX < 0) {
      this.state.draggable.style.left = 0;
      this.state.draggable.style.top = `${dragableBox.top + e.movementY}px`;
    } else if (dragableBox.top + e.movementY >= height - 200) {
      this.state.draggable.style.top = height - 200;
      this.state.draggable.style.left = `${dragableBox.left + e.movementX}px`;
    } else if (dragableBox.left + e.movementX >= width - 200) {
      this.state.draggable.style.left = width - 200;
      this.state.draggable.style.top = `${dragableBox.top + e.movementY}px`;
    } else {
      this.state.draggable.style.top = `${dragableBox.top + e.movementY}px`;
      this.state.draggable.style.left = `${dragableBox.left + e.movementX}px`;
    }
  }

  init() {
    const draggable = document.querySelector(".draggable");
    this.setState({ draggable }, () => {
      this.state.draggable.addEventListener("mousedown", this.handleMouseDown);
    });
  }

  handleAdClose = (event) => {
    event.preventDefault();
    $("#ads_modal").addClass("display-none");
  };
  render() {
    return (
      <Provider store={store}>
        <div
          id="ads_modal"
          style={{
            height: "40vh",
          }}
          className="z-depth-5 draggable border-radius-10  padding-1 display-none"
        >
          <div style={{ backgroundColor: "#000", height: "100%" }}>
            <div className="video-player-st">
              <video
                contextMenu="none"
                src={this.state.url}
                autoPlay={true}
                width="100%"
                height="100%"
              ></video>
              <div className="video-controls transparent">
                <div className="video-top-controls">
                  <div className="video-seekbar seekbar">
                    <span className="progress"></span>
                  </div>
                </div>

                <div className="video-playback-controls">
                  {/* <button className="control-btn toggle-play-pause play">
                    <i className="fas fa-play play-icon icon"></i>
                    <i className="fas fa-pause pause-icon icon"></i>
                  </button>
                  <div className="video-volume-control">
                    <button className="control-btn toggle-volume on">
                      <i className="fas fa-volume-up icon volume-on"></i>
                      <i className="fas fa-volume-mute icon volume-off"></i>
                    </button>
                    <div className="volume-seekbar seekbar">
                      <span className="progress"></span>
                    </div>
                  </div>
                  <div className="video-timings">
                    <div className="start-time time">00:00:00</div>/
                    <div className="end-time time">00:00:00</div>
                  </div>
                */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <HashRouter>
          <Route exact path="/" component={HomeScreen} />
          <Route
            exact
            path="/payment-confirmed"
            component={RegisterSuccessScreen}
          />
          <Route
            exact
            path="/teacher-payment-confirmed"
            component={TeacherRegistrationSuccess}
          />
          <Route exact path="/canceled" component={RegistrationCanceled} />
          <Route
            exact
            path="/payment-canceled"
            component={RegistrationCanceled}
          />
          <Route
            exact
            path="/payment-upgrade"
            component={SuccessStudentUpgrade}
          />

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/profile-acc" component={ProfileAccScreen} />
          <Route exact path="/all-students" component={Students} />
          <Route
            exact
            path="/register-premium-access-student/:referralId"
            component={RegisterScreen}
          />
          <Route
            exact
            path="/register-limited-access-student/:referralId"
            component={FreeStudentAcc}
          />
          <Route
            exact
            path="/register-premium-access-teacher/:referralId"
            component={RegisterPremiumTeacher}
          />
          <Route
            exact
            path="/register-limited-access-teacher/:referralId"
            component={RegisterLimitedTeacher}
          />

          <Route
            exact
            path="/try-free-student-account/:referralId"
            component={RegisterStudent}
          />
          <Route
            exact
            path="/try-free-teacher-account/:referralId"
            component={RegisterTeacher}
          />
          <Route
            exact
            path="/register-new-account/:referralId"
            component={RegisterAs}
          />

          <Route exact path="/about" component={AboutScreen} />

          <Route exact path="/all-subjects" component={AllClasses} />
          <Route exact path="/admin" component={AdminScreen} />
          <Route exact path="/subadmins" component={SubadminScreen} />
          <Route exact path="/roles" component={RolesScreen} />
          <Route exact path="/package-selection" component={PackagePayment} />
          <Route exact path="/upload" component={UploadMaterial} />
          <Route exact path="/assignments" component={UploadNewAssignment} />
          <Route exact path="/content-upload" component={UploadContent} />

          <Route exact path="/school-management" component={SchoolManagement} />

          <Route exact path="/subscriptions" component={SubscriptionScreen} />
          <Route exact path="/advertising" component={AdsManagementScreen} />
          <Route
            exact
            path="/teacher-awards"
            component={TeacherPromotionsScreen}
          />
          <Route exact path="/enrol-student" component={EnrolStudent} />
          <Route
            exact
            path="/teacher-subject-view"
            component={TeacherSubjectContent}
          />
          <Route exact path="/teacher" component={TeacherScreen} />
          <Route
            exact
            path="/affiliate-program"
            component={TeacherAffiliateProgram}
          />
          <Route exact path="/teacher-students" component={TeacherStudents} />
          <Route exact path="/classroom" component={ClassroomScreen} />
          <Route
            exact
            path="/classroom-mark"
            component={TeacherMarkClassroomScreen}
          />
          <Route
            exact
            path="/classroom-mark-test"
            component={StudentSubmissionsScreen}
          />

          <Route exact path="/student" component={StudentScreen} />
          <Route exact path="/coursework" component={StudentCoursework} />
          <Route exact path="/Assessment" component={StudentAssessment} />
          <Route exact path = "multichoice" component={QuizApp} />
          <Route
            exact
            path="/class-coursework"
            component={StudentClassCoursework}
          />

          <Route exact path="/video-player" component={LivePlayer} />

          <Route exact path="/subject-content" component={SubjectContent} />
          <Route
            exact
            path="/student-assignments"
            component={StudentAssignments}
          />
          <Route exact path="/school" component={SchoolScreen} />
          <Route
            exact
            path="/school-teacher-management"
            component={SchoolTeacherManagementScreen}
          />
          <Route
            exact
            path="/school-student-management"
            component={SchoolStudentManagementScreen}
          />
          <Route exact path="/school-classes" component={ClassesScreen} />
          <Route
            exact
            path="/school-calendar"
            component={SchoolCalendarScreen}
          />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
