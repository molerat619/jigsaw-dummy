$(document).ready(() => {
    $(".company-details-button").on("click", e => {
        e.preventDefault();

        $("#company-details-" + $(e.currentTarget).data("company")).show();
        $(".company-short-profiles").hide();
    });

    $(".close-company-details-button").on("click", e => {
        e.preventDefault();

        $("#company-details-" + $(e.currentTarget).data("company")).hide();
        $(".company-short-profiles").show();
    });
});