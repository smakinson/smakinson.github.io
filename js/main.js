(function ($) {
    $(function () {

        $('#jsoffmsg').remove();

        $('.button-collapse').sideNav();
        $('.modal-trigger').leanModal();
        $('.scrollspy').scrollSpy();

        $('#loadingMsg').removeClass('loadingMsgAni');

        // No scroll bars as things are animated in and out.
        TweenLite.set('html, body', { overflow: 'hidden' });

        TweenLite.to('#loadingMsg', .5, { top: '-600px', delay: .5, ease: Back.easeIn, onComplete: function () {

            TweenLite.delayedCall(.4, function () {

                $('#loadingMsg').remove();

                initReadyAnimations();

                $('.initiallyHidden').removeClass('initiallyHidden');

                initContactForm();
                initTopNav();
            });
        } });
    });

    // ================================

    function isSmallWindow() {
        return Modernizr.mq('(max-width: 600px)');
    }

    function isNotSmallWindow() {
        return Modernizr.mq('(min-width: 601px)');
    }

    var SKIP_INTRO = false;

    var scrollController;
    var formOpen = false;
    var contactFormTimeline = new TimelineLite({ paused: true });

    function initReadyAnimations() {

        var readyTimeline = new TimelineLite({ onComplete: function () {

            TweenLite.delayedCall(.4, function () {
                initAnimations();

                // Give the scroll bars back.
                TweenLite.set('html, body', { overflow: 'visible' });
            });
            $('.intro-planet').remove();
        } });

        if(SKIP_INTRO) {
            readyTimeline.timeScale(100);
        }

        // Top nav
        readyTimeline.add(TweenMax.staggerFrom('header nav ul li', .5, { opacity: 0, x: '-=100', clearProps: 'all' }, 0.2));

        readyTimeline.add(TweenMax.from('section.about .bar', .5, { y: '-= 300px', ease: Quad.easeOut, clearProps: 'all' }), '-=1');

        // Clouds
        readyTimeline.add([
            TweenMax.from('.cloud1', .3, { right: -800, ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('.cloud2', .3, { left: -800, ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('.cloud3', .3, { left: -800, ease: Back.easeOut, clearProps: 'all' })
        ], '-=1.5', 'normal', 0.2);

        readyTimeline.add([
            TweenMax.from('.me-pic', .4, { autoAlpha: 0, y: '+= 200', ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('section.about .contact-box', .4, { autoAlpha: 0, y: '+= 100', ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.staggerFrom('section.about .about-text *', .3, { autoAlpha: 0, x: '-= 100', ease: Back.easeOut, clearProps: 'all' }, 0.1),
            TweenMax.from('section.game .big-planet', .4, { y: 0, clearProps: 'all' })
        ], '-=.7', 'normal', 0.2);

        readyTimeline.add(TweenMax.from('section.about .mountain, .about-scenery', .5, { y: '+=200', ease: Quad.easeIn, clearProps: 'all' }), '-=.5');

        // Fake the planet crashing in.
        readyTimeline.add([
            TweenMax.to('.intro-planet', 1.5, { y: '3500', ease: Linear.easeNone }),
            TweenMax.to('.intro-planet', .5, { visibility: 'visible', height: '600', ease: Linear.easeIn })
        ], '-=.5');

        // earthquake!
        readyTimeline.add([
            TweenMax.to('section.about', .3, { y: '+=20', ease: Quad.easeOut }),
            TweenMax.to('section.about', .3, { y: '-=40', ease: Quad.easeOut }),
            TweenMax.to('section.about', .3, { y: '+=30', ease: Quad.easeOut }),
            TweenMax.to('section.about', .2, { y: '-=30', ease: Quad.easeOut }),
            TweenMax.to('section.about', .2, { y: '+=30', ease: Quad.easeOut }),
            TweenMax.to('section.about', .2, { y: '-=30', ease: Quad.easeOut }),
            TweenMax.to('section.about', .2, { y: '+=10', ease: Quad.easeOut, clearProps: 'all' })
        ], '+=0', 'normal', 0.1);
        // TODO: Add a crash sound?
    }

    function initAnimations() {

        TweenMax.staggerTo('.cloud1, .cloud2, .cloud3', 10, { y: '+=100', repeat: -1, yoyo: true, ease: Quad.easeInOut }, 5);
        TweenMax.to('.cloud1', 6, { x: '-=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });
        TweenMax.to('.cloud2', 8, { x: '+=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });

        var plantMoves = ['+=20', '-=20'];

        for(var i = 1; i <= 6; i++){

            TweenMax.to('.plant-white' + i, Math.ceil(Math.random() * 4) + 8,
                {
                    x: plantMoves[Math.floor(Math.random() * plantMoves.length)],
                    y: plantMoves[Math.floor(Math.random() * plantMoves.length)],
                    ease: Quad.easeInOut,
                    delay: Math.ceil(Math.random() * 4), repeat: -1, yoyo: true
                }
            );
        }

        TweenMax.to('.big-planet', 8, { y: '+=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });

    }

    function initTopNav() {
        var navTween = TweenLite.to('header .navbar-fixed, header nav, header nav li, header .button-collapse i', .1, { paused: true, height: '40px', lineHeight: '38px', ease: Linear.easeIn });

        scrollController = new ScrollMagic.Controller({ globalSceneOptions: { duration: 800, loglevel: 3 } });
        // animate the scrolling.
        scrollController.scrollTo(function (newScrollPos) {
            $("html, body").animate({scrollTop: newScrollPos});
        });

        new ScrollMagic.Scene({ triggerElement: '#about' })
            .addTo(scrollController)
            .on('enter', function () {
                clearNavActive();
                $('li.nav-about').addClass('active');
                navTween.reverse();
            });

        new ScrollMagic.Scene({ triggerElement: '#navShrinkTarget' })
            .addTo(scrollController)
            .on('enter', function () {
                navTween.play();
            });

        new ScrollMagic.Scene({ triggerElement: '#site' })
            .addTo(scrollController)
            .on('enter', function () {
                clearNavActive();
                $('li.nav-site').addClass('active');
                //TweenLite.to('header .navbar-fixed, header nav, header nav li', .5, { height: '40px', lineHeight: '40px' });
            });

        new ScrollMagic.Scene({ triggerElement: '#projects' })
            .addTo(scrollController)
            .on('enter', function () {
                clearNavActive();
                $('li.nav-projects').addClass('active');
            });

        new ScrollMagic.Scene({ triggerElement: '#game' })
            .addTo(scrollController)
            .on('enter', function () {
                clearNavActive();
                $('li.nav-game').addClass('active');
            })
            .on('leave', function () {
                clearNavActive();
                $('li.nav-projects').addClass('active');
            });

        function clearNavActive() {
            $('header nav ul li').removeClass('active');
        }
    }

    function initContactForm() {

        $('#contactForm').submit(sendContactForm);
        $('#contactCloseBtn').mousedown(closeContactForm);

        $('#contactForm input, #contactForm textarea').focus(function () {
            if(isNotSmallWindow()){
                openContactForm();
            }
        });

        TweenLite.set('.contact-box', { transformPerspective: 400 });
        contactFormTimeline.add(TweenLite.to('.contact-box', .3, {
            left: '-=100',
            z: -100,
            rotationY: -45,
            width: '240%',
            boxShadow: '0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)',
            ease: Strong.easeIn,
            onComplete: function () {
                scrollController.scrollTo('.about-scenery');
            }
        }));
        contactFormTimeline.add(TweenLite.to('.contact-box', .3, {
            left: '50%', z: 0, rotationY: 0,
            ease: Back.easeOut
        }));
        contactFormTimeline.add(TweenLite.fromTo('#contactCloseBtn', .3, { autoAlpha: 0 }, { autoAlpha: 1 }));

        //$(window).scroll(function () {

        //});

        $('.open-contact').mousedown(function () {
           openContactForm();
        });

        $(window).resize(function () {
            if(isSmallWindow())
                closeContactForm();
        });
    }

    // ================================

    function sendContactForm(event) {

        var name = $('#contact-name').val();
        var email = $('#contact-email').val();
        var question = $('#contact-question').val();
        var data = {};

        data[$('#contact-name').attr('name')] = name;
        data[$('#contact-email').attr('name')] = email;
        data[$('#contact-question').attr('name')] = question;

        event.preventDefault();

        if(name.length > 0 && email.length > 0 && question.length > 0) {

            $('#formWait').show();
            $('#formSubmit').hide();

            $.ajax({
                url: $('#contactForm').attr('action'),
                data: data,
                type: "POST",
                dataType: "xml",
                statusCode: {
                    0: formSuccess,
                    200: formSuccess
                }
            });
        }
    }

    function formSuccess() {

        closeContactForm();

        var f = $('#contactForm');

        if(f.length > 0){
            f[0].reset();
        }
    }

    function openContactForm() {
        if(! formOpen){
            formOpen = true;
            contactFormTimeline.timeScale(1);
            contactFormTimeline.play();
        }
    }

    function closeContactForm(fast) {
        $('#formWait').hide();
        $('#formSubmit').show();

        contactFormTimeline.timeScale(1.5);

        if(fast === true || isSmallWindow()){
            contactFormTimeline.reverse(.1);
        }else{
            contactFormTimeline.reverse();
        }

        formOpen = false;
    }
})(jQuery);