/*********************************************
 *    Developer: https://t.me/saninhyuga     *
 *    WebSite: Evicted SoftWare              *
 *    Version: v0.6                          *
 ********************************************/

$(function () {

    /*==========================
          BASIC VARIABLES
    ==========================*/

    let patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    /*==========================
          BASIC FUNCTIONS
    ==========================*/

    $(function () {
        $("a[href^='#']").click(function () {
            var _href = $(this).attr("href");
            $("html, body").animate({
                scrollTop: $(_href).offset().top + "px"
            }, 1000);
            return false;
        });
    });

    $('.mobile-menu').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.mobile-navbar').toggleClass('show');
        $('body').toggleClass('no-scroll');
    });

    function stopInterval(timer) {
        clearInterval(timer);
    }

    function checkEmail(email) {
        if (email.length > 0 && email.search(patternEmail) == 0) {
            return true;
        } else {
            showNotification('Некорректный E-mail');
            return false;
        }
    }

    $('a[href=""]').click(function () {
        return false;
    });

    let productHoverHideTime = 0,
        timerProductHideTime;

    $('#products .products').on('mouseenter', '.product-wrapper .product', function () {
        if ($(this).closest('#products').hasClass('cheats-status') || $(this).hasClass('non-cheats'))
            return false;

        productHoverHideTime = 1;
        let el = $(this);

        timerProductHideTime = setTimeout(function () {
            if (productHoverHideTime == 1) {
                $('#products .products .product-wrapper .product').each(function () {
                    if (!$(this).hasClass('non-cheats'))
                        $(this).addClass('hide-time');
                });
                el.removeClass('hide-time');
            }
        }, 500);
    });

    $('#products .products').on('mouseleave', '.product-wrapper .product', function () {
        productHoverHideTime = 0;
        stopInterval(timerProductHideTime);
        $('#products .products .product-wrapper .product').removeClass('hide-time');
    });

    $('#product .system-recom-block .filter-info .fil-s').click(function () {
        $('#product .system-recom-block .filter-info .fil-s').removeClass('active');
        $(this).addClass('active');
        $('#product .system-recom-block .content-block').removeClass('active');
        $('#product .system-recom-block .content-block[data-id="' + $(this).data('id') + '"]').addClass('active');
    });

    /*==========================
          CAROUSEL PRODUCT
    ==========================*/

    $('#header-wrapper .carousel .box:first-child').addClass('active');
    $('#header-wrapper .content .title .cheat-name').text($('#header-wrapper .ui-cards .box:first-child').data('cheat-name'));
    $('#header-wrapper .content .title .for-game span').text($('#header-wrapper .ui-cards .box:first-child').data('game-name'));
    $('#header-wrapper .content .title .description').text($('#header-wrapper .ui-cards .box:first-child').data('description'));
    $('#header-wrapper .content .title .price span').text($('#header-wrapper .ui-cards .box:first-child').data('price-dollar') + '$');

    if ($.cookie('lang') != null) {
        if ($.cookie('lang') == 'ru')
            $('#header-wrapper .content .title .price span').text($('#header-wrapper .ui-cards .box:first-child').data('price-ruble') + '₽');
    }

    $('#header-wrapper .content .btn-new-style.go-buy').attr('href', $('#header-wrapper .ui-cards .box:first-child').data('link'));

    $('#header-wrapper .ui-cards').on('click', '.slick-next, .slick-prev', function () {
        let cheatName = $('#header-wrapper .ui-cards .slick-active').data('cheat-name'),
            gameName = $('#header-wrapper .ui-cards .slick-active').data('game-name'),
            description = $('#header-wrapper .ui-cards .slick-active').data('description'),
            priceRuble = $('#header-wrapper .ui-cards .slick-active').data('price-ruble'),
            priceDollar = $('#header-wrapper .ui-cards .slick-active').data('price-dollar'),
            link = $('#header-wrapper .ui-cards .slick-active').data('link');

        $('#header-wrapper .content .title .cheat-name').text(cheatName);
        $('#header-wrapper .content .title .for-game span').text(gameName);
        $('#header-wrapper .content .title .description').text(description);
        $('#header-wrapper .content .title .price span').text(priceDollar + '$');

        if ($.cookie('lang') != null) {
            if ($.cookie('lang') == 'ru')
                $('#header-wrapper .content .title .price span').text(priceRuble + '₽');
        }

        $('#header-wrapper .content .btn-new-style.go-buy').attr('href', link);
    });

    $('#header-wrapper .ui-cards').on('click', '.box', function () {
        document.location.href = $(this).data('link');
    });

    $('#product .main-info .left-block .carousel .screens .item[data-id="0"]').addClass('active');
    $('#product .main-info .left-block .carousel .main-screen img').attr('src', $('#product .main-info .left-block .carousel .screens .item[data-id="0"] img').attr('src'));

    if ($('#product .main-info .left-block .carousel .screens .item[data-id="0"]').find('img').length > 0) {
        $('#product .main-info .left-block .carousel .main-screen img').attr('src', $('#product .main-info .left-block .carousel .screens .item[data-id="0"] img').attr('src'));
    } else {
        $('#product .main-info .left-block .carousel .main-screen img').hide();
        $('#product .main-info .left-block .carousel .main-screen iframe').show();
        $('#product .main-info .left-block .carousel .main-screen iframe').attr('src', $(this).find('.video-figure').data('src'));
    }
    $('#product .main-info .left-block .carousel .screens .item[data-id="0"]').addClass('active');

    let carouselProductPageTimer = null,
        timerProductPageOff = 0,
        hovCarouseloff = 0,
        countScreens = $('#product .main-info .left-block .carousel .screens .item').length;

    carouselProductPage('#product .main-info .left-block .carousel .screens .item.active');

    function carouselProductPage(el) {
        $(el).addClass('active');

        let widthNow = $('#product .main-info .left-block .carousel .main-screen span').width(),
            id = $(el).data('id'),
            block = '#product .main-info .left-block .carousel .main-screen';

        if (countScreens > 1) {
            carouselProductPageTimer = setInterval(function () {
                if (timerProductPageOff == 0) {
                    widthNow++;
                    widthNow = widthNow - 0.2;
                    $(block + ' span').css("width", widthNow + "%");

                    if ($(block + ' span').width() > 435) {

                        widthNow = $(block + ' span').css("width", "0%");

                        $('#product .main-info .left-block .carousel .screens .item[data-id="' + id + '"]').removeClass('active');

                        id++;
                        widthNow = $(block + ' span').width();

                        $(block + ' img').hide();
                        $(block + ' iframe').hide();

                        if ($('#product .main-info .left-block .carousel .screens .item[data-id="' + id + '"]').length == 0) {
                            id = 0;
                            widthNow = $(block + ' span').width();
                            $('#product .main-info .left-block .carousel .screens .item[data-id="0"]').addClass('active');
                            $(block + ' img').attr('src', $('#product .main-info .left-block .carousel .screens .item[data-id="0"] img').attr('src'));
                            $('#product .main-info .left-block .carousel .main-screen .count b').text('1');
                        }



                        $('#product .main-info .left-block .carousel .screens .item[data-id="' + id + '"]').addClass('active');
                        if ($('#product .main-info .left-block .carousel .screens .item.active').find('.video-figure').length == 0) {
                            $(block + ' img').show();
                            $(block + ' img').attr('src', $('#product .main-info .left-block .carousel .screens .item.active img').attr('src'));
                        } else {
                            stopInterval(carouselProductPageTimer);
                            $(block + ' iframe').show();
                            $(block + ' iframe').attr('src', $('#product .main-info .left-block .carousel .screens .item.active .video-figure').data('src'));
                        }

                        $('#product .main-info .left-block .carousel .main-screen .count b').text(id + 1);
                    }
                }
            }, 50);
        }
    }

    $('#product .main-info .left-block .carousel .screens .item').click(function () {
        stopInterval(carouselProductPageTimer);
        $('#product .main-info .left-block .carousel .screens .item').removeClass('active');
        $('#product .main-info .left-block .carousel .main-screen span').css('width', "0%");
        $('#product .main-info .left-block .carousel .main-screen .count b').text($(this).data('id') + 1);

        $('#product .main-info .left-block .carousel .main-screen iframe').hide();
        $('#product .main-info .left-block .carousel .main-screen img').hide();

        if ($(this).find('.video-figure').length == 0) {
            $('#product .main-info .left-block .carousel .main-screen img').attr('src', $(this).find('img').attr('src'));
            $('#product .main-info .left-block .carousel .main-screen img').show();
            carouselProductPage('#product .main-info .left-block .carousel .screens .item[data-id="' + $(this).data('id') + '"]');
        } else {
            $('#product .main-info .left-block .carousel .main-screen iframe').attr('src', $(this).find('.video-figure').data('src'));
            $('#product .main-info .left-block .carousel .main-screen iframe').show();
            $(this).addClass('active');
        }
    });

    $('#product .main-info .left-block .carousel .main-screen').click(function () {
        stopInterval(carouselProductPageTimer);
        $('#product .main-info .left-block .carousel .main-screen span').css('width', "0%");
        $('#product .main-info .left-block .carousel .preview').addClass('show');
        $('#product .main-info .left-block .carousel .preview img').attr('src', $('#product .main-info .left-block .carousel .main-screen img').attr('src'));
        $('header').addClass('show-preview');
        headerBackColorInt = 1;
        $('footer').css('z-index', '-1');
        $('#product .main-info .left-block .carousel .preview').show();
    });

    $('#product .main-info .left-block .carousel .preview').hide();

    $('#product .main-info .left-block .carousel .preview').click(function () {
        if (hovCarouseloff == 0) {
            $('#product .main-info .left-block .carousel .preview').removeClass('show');
            carouselProductPage('#product .main-info .left-block .carousel .screens .item.active');
            $('header').removeClass('show-preview');
            $('footer').css('z-index', '12');
            headerBackColorInt = 0;
            $('#product .main-info .left-block .carousel .preview').hide();
        }
    });

    $('#product .main-info .left-block .carousel .preview .close').click(function () {
        $('#product .main-info .left-block .carousel .preview').removeClass('show');
        carouselProductPage('#product .main-info .left-block .carousel .screens .item.active');
        $('header').removeClass('show-preview');
        $('footer').css('z-index', '12');
        headerBackColorInt = 0;
    });

    $("#product .main-info .left-block .carousel .main-screen").hover(function () {
        timerProductPageOff = 1;
    }, function () {
        timerProductPageOff = 0;
    });

    $("#product .main-info .left-block .carousel .preview .container").hover(function () {
        hovCarouseloff = 1;
    }, function () {
        hovCarouseloff = 0;
    });

    /*==========================
        SORT GAMES MAIN PAGE
    ==========================*/

    $('#products .sort-games .sort-by-games-filters .list .sort').click(function () {
        let selectedSort = $('#products .sort-games .sort-by-cheats .list .sort.active').data('filter'),
            selectedStatus = $(this).data('sort');

        $('#products .sort-games .sort-by-games-filters .list .sort').removeClass('active');
        $(this).addClass('active');

        if (selectedStatus == 'popular') {
            $('#products .products .product-wrapper[data-popular="*"]').each(function () {
                $(this).closest('.product-wrapper').remove().appendTo('#products .products');
            });
        } else {
            $('#products .products .product-wrapper[data-popular="popular"]').each(function () {
                $(this).closest('.product-wrapper').remove().appendTo('#products .products');
            });
        }

        $('#products .products .product-wrapper .product.non-cheats').each(function () {
            $(this).closest('.product-wrapper').remove().appendTo('#products .products');
        });
    });

    /*==========================
        CHANGE PRICE PRODUCT
    ==========================*/

    $('#product .main-info .right-block .select .select-sub .sel').click(function () {
        $('#product .main-info .right-block .select .select-sub .sel').removeClass('active');
        $(this).addClass('active');

        $('#product .main-info .right-block .go-buy a.btn').attr('href', $(this).data('link'));
        $('#product .main-info .right-block .go-buy a.btn').data('price-id', $(this).data('id'));

        $('#product .main-info .right-block .go-buy .price span').text($(this).find('.change-price-mb-dollar').data('ruble') + '₽');
        
        if ($.cookie('lang') != null) {
            if ($.cookie('lang') == 'en') {
                $('#product .main-info .right-block .go-buy .price span').text($(this).find('.change-price-mb-dollar').data('dollar') + '$');
            }
        }
    });

    $('#product .main-info .right-block .select .select-sub .sel-wrapper:first-child .sel').addClass('active');
    $('#product .main-info .right-block .go-buy a.btn').attr('href', $('#product .main-info .right-block .select .select-sub .sel:first-child').data('link'));

    $('#product .main-info .right-block .go-buy .price span').text($('#product .main-info .right-block .select .select-sub .sel.active .change-price-mb-dollar').data('ruble') + '₽');

    if ($.cookie('lang') != null) {
        if ($.cookie('lang') == 'en') {
            $('#product .main-info .right-block .go-buy .price span').text($('#product .main-info .right-block .select .select-sub .sel.active .change-price-mb-dollar').data('dollar') + '$');
        }
    }

    $('#product .content .main-info .right-block .go-buy .report .btn.go-ticket-go').click(function () {
        window.location.href = '/tickets';
    });

    $('#product .content .main-info .right-block .go-buy .btn.goih').click(function () {
        if ($('.modal-wrapper .select-buy').length > 0) {
            $('.modal-wrapper .select-buy .right-block .btn').attr('href', $(this).attr('href'));
            showModal('.select-buy');
        } else {
            window.open($(this).attr('href'));
        }
    });

    $('.modal-wrapper .select-buy .right-block .btn').click(function () {
        window.open($(this).attr('href'));
    });

    /*==========================
           MODAL WINDOW
    ==========================*/

    let hovModaloff = 0;

    function showModal(el) {
        $('.modal-wrapper').addClass('show');
        $('.modal-wrapper ' + el).addClass('show');
        $('header').addClass('show-preview');
        headerBackColorInt = 1;
    }

    function closeModal() {
        if (!$('.modal-wrapper').hasClass('not-close')) {
            $('.modal-wrapper').removeClass('show');
            $('.modal-wrapper .modal').removeClass('show');
            $('.modal-wrapper .modal.tickets-views .ticket-view').removeClass('show');
            $('header').removeClass('show-preview');
            headerBackColorInt = 0;
        }
    }

    $('.modal-wrapper').click(function () {
        if (hovModaloff == 0) {
            closeModal();
        }
    });

    $('.modal-wrapper .close').click(function () {
        closeModal();
    });

    $(".modal-wrapper .modal").hover(function () {
        hovModaloff = 1;
    }, function () {
        hovModaloff = 0;
    });

    /*==========================
           NOTIFICATION
    ==========================*/

    function showNotification(msg) {
        if ($('body .notification-wrapper-note').length > 0)
            return false;

        let note = '<div class="notification-wrapper-note"><i class="fa-solid fa-triangle-exclamation"></i>' + msg + '</div>';
        $('body').append(note);

        setTimeout(function () {
            $('body .notification-wrapper-note').addClass('show');
        }, 100);

        hideNotification();
    }

    function hideNotification() {
        setTimeout(function () {
            $('body .notification-wrapper-note').removeClass('show');
        }, 2000);

        setTimeout(function () {
            $('body .notification-wrapper-note').remove();
        }, 2500);
    }

    /*==========================
        RELINK GAME-PRODUCT
    ==========================*/

    $('#products .products .product-wrapper[data-popular="*"]').each(function () {
        $(this).closest('.product-wrapper').remove().appendTo('#products .products');
    });

    $('#products .products .product-wrapper .product.non-cheats').each(function () {
        $(this).closest('.product-wrapper').remove().appendTo('#products .products');
    });

    let hovSpanCheatoff = 0,
        hovSpanCheatLink = null;

    $('#products').on('click', '.product', function () {
        if (!$('#products').hasClass('cheats')) {
            if (hovSpanCheatoff == 1) {
                document.location.href = hovSpanCheatLink;
                return false;
            }
        }
    });

    $('#products .product .cheats span.cheat').hover(function () {
        hovSpanCheatoff = 1;
        hovSpanCheatLink = $(this).attr('href');
    }, function () {
        hovSpanCheatoff = 0;
    });

    /*==========================
            SEARCH GAME
    ==========================*/

    $('#products .search-block .search input').keyup(function () {
        let searchVal = $(this).val();

        if (searchVal != '') {
            $('#products .products .product-wrapper').hide();
            $('#products .products .product-wrapper[data-filter*="' + searchVal.toLowerCase() + '"]').show();

            $('#products .sort-games .sort-by-cheats .list .sort').removeClass('active');
            $('#products .sort-games .sort-by-cheats .list .sort[data-filter="*"]').addClass('active');
            $('#products .sort-games .sort-by-games-filters .list .sort').removeClass('active');
            $('#products .sort-games .sort-by-games-filters .list .sort[data-sort="popular"]').addClass('active');
        } else {
            $('#products .products .product-wrapper').show();
        }
    });

    /*==========================
            SEND REVIEW
    ==========================*/

    $('#product .info-page .reviews .go-send').click(function () {
        showModal('.send-review');
    });

    let rateForReview = 0;

    $('.modal-wrapper .modal.send-review .go-send .rate p').click(function () {
        let block = '.modal-wrapper .modal.send-review .go-send .rate p';
        $(block).removeClass('active');

        switch ($(this).data('id')) {
            case 0:
                $(block + '[data-id="0"]').addClass('active');
                $('.modal-wrapper .modal.send-review .go-send .btn').data('rate', '1');
                break;
            case 1:
                $(block + '[data-id="0"], ' + block + '[data-id="1"]').addClass('active');
                $('.modal-wrapper .modal.send-review .go-send .btn').data('rate', '2');
                break;
            case 2:
                $(block + '[data-id="0"], ' + block + '[data-id="1"], ' + block + '[data-id="2"]').addClass('active');
                $('.modal-wrapper .modal.send-review .go-send .btn').data('rate', '3');
                break;
            case 3:
                $(block + '[data-id="0"], ' + block + '[data-id="1"], ' + block + '[data-id="2"], ' + block + '[data-id="3"]').addClass('active');
                $('.modal-wrapper .modal.send-review .go-send .btn').data('rate', '4');
                break;
            case 4:
                $(block + '[data-id="0"], ' + block + '[data-id="1"], ' + block + '[data-id="2"], ' + block + '[data-id="3"], ' + block + '[data-id="4"]').addClass('active');
                $('.modal-wrapper .modal.send-review .go-send .btn').data('rate', '5');
                break;
        }
    });

    let existReview = false;

    $('.modal-wrapper .modal.send-review .go-send .btn').click(function () {
        let name = $('.modal-wrapper .modal.send-review .input.nickname input').val(),
            email = $('.modal-wrapper .modal.send-review .input.email input').val(),
            text = $('.modal-wrapper .modal.send-review textarea').val(),
            rate = $(this).data('rate'),
            cheat_id = $(this).data('cheat-id'),
            error = null;

        if ($('.modal-wrapper .modal.send-review .go-send .rate p.active').length == 0)
            error = 'Оцените продукт';
        if (text.length == 0)
            error = 'Напишите своё мнение о продукте';
        else
        if (name.length > 15)
            error = 'Поле "Ваше мнение" не более 150 символов';
        if (email.length == 0)
            error = 'Напишите свою эл. почту';
        if (name.length < 4)
            error = 'Напишите своё имя';
        else
        if (name.length > 15)
            error = 'Поле "Ваше имя" не более 15 символов';

        if (error == null) {
            if (checkEmail(email)) {
                checkExistReviewSend(cheat_id, email);
                if (existReview) {
                    closeModal();
                    sendCodeVerification(email, 3, 0, 0);
                    $('.modal-wrapper .modal.accept-email input.custom').data('cheat-id', cheat_id);
                    $('.modal-wrapper .modal.accept-email input.custom').data('name', name);
                    $('.modal-wrapper .modal.accept-email input.custom').data('email', email);
                    $('.modal-wrapper .modal.accept-email input.custom').data('text', text);
                    $('.modal-wrapper .modal.accept-email input.custom').data('rate', rate);
                    $('.modal-wrapper .modal.accept-email input.custom').data('page', 2);
                } else {
                    showNotification('Вы уже оставили отзыв для этого товара');
                }
            } else {
                error = 'Некорректная почта';
            }
        } else {
            showNotification(error);
        }
    });

    function checkExistReviewSend(cheat_id, email) {
        $.ajax({
            url: '/functions/checkExistReview',
            async: false,
            method: 'POST',
            dataType: 'JSON',
            data: {
                cheat_id: cheat_id,
                email: email
            },
            success: (function (data) {
                existReview = data.error;
            })
        })
    }

    /*==========================
              TICKETS
    ==========================*/

    $('#tickets .content.select .block .btn').click(function () {
        let email = $(this).closest('.block').find('input').val();

        if (checkEmail(email)) {
            if ($(this).closest('.block').hasClass('create-new')) {
                showModal('.tickets-create-new');
                $('.modal-wrapper .modal.tickets-create-new .btn.go-create').data('email', email);
            } else {
                sendCodeVerification(email, 1, 0, 0);
            }
        }
    });

    let files_createTicket,
        allowedExtension = ['jpeg', 'jpg', 'png', 'bmp'];

    $('#createTicketFilego').on('change', function () {
        let hasInvalidFiles = false;

        files_createTicket = this.files;

        if ($.inArray($(this).val().split('.').pop().toLowerCase(), allowedExtension) == -1) {
            hasInvalidFiles = true;
        }

        if (hasInvalidFiles) {
            $(this).val('');
            $('.modal-wrapper .modal.tickets-create-new p.uploaded_img').remove();
            showNotification('Неподдерживаемый формат изобр.');
            return false;
        }

        $('.modal-wrapper .modal.tickets-create-new p.uploaded_img').remove();
        $('.modal-wrapper .modal.tickets-create-new .select-img').after('<p class="uploaded_img">' + files_createTicket[0].name + '</p>');
    });

    $('.modal-wrapper .modal.tickets-create-new .select-img').click(function () {
        $('#createTicketFilego')[0].click();
    });

    $('.modal-wrapper .modal.tickets-create-new .btn.go-create').click(function () {
        let email = $(this).data('email'),
            title = $('.modal-wrapper .modal.tickets-create-new input.title').val(),
            msg = $('.modal-wrapper .modal.tickets-create-new textarea').val();

        var fd = new FormData();

        fd.append('email', email);

        if (typeof files_createTicket != 'undefined') {
            $.each(files_createTicket, function (key, value) {
                fd.append(key, value);
            });

            fd.append('file_upload', 1);
        } else {
            fd.append('file_upload', null);
        }

        if (title.length > 0) {
            fd.append('title', title);
        } else {
            showNotification('Заполните поле "Тема обращения"');
            return;
        }

        if (msg.length > 0) {
            fd.append('msg', msg);
        } else {
            showNotification('Заполните поле "Текст обращения..."');
            return;
        }

        $.ajax({
            url: '/functions/createTicket',
            method: 'POST',
            dataType: 'JSON',
            cache: false,
            processData: false,
            contentType: false,
            data: fd,
            success: (function (data) {
                if (data.error == 'none')
                    window.location.reload();
                else
                    showNotification(data.error);
            })
        })
    });

    $('#tickets .content.show-tickets table tbody td a').click(function () {
        showModal('.tickets-views');
        showModal('.tickets-views .ticket-view[data-id="' + $(this).data('id') + '"]');
        let chat = '.modal-wrapper .modal.tickets-views .ticket-view[data-id="' + $(this).data('id') + '"] .chat';
        $(chat).animate({
            scrollTop: $(chat).prop("scrollHeight")
        }, 1000);
    });

    $('#tickets .content.show-tickets table tbody td .btn.accept-ticket-email').click(function () {
        let email = $(this).data('email'),
            ticket_id = $(this).data('id');

        $('.modal-wrapper .modal.accept-email .description').html('На ваш электронный адрес <span></span> был отправлен код подтверждения для активации обращения.');

        sendCodeVerification(email, 0, ticket_id, 1);
    });

    let files_sendMsgTicket;

    $('#sendMsgTicketFilego').on('change', function () {
        let hasInvalidFiles = false;

        files_sendMsgTicket = this.files;

        if ($.inArray($(this).val().split('.').pop().toLowerCase(), allowedExtension) == -1) {
            hasInvalidFiles = true;
        }

        if (hasInvalidFiles) {
            $(this).val('');
            $('.modal-wrapper .modal.tickets-views .ticket-view p.uploaded_img').remove();
            showNotification('Неподдерживаемый формат изобр.');
            return false;
        }

        $('.modal-wrapper .modal.tickets-views .ticket-view p.uploaded_img').remove();
        $('.modal-wrapper .modal.tickets-views .ticket-view .select-img').after('<p class="uploaded_img">' + files_sendMsgTicket[0].name + '</p>');
    });

    $('.modal-wrapper .modal.tickets-views .ticket-view .select-img').click(function () {
        $('#sendMsgTicketFilego')[0].click();
    });

    $('.modal-wrapper .modal.tickets-views .ticket-view .go-send').click(function () {
        let ticket_id = $(this).data('id'),
            msg = $(this).closest('.ticket-view').find('textarea').val();

        var fd = new FormData();

        fd.append('ticket_id', ticket_id);

        if (typeof files_sendMsgTicket != 'undefined') {
            $.each(files_sendMsgTicket, function (key, value) {
                fd.append(key, value);
            });

            fd.append('file_upload', 1);
        } else {
            fd.append('file_upload', null);
        }

        if (msg.length > 0) {
            fd.append('msg', msg);
        } else {
            showNotification('Введите сообщение');
            return;
        }

        $.ajax({
            url: '/functions/sendMsgTicket',
            method: 'POST',
            dataType: 'JSON',
            cache: false,
            processData: false,
            contentType: false,
            data: fd,
            success: (function (data) {
                if (data.error == 'none')
                    window.location.reload();
                else
                    showNotification(data.error);
            })
        })
    });

    $('.modal-wrapper .modal.accept-email input.custom').keyup(function () {
        let email = $(this).data('email'),
            ticket_id = $(this).data('id'),
            type = $(this).data('type'),
            page = $(this).data('page'),
            code = $(this).val();

        if (code.length > 4) {
            checkCodeVerification(code, email, ticket_id, type, page);
        }
    });

    function sendCodeVerification(email, page, ticket_id, type) {
        $.ajax({
            url: '/functions/sendCodeVerification',
            method: 'POST',
            dataType: 'JSON',
            data: {
                email: email,
                page: page
            },
            success: (function (data) {
                if (data.error == 'none') {
                    showModal('.accept-email');
                    $('.modal-wrapper').addClass('not-close');

                    $('.modal-wrapper .modal.accept-email .description span').text(email);

                    $('.modal-wrapper .modal.accept-email input.custom').data('email', email);
                    $('.modal-wrapper .modal.accept-email input.custom').data('id', ticket_id);
                    $('.modal-wrapper .modal.accept-email input.custom').data('type', type);
                } else {
                    showNotification(data.error);
                }
            })
        })
    }

    function checkCodeVerification(code, email, ticket_id, type, page) {
        if (page != 2) {
            $.ajax({
                url: '/functions/checkCodeVerification',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    code: code,
                    email: email,
                    ticket_id: ticket_id,
                    type: type,
                    page: page
                },
                success: (function (data) {
                    if (data.error == 'none')
                        window.location.reload();
                    else
                        showNotification(data.error);
                })
            })
        } else {
            let cheat_id = $('.modal-wrapper .modal.accept-email input.custom').data('cheat-id'),
                name = $('.modal-wrapper .modal.accept-email input.custom').data('name'),
                email = $('.modal-wrapper .modal.accept-email input.custom').data('email'),
                text = $('.modal-wrapper .modal.accept-email input.custom').data('text'),
                rate = $('.modal-wrapper .modal.accept-email input.custom').data('rate'),
                data_review = [];

            data_review.push(cheat_id, name, email, text, rate);

            $.ajax({
                url: '/functions/checkCodeVerification',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    code: code,
                    email: email,
                    ticket_id: ticket_id,
                    type: type,
                    page: 2,
                    data_review: data_review
                },
                success: (function (data) {
                    if (data.error == 'none')
                        window.location.reload();
                    else
                        showNotification(data.error);
                })
            })
        }
    }

    $('#product .content .main-info .functions .func-name[data-id="1"]').addClass('active');
    $('#product .content .main-info .functions .desc[data-id="1"]').addClass('active');
    $('#product .content .main-info .functions .desc[data-id="1"]').show();

    $('#product .content .main-info .functions .func-name').click(function () {
        $('#product .content .main-info .functions .desc[data-id="' + $(this).data('id') + '"]').hide();

        if (!$(this).hasClass('active')) {
            $('#product .content .main-info .functions .desc[data-id="' + $(this).data('id') + '"]').show();
        }

        $(this).toggleClass('active');
        $('#product .content .main-info .functions .desc[data-id="' + $(this).data('id') + '"]').toggleClass('active');
    });
});

function sliderMain(data) {
   const len = data.length
   let i = 0;

   const content = document.querySelector('.header__slider .content')
   const headerWrap = document.querySelector('#header-wrapper');
   
   if (!len) {
      document.querySelector('#products').style.paddingTop = 90+'px';
      headerWrap.remove()
      return;
   }

   const bg = document.querySelector('.header__slider .bg-game-img img')
   const glitch = document.querySelector('.header__slider .bg-game-name .glitch span')
   const name = document.querySelector('.header__slider .cheat-name')
   const forGame = document.querySelector('.header__slider .for-game span')
   const description = document.querySelector('.header__slider .description')
   const price = document.querySelector('.header__slider .price')
   const link = document.querySelector('.header__slider .slider-link')

   headerWrap.classList.add('fade')
   content.classList.add('fade')

   bg.src = `/img/cheats/bg/${data[i].bg}`
            glitch.textContent = data[i].name
            name.textContent = data[i].name
            forGame.textContent = data[i].game_name
            description.textContent = data[i].description

            price.dataset.dollar  = data[i].price_dollar
            price.dataset.ruble = data[i].price
            
            link.href = `/product/${data[i].game_name.split(' ').join('').trim().toLowerCase()}/${data[i].name.split(' ').join('').trim().toLowerCase()}`

      setTimeout(() => {
         headerWrap.classList.remove('fade')
         content.classList.remove('fade')
      }, 4600)

      i++

      setInterval(() => {
         if (price.classList.contains('dollar')) {
            price.textContent = price.dataset.dollar + '$'
         } else {
            price.textContent = price.dataset.ruble + '₽'
         }
      }, 200)

   setInterval(() => {
      setTimeout(() => {
         headerWrap.classList.add('fade')
         content.classList.add('fade')
      }, 400)
      bg.src = `/img/cheats/bg/${data[i].bg}`
            glitch.textContent = data[i].name
            name.textContent = data[i].name
            forGame.textContent = data[i].game_name
            description.textContent = data[i].description

            price.dataset.dollar  = data[i].price_dollar
            price.dataset.ruble = data[i].price

            link.href = `/product/${data[i].game_name.split(' ').join('').trim().toLowerCase()}/${data[i].name.split(' ').join('').trim().toLowerCase()}`
            if (i === len - 1) {
               i = 0;
            } else {
               i++
      }

      setTimeout(() => {
         headerWrap.classList.remove('fade')
         content.classList.remove('fade')
      }, 4600)
      
   }, 5000)
}
