$(document).ready(function () {

    /*password*/
    $(document).on('input', '.top__form--field.first', function (event) {
        var value = $(this).val();
        var notice = $(this).next('.checkbox__email-notice');
        if (value.length != 0) {
            notice.hide();
        } else {
            notice.show();
        }
    });
    $(document).on('input', '.top__form--field.second', function (event) {//функция ввода текста в поле "пароль"
        var value = $(this).val();//получаем значение поля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора
        var confirm = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.third');//находим поле для проверки пароля

        if (value.length != 0) {//при заполнении поля пароля
            confirm.attr('disabled', false);//убираем у поля проверки запрет на ввод
        } else {//при пустом поле пароля
            confirm.attr('disabled', true);//добавляем запрет на ввод
            confirm.val('');//задаем полю пустое значение
            confirm.next('.pass-value').hide().removeClass('strong');//прячем блок и убираем у него класс strong
        }

        if (value.length < 8 && value.match(/[a-zA-Z0-9]/)) {//при проверке ввода в поле менне 8 символов с обязательным наличием больших латинских букв и цифр
            $(this).removeClass('valid').addClass('invalid');//полю добавляется класс invalid
        } else {// если услови выполнено
            $(this).removeClass('invalid').addClass('valid');//полю добавляется класс valid
        }
        if ($(this).hasClass('invalid')) {//при наличии у поля класса invalid
            indicator.show().removeClass('strong');//показывается блок индикатора и ему убирается класс strong
            value_label.text('Heslo je středně silné');//заголовку добовляется нужная надпись
        } else if ($(this).hasClass('valid')) {//при наличии у поля класса valid
            indicator.addClass('strong');//показывается блок индикатора и ему добавляется класс strong
            value_label.text('Heslo je silné');//заголовку добовляется нужная надпись
        }
        if (value.length < 1) {//если поле не заполнено
            indicator.hide().removeClass('strong');//блок индикатора скрывается
            value_label.text('Heslo je středně silné');//заголовок ставиться по умолчанию
        }
    });

    $(document).on('input', '.top__form--field.third', function (event) {//функция проверки повтора паролля
        var value = $(this).val();//получаем значение поля
        var main_passw = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.second');//находим поле ранее введеного пароля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора

        if (value == main_passw.val()) {//при совпадении значения обоих полей
            $(this).removeClass('invalid').addClass('valid');//полю проверки добавляется класс valid
        } else {// если услови не выполнено
            $(this).removeClass('valid').addClass('invalid');//полю проверки добавляется класс invalid
        }
        if ($(this).hasClass('invalid')) {//при проверке наличия у поля проверки класса invalid
            indicator.show().removeClass('strong');//показывается индикатор и ему удаляется класс strong
            value_label.text('Heslo neodpovídá');//заголовку добовляется нужная надпись
        } else if ($(this).hasClass('valid')) {//при проверке наличия у поля проверки класса valid
            indicator.addClass('strong');//индикатору добавляется класс strong
            value_label.text('Hesla se shodují');//заголовку добовляется нужная надпись
        }
        if (value.length < 1) {//если поле не заполнено
            indicator.hide().removeClass('strong');//индикатор скрывается и у него убирается класс strong
            value_label.text('Heslo neodpovídá');//заголовок ставиться по умолчанию
        }
    });
    /*close password*/

    $(document).on('click', '.for-checkbox', function (event) {
        var value = $(this).prev('#gdpr');
        if( $(this).hasClass('js-checked') ) {
            $(this).removeClass('js-checked');
            value.removeClass('valid').addClass('invalid');
        } else {
            $(this).addClass('js-checked');
            value.removeClass('invalid').addClass('valid');
            $('.checkbox__notice').hide();
        }
    });

    /*modal*/
    $(document).on('click', '.top__form--label a', function (event) {
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function () {
                $('#gdpr-modal').css('display', 'block').animate({opacity: 1}, 200);
            });
    });
    $(document).on('click', '#gdpr-modal .modal__close, #overlay', function () {
        $('#gdpr-modal').animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    /*close*/

    /*contacts form*/
    $('#main-form-email').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {

            case 'main-form-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('invalid').addClass('valid');
                } else {
                    $(this).removeClass('valid').addClass('invalid');
                }
                break;

        } // end switch(...)

    }); // end blur()

    $('#main-form').submit(function (event) {
        event.preventDefault();
        var mail = $('#main-form-email').val(),
            pass1 = $('#main-form-pass').val(),
            pass2 = $('#main-form-pass2').val();
        if ( $('#gdpr').hasClass('invalid') ) {
            $('.checkbox__notice').show();
        } else {
            $('.checkbox__notice').hide();
        }
        if ( $('#main-form-email').hasClass('invalid') ) {
            $('.checkbox__email-notice').show();
        } else {
            $('.checkbox__email-notice').hide();
        }
        if($('.valid').length == 4){
            $.ajax({
                url: 'send.php',
                type: "POST",
                data: {
                    mail: mail,
                    pass1: pass1,
                    pass2: pass2
                },
                success: function(data){
                    $('#main-form input').val('').removeClass('valid, invalid').text('');
                    // alert(data);
                }
            }); // end ajax({...})
        }
        return false;
    }); // end submit()
    /*close*/

});