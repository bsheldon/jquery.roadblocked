  /*
  jQuery.Roadblocked (0.1)
  Rapidly implement device-targeted, landing interstitials for mobile + tablet visitors to your site.
  Source: http://github.com/bsheldon/jquery.roadblocked by @ojogringo
  Built from coffee-plate: http://github.com/pthrasher/coffee-plate by @philipthrasher
  Requires: jquery, jquery-cookie
  */
  (function($) {
    $.roadblocked = function(el, options) {
      var buildDismissUI, killBody, scanDevice, setBody, setCookie,
        _this = this;
      this.el = el;
      this.$el = $(el);
      this.$el.data("roadblocked", this);
      this.init = function() {
        var content, cookiesEnabled, detectedDevice, dismiss, interstitial, link;
        _this.options = $.extend({}, $.roadblocked.defaults, options);
        jQuery.cookie('probe', 'landed');
        if (jQuery.cookie('probe') != null) cookiesEnabled = true;
        detectedDevice = scanDevice(_this.options.devices);
        if ((interstitial = _this.options.devices[detectedDevice]) && cookiesEnabled && (jQuery.cookie("" + _this.options.campaignName) !== 'done')) {
          dismiss = buildDismissUI();
          content = _this.setContent(interstitial);
          link = interstitial['link'];
          _this.placeInterstitial(dismiss, content, link, detectedDevice);
          setBody(true);
          setCookie(_this.options.lifetime, _this.options.campaignName, _this.options.path);
        }
        return _this;
      };
      scanDevice = function(devices) {
        var d, device, device_agent, featured_list, present, _fn, _i, _len;
        present = '';
        featured_list = [];
        for (d in devices) {
          featured_list.push(d);
        }
        device_agent = navigator.userAgent.toLowerCase();
        _fn = function(device) {
          if (device_agent.indexOf(device) > -1) {
            if (device === 'android') {
              if (device_agent.indexOf('mobile') > -1) return present = device;
            } else {
              return present = device;
            }
          }
        };
        for (_i = 0, _len = featured_list.length; _i < _len; _i++) {
          device = featured_list[_i];
          _fn(device);
        }
        return present;
      };
      this.placeInterstitial = function(dismiss, content, link, device) {
        var container;
        container = $('<div\>', {
          id: 'roadblocked-container',
          "class": device
        });
        container.html('');
        container.css({
          'background-color': _this.options.overlayBackgroundColor,
          'top': '0',
          'left': '0',
          'height': '100%',
          'width': '100%',
          'position': 'fixed',
          'z-index': '100',
          'margin': '0',
          'display': 'block'
        });
        $('body').prepend(container);
        $('#roadblocked-container').prepend(dismiss);
        if (_this.options.dismissPlacement === 'top') {
          $('#dismiss-bar').after(content);
        } else if (_this.options.dismissPlacement === 'bottom') {
          $('#dismiss-bar').before(content);
        } else {
          $('#dismiss-bar').after(content);
        }
        $('#dismiss-bar').click(function() {
          $('#roadblocked-container').hide();
          return killBody();
        });
        return $('#inter-content').click(function() {
          if (link != null) {
            window.location = "" + link;
            $('#roadblocked-container').hide();
            return killBody();
          }
        });
      };
      buildDismissUI = function() {
        var dismissLabel, height, self;
        dismissLabel = _this.options.dismissLabel;
        if (typeof dismissLabel === 'string') {
          height = (parseFloat(_this.options.dismissLabelHeight) / 100) * $(window).height();
          self = $('<div\>', {
            id: 'dismiss-bar'
          });
          self.css({
            'height': height,
            'width': '90%',
            'margin': '0 auto',
            'background-color': "" + _this.options.overlayBackgroundColor,
            'text-align': "" + _this.options.dismissLabelAlign,
            'background-image': "url('" + _this.options.imgPath + "/" + _this.options.dismissLabel + "')",
            'background-position': "" + _this.options.dismissLabelAlign,
            'background-repeat': 'no-repeat',
            'background-size': 'contain'
          });
          return self;
        } else if (typeof dismissLabel === 'object') {
          dismissLabel.attr('id', 'dismiss-bar');
          dismissLabel.show();
          return dismissLabel;
        }
      };
      this.setContent = function(interstitial) {
        var height, self;
        if (interstitial['img'] != null) {
          self = $('<div\>', {
            id: 'inter-content'
          });
          if (typeof _this.options.dismissLabel === 'string') {
            height = (100 - parseFloat(_this.options.dismissLabelHeight)).toString() + '%';
          } else {
            height = '100%';
          }
          self.css({
            'height': height,
            'width': '100%',
            'background-image': "url('" + _this.options.imgPath + "/" + interstitial['img'] + "')",
            'background-position': 'top',
            'background-repeat': 'no-repeat',
            'background-size': 'contain'
          });
          return self;
        } else if (interstitial['selector'] != null) {
          interstitial['selector'].attr('id', 'inter-content');
          interstitial['selector'].show();
          return interstitial['selector'];
        }
      };
      setBody = function(state, device) {
        if (state === true) return $('body').css('position', 'fixed');
      };
      killBody = function() {
        return $('body').css('position', 'static');
      };
      setCookie = function(lifetime, campaign, path_dir) {
        return jQuery.cookie("" + campaign, 'done', {
          expires: lifetime,
          path: path_dir
        });
      };
      this.isRetna = function() {
        var _ref;
        return (_ref = window.devicePixelRatio > 1) != null ? _ref : {
          "true": false
        };
      };
      return this.init();
    };
    $.roadblocked.defaults = {
      imgPath: 'images',
      retnaPath: 'images/retna',
      overlayBackgroundColor: '#000',
      dismissLabelHeight: '7.5%',
      dismissLabelAlign: 'center',
      dismissPlacement: 'top',
      lifetime: 0,
      path: '/',
      campaignName: 'jqueryRoadblocked'
    };
    $.fn.roadblocked = function(options) {
      return $.each(this, function(i, el) {
        var $el;
        $el = $(el);
        if (!$el.data('roadblocked')) {
          return $el.data('roadblocked', new $.roadblocked(el, options));
        }
      });
    };
    return;
  })(jQuery);
