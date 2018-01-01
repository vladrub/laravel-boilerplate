;(function ( $ ) {

    $.preLoader = function ( method, options, el ) {
        var app = this;
        app.options = $.extend({}, $.preLoader.defaultOptions, options);
        app.template = $('<div class="pre-loader"><span></span></div>');

        if ( typeof el == 'undefined' ) {
            app.$el = $('body');
        } else {
            app.$el = $(el);
        }

        app.init = function () {
            app.fps = Math.round(100 / app.options.speed);
            app.secondsBetweenFrames = 1 / app.fps;
            app.framePosition = 0;
            app.currentFrameIndex = 0;
            app.timer = false;

            if ( method == 'show' ) {
                app.show();
            } else if ( method == 'hide' ) {
                app.hide();
            }
        };

        app.animate = function(){
            app.framePosition += app.frameWidth;
            app.currentFrameIndex += 1;

            if (app.currentFrameIndex >= app.options.totalFrames) {
                app.framePosition = 0;
                app.currentFrameIndex = 0;
            }

            app.frame.css({
                backgroundPosition: (-app.framePosition)+'px 0'
            });
        };

        app.show = function(){
            app.createPreLoader();
            app.timer = setInterval(app.animate, app.secondsBetweenFrames * 1000);
            app.container.stop(true, false).fadeIn( app.options.openAnimationDuration );
        };

        app.hide = function(){
            if ( typeof app.container == 'undefined' ) return;
            app.container.stop(true, false).fadeOut( app.options.closeAnimationDuration, function (){
                clearInterval(app.timer);
                app.deletePreLoader();
            });
        };

        app.createPreLoader = function(){
            app.container = app.template.prependTo( app.$el );
            app.frame = $('span', app.container);
            app.frameWidth = app.frame.width();

            if ( typeof el != 'undefined' ) {
                app.$el.css({
                    'position': 'relative'
                });

                app.container.css({
                    'top': app.$el.scrollTop()
                });

            }
        };

        app.deletePreLoader = function(){
            app.container.remove();
            app.$el.data( "preLoader", false );
        };

        var target = app.$el.data().preLoader;
        if ( typeof target == 'undefined' || target == false ) {
            app.init();
            app.$el.data( "preLoader", app );
        } else {
            if ( method == 'hide' ) {
                target.hide();
            }
        }
    };

    $.preLoader.defaultOptions = {
        speed: 9,
        totalFrames: 12,
        openAnimationDuration: 300,
        closeAnimationDuration: 300
    };

    $.fn.preLoader = function( method, options ) {
        return this.each(function() {
            (new $.preLoader(method, options, this))
        });
    };

})( jQuery );