$(document).ready(function() {
    if ($('.main-slider').length === 0 || $('.nav-slider').length === 0) {
        return;
    }

    var mainSlider = $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.nav-slider',
        infinite: true,
        speed: 300
    });

    var isMobile = $(window).width() <= 375;
    var navSlider = $('.nav-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.main-slider',
        dots: false,
        arrows: true,
        centerMode: false,
        focusOnSelect: true,
        infinite: false,
        speed: 0,
        variableWidth: false,
        swipe: false,
        touchMove: false,
        prevArrow: '<button type="button" class="slick-prev-nav" aria-label="Previous"></button>',
        nextArrow: '<button type="button" class="slick-next-nav" aria-label="Next"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    arrows: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    swipe: true,
                    touchMove: true
                }
            }
        ]
    });

    setTimeout(function() {
        $('.main-slider, .nav-slider').css({
            'visibility': 'visible',
            'opacity': '1'
        });
        
        var prevBtn = $('.nav-slider-wrapper .slick-prev-nav');
        var nextBtn = $('.nav-slider-wrapper .slick-next-nav');
        
        var staticPath = window.location.origin + '/static/';
        
        if (prevBtn.length === 0) {
            $('.nav-slider-wrapper').prepend('<button type="button" class="slick-prev-nav" aria-label="Previous"></button>');
            prevBtn = $('.nav-slider-wrapper .slick-prev-nav');
        }
        if (nextBtn.length === 0) {
            $('.nav-slider-wrapper').append('<button type="button" class="slick-next-nav" aria-label="Next"></button>');
            nextBtn = $('.nav-slider-wrapper .slick-next-nav');
        }
        
        if (prevBtn.find('img').length === 0) {
            prevBtn.html('<img src="' + staticPath + 'icons/move-left.svg" alt="Previous">');
        }
        if (nextBtn.find('img').length === 0) {
            var nextImg = $('<img src="' + staticPath + 'icons/move-left.svg" alt="Next">');
            nextImg.css('transform', 'rotate(180deg)');
            nextBtn.html(nextImg);
        }
        
        $('.nav-slider-wrapper').off('click', '.slick-prev-nav, .slick-next-nav');
        
        $('.nav-slider-wrapper').on('click', '.slick-prev-nav', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var mainSlider = $('.main-slider');
            var navSlider = $('.nav-slider');
            
            if (mainSlider.hasClass('slick-initialized')) {
                var currentSlide = mainSlider.slick('slickCurrentSlide');
                var totalSlides = mainSlider.slick('getSlick').slideCount;
                mainSlider.slick('slickPrev');
                setTimeout(function() {
                    var newSlide = mainSlider.slick('slickCurrentSlide');
                }, 100);
            } else if (navSlider.hasClass('slick-initialized')) {
                var currentSlide = navSlider.slick('slickCurrentSlide');
                var totalSlides = navSlider.slick('getSlick').slideCount;
                navSlider.slick('slickPrev');
                setTimeout(function() {
                    var newSlide = navSlider.slick('slickCurrentSlide');
                }, 100);
            } else {
            }
            return false;
        });
        
        $('.nav-slider-wrapper').on('click', '.slick-next-nav', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            var mainSlider = $('.main-slider');
            var navSlider = $('.nav-slider');
            
            if (mainSlider.hasClass('slick-initialized')) {
                var currentSlide = mainSlider.slick('slickCurrentSlide');
                var totalSlides = mainSlider.slick('getSlick').slideCount;
                mainSlider.slick('slickNext');
                setTimeout(function() {
                    var newSlide = mainSlider.slick('slickCurrentSlide');
                }, 100);
            } else if (navSlider.hasClass('slick-initialized')) {
                var currentSlide = navSlider.slick('slickCurrentSlide');
                var totalSlides = navSlider.slick('getSlick').slideCount;
                navSlider.slick('slickNext');
                setTimeout(function() {
                    var newSlide = navSlider.slick('slickCurrentSlide');
                }, 100);
            } else {
            }
            return false;
        });
        
        $('.nav-slider-wrapper .slick-prev-nav, .nav-slider-wrapper .slick-next-nav').css({
            'display': 'flex',
            'visibility': 'visible',
            'opacity': '1'
        });
    }, 200);

    var fullscreenSlider = null;
    var isFullscreenOpen = false;

    $(document).on('click', '.main-slide-image', function() {
        var slideIndex = parseInt($(this).data('index')) || 0;
        
        $('#fullscreenGallery').addClass('active');
        $('body').css('overflow', 'hidden');
        isFullscreenOpen = true;

        if (fullscreenSlider && $('.fullscreen-gallery-slider').hasClass('slick-initialized')) {
            fullscreenSlider.slick('slickGoTo', slideIndex, false);
        } else {
            fullscreenSlider = $('.fullscreen-gallery-slider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                infinite: true,
                initialSlide: slideIndex,
                speed: 300
            });
        }

        setTimeout(function() {
            if (fullscreenSlider) {
                fullscreenSlider.slick('setPosition');
            }
        }, 100);
    });

    function closeFullscreenGallery() {
        $('#fullscreenGallery').removeClass('active');
        $('body').css('overflow', '');
        isFullscreenOpen = false;
    }

    $(document).on('click', '.fullscreen-close', function(e) {
        e.stopPropagation();
        closeFullscreenGallery();
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && isFullscreenOpen) {
            closeFullscreenGallery();
        }
    });

    $(document).on('click', '.fullscreen-prev', function(e) {
        e.stopPropagation();
        if (fullscreenSlider && isFullscreenOpen) {
            fullscreenSlider.slick('slickPrev');
        }
    });

    $(document).on('click', '.fullscreen-next', function(e) {
        e.stopPropagation();
        if (fullscreenSlider && isFullscreenOpen) {
            fullscreenSlider.slick('slickNext');
        }
    });

    $(document).on('keydown', function(e) {
        if (isFullscreenOpen && fullscreenSlider) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                fullscreenSlider.slick('slickPrev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                fullscreenSlider.slick('slickNext');
            }
        }
    });

    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
            $('#mobileMenu').removeClass('show');
        }
    });
    
    $(document).off('click', '.burger-menu');
    $(document).on('click', '.burger-menu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var menu = $('#mobileMenu');
        if (menu.length) {
            menu.toggleClass('show');
        }
    });
    
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.mobile-menu, .burger-menu').length) {
            $('#mobileMenu').removeClass('show');
        }
    });
    
    $(document).on('click', '.mobile-menu .nav-link', function() {
        $('#mobileMenu').removeClass('show');
    });
});
