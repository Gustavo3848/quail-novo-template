(function ($) {
    $(document).ready(function () {
        $('#cssmenu ul ul li:odd').addClass('odd');
        $('#cssmenu ul ul li:even').addClass('even');
        $('#cssmenu > ul > li > a').click(function () {
            $('#cssmenu li').removeClass('active');
            $(this).closest('li').addClass('active');
            var checkElement = $(this).next();
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                $(this).closest('li').removeClass('active');
                checkElement.slideUp('normal');
            }
            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#cssmenu ul ul:visible').slideUp('normal');
                checkElement.slideDown('normal');
            }
            if ($(this).closest('li').find('ul').children().length == 0) {
                return true;
            } else {
                return false;
            }
        });
        $('#slideshow').desoSlide({
            thumbs: $('ul.slideshow_thumbs li > a'),
            effect: {
                provider: 'animate',
                name: 'fade'
            }

        });

        $(function () {
            $("#rateYo").rateYo({
                rating: 3.6,
                starWidth: "16px"
            });
        });
        $('#cep').mask('00000-000');
        $('.phone').mask('0000-0000');
        $(".dropdown-login-menu").on(
            function () {
                $('.item-dropdown-login').finish().slideDown('fast');
            },
            function () {
                $('.item-dropdown-login').finish().slideUp('fast');
            }
        );
        

    });
})(jQuery);