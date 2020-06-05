$(document).ready(() => {
    $('#contactForm').on('submit', event => {
        event.stopPropagation();
        event.preventDefault();

        $('#submitButtonLoadingIcon').show();
        $('#submitButton').prop("disabled", true);

        resetErrorIndicators();

        let full_name = $('#full_name').val().trim();
        let email = $('#email').val().trim();
        let message = $('#message').val().trim();
        let privacy = $('#privacy').is(':checked');
        let landing_page = $('#landing_page').val().trim();
        let language = $('#language').val().trim();

        let input = { full_name, email, message, privacy, landing_page, language };

        if (validateForm(input)) {
            $.post('http://localhost/contact-backend/public/api/v1/contact', input)
                .done(response => {
                    $('#contactForm').hide();
                    $('#contactFormContainer .title-block').hide();
                    $('#successContainer').show();
                    $('#submitButton').removeAttr('disabled');
                    $('#submitButtonLoadingIcon').hide();

                    gtag('event', 'generate_lead', {
                        'event_category': 'Kontaktformular',
                        'event_label': landing_page
                    });
                })
                .fail(response => {
                    let errorMessage = '';

                    if (response.status === 422) {
                        let errors = JSON.parse(response.responseText);

                        Object.keys(errors).forEach(function (field) {
                            if (field !== 'privacy') {
                                $('#' + field).addClass('has-danger');
                            } else {
                                $('#privacy').closest('.form-check').addClass('has-danger');
                            }

                            errors[field].forEach(function (message) {
                                errorMessage += '<li>' + message + '</li>';
                            });
                        });

                        $('#errorsList').html(errorMessage);
                    } else {
                        $('#generalError').show();
                    }

                    $('#errorContainer').show();
                    $('#feedbackContainer').show();
                    $('#submitButton').prop("disabled", false);
                    $('#submitButtonLoadingIcon').hide();
                });
        } else {
            $('#submitButtonLoadingIcon').hide();
            $('#submitButton').prop("disabled", false);
        }
    });
});

/**
 * Validates contact form input and changes background color if input is not valid.
 * @returns bool
 */
let validateForm = function (input) {
    let error = false;

    // Name
    if (!input.full_name || input.full_name === '') {
        error = true;
        $('#full_name').addClass('has-danger');
    }

    // Email
    if (!input.email || input.email === '') {
        error = true;
        $('#email').addClass('has-danger');
    }

    // Message
    if (!input.message || input.message === '') {
        error = true;
        $('#message').addClass('has-danger');
    }

    // Privacy
    if (!input.privacy) {
        error = true;
        $('#privacy').closest('.form-check').addClass('has-danger');
    }

    return !error;
};

let resetErrorIndicators = function () {
    $('#feedbackContainer').hide();
    $('#errorContainer').hide();
    $('#generalError').hide();
    $('#errorsList').html('');

    $('#full_name').removeClass('has-danger');
    $('#email').removeClass('has-danger');
    $('#message').removeClass('has-danger');
    $('#privacy').closest('.form-check').removeClass('has-danger');
};