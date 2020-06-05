import cookieconsent from './cookies';

$(document).ready(() => {
    navbarScrolling();

    // Navbar Scroll 
    $(window).on("scroll", navbarScrolling);

    // Navbar Dropdowns
    $(".dropdown").on("mouseover", function () {
        $(".dropdown-menu", this).stop(true, true).fadeIn("fast"), $(this).addClass("open");
    });
    $(".dropdown").on("mouseleave", function () {
        $(".dropdown-menu", this).stop(true, true).fadeOut("fast"), $(this).removeClass("open");
    });

    // Responsive navbar dropdown
    $(".menu-close-btn").on("click", function () {
        $(".navbar-collapse").removeClass("show");
    });

    $(".navbar-toggler").on("click", function (s) {
        $('.navbar-collapse').addClass("show");
    });

    // Back to top button
    $(".back_top").on("click", function () {
        return $("html, body").animate({
            scrollTop: 0
        }, 1000, false);
    });

    $(".scroll-next").on("click", function (e) {
        e.preventDefault();

        document.querySelector("#" + $(this).data('target')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Cookie Consent
    cookieconsent.run({
        notice_banner_type: "simple",
        consent_type: "express",
        palette: "light",
        language: language,
        change_preferences_selector: ".cookie-settings-button",
        cookies_policy_url: baseUrl + "/" + language + "/" + "datenschutz/#cookies",
        website_name: websiteName
    });
});

var navbarScrolling = function () {
    var s = $(window).scrollTop();
    s >= 80 ? $("nav").addClass("sticky-header") : $(".sticky").removeClass("sticky-header"), s > 100 ? $(".back_top").fadeIn() : $(".back_top").fadeOut();
};