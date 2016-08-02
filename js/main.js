(function ($) {
    $(function () {

        // Make sure the top is aways shown first. for the animations.
        $(window).on('beforeunload', function() {
            $(window).scrollTop(0);
            $(window).scrollLeft(0);
        });

        TweenMax.ticker.fps(60);

        $('#jsoffmsg').remove();

        $('.button-collapse').sideNav();
        $('.modal-trigger').leanModal();

        var tl = new TimelineLite({ onComplete: function () {
            // Put the scroll bars back.
            $('html, body').removeClass('noScroll');

            initConstantAnimations();
            initContactForm();
            initTopNav();
        } });

        if(SKIP_INTRO) {
            tl.timeScale(100);
        }

        tl.staggerTo(new SplitText('#loadingMsg .load-text', { type:'chars' }).chars, 0.8, {
            opacity: 0, scale: 0,
            transformOrigin: '0% 50%',
            ease: Back.easeOut, delay: 1
        }, 0.02);

        tl.to('#loadingMsg .one', .5, { opacity: 1, bottom: '50%' }, '-=0.2');
        tl.to('#loadingMsg .one', 0.4, { text: "Whoa, Whats That?!", ease: Linear.easeNone }, '+=1');
        tl.to('#loadingMsg .one', .4, { y: '-=200', opacity: 0, ease: Back.easeOut }, '+=1');
        tl.to('#loadingMsg .two', .4, { opacity: 1, bottom: '50%', ease: Back.easeOut }, '-=0.2');
        tl.to('#loadingMsg .two', .3, { opacity: 0, scale: 200, ease: Linear.easeOut }, '+=0.5');

        tl.to('#site-wrap', .8, { onStart: function () {
            TweenMax.set('#site-wrap', { y: -$('#game').offset().top + 300 });
        }, onComplete: function () {
            $('body').removeClass('stars');
        }, opacity: 1, ease: Quad.easeOut }, '+=0.2');

        tl.from('.big-planet', .4, { width: 0, height: 0, rotate: 360, ease: Quad.easeIn, clearProps: 'all' }, '-=0.3');

        // earthquake!
        tl.add([
            TweenMax.to('#site-wrap', .3, { y: '+=20', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .3, { y: '-=40', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .3, { y: '+=30', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .2, { y: '-=30', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .2, { y: '+=30', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .2, { y: '-=30', ease: Quad.easeOut }),
            TweenMax.to('#site-wrap', .2, { y: '+=10', ease: Quad.easeOut })
        ], '-=0', 'normal', 0.1);

        tl.to('#loadingMsg .three', .3, { opacity: 1, scale: 2, bottom: '5%', ease: Quad.easeOut }, '-=0.2');
        tl.to('#loadingMsg .three', .3, { scale: 0, bottom: 0, ease: Back.easeIn }, '+=0.3');

        tl.to('#site-wrap', 1, { y: 0, ease: SlowMo.ease.config(0.2, 0.8, false), clearProps: 'y',
        onStart: function () {
            $('#loadingMsg').remove();
        }}, '+=0.2');

        tl.from('#game .container', .5, { x: '-=200', opacity: 0, ease: Back.easeOut, clearProps: 'all' }, '-=2.5');
        tl.from('.page-footer .container', .5, { x: '-=200', opacity: 0, ease: Back.easeOut, clearProps: 'all' }, '-=3');

        // Top nav
        tl.add(TweenMax.staggerFrom('header nav ul li', .3, { opacity: 0, x: '-=100', clearProps: 'all' }, 0.15), '-=0.5');

        tl.add(TweenMax.from('section.about .bar', .3, { y: '-= 300px', ease: Quad.easeOut, clearProps: 'all' }), '-=1');

        // Clouds
        tl.add([
            TweenMax.from('.cloud1', .2, { right: -800, ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('.cloud2', .2, { left: -800, ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('.cloud3', .2, { left: -800, ease: Back.easeOut, clearProps: 'all' })
        ], '-=1.5', 'normal', 0.15);

        tl.add([
            TweenMax.from('.me-pic', .3, { autoAlpha: 0, y: '+= 200', ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.from('section.about .contact-box', .2, { autoAlpha: 0, y: '+= 100', ease: Back.easeOut, clearProps: 'all' }),
            TweenMax.staggerFrom('section.about .about-text *', .2, { autoAlpha: 0, x: '-= 100', ease: Back.easeOut, clearProps: 'all' }, 0.05)
        ], '-=.7', 'normal', 0.1);
    });

    // ================================

    function isSmallWindow() {
        return Modernizr.mq('(max-width: 600px)');
    }

    function isNotSmallWindow() {
        return Modernizr.mq('(min-width: 601px)');
    }

    var SKIP_INTRO = false; // Ha!! What is this, 1999?

    var formOpen = false;
    var contactFormTimeline = new TimelineLite({ paused: true });
    var sectionSiteOffset = 0, sectionProjectsOffset = 0, sectionGameOffset = 0;

    function initConstantAnimations() {

        TweenMax.staggerTo('.cloud1, .cloud2, .cloud3', 10, { y: '+=100', repeat: -1, yoyo: true, ease: Quad.easeInOut }, 5);
        TweenMax.to('.cloud1', 6, { x: '-=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });
        TweenMax.to('.cloud2', 8, { x: '+=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });

        var plantMoves = ['+=25', '-=25'];

        for(var i = 1; i <= 6; i++){

            TweenMax.to('.plant-white' + i, Math.ceil(Math.random() * 4) + 8,
                {
                    x: plantMoves[Math.floor(Math.random() * plantMoves.length)],
                    y: plantMoves[Math.floor(Math.random() * plantMoves.length)],
                    ease: Quad.easeInOut,
                    delay: Math.ceil(Math.random() * 3), repeat: -1, yoyo: true
                }
            );
        }

        TweenMax.to('.big-planet', 8, { y: '+=50', repeat: -1, yoyo: true, ease: Quad.easeInOut });
    }

    function initTopNav() {
        var navTween = TweenLite.to('header .navbar-fixed, header nav, header nav li, header .button-collapse i', .1, { paused: true, height: '40px', lineHeight: '38px', ease: Linear.easeIn });

        $(window).scroll(function() {
            var offset = $(window).scrollTop();

            if(offset > 300){
                navTween.play();
            }else{
                navTween.reverse();
            }
        });

        sectionSiteOffset = $('#site').offset().top - 200;
        sectionProjectsOffset = $('#projects').offset().top;
        sectionGameOffset = $('#game').offset().top - 300;

        $('#top-nav .nav-about').click(function (e) {
            TweenMax.to(window, .8, { scrollTo: { y: 0 }, ease: Linear.easeNone });
            return false;
        });
        $('#top-nav .nav-site').click(function () {
            TweenMax.to(window, .8, { scrollTo: { y: sectionSiteOffset }, ease: Linear.easeNone });
            return false;
        });
        $('#top-nav .nav-projects').click(function () {
            TweenMax.to(window, .8, { scrollTo: { y: sectionProjectsOffset }, ease: Linear.easeNone });
            return false;
        });
        $('#top-nav .nav-game').click(function () {
            TweenMax.to(window, .8, { scrollTo: { y: sectionGameOffset }, ease: Linear.easeNone });
            return false;
        });

        // Just for fun.
        $('.me-pic').mousedown(function () {
            $('.me-pic').animateCss('rubberBand');
            return false;
        });
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
                TweenMax.to(window, .1, { scrollTo: { y: '#contactFormOpenTarget' } });
            }
        }));
        contactFormTimeline.add(TweenLite.to('.contact-box', .3, {
            left: '50%', z: 0, rotationY: 0,
            ease: Back.easeOut
        }));
        contactFormTimeline.add(TweenLite.fromTo('#contactCloseBtn', .3, { autoAlpha: 0 }, { autoAlpha: 1 }));

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
        if(formOpen) {
            TweenMax.to(window, .1, { scrollTo: { y: '#contactFormOpenTarget' } });
        }else{
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