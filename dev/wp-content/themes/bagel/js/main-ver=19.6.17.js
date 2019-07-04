//
// DONUT (namespace)
//
// Self Executing Anonymous Function:
// -Enables use of private and public properties/methods
// -Also protects jQuery $ and undefined from conflicts
//
(function (DONUT, $, undefined) {
  // -----------------------------------------
  // PUBLIC
  //
  // Properties
  //
  DONUT.property = '';


  // -----------------------------------------
  // PRIVATE
  //
  // Properties
  //


  // -----------------------------------------
  // PRIVATE
  //
  // Methods
  //

  function getVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }
    return 'error';
  }

  /**
   * setCookie
   */
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /**
   * getCookie
   */
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


  // -----------------------------------------
  // PUBLIC
  //
  // Methods
  //

  //
  // init
  //
  DONUT.init = function () {
    // Mobile Menu Toggle
    $('body').on('click', '.menu-trigger', (e) => {
      e.preventDefault();
      $('body').toggleClass('main-menu-open');
    });
    $('body').on('click', '.donut-mobile-nav a', () => {
      $('body').removeClass('main-menu-open');
    });

    // Detect if menu is past banner
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 50) {
        $('body').addClass('scrolled-past-banner');
      } else {
        $('body').removeClass('scrolled-past-banner');
      }
    }).trigger('scroll');

    // If the banner is pink, need to make the banner links pink right away
    if ($('body').hasClass('error404')) {
      $('body').addClass('has-pink-banner');
    }

    // Video modal on pairing page
    $('body').on('click', '.js-vidmodal-open', function (e) {
      const videoId = getVideoId($(this).attr('href'));
      if (videoId !== 'error') {
        e.preventDefault();
        const iframeMarkup = `<iframe src="//www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        $('.js-vidmodal-content').append(iframeMarkup);
        $('body').addClass('vid-modal-open');
      }
    });
    $('body').on('click', '.js-vidmodal-close', (e) => {
      e.preventDefault();
      $('body').removeClass('vid-modal-open');
      $('.js-vidmodal-content iframe').remove();
    });

    // Newsletter modal on blog page
    $('body').on('click', '.js-blog-newsletter-open', function(e){
      e.preventDefault();
      $('body').addClass('newsletter-modal-open');
    });
    $('body').on('click', '.js-blog-newsletter-close', function(e){
      e.preventDefault();
      $('body').removeClass('newsletter-modal-open');
    });

    // Google Analytics
    if(typeof ga !== undefined) {
      //ga('send', 'event', category, action, label, value);

      // Home
      $("body.home").on("click", ".btn-slack", function(e){ ga('send', 'event', 'Click', 'Home - Top Banner - Add to Slack')});
      $("body.home").on("click", ".link-blocks .offset-left .cta-link", function(e){ ga('send', 'event', 'Click', 'Home - Pairing - Learn more')});
      $("body.home").on("click", ".link-blocks .offset-right .cta-link", function(e){ ga('send', 'event', 'Click', 'Home - Onboarding - Learn more')});
      $("body.home").on("click", ".testimonial-quote .cta-link", function(e){ ga('send', 'event', 'Click', 'Home - Testimonial Link')});
      $("body.home").on("click", ".footer-newsletter .button", function(e){ ga('send', 'event', 'Click', 'Home - Footer Newsletter Subscribe')});

      // Pairing
      $("body.page-id-84").on("click", ".btn-slack", function(e){ ga('send', 'event', 'Click', 'Pairing - Top Banner - Add to Slack')});
      $("body.page-id-84").on("click", ".pairing__cta", function(e){ ga('send', 'event', 'Click', 'Pairing - Watch Video')});
      $("body.page-id-84").on("click", ".testimonial-list__item-link", function(e){ ga('send', 'event', 'Click', 'Pairing - Testimonial - ' + $(this).text())});
      $("body.page-id-84").on("click", ".press-items__item-link", function(e){ ga('send', 'event', 'Click', 'Pairing - Press Item Link - ' + $(this).parent(".press-items__item-content").find(".press-items__item-title").text()); });
      $("body.page-id-84").on("click", ".donut-block__cta .cta__link", function(e){ ga('send', 'event', 'Click', 'Pairing - CTA - ' +  $(this).text())});
      $("body.page-id-84").on("click", ".footer-newsletter .button", function(e){ ga('send', 'event', 'Click', 'Pairing - Footer Newsletter Subscribe')});

      // Onboarding
      $("body.page-id-1004").on("click", ".donut-page-banner .btn-link--slack", function(e){ ga('send', 'event', 'Click', 'Onboarding - Top Banner - Start Trial')});
      $("body.page-id-1004").on("click", ".img-cont-blocks__block-link", function(e){ ga('send', 'event', 'Click', 'Onboarding - How it Works CTA - ' + $(this).text())});
      $("body.page-id-1004").on("click", ".testimonial-list__item-link", function(e){ ga('send', 'event', 'Click', 'Onboarding - Testimonial - ' + $(this).text())});
      $("body.page-id-1004").on("click", ".press-items__item-link", function(e){ ga('send', 'event', 'Click', 'Onboarding - Press Item Link - ' + $(this).parent(".press-items__item-content").find(".press-items__item-title").text()); });
      $("body.page-id-1004").on("click", ".trial-block .btn-link--slack", function(e){ ga('send', 'event', 'Onboarding - Trial Block - Start Trial')});
      $("body.page-id-1004").on("click", ".trial-block .btn-link--purple-light", function(e){ ga('send', 'event', 'Click', 'Onboarding - Trial Block - FAQs')});
      $("body.page-id-1004").on("click", ".trial-block__onesheet-link", function(e){ ga('send', 'event', 'Click', 'Onboarding - Trial Block - Onesheet')});
      $("body.page-id-1004").on("click", ".footer-newsletter .button", function(e){ ga('send', 'event', 'Click', 'Onboarding - Footer Newsletter Subscribe')});
    }

    // Set up slack button ref links
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref') || document.referrer;

    if(ref === "") {
      setCookie("referrer", "", "1");
    }
    else if(ref && ref.indexOf("https://www.donut.com") !== 0) {
      setCookie("referrer", ref, "1");
    }
    $(".js-ref-btn").each(function(){
      let finalUrl = this.href;
      const referrer = getCookie("referrer");
      if(referrer) finalUrl += "&ref=" + encodeURIComponent(referrer);
      this.href = finalUrl;
    });

    // FAQ show/hide
    $("body").on("click", ".js-faq-q", function(e){
      e.preventDefault();
      $(this).toggleClass("is-active");
      $(this).next(".js-faq-a").slideToggle();
    });

    // Feature Table show more
    $("body").on("click", ".js-features-expand a", function(e){
      e.preventDefault();
      $(this).parents(".js-features-expand").prev(".js-features-extra").slideToggle();
      $(this).find("span").toggle();
      $(this).toggleClass("is-open");
    });
  };


  // -----------------------------------------
  // DOCUMENT READY
  //
  $(document).ready(() => { DONUT.init(); });
}(window.DONUT = window.DONUT || {}, jQuery));
