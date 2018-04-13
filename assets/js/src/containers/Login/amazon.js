// ABMNZN SDK 2018-02-08-63k6q26l
if (window.amazon == null || window.amazon.Login == null) {
  (function() {
    "use strict";
    var f = void 0,
      g = !0,
      h = null,
      i = !1;
    function k(a) {
      return function() {
        return this[a];
      };
    }
    var l, p, q, r, t, aa;
    function ba(a, b) {
      if (a === h || a === f) a = {};
      for (var c = 1; c < arguments.length; c++) {
        var d = arguments[c];
        if (d !== h && d !== f) for (var e in d) a[e] = d[e];
      }
      return a;
    }
    function v(a, b) {
      var c = w.apply(f, arguments);
      ca("error", c);
      throw Error(c);
    }
    function w(a, b) {
      var c = arguments,
        d = 1;
      return a.replace(/%((%)|[sid])/g, function(a) {
        if (a[2]) return a[2];
        a = c[d++];
        "object" == typeof a &&
          (window.JSON && window.JSON.stringify) &&
          (a = window.JSON.stringify(a));
        return a;
      });
    }
    function ca(a, b) {
      window.console &&
        window.console.log &&
        ("function" == typeof b && (b = b()),
        (b = w("[Amazon.%s] %s", a, b)),
        window.console.log(b));
    }
    function x(a, b, c) {
      b == h && v("missing %s", a);
      typeof b != c && v("expected %s to be a %s", a, c);
    }
    function da(a) {
      var b = document.getElementById(a);
      b ||
        ((b = document.createElement("div")),
        b.setAttribute("id", a),
        b.setAttribute("width", 0),
        b.setAttribute("height", 0),
        b.setAttribute(
          "style",
          "position: absolute; left: -1000px; top: -1000px"
        ),
        b.style.setAttribute &&
          b.style.setAttribute(
            "cssText",
            "position: absolute; left: -1000px; top: -1000px"
          ),
        (a = document.getElementById("amazon-root")),
        a ||
          ((a = document.createElement("div")),
          a.setAttribute("id", "amazon-root"),
          document.body.appendChild(a)),
        a.appendChild(b));
      return b;
    }
    function ea() {
      this.a = [];
    }
    ea.prototype.b = function(a) {
      var b = this.a;
      this.a = [];
      for (var c = 0; c < b.length; c++) b[c].A && this.a.push(b[c]);
      for (c = 0; c < b.length; c++) b[c].t.apply(f, arguments);
    };
    var y,
      z,
      A,
      fa = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        R: "\b",
        S: "\f",
        T: "\n",
        U: "\r",
        V: "\t"
      },
      ga;
    function B(a) {
      throw { name: "SyntaxError", message: a, Q: z, text: ga };
    }
    function C(a) {
      a && a !== A && B("Expected '" + a + "' instead of '" + A + "'");
      A = ga.charAt(z);
      z += 1;
      return A;
    }
    function ha() {
      var a;
      a = "";
      "-" === A && ((a = "-"), C("-"));
      for (; "0" <= A && "9" >= A; ) (a += A), C();
      if ("." === A) for (a += "."; C() && "0" <= A && "9" >= A; ) a += A;
      if ("e" === A || "E" === A) {
        a += A;
        C();
        if ("-" === A || "+" === A) (a += A), C();
        for (; "0" <= A && "9" >= A; ) (a += A), C();
      }
      a = +a;
      if (isFinite(a)) return a;
      B("Bad number");
    }
    function ia() {
      var a,
        b,
        c = "",
        d;
      if ('"' === A)
        for (; C(); ) {
          if ('"' === A) return C(), c;
          if ("\\" === A)
            if ((C(), "u" === A)) {
              for (b = d = 0; 4 > b; b += 1) {
                a = parseInt(C(), 16);
                if (!isFinite(a)) break;
                d = 16 * d + a;
              }
              c += String.fromCharCode(d);
            } else if ("string" === typeof fa[A]) c += fa[A];
            else break;
          else c += A;
        }
      B("Bad string");
    }
    function D() {
      for (; A && " " >= A; ) C();
    }
    function ja() {
      switch (A) {
        case "t":
          return C("t"), C("r"), C("u"), C("e"), g;
        case "f":
          return C("f"), C("a"), C("l"), C("s"), C("e"), i;
        case "n":
          return C("n"), C("u"), C("l"), C("l"), h;
      }
      B("Unexpected '" + A + "'");
    }
    var E;
    E = function() {
      D();
      switch (A) {
        case "{":
          var a;
          a: {
            var b = {};
            if ("{" === A) {
              C("{");
              D();
              if ("}" === A) {
                C("}");
                a = b;
                break a;
              }
              for (; A; ) {
                a = ia();
                D();
                C(":");
                Object.hasOwnProperty.call(b, a) &&
                  B('Duplicate key "' + a + '"');
                b[a] = E();
                D();
                if ("}" === A) {
                  C("}");
                  a = b;
                  break a;
                }
                C(",");
                D();
              }
            }
            B("Bad object");
            a = f;
          }
          return a;
        case "[":
          a: {
            a = [];
            if ("[" === A) {
              C("[");
              D();
              if ("]" === A) {
                C("]");
                break a;
              }
              for (; A; ) {
                a.push(E());
                D();
                if ("]" === A) {
                  C("]");
                  break a;
                }
                C(",");
                D();
              }
            }
            B("Bad array");
            a = f;
          }
          return a;
        case '"':
          return ia();
        case "-":
          return ha();
        default:
          return "0" <= A && "9" >= A ? ha() : ja();
      }
    };
    y = function(a, b) {
      var c;
      ga = a;
      z = 0;
      A = " ";
      c = E();
      D();
      A && B("Syntax error");
      return "function" === typeof b
        ? (function e(a, c) {
            var n,
              j,
              u = a[c];
            if (u && "object" === typeof u)
              for (n in u)
                Object.prototype.hasOwnProperty.call(u, n) &&
                  ((j = e(u, n)), j !== f ? (u[n] = j) : delete u[n]);
            return b.call(a, c, u);
          })({ "": c }, "")
        : c;
    };
    var F;
    function G(a) {
      return 10 > a ? "0" + a : a;
    }
    function ka(a) {
      la.lastIndex = 0;
      return la.test(a)
        ? '"' +
            a.replace(la, function(a) {
              var c = ma[a];
              return "string" === typeof c
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + a + '"';
    }
    function H(a, b) {
      var c,
        d,
        e,
        m,
        s = I,
        n,
        j = b[a];
      j &&
        ("object" === typeof j && "function" === typeof j.toJSON) &&
        (j = j.toJSON(a));
      "function" === typeof J && (j = J.call(b, a, j));
      switch (typeof j) {
        case "string":
          return ka(j);
        case "number":
          return isFinite(j) ? String(j) : "null";
        case "boolean":
        case "null":
          return String(j);
        case "object":
          if (!j) return "null";
          I += K;
          n = [];
          if ("[object Array]" === Object.prototype.toString.apply(j)) {
            m = j.length;
            for (c = 0; c < m; c += 1) n[c] = H(c, j) || "null";
            e =
              0 === n.length
                ? "[]"
                : I
                  ? "[\n" + I + n.join(",\n" + I) + "\n" + s + "]"
                  : "[" + n.join(",") + "]";
            I = s;
            return e;
          }
          if (J && "object" === typeof J) {
            m = J.length;
            for (c = 0; c < m; c += 1)
              "string" === typeof J[c] &&
                ((d = J[c]),
                (e = H(d, j)) && n.push(ka(d) + (I ? ": " : ":") + e));
          } else
            for (d in j)
              Object.prototype.hasOwnProperty.call(j, d) &&
                (e = H(d, j)) &&
                n.push(ka(d) + (I ? ": " : ":") + e);
          e =
            0 === n.length
              ? "{}"
              : I
                ? "{\n" + I + n.join(",\n" + I) + "\n" + s + "}"
                : "{" + n.join(",") + "}";
          I = s;
          return e;
      }
    }
    "function" !== typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function() {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              G(this.getUTCMonth() + 1) +
              "-" +
              G(this.getUTCDate()) +
              "T" +
              G(this.getUTCHours()) +
              ":" +
              G(this.getUTCMinutes()) +
              ":" +
              G(this.getUTCSeconds()) +
              "Z"
          : h;
      }),
      (String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf();
      }));
    var la = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      I,
      K,
      ma = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      },
      J;
    F = function(a, b, c) {
      var d;
      K = I = "";
      if ("number" === typeof c) for (d = 0; d < c; d += 1) K += " ";
      else "string" === typeof c && (K = c);
      if (
        (J = b) &&
        "function" !== typeof b &&
        ("object" !== typeof b || "number" !== typeof b.length)
      )
        throw Error("JSON.stringify");
      return H("", { "": a });
    };
    function L(a) {
      var b = "",
        c;
      for (c in a)
        b && (b += "&"),
          (b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c] + ""));
      return b;
    }
    function na(a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        "" != d && !a.b.hasOwnProperty(d) && (a.a.push(d), (a.b[d] = 1));
      }
    }
    p = function(a) {
      this.a = [];
      a = "string" == typeof a ? a.split(/\s+/) : a;
      this.b = {};
      na(this, a);
    };
    p.prototype.contains = function(a) {
      for (var b = 0; b < a.a.length; b++)
        if (!this.b.hasOwnProperty(a.a[b])) return i;
      return g;
    };
    p.prototype.add = function(a) {
      na(this, a.a);
    };
    p.prototype.c = function(a) {
      for (var b = 0; b < this.a.length; b++) a(this.a[b]);
    };
    p.prototype.toString = function() {
      return this.a.join(" ");
    };
    q = {};
    var oa = h;
    q.w = function() {
      return oa;
    };
    q.i = function(a) {
      x("domain", a, "string");
      var a = a.replace(/^\s+|\s+$/g, ""),
        b = "." + window.location.hostname;
      "." != a.charAt(0) && (a = "." + a);
      b.indexOf(a) != b.length - a.length &&
        v("Site domain must contain the current page's domain");
      oa = a;
    };
    q.n = function() {};
    q.n.prototype.getItem = function() {};
    q.n.setItem = function() {};
    q.n.removeItem = function() {};
    function M() {}
    M.prototype.getItem = function(a) {
      a = RegExp(
        "(?:^|;)\\s*" +
          escape(a).replace(/[\-\.\+\*]/g, "\\$&") +
          "\\s*\\=\\s*([^;]*)(?:;|$)"
      ).exec(document.cookie);
      return a == h ? h : unescape(a[1]);
    };
    M.prototype.setItem = function(a, b, c) {
      var d;
      d =
        c == h
          ? "Fri, 31 Dec 9999 23:59:59 GMT"
          : new Date(new Date().getTime() + 1e3 * c).toGMTString();
      var e = q.w(),
        e = e == h ? "" : ";Domain=" + e,
        m = pa(N(window.location.href + "")) ? "" : ";Secure";
      document.cookie =
        a +
        "=" +
        escape(b) +
        ("session" == c ? "" : ";Expires=" + d) +
        e +
        ";Path=/" +
        m;
    };
    M.prototype.removeItem = function(a) {
      q.d.setItem(a, "null", 0);
    };
    q.d = new M();
    function O(a) {
      this.a = a;
    }
    O.prototype.getItem = function(a) {
      return this.a.getItem(a);
    };
    O.prototype.setItem = function(a, b, c) {
      this.a.setItem(a, b, c);
    };
    O.prototype.removeItem = function(a) {
      q.d.removeItem(a);
    };
    q.l = new O(q.d);
    r = {
      G: function(a, b) {
        if ("bearer" == a.token_type) {
          var c = F({
            access_token: a.access_token,
            max_age: b,
            expiration_date: new Date().getTime() + 1e3 * b,
            client_id: t.v(),
            scope: a.scope
          });
          q.l.setItem("amazon_Login_state_cache", c, "session");
        }
      },
      u: function() {
        var a = q.l.getItem("amazon_Login_state_cache");
        return a != h &&
          ((a = y(a)), a != h && a.expiration_date > new Date().getTime())
          ? ((a.scope = new p(a.scope)), a)
          : h;
      },
      o: function() {
        q.l.removeItem("amazon_Login_state_cache");
      }
    };
    function qa() {
      return (window.XMLHttpRequest &&
        "withCredentials" in new window.XMLHttpRequest()) ||
        "undefined" !== typeof window.XDomainRequest
        ? g
        : i;
    }
    function P(a, b, c, d, e, m) {
      this.a = new Q(a, b, c);
      ("string" != typeof d || !d) && v("missing or invalid path: %s", d);
      this.f = d;
      "object" == typeof e && (e = L(e));
      e && "string" != typeof e && v("invalid query: %s", e);
      this.c = e || "";
      "object" == typeof m && (m = L(m));
      m && "string" != typeof m && v("invalid fragment: %s", m);
      this.b = m || "";
    }
    function N(a) {
      var b = document.createElement("div");
      b.innerHTML = "<a></a>";
      b.firstChild.href = a;
      b.innerHTML = b.innerHTML;
      a = b.firstChild;
      "" == a.host && (a.href = a.href);
      b = a.port;
      if (!b || "0" == b) b = h;
      var c = a.pathname;
      c ? "/" != c[0] && (c = "/" + c) : (c = "/");
      return new P(
        a.protocol,
        a.hostname,
        b,
        c,
        a.search.substring(1),
        a.href.split("#")[1] || ""
      );
    }
    l = P.prototype;
    l.scheme = function() {
      return this.a.scheme();
    };
    l.host = function() {
      return this.a.host();
    };
    l.port = function() {
      return this.a.port();
    };
    l.path = k("f");
    l.h = k("c");
    l.g = k("b");
    function pa(a) {
      var b = "http" == a.a.scheme(),
        a = a.a.host();
      return b && ("localhost" == a || "127.0.0.1" == a);
    }
    l.toString = function() {
      var a = this.a.toString(),
        a = a + this.f,
        a = a + (this.c ? "?" + this.c : "");
      return (a += this.b ? "#" + this.b : "");
    };
    function ra(a, b) {
      return new P(
        b.scheme !== f ? b.scheme : a.scheme(),
        b.host !== f ? b.host : a.host(),
        b.port !== f ? b.port : a.port(),
        b.path !== f ? b.path : a.path(),
        b.h !== f ? b.h : a.h(),
        b.g !== f ? b.g : a.g()
      );
    }
    function Q(a, b, c) {
      var d;
      ("string" != typeof a || !(d = a.match(/^(https?)(:(\/\/)?)?$/i))) &&
        v("missing or invalid scheme: %s", a);
      this.a = "http" == d[1] ? "http" : "https";
      if (!(a = "string" != typeof b))
        if (!(a = !b))
          ("string" != typeof b || !b) && v("missing or invalid input: %s", b),
            (a = 0 == b.replace(/^\s+|\s+$/g, "").length);
      a && v("missing or invalid host: %s", b);
      this.c = b;
      if (
        c &&
        ((c + "").match(/^\d+$/) || v("invalid port: %s", c),
        (80 == c && "http" == this.a) || (443 == c && "https" == this.a))
      )
        c = h;
      this.b = c ? c + "" : h;
    }
    var sa = /^(http|https):\/\/(.+?)(:(\d+))?$/i;
    Q.prototype.scheme = k("a");
    Q.prototype.host = k("c");
    Q.prototype.port = k("b");
    Q.prototype.toString = function() {
      var a;
      a = "" + (this.a + "://");
      a += this.c;
      return (a += this.b ? ":" + this.b : "");
    };
    function R(a, b, c, d) {
      return new P(a.a, a.c, a.b, b, c, d);
    }
    function ta(a) {
      for (var b = "", c = 0; c < a; c++)
        b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
          Math.floor(62 * Math.random())
        );
      return b;
    }
    var S = {},
      T = h;
    function ua(a) {
      var b = U;
      a: if (window.__toucanForceProxyOriginTo) {
        var b = window.__toucanForceProxyOriginTo,
          c = b.match(sa);
        if (c) b = new Q(c[1], c[2], c[4] ? c[4] - 0 : h);
        else throw (v("invalid origin: %s", b), Error());
      } else if (window.__toucanForceProxyOriginToThisOrigin)
        b = N(window.location.href + "").a;
      else {
        if ((c = b.host().match(/^([\w\-\.]+\.)?amazon\.([\w\.]+)$/))) {
          if ("https" == b.scheme()) {
            b = new Q("https", "api-cdn.amazon." + c[2], h);
            break a;
          }
          v(
            "no proxy origin; unsupported non-https target origin for amazon: %s",
            b
          );
        }
        v("no proxy origin; unsupported target origin: %s", b);
        throw Error();
      }
      c = b;
      if (!T) {
        var d = window.postMessage ? "pm" : "fr";
        window.__toucanForceTransport && (d = window.__toucanForceTransport);
        if ("pm" == d) d = new V();
        else if ("fr" == d) d = new W();
        else throw (v("unknown transport: %s", d), Error());
        T = d;
        T.b(c, function(a, b) {
          var c = S[a];
          c && c.b(b);
        });
      }
      var d = b,
        e = T,
        c = d.host().replace(/[^a-z0-9]/gi, "_");
      d.port() && (c += "_" + d.port());
      var c = w("amazon-proxy-%s-%s", d.scheme(), c),
        m = document.getElementById(c);
      m ||
        ((m = document.createElement("iframe")),
        m.setAttribute("id", c),
        m.setAttribute("name", c),
        m.setAttribute("src", va(d, e).toString()),
        da("amazon-proxy-root").appendChild(m));
      d = ta(16);
      S[d] || (S[d] = new ea());
      S[d].a.push({ t: a, A: i });
      a = b;
      b = { uri: wa().toString(), proxy: c, topic: d, version: "1" };
      return R(a, "/sdk/2018-02-08-63k6q26l/topic.html", b, "");
    }
    function wa() {
      return ra(N(window.location.href + ""), { h: "", g: "" });
    }
    function va(a, b) {
      var c = { uri: wa().toString(), tr: b.name() };
      return R(a, "/sdk/2018-02-08-63k6q26l/proxy.html", { version: "1" }, c);
    }
    var xa = /^ABMNZNXDC;([\w\d\_\-]+);(.*)$/;
    function ya(a) {
      var b = a.match(xa);
      if (b) {
        a = {};
        a.id = b[1];
        for (var c = {}, b = b[2].split("&"), d = 0; d < b.length; d++) {
          var e = b[d].split("=");
          2 == e.length &&
            (c[e[0]] = decodeURIComponent(e[1].replace(/\+/g, " ")));
        }
        a.data = c;
        return a;
      }
      return h;
    }
    function V() {
      this.a = f;
    }
    V.prototype.name = function() {
      return "pm";
    };
    V.prototype.b = function(a, b) {
      if (this.a === f) {
        var c = (this.a = new ea()),
          d = function(a) {
            var b;
            (b = ya(a.data)) && c.b(a.origin, b.id, b.data);
          };
        window.addEventListener
          ? window.addEventListener("message", d, i)
          : window.attachEvent
            ? window.attachEvent("onmessage", d)
            : v("cannot attach message event");
      }
      var e = a.toString();
      this.a.a.push({
        t: function(a, c, d) {
          var j = N(window.location.href + "").a.toString();
          (a != e && a != j) || b(c, d);
        },
        A: g
      });
    };
    V.prototype.send = function(a, b, c) {
      var d = a.a,
        e = y(F(c));
      setTimeout(function() {
        window.parent.postMessage(
          w("%s;%s;%s", "ABMNZNXDC", b, L(e)),
          d.toString()
        );
      }, 1);
    };
    function W() {}
    W.prototype.name = function() {
      return "fr";
    };
    W.prototype.b = function(a, b) {
      window.__toucanInvokeFragment = function(a, d) {
        b(a, d);
      };
    };
    W.prototype.send = function(a, b, c) {
      var d = a.h();
      (d = d || "") && (d += "&");
      d = d + "ABMNZNXDC" + ("=" + ta(8));
      a = ra(a, { h: d, g: w("%s;%s;%s", "ABMNZNXDC", b, L(c)) });
      b = document.createElement("iframe");
      b.setAttribute("src", a.toString());
      document.body.appendChild(b);
    };
    var za = window.location.href.split("#")[1] || "";
    if (za) {
      var Aa = ya(za);
      Aa &&
        ((document.documentElement.style.display = "none"),
        "function" == typeof window.parent.parent.__toucanInvokeFragment &&
          window.parent.parent.__toucanInvokeFragment(Aa.id, Aa.data));
    }
    function Ba(a) {
      var b = a.match(Ca);
      b || v("invalid domain: %s", a);
      var c = b[2] ? b[2].toLowerCase() : "https";
      "https" != c && v("invalid domain: %s; scheme must be https", a);
      a = b[3];
      a.match(/^amazon\.[a-z\.]+$/) && (a = "www." + a);
      return new Q(c, a, b[5]);
    }
    function Da(a, b) {
      a.scope || v(b);
      a.scope.constructor !== Array &&
        "string" != typeof a.scope &&
        v("expected scope to be a string or array");
      a.scope = new p(a.scope);
    }
    function Ea(a) {
      a.scope_data && (a.scope_data = F(a.scope_data));
    }
    function Fa(a) {
      if (a.workflow_data) {
        var b = {};
        b.workflow_data = a.workflow_data;
        a["com.amazon.oauth2.options"] = F(b);
      }
    }
    function Ga() {
      X != h && ("function" == typeof X.close && X.close(), (X = h));
    }
    function Ha(a, b, c) {
      b = {
        client_id: Y,
        redirect_uri: b,
        response_type: a.response_type,
        language: Ia,
        ui_locales: Ja
      };
      a["com.amazon.oauth2.options"] &&
        (b["com.amazon.oauth2.options"] = a["com.amazon.oauth2.options"]);
      a.response_mode && (b.response_mode = a.response_mode);
      a.scope && (b.scope = a.scope.toString());
      a.direct_post_uri && (b.direct_post_uri = a.direct_post_uri);
      a.scope_data && (b.scope_data = a.scope_data);
      Ka && (b.sandbox = g);
      a.state && (b.state = a.state);
      c && (b.exac = c);
      a.delegated_requests && (b.delegated_requests = F(a.delegated_requests));
      return R(U, "/ap/oa", b);
    }
    function La(a, b, c) {
      Z = i;
      b.access_token != h
        ? ((c = parseInt(b.expires_in, 10)),
          (c = 60 >= c ? c : c - Math.min(Math.floor(0.1 * c), 300)),
          r.G(b, c),
          t.C() ? q.d.setItem(t.e, b.access_token, c) : q.d.removeItem(t.e))
        : c && q.d.removeItem(t.e);
      a.z(b);
      a = Ma;
      Ma = [];
      for (b = 0; b < a.length; b++) Na(a[b]);
    }
    function Oa(a, b, c, d) {
      var e = L(a);
      !c && d
        ? ((a = N(b)), (a = ra(a, { g: e })))
        : ((b += -1 == b.indexOf("?") ? "?" : "&"), (b += e), (a = N(b)));
      e = N(window.location.href + "");
      "https" != a.scheme() &&
        !pa(a) &&
        v("attempted redirect to %s but scheme is not HTTPS", b);
      a.host() != e.host() &&
        v(
          "attempted redirect to %s but it does not match current host %s",
          a.host(),
          e.host()
        );
      !c && d
        ? (window.top.location.href = a.toString())
        : (Ga(), (window.location.href = b));
    }
    function Pa(a) {
      var b = this;
      this.a = a;
      this.c = h;
      this.p = [];
      this.f = h;
      this.b = {
        status: h,
        onComplete: function(a) {
          "string" != typeof a &&
            "function" != typeof a &&
            v(
              "onComplete expects handler parameter to be a function or a string"
            );
          var d = b.b.status == Ra.r;
          "string" == typeof a
            ? d
              ? Oa(b.f, a, b.a.popup, "token" == b.a.response_type)
              : (b.c = a)
            : "function" == typeof a &&
              (d
                ? setTimeout(function() {
                    a(b.b);
                  }, 0)
                : b.p.push(a));
          return b.b;
        }
      };
    }
    function Na(a) {
      var b = a.a,
        c = h;
      if (b.delegated_requests) Sa(a, h);
      else {
        if (b.interactive == $.ALWAYS) r.o();
        else {
          var d = h;
          t.C() && (d = q.d.getItem(t.e));
          if ((c = r.u()))
            "token" == b.response_type && b.scope.add(c.scope),
              d
                ? d != c.access_token && (r.o(), (c = h))
                : (d = c.access_token);
          var e;
          if (c && c.scope.contains(b.scope) && "token" == b.response_type)
            (e = {
              access_token: c.access_token,
              token_type: "bearer",
              expires_in: Math.floor(
                (c.expiration_date - new Date().getTime()) / 1e3
              ),
              scope: c.scope.toString()
            }),
              b.state != h && (e.state = b.state);
          else if (b.interactive == $.NEVER && b.popup) {
            if (Z) {
              Ma.push(a);
              a.q(Ra.F);
              return;
            }
            if (d) {
              b = d;
              Z = g;
              var m = da("amazon-client-credentials-root"),
                c = da("amazon-client-credentials-root"),
                s = ta(16),
                d = document.createElement("iframe");
              d.setAttribute("name", s);
              c.appendChild(d);
              0 == document.getElementsByName(s).length &&
                (c.removeChild(d),
                (d = document.createElement('<iframe name="' + s + '"/>')),
                c.appendChild(d));
              d.setAttribute("id", s);
              var n = document.createElement("form");
              m.appendChild(n);
              n.setAttribute("method", "POST");
              n.setAttribute("target", s);
              d = ua(function(b) {
                m.removeChild(n);
                var c = document.getElementById(s);
                c != h && c.parentNode != h && c.parentNode.removeChild(c);
                b == h &&
                  (b = { error: "server_error", description: "Server error." });
                La(a, b, i);
              });
              c = a.a;
              b = {
                client_id: Y,
                exac: b,
                grant_type: "client_credentials",
                redirect_uri: d,
                response_type: c.response_type,
                scope: c.scope
              };
              c.state != h && (b.state = c.state);
              c.response_mode != h && (b.response_mode = c.response_mode);
              c.direct_post_uri != h && (b.direct_post_uri = c.direct_post_uri);
              c.scope_data != h && (b.scope_data = c.scope_data);
              c.optional_scope != h && (b.claims = c.optional_scope);
              c["com.amazon.oauth2.options"] != h &&
                (b["com.amazon.oauth2.options"] =
                  c["com.amazon.oauth2.options"]);
              n.setAttribute("action", R(U, "/ap/oa", b).toString());
              n.submit();
              return;
            }
            e = { error: "invalid_grant", error_description: "invalid grant" };
          }
          if (e) {
            setTimeout(function() {
              a.z(e);
            }, 0);
            return;
          }
        }
        Sa(a, d);
      }
    }
    function Sa(a, b) {
      var c = a.a;
      if (c.popup) {
        Z = g;
        var c = ua(function(b) {
            Ga();
            La(a, b, g);
          }),
          c = Ha(a.a, c, b),
          d =
            (window.screenX !== f ? window.screenX : window.screenLeft) +
            Math.floor(
              ((window.outerWidth !== f
                ? window.outerWidth
                : document.documentElement.clientWidth) -
                800) /
                2
            ),
          e =
            (window.screenY !== f ? window.screenY : window.screenTop) +
            Math.floor(
              ((window.outerHeight !== f
                ? window.outerHeight
                : document.documentElement.clientHeight) -
                540) /
                2
            ),
          d = w(
            "left=%s,top=%s,width=%s,height=%s,scrollbars=1",
            0 > d ? 0 : d,
            0 > e ? 0 : e,
            800,
            540
          );
        X = window.open(c.toString(), "amazonloginpopup", d);
      } else
        (d = a.c) || v("Missing redirectUrl for redirect flow"),
          (c = Ha(c, N(d + ""), b).toString()),
          (window.top.location.href = c);
    }
    t = {
      m: { NorthAmerica: "NA", Europe: "EU", AsiaPacific: "APAC" },
      e: "amazon_Login_accessToken"
    };
    var Ta = /^[\w\-\.]+$/,
      Ca = /^((http|https):\/\/)?([a-z0-9\-\.]+)(:(\d+))?\/?$/i,
      $ = { ALWAYS: "always", k: "auto", NEVER: "never" },
      X = h,
      Z = i,
      Ma = [],
      Ra = { F: "queued", D: "in_progress", r: "complete" },
      Y = f;
    t.v = function() {
      return Y;
    };
    t.K = function(a) {
      a.match(Ta) || v("invalid client ID: %s", a);
      Y = a;
    };
    var Ua = "www.amazon.com",
      U = new Q("https", Ua, h),
      Va = new Q("https", "api.amazon.com", h);
    t.w = function() {
      return Ua;
    };
    t.H = function() {
      return Va;
    };
    var Ka = i;
    t.O = function(a) {
      "number" == typeof a && (a = !!a);
      x("sandboxMode", a, "boolean");
      Ka = a;
    };
    t.i = function(a) {
      U = Ba(a);
      Ua = a;
    };
    t.j = function(a) {
      Va = Ba(a);
    };
    t.N = function(a) {
      a &&
        (a === t.m.Europe
          ? (t.i("https://eu.account.amazon.com"),
            t.j("https://api.amazon.co.uk"))
          : a === t.m.AsiaPacific
            ? (t.i("https://apac.account.amazon.com"),
              t.j("https://api.amazon.co.jp"))
            : (t.i("https://www.amazon.com"), t.j("https://api.amazon.com")));
    };
    var Ia = "";
    t.L = function(a) {
      Ia = a;
    };
    var Ja = "";
    t.M = function(a) {
      Ja = a;
    };
    t.I = function() {
      return U;
    };
    var Wa = i;
    t.C = function() {
      return Wa;
    };
    t.P = function(a) {
      a == h
        ? v("missing useCookie")
        : "number" == typeof a
          ? (a = !!a)
          : "boolean" != typeof a && v("expected useCookie to be a boolean");
      Wa = a;
    };
    Pa.prototype.z = function(a) {
      this.f = a;
      ba(this.b, a);
      this.q(Ra.r);
      for (a = 0; a < this.p.length; a++) this.p[a](this.b);
      this.c != h &&
        Oa(this.f, this.c, this.a.popup, "token" == this.a.response_type);
    };
    Pa.prototype.q = function(a) {
      this.b.status = a;
    };
    t.s = function(a, b) {
      2 > arguments.length &&
        v("authorize expects two arguments (options, next)");
      a &&
        "object" != typeof a &&
        v("authorize expects options parameter to be an object");
      b != h &&
        ("function" != typeof b && "string" != typeof b) &&
        v("authorize expects next parameter to be a function or a string");
      var c = ba(
        {
          interactive: f,
          popup: g,
          response_type: "token",
          response_mode: f,
          delegated_requests: f,
          direct_post_uri: f,
          state: f,
          scope: f,
          scope_data: f,
          optional_scope: f,
          "com.amazon.oauth2.options": f,
          workflow_data: f
        },
        a || {}
      );
      x("options.response_type", c.response_type, "string");
      c.response_mode && x("options.response_mode", c.response_mode, "string");
      c.direct_post_uri &&
        x("options.direct_post_uri", c.direct_post_uri, "string");
      var d = c.delegated_requests;
      if (d) {
        var e = c.response_type;
        (!e || "delegate" !== e) &&
          v(
            "expected %s value to be %s but was %s",
            "options.response_type",
            "delegate",
            e
          );
        c.scope &&
          v("options.scope is not supported for delegated authorization");
        c.scope_data &&
          v("options.scope_data is not supported for delegated authorization");
        c.optional_scope &&
          v(
            "options.optional_scope is not supported for delegated authorization"
          );
        c.interactive
          ? c.interactive != $.ALWAYS &&
            v(
              "options.interactive should be '" +
                $.ALWAYS +
                "' for delegated authorization"
            )
          : (c.interactive = $.ALWAYS);
        for (var e = {}, m = 0; m < d.length; m++) {
          var s = d[m],
            n = c,
            j = s;
          j.response_mode &&
            v("response_mode is not supported in delegated requests");
          j.direct_post_uri &&
            v("direct_post_uri is not supported in delegated requests");
          "popup" in j && v("popup is not supported in delegated requests");
          j.interactive &&
            v("interactive mode is not supported in delegated requests");
          j.optional_scope &&
            v("optional_scope is not supported in delegated requests");
          j.delegated_requests &&
            v("delegated_requests is not supported in delegated requests");
          j.response_type == h && (j.response_type = "token");
          Da(j, "missing 'scope' in delegated request");
          j.scope = j.scope.toString();
          Ea(j);
          Fa(n);
          x("request_id", j.request_id, "string");
          j.client_id &&
            !j.client_id.match(Ta) &&
            v("invalid client_id format: %s", j.client_id);
          var n = {},
            u = f;
          for (u in j) "request_id" != u && (n[u] = j[u]);
          e[s.request_id] = n;
        }
        c.delegated_requests = e;
      } else if (
        (Da(c, "missing options.scope"),
        Ea(c),
        Fa(c),
        c.interactive
          ? c.interactive != $.k &&
            (c.interactive != $.ALWAYS && c.interactive != $.NEVER) &&
            v(
              "expected options.interactive to be one of '" +
                $.k +
                "', '" +
                $.ALWAYS +
                "', or '" +
                $.NEVER +
                "'"
            )
          : (c.interactive = $.k),
        c.optional_scope)
      ) {
        c.optional_scope.constructor !== Array &&
          "string" != typeof c.optional_scope &&
          v("expected options.optional_scope to be a string or array");
        c.interactive != $.NEVER &&
          v(
            "options.optional_scope is only supported for options.interactive = never"
          );
        d = new p(c.optional_scope);
        c.scope.add(d);
        var Qa = { id_token: {} };
        d.c(function(a) {
          Qa.id_token[a] = { essential: i };
        });
        c.optional_scope = F(Qa);
      }
      a = c;
      c = new Pa(a);
      d = c.b;
      c.q(Ra.D);
      if (b != h) d.onComplete(b);
      !a.popup && "string" != typeof b
        ? v("next must be redirect URI if !options.popup")
        : Na(c);
      return d;
    };
    function Xa(a, b) {
      var c;
      try {
        c = y(a);
      } catch (d) {
        c = h;
      }
      if (c && c.Error) {
        var e = { success: i };
        e.error = w(
          "%s: %s",
          c.Error.Code || "UnknownError",
          c.Error.Message || "An unknown error occurred"
        );
        b(e);
      } else
        c && c.Profile
          ? ((e = { success: g }), (e.profile = c.Profile), b(e))
          : ((e = {
              success: i,
              error:
                "UnknownError: Incomprehensible response from profile endpoint"
            }),
            b(e));
    }
    aa = {
      B: function(a, b) {
        if (b == h && "function" == typeof a)
          (b = a),
            t.s({ scope: "profile" }, function(a) {
              a.error == h
                ? aa.B(a.access_token, b)
                : b({ success: i, error: a.error });
            });
        else if (
          (x("accessToken", a, "string"), x("callback", b, "function"), qa())
        ) {
          var c = R(
              t.I(),
              "/ap/user/profile",
              { access_token: a },
              ""
            ).toString(),
            d;
          if (window.XDomainRequest)
            (d = new window.XDomainRequest()),
              (d.onload = function() {
                Xa(d.responseText, b);
              });
          else {
            var e = i;
            d = new window.XMLHttpRequest();
            d.onreadystatechange = function() {
              e || 4 != d.readyState || ((e = g), Xa(d.responseText, b));
            };
          }
          d.open("GET", c, g);
          d.send();
        } else
          b({
            success: i,
            error:
              "UnsupportedOperation: Cannot retrieve profile in this browser"
          });
      }
    };
    function Ya(a) {
      var b, c;
      try {
        c = y(a).response;
      } catch (d) {
        c = f;
      }
      if (!c || c.error)
        (a = "UnknownError"),
          (b = "An unknown error ocurred"),
          c &&
            (c.error && c.error.code && c.error.message) &&
            ((a = c.error.code), (b = c.error.message)),
          (b = w("%s: %s", a, b));
      b && ca("logout", b);
    }
    t.J = function() {
      var a = q.d.getItem(t.e),
        b = r.u();
      a && q.d.removeItem(t.e);
      !a && b && (a = b.access_token);
      r.o();
      if (a) {
        qa() ||
          ca(
            "logout",
            "UnsupportedOperation: Cannot remotely logout in this browser"
          );
        var b = R(t.H(), "/auth/relyingPartyLogout", h, h).toString(),
          c = {};
        c.token = a;
        c.token_type = "bearer";
        var d;
        if (window.XDomainRequest)
          (d = new window.XDomainRequest()),
            (d.onload = function() {
              Ya(d.responseText);
            });
        else {
          var e = i;
          d = new window.XMLHttpRequest();
          d.onreadystatechange = function() {
            e || 4 != d.readyState || ((e = g), Ya(d.responseText));
          };
        }
        d.open("POST", b, g);
        d.send(F(c));
      }
    };
    window.amazon = window.amazon || {};
    window.amazon.Login = window.amazon.Login || {};
    window.amazon.Login.getClientId = function() {
      return t.v();
    };
    window.amazon.Login.setClientId = function(a) {
      return t.K(a);
    };
    window.amazon.Login.setDomain = function(a) {
      return t.i(a);
    };
    window.amazon.Login.setAPIDomain = function(a) {
      return t.j(a);
    };
    window.amazon.Login.setSandboxMode = function(a) {
      return t.O(a);
    };
    window.amazon.Login.setSiteDomain = function(a) {
      return q.i(a);
    };
    window.amazon.Login.Region = t.m;
    window.amazon.Login.setRegion = function(a) {
      return t.N(a);
    };
    window.amazon.Login.setLanguage = function(a) {
      return t.L(a);
    };
    window.amazon.Login.setLanguageHint = function(a) {
      return t.M(a);
    };
    window.amazon.Login.setUseCookie = function(a) {
      return t.P(a);
    };
    window.amazon.Login.authorize = function(a, b) {
      return t.s(a, b);
    };
    window.amazon.Login.logout = function() {
      return t.J();
    };
    window.amazon.Login.retrieveProfile = function(a, b) {
      return aa.B(a, b);
    };
    if ("function" == typeof window.onAmazonLoginReady)
      window.onAmazonLoginReady();
  })();
}
