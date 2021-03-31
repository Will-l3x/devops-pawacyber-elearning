import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import M from "materialize-css";
import $ from "jquery";
import Header from "../../components/header";
import Footer from "../../components/footer";

import img from "../../assets/images/details-2-office-team-work.svg";

class TeacherAffiliateProgram extends Component {
  constructor() {
    super();
    this.state = {
      user:
        JSON.parse(localStorage.getItem("user")) === null
          ? { roleid: 3 }
          : JSON.parse(localStorage.getItem("user")),
      termsAgreed: false,
    };
  }
  componentDidMount() {
    M.AutoInit();
    function legalTerms() {
      var totalLegalRules = $(".legal__rule").length;
      if ($(".legal").hasClass("is-expanded")) {
        $(".legal__rules")
          .attr("aria-expanded", "true")
          .attr("aria-hidden", "false")
          .css("opacity", "1.0")
          .show();
        $(".legal__terms").on("scroll", function () {
          legalProgress();
        });
        $("#agree").addClass("disabled");
      } else {
        $(".legal__terms").on("scroll", function () {
          if (
            $(this).scrollTop() + $(this).innerHeight() >=
            this.scrollHeight
          ) {
            $(".legal__rules")
              .attr("aria-expanded", "true")
              .attr("aria-hidden", "false")
              .slideDown(100 * totalLegalRules + 10)
              .animate({ opacity: "1" }, 175);

            $("#agree").removeClass("disabled");
          }
          legalProgress();
        });
      }
    }

    function legalRules() {
      // Terms & Conditions - Checkbox
      $(
        ".toggle--checkbox .toggle__label, .toggle--checkbox .toggle__disagree"
      ).remove();

      // Terms & Conditions - Buttons
      $(".toggle--buttons .control-indicator").remove();

      $(document).on(
        "click",
        ".toggle--buttons .toggle__agree .checkbox",
        function () {
          if ($(this).prop("checked", true)) {
            $(this)
              .parent(".toggle__agree")
              .siblings(".toggle__disagree")
              .find(".checkbox")
              .prop("checked", false);

            // Terms & Conditions - Required Buttons
            $(this).closest(".legal__rule").css("background", "#fff");
          }
        }
      );

      $(document).on(
        "click",
        ".toggle--buttons .toggle__disagree .checkbox",
        function () {
          if ($(this).prop("checked", true)) {
            $(this)
              .parent(".toggle__disagree")
              .siblings(".toggle__agree")
              .find(".checkbox")
              .prop("checked", false);

            // Terms & Conditions - Required Buttons
            if ($(this).closest(".legal__rule").hasClass("is-required")) {
              $(this).closest(".legal__rule").css("background", "#fdf6f6");
            }
          }
        }
      );
    }

    function legalProgress() {
      var legalTermsScrollHeight =
        $(".legal__terms-scroll").height() - $(".legal__terms").height();
      var legalTermsScrollTop = $(".legal__terms").scrollTop();
      var legalProgress = Math.max(
        0,
        Math.min(1, legalTermsScrollTop / legalTermsScrollHeight)
      );
      $(".legal__progress").css({
        width: legalProgress * 100 + "%" + 10 + "px",
      });
    }

    function overlay() {
      $(document).on("click", ".overlay--open", function () {
        $("body").css("overflow", "hidden");
        $(".overlay").fadeIn(200);
        $(".overlay > .container")
          .fadeIn(400)
          .animate({ marginTop: "10px" }, 800);
      });

      $(document).on("click", ".overlay--close", function () {
        $("body").css("overflow", "visible");
        $(".overlay > .container")
          .fadeOut(400)
          .animate({ marginTop: "10px" }, 800);
        $(".overlay").fadeOut(200);
      });
    }

    overlay();
    legalTerms();
    legalRules();
  }
  openTerms = (event) => {
    event.preventDefault();
    const elem = document.getElementById("modal1");
    const modal = M.Modal.init(elem, { dismissible: false });
    modal.open();
  };
  handleTermsAgreed = (event) => {
    event.preventDefault();
    this.setState({ termsAgreed: true });
    const elem = document.getElementById("modal1");
    const modal = M.Modal.init(elem, { dismissible: false });
    modal.close();
  };
  copyContent = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(event.target.referralLink.defaultValue);
    M.toast({
      html: "Copied to clipboard!",
      classes: "green accent-3",
    });
  };
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <LeftSidebar />

            <section id="content" style={{ paddingTop: "1%" }}>
              <div className="container">
                <div className="row">
                  <div className="col s12">
                    <div className="ex-basic-1">
                      <h5 className="text-shadow-2">Affiliate Program</h5>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col m5 s12">
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <img className="img-fluid" src={img} alt="alternative" />
                    </div>
                  </div>

                  <div className="col m7 s12">
                    <div className="col s12">
                      <p style={{ fontSize: 14 }}>
                        Affiliate marketing on this website shall mean; a way
                        for Pawa Cyber School E-Learning to sell or market its
                        products by signing up individuals ("affiliates") who
                        market the school's products for a commission. In this
                        case, Pawa Cyber School shall use graduate teachers to
                        participate in affiliate marketing by registering to the
                        website first and in turn they make referrals of
                        learners to the school who must also register. The
                        affiliate will be paid a commission of 10 percent (10%)
                        exclusive of VAT, of the subscription fee monthly.
                        However, take note this commission ceases to exist as
                        soon as the learner subscription expires. The affiliate
                        will only be paid commission if the learner is still
                        subscribed to the platform. For example, if the
                        affiliate brings a Junior Primary learner, the monthly
                        subscription fee is N$ 120, VAT included. Exclusive of
                        VAT it will be N$104.35. So, the affiliate will get 10
                        percent of N$104.35, which is N$10.44. The more
                        referrals the more you earn!
                      </p>
                    </div>

                    <div className="col s12" style={{ marginTop: 25 }}>
                      <table
                        className="highlight responsive-table text-shadow-2"
                        style={{ fontSize: 14 }}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <strong>Total Referrals</strong>
                            </td>
                            <td className="">0 Clients/N$ 0</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Referral Amount Paid</strong>
                            </td>
                            <td className="">0 Clients/N$ 0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col s12" style={{ marginTop: 50 }}>
                      {this.state.termsAgreed ? (
                        <form onSubmit={this.copyContent}>
                          <div
                            style={{ position: "relative" }}
                            className="input-field"
                          >
                            <fieldset className="form-group">
                              <ReactFormLabel
                                htmlFor="referralLink"
                                title="Copy the link below:"
                              />
                              <input
                                type="text"
                                id="referralLink"
                                name="referralLink"
                                className=""
                                readOnly
                                defaultValue={`https://pawacyberschool.net/#/register-new-account/${this.state.user.userid}`}
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  zIndex: 5,
                                  display: "inline-block",
                                }}
                              >
                                {" "}
                                <button className="clipboard" type="submit">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-clipboard"
                                  >
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                    <rect
                                      x="8"
                                      y="2"
                                      width="8"
                                      height="4"
                                      rx="1"
                                      ry="1"
                                    ></rect>
                                  </svg>
                                </button>
                              </span>
                            </fieldset>
                          </div>
                        </form>
                      ) : (
                        <div className="justify-center">
                          <button
                            onClick={this.openTerms}
                            className="form-control-submit-button z-depth-5"
                          >
                            Please First Read Our Terms and Conditions
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="modal1"
                className="modal overflow-y-visibile legal__modal padding-2"
              >
                <div className="ex-basic-1">
                  <h5>Terms & Conditions and Privacy Notice</h5>
                </div>

                <div className="legal">
                  <div className="legal__instructions">
                    <div className="alert alert-warning" role="alert">
                      <strong>
                        <i className="fa fa-exclamation-triangle"></i>
                        Important.{" "}
                      </strong>
                      <span>
                        In order to continue, you must read the Terms &
                        Conditions and Privacy Notice by scrolling to the
                        bottom.
                      </span>
                    </div>
                  </div>
                  <div className="legal__terms">
                    <div className="legal__terms-scroll">
                      <div id="terms-and-conditions">
                        <h5>Terms and Conditions</h5>
                        <br />
                        <h6>Overview</h6>

                        <p>
                          This website is operated by Pawa Cyber School cc.
                          Throughout the site, the terms “we”, “us” and “our”
                          refer to Pawa Cyber School offers this website,
                          including all information, tools and services
                          available from this site to you, the user, conditioned
                          upon your acceptance of all terms, conditions,
                          policies and notices stated here. By visiting our site
                          and / or purchasing something from us, you engage in
                          our “Service” and agree to be bound by the following
                          terms and conditions (“Terms of Service”, “Terms”),
                          including those additional terms and conditions and
                          policies referenced herein and / or available by
                          hyperlink. These Terms of Service apply to all users
                          of the site, including without limitation users who
                          are browsers, vendors, customers, merchants, and / or
                          contributors of content.
                        </p>
                        <p>
                          Please read these Terms of Service carefully before
                          accessing or using our website. By accessing or using
                          any part of the site, you agree to be bound by these
                          Terms of Service. If you do not agree to all the terms
                          and conditions of this agreement, then you may not
                          access the website or use any services. If these Terms
                          of Service are considered an offer, acceptance is
                          expressly limited to these Terms of Service. Any new
                          features or tools which are added to the current
                          online school shall also be subject to the Terms of
                          Service. You can review the most current version of
                          the Terms of Service at any time on this page. We
                          reserve the right to update, change or replace any
                          part of these Terms of Service by posting updates and
                          / or changes to our website. It is your responsibility
                          to check this page periodically for changes. Your
                          continued use of or access to the website following
                          the posting of any changes constitutes acceptance of
                          those changes.
                        </p>
                        <h6>Online School Terms</h6>
                        <p>
                          By agreeing to these Terms of Service, you represent
                          that you are at least the age of majority in your
                          state or province of residence, or that you are the
                          age of majority in your state or province of residence
                          and you have given us your consent to allow any of
                          your minor dependents to use this site. You may not
                          use our products for any illegal or unauthorized
                          purpose nor may you, in the use of the Service,
                          violate any laws in your jurisdiction (including but
                          not limited to copyright laws)
                        </p>
                        <p>
                          You must not transmit any worms or viruses or any code
                          of a destructive nature. A breach or violation of any
                          of the Terms will result in an immediate termination
                          of your Services.
                        </p>
                        <h6>General Conditions</h6>
                        <p>
                          We reserve the right to refuse service to anyone for
                          any reason at any time. You understand that your
                          content (not including credit card information), may
                          be transferred unencrypted and involve (a)
                          transmissions over various networks; and (b) changes
                          to conform and adapt to technical requirements of
                          connecting networks or devices. Credit card
                          information is always encrypted during transfer over
                          networks. You agree not to reproduce, duplicate, copy,
                          sell, resell or exploit any portion of the Service,
                          use of the Service, or access to the Service or any
                          contact on the website through which the service is
                          provided, without express written permission by us.
                          The headings used in this agreement are included for
                          convenience only and will not limit or otherwise
                          affect these Terms.
                        </p>
                        <h6>Your Fees</h6>
                        <p>
                          We will provide the Service to you on a pre-paid
                          basis. In order to have continued access to the
                          Service you must make, and we must receive, payment of
                          your Fees in advance on or before the Monthly Due
                          Date. If we do not receive payment of on or before due
                          date, we will suspend your access to the Service. If
                          your access to the Service is suspended, we will not
                          reactivate your access to the Service until we have
                          received payment of your Fees.
                        </p>
                        <h6>Modifications to the Service and Prices</h6>
                        <p>
                          Prices for our products and services are subject to
                          change without notice. We reserve the right at any
                          time to modify or discontinue the Service (or any part
                          or content thereof) without notice at any time. We
                          shall not be liable to you or to any third-party for
                          any modification, price change, suspension or
                          discontinuance of the Service.
                        </p>
                        <h6>Affiliate Marketing Policy </h6>
                        <p>
                          Affiliate marketing on this website shall mean; a way
                          for Pawa Cyber School E-Learning to sell or market its
                          products by signing up individuals ("affiliates") who
                          market the school's products for a commission. In this
                          case, Pawa Cyber School shall use graduate teachers to
                          participate in affiliate marketing by registering to
                          the website first and in turn they make referrals of
                          learners to the school who must also register. The
                          affiliate will be paid a commission of 10 percent
                          (10%) exclusive of VAT, of the subscription fee
                          monthly. However, take note this commission ceases to
                          exist as soon as the learner subscription expires. The
                          affiliate will only be paid commission if the learner
                          is still subscribed to the platform. For example, if
                          the affiliate brings a Junior Primary learner, the
                          monthly subscription fee is N$ 120, VAT included.
                          Exclusive of VAT it will be N$104.35. So, the
                          affiliate will get 10 percent of N$104.35, which is
                          N$10.44.
                        </p>
                        <p>
                          Any person or entity that participates or attempts to
                          participate in our marketing program must accept this
                          Agreement without change.
                        </p>
                        <p>
                          This Privacy Policy of Pawa Cyber School E-Learning
                          about Affiliate Marketing describes how we may collect
                          and use personal data and the rights to affiliates
                          regarding their respective data. By joining the
                          Affiliate marketing, you signify your approval of the
                          terms set out in this Privacy Policy, and other terms
                          and conditions. If you do not agree to this Privacy
                          Policy, you must not use the affiliate marketing. We
                          may update this Privacy Policy from time to time in
                          order to reflect, for example, changes to our privacy
                          practices or for other operational, legal, or
                          regulatory reasons. By continuing to our affiliate
                          program after these changes are posted, you agree to
                          the revised policy.
                        </p>
                        <h6>Personal Information Controller</h6>
                        <p>
                          Any personal information provided to or gathered by
                          Pawa Cyber School E-Learning under this Privacy Notice
                          will be stored and controlled by the school.
                        </p>
                        <h6>Information collected from Affiliates</h6>
                        <p>
                          When an Affiliate signs up to join, we collect some
                          information such as email, personal information,
                          payment details and social network information. We
                          collect this information to provide you with our
                          Services; for example, to confirm your identity,
                          contact you, provide customer support when you contact
                          us, provide you with advertising and marketing
                          activities.
                        </p>
                        <h6>Products or Services</h6>
                        <p>
                          Certain products or services may be available
                          exclusively online through the website. These products
                          or services may have limited quantities and are
                          subject to return or exchange only according to our
                          Return Policy. We have made every effort to display as
                          accurately as possible the colours and images of our
                          products that appear at the online school. We cannot
                          guarantee that your computer monitor’s display of any
                          colour will be accurate.
                        </p>
                        <p>
                          We reserve the right, but are not obligated, to limit
                          the sales of our products or Services to any person,
                          geographic region or jurisdiction. We may exercise
                          this right on a case-by-case basis. We reserve the
                          right to limit the quantities of any products or
                          services that we offer.
                        </p>
                        <p>
                          All descriptions of products or product pricing are
                          subject to change at any time without notice, at the
                          sole discretion of us. We reserve the right to
                          discontinue any product at any time. Any offer for any
                          product or service made on this site is void where
                          prohibited.
                        </p>
                        <p>
                          We do not warrant that the quality of any products,
                          services, information, or other material purchased or
                          obtained by you will meet your expectations, or that
                          any errors in the Service will be corrected.
                        </p>
                        <h6>Links To Other Web Sites</h6>
                        <p>
                          Our Service may contain links to third-party web sites
                          or services that are not owned or controlled by Pawa
                          Cyber School. Pawa Cyber School has no control over,
                          and assumes no responsibility for, the content,
                          privacy policies, or practices of any third party web
                          sites or services. You further acknowledge and agree
                          that Pawa Cyber School shall not be responsible or
                          liable, directly or indirectly, for any damage or loss
                          caused or alleged to be caused by or in connection
                          with use of or reliance on any such content, goods or
                          services available on or through any such web sites or
                          service.
                        </p>
                        <h6>Accuracy of Billing and Account Information</h6>
                        <p>
                          We reserve the right to refuse any order you place
                          with us. We may, in our sole discretion, limit or
                          cancel quantities purchased per person, per household
                          or per order. These restrictions may include orders
                          placed by or under the same customer account, the same
                          credit card, and/or orders that use the same billing
                          and/or shipping address. In the event that we make a
                          change to or cancel an order, we may attempt to notify
                          you by contacting the e-mail and/or billing
                          address/phone number provided at the time the order
                          was made.
                        </p>
                        <p>
                          We reserve the right to limit or prohibit orders that,
                          in our sole judgment, appear to be placed by dealers,
                          resellers or distributors. You agree to provide
                          current, complete and accurate purchase and account
                          information for all purchases made at our online
                          school. You agree to promptly update your account and
                          other information, including your email address and
                          credit card numbers and expiration dates, so that we
                          can complete your transactions and contact you as
                          needed.
                        </p>
                        <h6>Personal Information</h6>
                        <p>
                          Your submission of personal information through the
                          online school is governed by our Privacy Policy.
                        </p>
                        <h6>Errors, Inaccuracies and Omissions</h6>
                        <p>
                          Occasionally there may be information on our site, in
                          the Service or education content that contains
                          typographical errors, inaccuracies or omissions that
                          may relate to product descriptions, pricing,
                          promotions, offers, product shipping charges, transit
                          times and availability. We reserve the right to
                          correct any errors, inaccuracies or omissions, and to
                          change or update information or cancel orders if any
                          information in the Service or on any related website
                          is inaccurate at any time without prior notice
                          (including after you have submitted your order).
                        </p>
                        <p>
                          We undertake no obligation to update, amend or clarify
                          information in the Service, Product or on any related
                          website, including without limitation, pricing
                          information, except as required by law.
                        </p>
                        <p>
                          No specified update or refresh date applied in the
                          Service or on any related website, should be taken to
                          indicate that all information in the Service or on any
                          related website has been modified or updated.
                        </p>
                        <h6>
                          Disclaimer of Warranties; Limitation of Liability
                        </h6>
                        <p>
                          We do not guarantee, represent or warrant that your
                          use of our service will be uninterrupted, timely,
                          secure or error-free.
                        </p>
                        <p>
                          We do not warrant that the results that may be
                          obtained from the use of the service will be accurate
                          or reliable.
                        </p>
                        <p>
                          You agree that from time to time we may remove the
                          service for indefinite periods of time or cancel the
                          service at any time, without notice to you.
                        </p>
                        <p>
                          You expressly agree that your use of, or inability to
                          use, the service is at your sole risk. The service and
                          all products and services delivered to you through the
                          service are (except as expressly stated by us)
                          provided ‘as is’ and ‘as available’ for your use,
                          without any representation, warranties or conditions
                          of any kind, either express or implied, including all
                          implied warranties or conditions of merchantability,
                          merchantable quality, fitness for a particular
                          purpose, durability, title, and noninfringement.
                        </p>
                        <p>
                          In no case shall Pawa Cyber School our directors,
                          officers, employees, affiliates, agents, contractors,
                          interns, suppliers, service providers or licensors be
                          liable for any injury, loss, claim, or any direct,
                          indirect, incidental, punitive, special, or
                          consequential damages of any kind, including, without
                          limitation lost profits, lost revenue, lost savings,
                          loss of data, replacement costs, or any similar
                          damages, whether based in contract, tort (including
                          negligence), strict liability or otherwise, arising
                          from your use of any of the service or any products
                          procured using the service, or for any other claim
                          related in any way to your use of the service or any
                          product, including, but not limited to, any errors or
                          omissions in any content, or any loss or damage of any
                          kind incurred as a result of the use of the service or
                          any content (or product) posted, transmitted, or
                          otherwise made available via the service, even if
                          advised of their possibility.
                        </p>
                        <p>
                          Because some states or jurisdictions do not allow the
                          exclusion or the limitation of liability for
                          consequential or incidental damages, in such states or
                          jurisdictions, our liability shall be limited to the
                          maximum extent permitted by law.
                        </p>
                        <h6>Cancellation and Refunds</h6>
                        <p>
                          Once the user has purchased our services and decides
                          to cancel, no refunds will be made. You will be asked
                          to acknowledge this policy during the enrolment or
                          registration process; exceptions to this policy are
                          not offered.
                        </p>
                        <h6>Entire Agreement</h6>
                        <p>
                          These Terms constitute the entire agreement between
                          Pawa Cyber School and you in relation to your use of
                          this Website, and supersede all prior agreements and
                          understandings.
                        </p>
                        <h6>Governing Law & Jurisdiction</h6>
                        <p>
                          These Terms will be governed by and interpreted in
                          accordance with the laws of the State of Namibia, and
                          you submit to the non-exclusive jurisdiction of the
                          state and federal courts located in Namibia for the
                          resolution of any disputes.
                        </p>
                      </div>
                      <div id="privacy-notice">
                        <h5>Privacy Notice</h5>
                        <br />
                        <h6>Overview</h6>
                        <p>
                          Pawa Cyber School ("us", "we", or "our") operates
                          http://www.pawacyberschool.net (the "Site"). This page
                          informs you of our policies regarding the collection,
                          use and disclosure of Personal Information we receive
                          from users of the Site.
                        </p>
                        <p>
                          We use your Personal Information only for providing
                          and improving the Site. By using the Site, you agree
                          to the collection and use of information in accordance
                          with this policy.
                        </p>
                        <h6>Your Acceptance of These Terms</h6>
                        <p>
                          By using this site, you signify your assent to the
                          Pawa Cyber School Privacy Policy. If you do not agree
                          with this Privacy Policy, you may not use our
                          services. Your continued use of the services following
                          the posting.
                        </p>
                        <h6>Private Data We Receive And Collect</h6>
                        <p>
                          Pawa Cyber School also automatically collects and
                          receives certain information from your computer or
                          mobile device, including the activities you perform on
                          our Website, the Platforms, and the Applications, the
                          type of hardware and software you are using (for
                          example, your operating system or browser), and
                          information obtained from cookies. For example, each
                          time you visit the Website or otherwise use the
                          Services, we automatically collect your IP address,
                          browser and device type, access times, the web page
                          from which you came, the regions from which you
                          navigate the web page, and the web page(s) you access
                          (as applicable).
                        </p>

                        <p>
                          When you first register for a Pawa Cyber School
                          eLearning account, and when you use the Services, we
                          collect some
                          <a
                            href="https://pawacyberschool.net/about"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Personal Information
                          </a>
                          about you such as:
                        </p>
                        <br />
                        <ol style={{ marginRight: 15 }}>
                          <li>
                            The geographic area where you use your computer and
                            mobile devices
                          </li>
                          <li>
                            Your full name, username, and email address and
                            other contact details
                          </li>
                          <li>
                            Other optional information as part of your account
                            profile
                          </li>
                          <li>
                            Your IP Address and, when applicable, timestamp
                            related to your consent and confirmation of consent
                          </li>
                          <li>
                            Other information submitted by you or your
                            organizational representatives via various methods
                          </li>
                          <li>
                            Your billing address and any necessary other
                            information to complete any financial transaction,
                            and when making purchases through the Services, we
                            may also collect your credit card or PayPal
                            information
                          </li>
                          <li>
                            Images or other files that you may publish via our
                            Services
                          </li>
                          <li>
                            Information (such as messages, posts, comments,
                            pages, profiles, images) we may receive relating to
                            communications you send us, such as queries or
                            comments concerning.
                          </li>
                        </ol>

                        <h6>Cookies</h6>
                        <p>
                          The use of “cookies” is standard in the Internet
                          industry. They are used on most commercial and other
                          websites. Cookies are small text written to your
                          computer. They make our Website easier for you to use
                          because they save your preferences while you’re at our
                          sites (although we do not save passwords in cookies).
                          Cookies also help us know which areas are your
                          favourites, which may need improvement and what
                          technologies and Internet services our Users like.
                          Knowing this information helps us improve the services
                          for our Users.
                        </p>
                        <p>
                          The information we track with cookies is anonymous and
                          is not used to identify, or lead us back to, any
                          particular User. Users may have the option of
                          disabling cookies via their browser preferences (most
                          browsers are initially set up to accept cookies).
                          However, some features of our Website will not
                          function properly or may function more slowly if you
                          refuse cookies. While using our Website, you may get
                          cookies from our advertisers or sponsors. We do not
                          control such cookies. However, such use of cookies is
                          very common in the Internet industry.
                        </p>
                        <h6>General Compliance With Laws</h6>
                        <p>
                          The safety of children is our highest priority. We
                          comply with applicable laws and regulations. We will
                          only use information collected for educational
                          purposes as it relates to our services and WILL NOT:
                        </p>
                        <br />
                        <ol style={{ marginRight: 15 }}>
                          <li>
                            Collect contact information from students without
                            prior parental notification and consent which will
                            include an opportunity for the parent to prevent use
                            of the information and the child’s participation in
                            the related activity. Without prior parental
                            consent, online information will only be used to
                            respond directly to a child’s request and will not
                            be used for other purposes.{" "}
                          </li>
                          <li>
                            Use any information collected from students for
                            commercial purposes.
                          </li>
                          <li>
                            Distribute to third parties any personally
                            identifiable information relating to a student
                            without prior parental consent.
                          </li>
                          <li>
                            Give students the ability to publicly post or
                            otherwise distribute personally identifiable contact
                            information without prior parental consent.{" "}
                          </li>
                          <li>
                            Entice any student by the prospect of a special
                            game, prize or other activity to divulge more
                            information than is needed to participate in the
                            activity.
                          </li>
                        </ol>

                        <h6>Security</h6>
                        <p>
                          The security of our Users’ personally identifiable
                          information is of the highest priority. We exercise
                          great care in providing secure transmission of your
                          information from your PC to our servers.
                          Unfortunately, no data transmission over the Internet
                          can be guaranteed to be 100% secure. As a result,
                          while we strive to protect your personal information,
                          we cannot ensure or warrant the security of any
                          information you transmit to us or through our
                          services, and you do so at your own risk. Once we
                          receive your transmission, we make our best effort to
                          ensure its security on our systems.
                        </p>
                        <p>
                          Whenever credit card information is transmitted we use
                          industry standard, SSL (secure socket layer)
                          encryption. If you have an account or use another
                          passwordprotected service, you are the only person who
                          can access it and view the User information concerning
                          the account. We strongly recommend that you do not
                          share your password with anyone. We will never ask you
                          for your password in an unsolicited phone call or
                          email.
                        </p>
                        <p>
                          Ultimately, you are responsible for maintaining the
                          secrecy of your passwords and any account information.
                          Please remember to sign out properly and close your
                          browser window when you have finished your work. This
                          helps ensure that others cannot access your personal
                          information and in the event the computer you use is
                          accessible to others or if you share a computer with
                          someone else or use a computer in a public place such
                          as a library or Internet cafe.{" "}
                        </p>
                        <p>
                          In addition, from time to time we may create and
                          supply, at our sole discretion, additional security
                          features for our Users. These security features are
                          designed only for the use of Users. We provide no
                          warranty, express or implied that any such security
                          features may not be broken, violated or in some way
                          compromised.
                        </p>
                        <h6>Changes To This Privacy Policy</h6>
                        <p>
                          This Privacy Policy is effective as of and will remain
                          in effect except with respect to any changes in its
                          provisions in the future, which will be in effect
                          immediately after being posted on this page.
                        </p>
                        <p>
                          We reserve the right to update or change our Privacy
                          Policy at any time and you should check this Privacy
                          Policy periodically. Your continued use of the Service
                          after we post any modifications to the Privacy Policy
                          on this page will constitute your acknowledgment of
                          the modifications and your consent to abide and be
                          bound by the modified Privacy Policy.
                        </p>
                        <p>
                          If we make any material changes to this Privacy
                          Policy, we will notify you either through the email
                          address you have provided us, or by placing a
                          prominent notice on our website.
                        </p>
                        <h6>Contact Us</h6>
                        <p>
                          If you have any questions about this Privacy Policy,
                          please contact us.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="legal__actions">
                    <div style={{ float: "left" }}>
                      <div>
                        <sup>1</sup> Must agree to join the Affiliate Program
                      </div>
                    </div>
                    <div style={{ float: "right" }}>
                      <button
                        type="button"
                        className="btn btn-default red accent-2 modal-close"
                        style={{ marginRight: 15 }}
                      >
                        Disagree
                      </button>
                      <button
                        type="submit"
                        id="agree"
                        onClick={this.handleTermsAgreed}
                        className="btn btn-success green accent-3 disabled"
                      >
                        Agree
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <RightSidebar />
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}
class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherAffiliateProgram);
