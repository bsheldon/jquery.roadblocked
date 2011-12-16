
  jQuery.cookie = function(name, value, options) {
    var cookie, cookieValue, cookies, date, domain, expires, path, secure, _i, _len;
    if (typeof value !== 'undefined') {
      options = options || {};
      if (value === null) {
        value = "";
        options.expires = -1;
      }
      expires = "";
      if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
        if (typeof options.expires === "number") {
          date = new Date;
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
          date = options.expires;
        }
        expires = "; expires=" + (date.toUTCString());
      }
      path = options.path ? "; path=" + options.path : "";
      domain = options.domain ? "; domain=" + options.domain : "";
      secure = options.secure ? "; secure=" + options.secure : "";
      return document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("");
    } else {
      cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        cookies = document.cookie.split(";");
        for (_i = 0, _len = cookies.length; _i < _len; _i++) {
          cookie = cookies[_i];
          cookie = jQuery.trim(cookie);
          if (cookie.substring(0, name.length + 1) === ("" + name + "=")) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  };
