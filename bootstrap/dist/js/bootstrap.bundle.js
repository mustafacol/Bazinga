! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e(t.bootstrap = {}, t.jQuery)
}(this, function(t, e) {
    "use strict";

    function n(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function i(t, e, i) {
        return e && n(t.prototype, e), i && n(t, i), t
    }

    function r() {
        return (r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }).apply(this, arguments)
    }

    function o(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
    }

    function s(t) {
        var e = {};
        return t && "[object Function]" === e.toString.call(t)
    }

    function a(t, e) {
        if (1 !== t.nodeType) return [];
        var n = getComputedStyle(t, null);
        return e ? n[e] : n
    }

    function l(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }

    function c(t) {
        if (!t) return document.body;
        switch (t.nodeName) {
            case "HTML":
            case "BODY":
                return t.ownerDocument.body;
            case "#document":
                return t.body
        }
        var e = a(t),
            n = e.overflow,
            i = e.overflowX,
            r = e.overflowY;
        return /(auto|scroll)/.test(n + r + i) ? t : c(l(t))
    }

    function h(t) {
        var e = t && t.offsetParent,
            n = e && e.nodeName;
        return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === a(e, "position") ? h(e) : e : t ? t.ownerDocument.documentElement : document.documentElement
    }

    function f(t) {
        var e = t.nodeName;
        return "BODY" !== e && ("HTML" === e || h(t.firstElementChild) === t)
    }

    function u(t) {
        return null !== t.parentNode ? u(t.parentNode) : t
    }

    function d(t, e) {
        if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
        var n = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = n ? t : e,
            r = n ? e : t,
            o = document.createRange();
        o.setStart(i, 0), o.setEnd(r, 0);
        var s = o.commonAncestorContainer;
        if (t !== s && e !== s || i.contains(r)) return f(s) ? s : h(s);
        var a = u(t);
        return a.host ? d(a.host, e) : d(t, u(e).host)
    }

    function p(t) {
        var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = t.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || i)[e]
        }
        return t[e]
    }

    function g(t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = p(e, "top"),
            r = p(e, "left"),
            o = n ? -1 : 1;
        return t.top += i * o, t.bottom += i * o, t.left += r * o, t.right += r * o, t
    }

    function m(t, e) {
        var n = "x" === e ? "Left" : "Top",
            i = "Left" === n ? "Right" : "Bottom";
        return parseFloat(t["border" + n + "Width"], 10) + parseFloat(t["border" + i + "Width"], 10)
    }

    function _(t, e, n, i) {
        return Math.max(e["offset" + t], e["scroll" + t], n["client" + t], n["offset" + t], n["scroll" + t], ct() ? n["offset" + t] + i["margin" + ("Height" === t ? "Top" : "Left")] + i["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
    }

    function v() {
        var t = document.body,
            e = document.documentElement,
            n = ct() && getComputedStyle(e);
        return {
            height: _("Height", t, e, n),
            width: _("Width", t, e, n)
        }
    }

    function E(t) {
        return dt({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }

    function T(t) {
        var e = {};
        if (ct()) try {
            e = t.getBoundingClientRect();
            var n = p(t, "top"),
                i = p(t, "left");
            e.top += n, e.left += i, e.bottom += n, e.right += i
        } catch (t) {} else e = t.getBoundingClientRect();
        var r = {
                left: e.left,
                top: e.top,
                width: e.right - e.left,
                height: e.bottom - e.top
            },
            o = "HTML" === t.nodeName ? v() : {},
            s = o.width || t.clientWidth || r.right - r.left,
            l = o.height || t.clientHeight || r.bottom - r.top,
            c = t.offsetWidth - s,
            h = t.offsetHeight - l;
        if (c || h) {
            var f = a(t);
            c -= m(f, "x"), h -= m(f, "y"), r.width -= c, r.height -= h
        }
        return E(r)
    }

    function b(t, e) {
        var n = ct(),
            i = "HTML" === e.nodeName,
            r = T(t),
            o = T(e),
            s = c(t),
            l = a(e),
            h = parseFloat(l.borderTopWidth, 10),
            f = parseFloat(l.borderLeftWidth, 10),
            u = E({
                top: r.top - o.top - h,
                left: r.left - o.left - f,
                width: r.width,
                height: r.height
            });
        if (u.marginTop = 0, u.marginLeft = 0, !n && i) {
            var d = parseFloat(l.marginTop, 10),
                p = parseFloat(l.marginLeft, 10);
            u.top -= h - d, u.bottom -= h - d, u.left -= f - p, u.right -= f - p, u.marginTop = d, u.marginLeft = p
        }
        return (n ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (u = g(u, e)), u
    }

    function C(t) {
        var e = t.ownerDocument.documentElement,
            n = b(t, e),
            i = Math.max(e.clientWidth, window.innerWidth || 0),
            r = Math.max(e.clientHeight, window.innerHeight || 0),
            o = p(e),
            s = p(e, "left");
        return E({
            top: o - n.top + n.marginTop,
            left: s - n.left + n.marginLeft,
            width: i,
            height: r
        })
    }

    function A(t) {
        var e = t.nodeName;
        return "BODY" !== e && "HTML" !== e && ("fixed" === a(t, "position") || A(l(t)))
    }

    function I(t, e, n, i) {
        var r = {
                top: 0,
                left: 0
            },
            o = d(t, e);
        if ("viewport" === i) r = C(o);
        else {
            var s = void 0;
            "scrollParent" === i ? "BODY" === (s = c(l(e))).nodeName && (s = t.ownerDocument.documentElement) : s = "window" === i ? t.ownerDocument.documentElement : i;
            var a = b(s, o);
            if ("HTML" !== s.nodeName || A(o)) r = a;
            else {
                var h = v(),
                    f = h.height,
                    u = h.width;
                r.top += a.top - a.marginTop, r.bottom = f + a.top, r.left += a.left - a.marginLeft, r.right = u + a.left
            }
        }
        return r.left += n, r.top += n, r.right -= n, r.bottom -= n, r
    }

    function O(t) {
        return t.width * t.height
    }

    function y(t, e, n, i, r) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var s = I(n, i, o, r),
            a = {
                top: {
                    width: s.width,
                    height: e.top - s.top
                },
                right: {
                    width: s.right - e.right,
                    height: s.height
                },
                bottom: {
                    width: s.width,
                    height: s.bottom - e.bottom
                },
                left: {
                    width: e.left - s.left,
                    height: s.height
                }
            },
            l = Object.keys(a).map(function(t) {
                return dt({
                    key: t
                }, a[t], {
                    area: O(a[t])
                })
            }).sort(function(t, e) {
                return e.area - t.area
            }),
            c = l.filter(function(t) {
                var e = t.width,
                    i = t.height;
                return e >= n.clientWidth && i >= n.clientHeight
            }),
            h = c.length > 0 ? c[0].key : l[0].key,
            f = t.split("-")[1];
        return h + (f ? "-" + f : "")
    }

    function D(t, e, n) {
        return b(n, d(e, n))
    }

    function S(t) {
        var e = getComputedStyle(t),
            n = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
            i = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
        return {
            width: t.offsetWidth + i,
            height: t.offsetHeight + n
        }
    }

    function w(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }

    function N(t, e, n) {
        n = n.split("-")[0];
        var i = S(t),
            r = {
                width: i.width,
                height: i.height
            },
            o = -1 !== ["right", "left"].indexOf(n),
            s = o ? "top" : "left",
            a = o ? "left" : "top",
            l = o ? "height" : "width",
            c = o ? "width" : "height";
        return r[s] = e[s] + e[l] / 2 - i[l] / 2, r[a] = n === a ? e[a] - i[c] : e[w(a)], r
    }

    function L(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }

    function P(t, e, n) {
        if (Array.prototype.findIndex) return t.findIndex(function(t) {
            return t[e] === n
        });
        var i = L(t, function(t) {
            return t[e] === n
        });
        return t.indexOf(i)
    }

    function R(t, e, n) {
        return (void 0 === n ? t : t.slice(0, P(t, "name", n))).forEach(function(t) {
            t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = t.function || t.fn;
            t.enabled && s(n) && (e.offsets.popper = E(e.offsets.popper), e.offsets.reference = E(e.offsets.reference), e = n(e, t))
        }), e
    }

    function H() {
        if (!this.state.isDestroyed) {
            var t = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            t.offsets.reference = D(this.state, this.popper, this.reference), t.placement = y(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = N(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = R(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
        }
    }

    function k(t, e) {
        return t.some(function(t) {
            var n = t.name;
            return t.enabled && n === e
        })
    }

    function W(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], n = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < e.length - 1; i++) {
            var r = e[i],
                o = r ? "" + r + n : t;
            if (void 0 !== document.body.style[o]) return o
        }
        return null
    }

    function M() {
        return this.state.isDestroyed = !0, k(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[W("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function U(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }

    function V(t, e, n, i) {
        var r = "BODY" === t.nodeName,
            o = r ? t.ownerDocument.defaultView : t;
        o.addEventListener(e, n, {
            passive: !0
        }), r || V(c(o.parentNode), e, n, i), i.push(o)
    }

    function F(t, e, n, i) {
        n.updateBound = i, U(t).addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var r = c(t);
        return V(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
    }

    function x() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function j(t, e) {
        return U(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e
    }

    function B() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = j(this.reference, this.state))
    }

    function G(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }

    function K(t, e) {
        Object.keys(e).forEach(function(n) {
            var i = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && G(e[n]) && (i = "px"), t.style[n] = e[n] + i
        })
    }

    function Q(t, e) {
        Object.keys(e).forEach(function(n) {
            !1 !== e[n] ? t.setAttribute(n, e[n]) : t.removeAttribute(n)
        })
    }

    function Y(t, e, n) {
        var i = L(t, function(t) {
                return t.name === e
            }),
            r = !!i && t.some(function(t) {
                return t.name === n && t.enabled && t.order < i.order
            });
        if (!r) {
            var o = "`" + e + "`",
                s = "`" + n + "`";
            console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
        }
        return r
    }

    function q(t) {
        return "end" === t ? "start" : "start" === t ? "end" : t
    }

    function X(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = gt.indexOf(t),
            i = gt.slice(n + 1).concat(gt.slice(0, n));
        return e ? i.reverse() : i
    }

    function z(t, e, n, i) {
        var r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            o = +r[1],
            s = r[2];
        if (!o) return t;
        if (0 === s.indexOf("%")) {
            var a = void 0;
            switch (s) {
                case "%p":
                    a = n;
                    break;
                case "%":
                case "%r":
                default:
                    a = i
            }
            return E(a)[e] / 100 * o
        }
        return "vh" === s || "vw" === s ? ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * o : o
    }

    function Z(t, e, n, i) {
        var r = [0, 0],
            o = -1 !== ["right", "left"].indexOf(i),
            s = t.split(/(\+|\-)/).map(function(t) {
                return t.trim()
            }),
            a = s.indexOf(L(s, function(t) {
                return -1 !== t.search(/,|\s/)
            }));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/,
            c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
        return (c = c.map(function(t, i) {
            var r = (1 === i ? !o : o) ? "height" : "width",
                s = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
            }, []).map(function(t) {
                return z(t, r, e, n)
            })
        })).forEach(function(t, e) {
            t.forEach(function(n, i) {
                G(n) && (r[e] += n * ("-" === t[i - 1] ? -1 : 1))
            })
        }), r
    }
    for (var J = function(t) {
            function e(t) {
                return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
            }

            function n(e) {
                return e = "function" == typeof t.escapeSelector ? t.escapeSelector(e).substr(1) : e.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1")
            }
            var i = !1,
                r = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(t) {
                        do {
                            t += ~~(1e6 * Math.random())
                        } while (document.getElementById(t));
                        return t
                    },
                    getSelectorFromElement: function(e) {
                        var i = e.getAttribute("data-target");
                        i && "#" !== i || (i = e.getAttribute("href") || ""), "#" === i.charAt(0) && (i = n(i));
                        try {
                            return t(document).find(i).length > 0 ? i : null
                        } catch (t) {
                            return null
                        }
                    },
                    reflow: function(t) {
                        return t.offsetHeight
                    },
                    triggerTransitionEnd: function(e) {
                        t(e).trigger(i.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(i)
                    },
                    isElement: function(t) {
                        return (t[0] || t).nodeType
                    },
                    typeCheckConfig: function(t, n, i) {
                        for (var o in i)
                            if (Object.prototype.hasOwnProperty.call(i, o)) {
                                var s = i[o],
                                    a = n[o],
                                    l = a && r.isElement(a) ? "element" : e(a);
                                if (!new RegExp(s).test(l)) throw new Error(t.toUpperCase() + ': Option "' + o + '" provided type "' + l + '" but expected type "' + s + '".')
                            }
                    }
                };
            return i = ("undefined" == typeof window || !window.QUnit) && {
                end: "transitionend"
            }, t.fn.emulateTransitionEnd = function(e) {
                var n = this,
                    i = !1;
                return t(this).one(r.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || r.triggerTransitionEnd(n)
                }, e), this
            }, r.supportsTransitionEnd() && (t.event.special[r.TRANSITION_END] = {
                bindType: i.end,
                delegateType: i.end,
                handle: function(e) {
                    if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), r
        }(e = e && e.hasOwnProperty("default") ? e.default : e), $ = function(t) {
            var e = "alert",
                n = t.fn[e],
                r = {
                    DISMISS: '[data-dismiss="alert"]'
                },
                o = {
                    CLOSE: "close.bs.alert",
                    CLOSED: "closed.bs.alert",
                    CLICK_DATA_API: "click.bs.alert.data-api"
                },
                s = {
                    ALERT: "alert",
                    FADE: "fade",
                    SHOW: "show"
                },
                a = function() {
                    function e(t) {
                        this._element = t
                    }
                    var n = e.prototype;
                    return n.close = function(t) {
                        t = t || this._element;
                        var e = this._getRootElement(t);
                        this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                    }, n.dispose = function() {
                        t.removeData(this._element, "bs.alert"), this._element = null
                    }, n._getRootElement = function(e) {
                        var n = J.getSelectorFromElement(e),
                            i = !1;
                        return n && (i = t(n)[0]), i || (i = t(e).closest("." + s.ALERT)[0]), i
                    }, n._triggerCloseEvent = function(e) {
                        var n = t.Event(o.CLOSE);
                        return t(e).trigger(n), n
                    }, n._removeElement = function(e) {
                        var n = this;
                        t(e).removeClass(s.SHOW), J.supportsTransitionEnd() && t(e).hasClass(s.FADE) ? t(e).one(J.TRANSITION_END, function(t) {
                            return n._destroyElement(e, t)
                        }).emulateTransitionEnd(150) : this._destroyElement(e)
                    }, n._destroyElement = function(e) {
                        t(e).detach().trigger(o.CLOSED).remove()
                    }, e._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = t(this),
                                r = i.data("bs.alert");
                            r || (r = new e(this), i.data("bs.alert", r)), "close" === n && r[n](this)
                        })
                    }, e._handleDismiss = function(t) {
                        return function(e) {
                            e && e.preventDefault(), t.close(this)
                        }
                    }, i(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), e
                }();
            return t(document).on(o.CLICK_DATA_API, r.DISMISS, a._handleDismiss(new a)), t.fn[e] = a._jQueryInterface, t.fn[e].Constructor = a, t.fn[e].noConflict = function() {
                return t.fn[e] = n, a._jQueryInterface
            }, a
        }(e), tt = function(t) {
            var e = "button",
                n = t.fn[e],
                r = {
                    ACTIVE: "active",
                    BUTTON: "btn",
                    FOCUS: "focus"
                },
                o = {
                    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
                    DATA_TOGGLE: '[data-toggle="buttons"]',
                    INPUT: "input",
                    ACTIVE: ".active",
                    BUTTON: ".btn"
                },
                s = {
                    CLICK_DATA_API: "click.bs.button.data-api",
                    FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api"
                },
                a = function() {
                    function e(t) {
                        this._element = t
                    }
                    var n = e.prototype;
                    return n.toggle = function() {
                        var e = !0,
                            n = !0,
                            i = t(this._element).closest(o.DATA_TOGGLE)[0];
                        if (i) {
                            var s = t(this._element).find(o.INPUT)[0];
                            if (s) {
                                if ("radio" === s.type)
                                    if (s.checked && t(this._element).hasClass(r.ACTIVE)) e = !1;
                                    else {
                                        var a = t(i).find(o.ACTIVE)[0];
                                        a && t(a).removeClass(r.ACTIVE)
                                    }
                                if (e) {
                                    if (s.hasAttribute("disabled") || i.hasAttribute("disabled") || s.classList.contains("disabled") || i.classList.contains("disabled")) return;
                                    s.checked = !t(this._element).hasClass(r.ACTIVE), t(s).trigger("change")
                                }
                                s.focus(), n = !1
                            }
                        }
                        n && this._element.setAttribute("aria-pressed", !t(this._element).hasClass(r.ACTIVE)), e && t(this._element).toggleClass(r.ACTIVE)
                    }, n.dispose = function() {
                        t.removeData(this._element, "bs.button"), this._element = null
                    }, e._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = t(this).data("bs.button");
                            i || (i = new e(this), t(this).data("bs.button", i)), "toggle" === n && i[n]()
                        })
                    }, i(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), e
                }();
            return t(document).on(s.CLICK_DATA_API, o.DATA_TOGGLE_CARROT, function(e) {
                e.preventDefault();
                var n = e.target;
                t(n).hasClass(r.BUTTON) || (n = t(n).closest(o.BUTTON)), a._jQueryInterface.call(t(n), "toggle")
            }).on(s.FOCUS_BLUR_DATA_API, o.DATA_TOGGLE_CARROT, function(e) {
                var n = t(e.target).closest(o.BUTTON)[0];
                t(n).toggleClass(r.FOCUS, /^focus(in)?$/.test(e.type))
            }), t.fn[e] = a._jQueryInterface, t.fn[e].Constructor = a, t.fn[e].noConflict = function() {
                return t.fn[e] = n, a._jQueryInterface
            }, a
        }(e), et = function(t) {
            var e = "carousel",
                n = "bs.carousel",
                o = "." + n,
                s = t.fn[e],
                a = {
                    interval: 5e3,
                    keyboard: !0,
                    slide: !1,
                    pause: "hover",
                    wrap: !0
                },
                l = {
                    interval: "(number|boolean)",
                    keyboard: "boolean",
                    slide: "(boolean|string)",
                    pause: "(string|boolean)",
                    wrap: "boolean"
                },
                c = {
                    NEXT: "next",
                    PREV: "prev",
                    LEFT: "left",
                    RIGHT: "right"
                },
                h = {
                    SLIDE: "slide" + o,
                    SLID: "slid" + o,
                    KEYDOWN: "keydown" + o,
                    MOUSEENTER: "mouseenter" + o,
                    MOUSELEAVE: "mouseleave" + o,
                    TOUCHEND: "touchend" + o,
                    LOAD_DATA_API: "load.bs.carousel.data-api",
                    CLICK_DATA_API: "click.bs.carousel.data-api"
                },
                f = {
                    CAROUSEL: "carousel",
                    ACTIVE: "active",
                    SLIDE: "slide",
                    RIGHT: "carousel-item-right",
                    LEFT: "carousel-item-left",
                    NEXT: "carousel-item-next",
                    PREV: "carousel-item-prev",
                    ITEM: "carousel-item"
                },
                u = {
                    ACTIVE: ".active",
                    ACTIVE_ITEM: ".active.carousel-item",
                    ITEM: ".carousel-item",
                    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                    INDICATORS: ".carousel-indicators",
                    DATA_SLIDE: "[data-slide], [data-slide-to]",
                    DATA_RIDE: '[data-ride="carousel"]'
                },
                d = function() {
                    function s(e, n) {
                        this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(n), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(u.INDICATORS)[0], this._addEventListeners()
                    }
                    var d = s.prototype;
                    return d.next = function() {
                        this._isSliding || this._slide(c.NEXT)
                    }, d.nextWhenVisible = function() {
                        !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                    }, d.prev = function() {
                        this._isSliding || this._slide(c.PREV)
                    }, d.pause = function(e) {
                        e || (this._isPaused = !0), t(this._element).find(u.NEXT_PREV)[0] && J.supportsTransitionEnd() && (J.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, d.cycle = function(t) {
                        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                    }, d.to = function(e) {
                        var n = this;
                        this._activeElement = t(this._element).find(u.ACTIVE_ITEM)[0];
                        var i = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0))
                            if (this._isSliding) t(this._element).one(h.SLID, function() {
                                return n.to(e)
                            });
                            else {
                                if (i === e) return this.pause(), void this.cycle();
                                var r = e > i ? c.NEXT : c.PREV;
                                this._slide(r, this._items[e])
                            }
                    }, d.dispose = function() {
                        t(this._element).off(o), t.removeData(this._element, n), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, d._getConfig = function(t) {
                        return t = r({}, a, t), J.typeCheckConfig(e, t, l), t
                    }, d._addEventListeners = function() {
                        var e = this;
                        this._config.keyboard && t(this._element).on(h.KEYDOWN, function(t) {
                            return e._keydown(t)
                        }), "hover" === this._config.pause && (t(this._element).on(h.MOUSEENTER, function(t) {
                            return e.pause(t)
                        }).on(h.MOUSELEAVE, function(t) {
                            return e.cycle(t)
                        }), "ontouchstart" in document.documentElement && t(this._element).on(h.TOUCHEND, function() {
                            e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                                return e.cycle(t)
                            }, 500 + e._config.interval)
                        }))
                    }, d._keydown = function(t) {
                        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                            case 37:
                                t.preventDefault(), this.prev();
                                break;
                            case 39:
                                t.preventDefault(), this.next()
                        }
                    }, d._getItemIndex = function(e) {
                        return this._items = t.makeArray(t(e).parent().find(u.ITEM)), this._items.indexOf(e)
                    }, d._getItemByDirection = function(t, e) {
                        var n = t === c.NEXT,
                            i = t === c.PREV,
                            r = this._getItemIndex(e),
                            o = this._items.length - 1;
                        if ((i && 0 === r || n && r === o) && !this._config.wrap) return e;
                        var s = (r + (t === c.PREV ? -1 : 1)) % this._items.length;
                        return -1 === s ? this._items[this._items.length - 1] : this._items[s]
                    }, d._triggerSlideEvent = function(e, n) {
                        var i = this._getItemIndex(e),
                            r = this._getItemIndex(t(this._element).find(u.ACTIVE_ITEM)[0]),
                            o = t.Event(h.SLIDE, {
                                relatedTarget: e,
                                direction: n,
                                from: r,
                                to: i
                            });
                        return t(this._element).trigger(o), o
                    }, d._setActiveIndicatorElement = function(e) {
                        if (this._indicatorsElement) {
                            t(this._indicatorsElement).find(u.ACTIVE).removeClass(f.ACTIVE);
                            var n = this._indicatorsElement.children[this._getItemIndex(e)];
                            n && t(n).addClass(f.ACTIVE)
                        }
                    }, d._slide = function(e, n) {
                        var i, r, o, s = this,
                            a = t(this._element).find(u.ACTIVE_ITEM)[0],
                            l = this._getItemIndex(a),
                            d = n || a && this._getItemByDirection(e, a),
                            p = this._getItemIndex(d),
                            g = Boolean(this._interval);
                        if (e === c.NEXT ? (i = f.LEFT, r = f.NEXT, o = c.LEFT) : (i = f.RIGHT, r = f.PREV, o = c.RIGHT), d && t(d).hasClass(f.ACTIVE)) this._isSliding = !1;
                        else if (!this._triggerSlideEvent(d, o).isDefaultPrevented() && a && d) {
                            this._isSliding = !0, g && this.pause(), this._setActiveIndicatorElement(d);
                            var m = t.Event(h.SLID, {
                                relatedTarget: d,
                                direction: o,
                                from: l,
                                to: p
                            });
                            J.supportsTransitionEnd() && t(this._element).hasClass(f.SLIDE) ? (t(d).addClass(r), J.reflow(d), t(a).addClass(i), t(d).addClass(i), t(a).one(J.TRANSITION_END, function() {
                                t(d).removeClass(i + " " + r).addClass(f.ACTIVE), t(a).removeClass(f.ACTIVE + " " + r + " " + i), s._isSliding = !1, setTimeout(function() {
                                    return t(s._element).trigger(m)
                                }, 0)
                            }).emulateTransitionEnd(600)) : (t(a).removeClass(f.ACTIVE), t(d).addClass(f.ACTIVE), this._isSliding = !1, t(this._element).trigger(m)), g && this.cycle()
                        }
                    }, s._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                o = r({}, a, t(this).data());
                            "object" == typeof e && (o = r({}, o, e));
                            var l = "string" == typeof e ? e : o.slide;
                            if (i || (i = new s(this, o), t(this).data(n, i)), "number" == typeof e) i.to(e);
                            else if ("string" == typeof l) {
                                if (void 0 === i[l]) throw new TypeError('No method named "' + l + '"');
                                i[l]()
                            } else o.interval && (i.pause(), i.cycle())
                        })
                    }, s._dataApiClickHandler = function(e) {
                        var i = J.getSelectorFromElement(this);
                        if (i) {
                            var o = t(i)[0];
                            if (o && t(o).hasClass(f.CAROUSEL)) {
                                var a = r({}, t(o).data(), t(this).data()),
                                    l = this.getAttribute("data-slide-to");
                                l && (a.interval = !1), s._jQueryInterface.call(t(o), a), l && t(o).data(n).to(l), e.preventDefault()
                            }
                        }
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return a
                        }
                    }]), s
                }();
            return t(document).on(h.CLICK_DATA_API, u.DATA_SLIDE, d._dataApiClickHandler), t(window).on(h.LOAD_DATA_API, function() {
                t(u.DATA_RIDE).each(function() {
                    var e = t(this);
                    d._jQueryInterface.call(e, e.data())
                })
            }), t.fn[e] = d._jQueryInterface, t.fn[e].Constructor = d, t.fn[e].noConflict = function() {
                return t.fn[e] = s, d._jQueryInterface
            }, d
        }(e), nt = function(t) {
            var e = "collapse",
                n = "bs.collapse",
                o = t.fn[e],
                s = {
                    toggle: !0,
                    parent: ""
                },
                a = {
                    toggle: "boolean",
                    parent: "(string|element)"
                },
                l = {
                    SHOW: "show.bs.collapse",
                    SHOWN: "shown.bs.collapse",
                    HIDE: "hide.bs.collapse",
                    HIDDEN: "hidden.bs.collapse",
                    CLICK_DATA_API: "click.bs.collapse.data-api"
                },
                c = {
                    SHOW: "show",
                    COLLAPSE: "collapse",
                    COLLAPSING: "collapsing",
                    COLLAPSED: "collapsed"
                },
                h = {
                    WIDTH: "width",
                    HEIGHT: "height"
                },
                f = {
                    ACTIVES: ".show, .collapsing",
                    DATA_TOGGLE: '[data-toggle="collapse"]'
                },
                u = function() {
                    function o(e, n) {
                        this._isTransitioning = !1, this._element = e, this._config = this._getConfig(n), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                        for (var i = t(f.DATA_TOGGLE), r = 0; r < i.length; r++) {
                            var o = i[r],
                                s = J.getSelectorFromElement(o);
                            null !== s && t(s).filter(e).length > 0 && (this._selector = s, this._triggerArray.push(o))
                        }
                        this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                    }
                    var u = o.prototype;
                    return u.toggle = function() {
                        t(this._element).hasClass(c.SHOW) ? this.hide() : this.show()
                    }, u.show = function() {
                        var e = this;
                        if (!this._isTransitioning && !t(this._element).hasClass(c.SHOW)) {
                            var i, r;
                            if (this._parent && 0 === (i = t.makeArray(t(this._parent).find(f.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (i = null), !(i && (r = t(i).not(this._selector).data(n)) && r._isTransitioning)) {
                                var s = t.Event(l.SHOW);
                                if (t(this._element).trigger(s), !s.isDefaultPrevented()) {
                                    i && (o._jQueryInterface.call(t(i).not(this._selector), "hide"), r || t(i).data(n, null));
                                    var a = this._getDimension();
                                    t(this._element).removeClass(c.COLLAPSE).addClass(c.COLLAPSING), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(c.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var h = function() {
                                        t(e._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).addClass(c.SHOW), e._element.style[a] = "", e.setTransitioning(!1), t(e._element).trigger(l.SHOWN)
                                    };
                                    if (J.supportsTransitionEnd()) {
                                        var u = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                        t(this._element).one(J.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[a] = this._element[u] + "px"
                                    } else h()
                                }
                            }
                        }
                    }, u.hide = function() {
                        var e = this;
                        if (!this._isTransitioning && t(this._element).hasClass(c.SHOW)) {
                            var n = t.Event(l.HIDE);
                            if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
                                var i = this._getDimension();
                                if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", J.reflow(this._element), t(this._element).addClass(c.COLLAPSING).removeClass(c.COLLAPSE).removeClass(c.SHOW), this._triggerArray.length > 0)
                                    for (var r = 0; r < this._triggerArray.length; r++) {
                                        var o = this._triggerArray[r],
                                            s = J.getSelectorFromElement(o);
                                        null !== s && (t(s).hasClass(c.SHOW) || t(o).addClass(c.COLLAPSED).attr("aria-expanded", !1))
                                    }
                                this.setTransitioning(!0);
                                var a = function() {
                                    e.setTransitioning(!1), t(e._element).removeClass(c.COLLAPSING).addClass(c.COLLAPSE).trigger(l.HIDDEN)
                                };
                                this._element.style[i] = "", J.supportsTransitionEnd() ? t(this._element).one(J.TRANSITION_END, a).emulateTransitionEnd(600) : a()
                            }
                        }
                    }, u.setTransitioning = function(t) {
                        this._isTransitioning = t
                    }, u.dispose = function() {
                        t.removeData(this._element, n), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, u._getConfig = function(t) {
                        return t = r({}, s, t), t.toggle = Boolean(t.toggle), J.typeCheckConfig(e, t, a), t
                    }, u._getDimension = function() {
                        return t(this._element).hasClass(h.WIDTH) ? h.WIDTH : h.HEIGHT
                    }, u._getParent = function() {
                        var e = this,
                            n = null;
                        J.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = t(this._config.parent)[0];
                        var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return t(n).find(i).each(function(t, n) {
                            e._addAriaAndCollapsedClass(o._getTargetFromElement(n), [n])
                        }), n
                    }, u._addAriaAndCollapsedClass = function(e, n) {
                        if (e) {
                            var i = t(e).hasClass(c.SHOW);
                            n.length > 0 && t(n).toggleClass(c.COLLAPSED, !i).attr("aria-expanded", i)
                        }
                    }, o._getTargetFromElement = function(e) {
                        var n = J.getSelectorFromElement(e);
                        return n ? t(n)[0] : null
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this),
                                a = i.data(n),
                                l = r({}, s, i.data(), "object" == typeof e && e);
                            if (!a && l.toggle && /show|hide/.test(e) && (l.toggle = !1), a || (a = new o(this, l), i.data(n, a)), "string" == typeof e) {
                                if (void 0 === a[e]) throw new TypeError('No method named "' + e + '"');
                                a[e]()
                            }
                        })
                    }, i(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return s
                        }
                    }]), o
                }();
            return t(document).on(l.CLICK_DATA_API, f.DATA_TOGGLE, function(e) {
                "A" === e.currentTarget.tagName && e.preventDefault();
                var i = t(this),
                    r = J.getSelectorFromElement(this);
                t(r).each(function() {
                    var e = t(this),
                        r = e.data(n) ? "toggle" : i.data();
                    u._jQueryInterface.call(e, r)
                })
            }), t.fn[e] = u._jQueryInterface, t.fn[e].Constructor = u, t.fn[e].noConflict = function() {
                return t.fn[e] = o, u._jQueryInterface
            }, u
        }(e), it = "undefined" != typeof window && "undefined" != typeof document, rt = ["Edge", "Trident", "Firefox"], ot = 0, st = 0; st < rt.length; st += 1)
        if (it && navigator.userAgent.indexOf(rt[st]) >= 0) {
            ot = 1;
            break
        }
    var at = it && window.Promise ? function(t) {
            var e = !1;
            return function() {
                e || (e = !0, window.Promise.resolve().then(function() {
                    e = !1, t()
                }))
            }
        } : function(t) {
            var e = !1;
            return function() {
                e || (e = !0, setTimeout(function() {
                    e = !1, t()
                }, ot))
            }
        },
        lt = void 0,
        ct = function() {
            return void 0 === lt && (lt = -1 !== navigator.appVersion.indexOf("MSIE 10")), lt
        },
        ht = function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        },
        ft = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        ut = function(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t
        },
        dt = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        },
        pt = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        gt = pt.slice(3),
        mt = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        },
        _t = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = e.split("-")[1];
                        if (i) {
                            var r = t.offsets,
                                o = r.reference,
                                s = r.popper,
                                a = -1 !== ["bottom", "top"].indexOf(n),
                                l = a ? "left" : "top",
                                c = a ? "width" : "height",
                                h = {
                                    start: ut({}, l, o[l]),
                                    end: ut({}, l, o[l] + o[c] - s[c])
                                };
                            t.offsets.popper = dt({}, s, h[i])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.offset,
                            i = t.placement,
                            r = t.offsets,
                            o = r.popper,
                            s = r.reference,
                            a = i.split("-")[0],
                            l = void 0;
                        return l = G(+n) ? [+n, 0] : Z(n, o, s, a), "left" === a ? (o.top += l[0], o.left -= l[1]) : "right" === a ? (o.top += l[0], o.left += l[1]) : "top" === a ? (o.left += l[0], o.top -= l[1]) : "bottom" === a && (o.left += l[0], o.top += l[1]), t.popper = o, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.boundariesElement || h(t.instance.popper);
                        t.instance.reference === n && (n = h(n));
                        var i = I(t.instance.popper, t.instance.reference, e.padding, n);
                        e.boundaries = i;
                        var r = e.priority,
                            o = t.offsets.popper,
                            s = {
                                primary: function(t) {
                                    var n = o[t];
                                    return o[t] < i[t] && !e.escapeWithReference && (n = Math.max(o[t], i[t])), ut({}, t, n)
                                },
                                secondary: function(t) {
                                    var n = "right" === t ? "left" : "top",
                                        r = o[n];
                                    return o[t] > i[t] && !e.escapeWithReference && (r = Math.min(o[n], i[t] - ("right" === t ? o.width : o.height))), ut({}, n, r)
                                }
                            };
                        return r.forEach(function(t) {
                            var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                            o = dt({}, o, s[e](t))
                        }), t.offsets.popper = o, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.offsets,
                            n = e.popper,
                            i = e.reference,
                            r = t.placement.split("-")[0],
                            o = Math.floor,
                            s = -1 !== ["top", "bottom"].indexOf(r),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            c = s ? "width" : "height";
                        return n[a] < o(i[l]) && (t.offsets.popper[l] = o(i[l]) - n[c]), n[l] > o(i[a]) && (t.offsets.popper[l] = o(i[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(t, e) {
                        var n;
                        if (!Y(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var r = t.placement.split("-")[0],
                            o = t.offsets,
                            s = o.popper,
                            l = o.reference,
                            c = -1 !== ["left", "right"].indexOf(r),
                            h = c ? "height" : "width",
                            f = c ? "Top" : "Left",
                            u = f.toLowerCase(),
                            d = c ? "left" : "top",
                            p = c ? "bottom" : "right",
                            g = S(i)[h];
                        l[p] - g < s[u] && (t.offsets.popper[u] -= s[u] - (l[p] - g)), l[u] + g > s[p] && (t.offsets.popper[u] += l[u] + g - s[p]), t.offsets.popper = E(t.offsets.popper);
                        var m = l[u] + l[h] / 2 - g / 2,
                            _ = a(t.instance.popper),
                            v = parseFloat(_["margin" + f], 10),
                            T = parseFloat(_["border" + f + "Width"], 10),
                            b = m - t.offsets.popper[u] - v - T;
                        return b = Math.max(Math.min(s[h] - g, b), 0), t.arrowElement = i, t.offsets.arrow = (n = {}, ut(n, u, Math.round(b)), ut(n, d, ""), n), t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(t, e) {
                        if (k(t.instance.modifiers, "inner")) return t;
                        if (t.flipped && t.placement === t.originalPlacement) return t;
                        var n = I(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement),
                            i = t.placement.split("-")[0],
                            r = w(i),
                            o = t.placement.split("-")[1] || "",
                            s = [];
                        switch (e.behavior) {
                            case mt.FLIP:
                                s = [i, r];
                                break;
                            case mt.CLOCKWISE:
                                s = X(i);
                                break;
                            case mt.COUNTERCLOCKWISE:
                                s = X(i, !0);
                                break;
                            default:
                                s = e.behavior
                        }
                        return s.forEach(function(a, l) {
                            if (i !== a || s.length === l + 1) return t;
                            i = t.placement.split("-")[0], r = w(i);
                            var c = t.offsets.popper,
                                h = t.offsets.reference,
                                f = Math.floor,
                                u = "left" === i && f(c.right) > f(h.left) || "right" === i && f(c.left) < f(h.right) || "top" === i && f(c.bottom) > f(h.top) || "bottom" === i && f(c.top) < f(h.bottom),
                                d = f(c.left) < f(n.left),
                                p = f(c.right) > f(n.right),
                                g = f(c.top) < f(n.top),
                                m = f(c.bottom) > f(n.bottom),
                                _ = "left" === i && d || "right" === i && p || "top" === i && g || "bottom" === i && m,
                                v = -1 !== ["top", "bottom"].indexOf(i),
                                E = !!e.flipVariations && (v && "start" === o && d || v && "end" === o && p || !v && "start" === o && g || !v && "end" === o && m);
                            (u || _ || E) && (t.flipped = !0, (u || _) && (i = s[l + 1]), E && (o = q(o)), t.placement = i + (o ? "-" + o : ""), t.offsets.popper = dt({}, t.offsets.popper, N(t.instance.popper, t.offsets.reference, t.placement)), t = R(t.instance.modifiers, t, "flip"))
                        }), t
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(t) {
                        var e = t.placement,
                            n = e.split("-")[0],
                            i = t.offsets,
                            r = i.popper,
                            o = i.reference,
                            s = -1 !== ["left", "right"].indexOf(n),
                            a = -1 === ["top", "left"].indexOf(n);
                        return r[s ? "left" : "top"] = o[n] - (a ? r[s ? "width" : "height"] : 0), t.placement = w(e), t.offsets.popper = E(r), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(t) {
                        if (!Y(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            n = L(t.instance.modifiers, function(t) {
                                return "preventOverflow" === t.name
                            }).boundaries;
                        if (e.bottom < n.top || e.left > n.right || e.top > n.bottom || e.right < n.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(t, e) {
                        var n = e.x,
                            i = e.y,
                            r = t.offsets.popper,
                            o = L(t.instance.modifiers, function(t) {
                                return "applyStyle" === t.name
                            }).gpuAcceleration;
                        void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s = void 0 !== o ? o : e.gpuAcceleration,
                            a = T(h(t.instance.popper)),
                            l = {
                                position: r.position
                            },
                            c = {
                                left: Math.floor(r.left),
                                top: Math.floor(r.top),
                                bottom: Math.floor(r.bottom),
                                right: Math.floor(r.right)
                            },
                            f = "bottom" === n ? "top" : "bottom",
                            u = "right" === i ? "left" : "right",
                            d = W("transform"),
                            p = void 0,
                            g = void 0;
                        if (g = "bottom" === f ? -a.height + c.bottom : c.top, p = "right" === u ? -a.width + c.right : c.left, s && d) l[d] = "translate3d(" + p + "px, " + g + "px, 0)", l[f] = 0, l[u] = 0, l.willChange = "transform";
                        else {
                            var m = "bottom" === f ? -1 : 1,
                                _ = "right" === u ? -1 : 1;
                            l[f] = g * m, l[u] = p * _, l.willChange = f + ", " + u
                        }
                        var v = {
                            "x-placement": t.placement
                        };
                        return t.attributes = dt({}, v, t.attributes), t.styles = dt({}, l, t.styles), t.arrowStyles = dt({}, t.offsets.arrow, t.arrowStyles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(t) {
                        return K(t.instance.popper, t.styles), Q(t.instance.popper, t.attributes), t.arrowElement && Object.keys(t.arrowStyles).length && K(t.arrowElement, t.arrowStyles), t
                    },
                    onLoad: function(t, e, n, i, r) {
                        var o = D(r, e, t),
                            s = y(n.placement, o, e, t, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), K(e, {
                            position: "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        vt = function() {
            function t(e, n) {
                var i = this,
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                ht(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = at(this.update.bind(this)), this.options = dt({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = e && e.jquery ? e[0] : e, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(dt({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    i.options.modifiers[e] = dt({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return dt({
                        name: t
                    }, i.options.modifiers[t])
                }).sort(function(t, e) {
                    return t.order - e.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && s(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var o = this.options.eventsEnabled;
                o && this.enableEventListeners(), this.state.eventsEnabled = o
            }
            return ft(t, [{
                key: "update",
                value: function() {
                    return H.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return M.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return x.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return B.call(this)
                }
            }]), t
        }();
    vt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, vt.placements = pt, vt.Defaults = _t;
    var Et = function(t) {
            var e = "dropdown",
                n = "bs.dropdown",
                o = "." + n,
                s = t.fn[e],
                a = new RegExp("38|40|27"),
                l = {
                    HIDE: "hide" + o,
                    HIDDEN: "hidden" + o,
                    SHOW: "show" + o,
                    SHOWN: "shown" + o,
                    CLICK: "click" + o,
                    CLICK_DATA_API: "click.bs.dropdown.data-api",
                    KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
                    KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
                },
                c = {
                    DISABLED: "disabled",
                    SHOW: "show",
                    DROPUP: "dropup",
                    DROPRIGHT: "dropright",
                    DROPLEFT: "dropleft",
                    MENURIGHT: "dropdown-menu-right",
                    MENULEFT: "dropdown-menu-left",
                    POSITION_STATIC: "position-static"
                },
                h = {
                    DATA_TOGGLE: '[data-toggle="dropdown"]',
                    FORM_CHILD: ".dropdown form",
                    MENU: ".dropdown-menu",
                    NAVBAR_NAV: ".navbar-nav",
                    VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
                },
                f = {
                    TOP: "top-start",
                    TOPEND: "top-end",
                    BOTTOM: "bottom-start",
                    BOTTOMEND: "bottom-end",
                    RIGHT: "right-start",
                    RIGHTEND: "right-end",
                    LEFT: "left-start",
                    LEFTEND: "left-end"
                },
                u = {
                    offset: 0,
                    flip: !0,
                    boundary: "scrollParent"
                },
                d = {
                    offset: "(number|string|function)",
                    flip: "boolean",
                    boundary: "(string|element)"
                },
                p = function() {
                    function s(t, e) {
                        this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                    }
                    var p = s.prototype;
                    return p.toggle = function() {
                        if (!this._element.disabled && !t(this._element).hasClass(c.DISABLED)) {
                            var e = s._getParentFromElement(this._element),
                                n = t(this._menu).hasClass(c.SHOW);
                            if (s._clearMenus(), !n) {
                                var i = {
                                        relatedTarget: this._element
                                    },
                                    r = t.Event(l.SHOW, i);
                                if (t(e).trigger(r), !r.isDefaultPrevented()) {
                                    if (!this._inNavbar) {
                                        if (void 0 === vt) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                        var o = this._element;
                                        t(e).hasClass(c.DROPUP) && (t(this._menu).hasClass(c.MENULEFT) || t(this._menu).hasClass(c.MENURIGHT)) && (o = e), "scrollParent" !== this._config.boundary && t(e).addClass(c.POSITION_STATIC), this._popper = new vt(o, this._menu, this._getPopperConfig())
                                    }
                                    "ontouchstart" in document.documentElement && 0 === t(e).closest(h.NAVBAR_NAV).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(c.SHOW), t(e).toggleClass(c.SHOW).trigger(t.Event(l.SHOWN, i))
                                }
                            }
                        }
                    }, p.dispose = function() {
                        t.removeData(this._element, n), t(this._element).off(o), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                    }, p.update = function() {
                        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                    }, p._addEventListeners = function() {
                        var e = this;
                        t(this._element).on(l.CLICK, function(t) {
                            t.preventDefault(), t.stopPropagation(), e.toggle()
                        })
                    }, p._getConfig = function(n) {
                        return n = r({}, this.constructor.Default, t(this._element).data(), n), J.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, p._getMenuElement = function() {
                        if (!this._menu) {
                            var e = s._getParentFromElement(this._element);
                            this._menu = t(e).find(h.MENU)[0]
                        }
                        return this._menu
                    }, p._getPlacement = function() {
                        var e = t(this._element).parent(),
                            n = f.BOTTOM;
                        return e.hasClass(c.DROPUP) ? (n = f.TOP, t(this._menu).hasClass(c.MENURIGHT) && (n = f.TOPEND)) : e.hasClass(c.DROPRIGHT) ? n = f.RIGHT : e.hasClass(c.DROPLEFT) ? n = f.LEFT : t(this._menu).hasClass(c.MENURIGHT) && (n = f.BOTTOMEND), n
                    }, p._detectNavbar = function() {
                        return t(this._element).closest(".navbar").length > 0
                    }, p._getPopperConfig = function() {
                        var t = this,
                            e = {};
                        return "function" == typeof this._config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets) || {}), e
                        } : e.offset = this._config.offset, {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: e,
                                flip: {
                                    enabled: this._config.flip
                                },
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        }
                    }, s._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data(n),
                                r = "object" == typeof e ? e : null;
                            if (i || (i = new s(this, r), t(this).data(n, i)), "string" == typeof e) {
                                if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, s._clearMenus = function(e) {
                        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                            for (var i = t.makeArray(t(h.DATA_TOGGLE)), r = 0; r < i.length; r++) {
                                var o = s._getParentFromElement(i[r]),
                                    a = t(i[r]).data(n),
                                    f = {
                                        relatedTarget: i[r]
                                    };
                                if (a) {
                                    var u = a._menu;
                                    if (t(o).hasClass(c.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(o, e.target))) {
                                        var d = t.Event(l.HIDE, f);
                                        t(o).trigger(d), d.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), i[r].setAttribute("aria-expanded", "false"), t(u).removeClass(c.SHOW), t(o).removeClass(c.SHOW).trigger(t.Event(l.HIDDEN, f)))
                                    }
                                }
                            }
                    }, s._getParentFromElement = function(e) {
                        var n, i = J.getSelectorFromElement(e);
                        return i && (n = t(i)[0]), n || e.parentNode
                    }, s._dataApiKeydownHandler = function(e) {
                        if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(h.MENU).length)) : a.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(c.DISABLED))) {
                            var n = s._getParentFromElement(this),
                                i = t(n).hasClass(c.SHOW);
                            if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
                                var r = t(n).find(h.VISIBLE_ITEMS).get();
                                if (0 !== r.length) {
                                    var o = r.indexOf(e.target);
                                    38 === e.which && o > 0 && o--, 40 === e.which && o < r.length - 1 && o++, o < 0 && (o = 0), r[o].focus()
                                }
                            } else {
                                if (27 === e.which) {
                                    var l = t(n).find(h.DATA_TOGGLE)[0];
                                    t(l).trigger("focus")
                                }
                                t(this).trigger("click")
                            }
                        }
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return u
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return d
                        }
                    }]), s
                }();
            return t(document).on(l.KEYDOWN_DATA_API, h.DATA_TOGGLE, p._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, h.MENU, p._dataApiKeydownHandler).on(l.CLICK_DATA_API + " " + l.KEYUP_DATA_API, p._clearMenus).on(l.CLICK_DATA_API, h.DATA_TOGGLE, function(e) {
                e.preventDefault(), e.stopPropagation(), p._jQueryInterface.call(t(this), "toggle")
            }).on(l.CLICK_DATA_API, h.FORM_CHILD, function(t) {
                t.stopPropagation()
            }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function() {
                return t.fn[e] = s, p._jQueryInterface
            }, p
        }(e),
        Tt = function(t) {
            var e = "modal",
                n = t.fn[e],
                o = {
                    backdrop: !0,
                    keyboard: !0,
                    focus: !0,
                    show: !0
                },
                s = {
                    backdrop: "(boolean|string)",
                    keyboard: "boolean",
                    focus: "boolean",
                    show: "boolean"
                },
                a = {
                    HIDE: "hide.bs.modal",
                    HIDDEN: "hidden.bs.modal",
                    SHOW: "show.bs.modal",
                    SHOWN: "shown.bs.modal",
                    FOCUSIN: "focusin.bs.modal",
                    RESIZE: "resize.bs.modal",
                    CLICK_DISMISS: "click.dismiss.bs.modal",
                    KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
                    MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
                    MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
                    CLICK_DATA_API: "click.bs.modal.data-api"
                },
                l = {
                    SCROLLBAR_MEASURER: "modal-scrollbar-measure",
                    BACKDROP: "modal-backdrop",
                    OPEN: "modal-open",
                    FADE: "fade",
                    SHOW: "show"
                },
                c = {
                    DIALOG: ".modal-dialog",
                    DATA_TOGGLE: '[data-toggle="modal"]',
                    DATA_DISMISS: '[data-dismiss="modal"]',
                    FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                    STICKY_CONTENT: ".sticky-top",
                    NAVBAR_TOGGLER: ".navbar-toggler"
                },
                h = function() {
                    function n(e, n) {
                        this._config = this._getConfig(n), this._element = e, this._dialog = t(e).find(c.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                    }
                    var h = n.prototype;
                    return h.toggle = function(t) {
                        return this._isShown ? this.hide() : this.show(t)
                    }, h.show = function(e) {
                        var n = this;
                        if (!this._isTransitioning && !this._isShown) {
                            J.supportsTransitionEnd() && t(this._element).hasClass(l.FADE) && (this._isTransitioning = !0);
                            var i = t.Event(a.SHOW, {
                                relatedTarget: e
                            });
                            t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(l.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(a.CLICK_DISMISS, c.DATA_DISMISS, function(t) {
                                return n.hide(t)
                            }), t(this._dialog).on(a.MOUSEDOWN_DISMISS, function() {
                                t(n._element).one(a.MOUSEUP_DISMISS, function(e) {
                                    t(e.target).is(n._element) && (n._ignoreBackdropClick = !0)
                                })
                            }), this._showBackdrop(function() {
                                return n._showElement(e)
                            }))
                        }
                    }, h.hide = function(e) {
                        var n = this;
                        if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                            var i = t.Event(a.HIDE);
                            if (t(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                                this._isShown = !1;
                                var r = J.supportsTransitionEnd() && t(this._element).hasClass(l.FADE);
                                r && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(a.FOCUSIN), t(this._element).removeClass(l.SHOW), t(this._element).off(a.CLICK_DISMISS), t(this._dialog).off(a.MOUSEDOWN_DISMISS), r ? t(this._element).one(J.TRANSITION_END, function(t) {
                                    return n._hideModal(t)
                                }).emulateTransitionEnd(300) : this._hideModal()
                            }
                        }
                    }, h.dispose = function() {
                        t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(".bs.modal"), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                    }, h.handleUpdate = function() {
                        this._adjustDialog()
                    }, h._getConfig = function(t) {
                        return t = r({}, o, t), J.typeCheckConfig(e, t, s), t
                    }, h._showElement = function(e) {
                        var n = this,
                            i = J.supportsTransitionEnd() && t(this._element).hasClass(l.FADE);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && J.reflow(this._element), t(this._element).addClass(l.SHOW), this._config.focus && this._enforceFocus();
                        var r = t.Event(a.SHOWN, {
                                relatedTarget: e
                            }),
                            o = function() {
                                n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(r)
                            };
                        i ? t(this._dialog).one(J.TRANSITION_END, o).emulateTransitionEnd(300) : o()
                    }, h._enforceFocus = function() {
                        var e = this;
                        t(document).off(a.FOCUSIN).on(a.FOCUSIN, function(n) {
                            document !== n.target && e._element !== n.target && 0 === t(e._element).has(n.target).length && e._element.focus()
                        })
                    }, h._setEscapeEvent = function() {
                        var e = this;
                        this._isShown && this._config.keyboard ? t(this._element).on(a.KEYDOWN_DISMISS, function(t) {
                            27 === t.which && (t.preventDefault(), e.hide())
                        }) : this._isShown || t(this._element).off(a.KEYDOWN_DISMISS)
                    }, h._setResizeEvent = function() {
                        var e = this;
                        this._isShown ? t(window).on(a.RESIZE, function(t) {
                            return e.handleUpdate(t)
                        }) : t(window).off(a.RESIZE)
                    }, h._hideModal = function() {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                            t(document.body).removeClass(l.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(a.HIDDEN)
                        })
                    }, h._removeBackdrop = function() {
                        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                    }, h._showBackdrop = function(e) {
                        var n = this,
                            i = t(this._element).hasClass(l.FADE) ? l.FADE : "";
                        if (this._isShown && this._config.backdrop) {
                            var r = J.supportsTransitionEnd() && i;
                            if (this._backdrop = document.createElement("div"), this._backdrop.className = l.BACKDROP, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(a.CLICK_DISMISS, function(t) {
                                    n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide())
                                }), r && J.reflow(this._backdrop), t(this._backdrop).addClass(l.SHOW), !e) return;
                            if (!r) return void e();
                            t(this._backdrop).one(J.TRANSITION_END, e).emulateTransitionEnd(150)
                        } else if (!this._isShown && this._backdrop) {
                            t(this._backdrop).removeClass(l.SHOW);
                            var o = function() {
                                n._removeBackdrop(), e && e()
                            };
                            J.supportsTransitionEnd() && t(this._element).hasClass(l.FADE) ? t(this._backdrop).one(J.TRANSITION_END, o).emulateTransitionEnd(150) : o()
                        } else e && e()
                    }, h._adjustDialog = function() {
                        var t = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, h._resetAdjustments = function() {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, h._checkScrollbar = function() {
                        var t = document.body.getBoundingClientRect();
                        this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, h._setScrollbar = function() {
                        var e = this;
                        if (this._isBodyOverflowing) {
                            t(c.FIXED_CONTENT).each(function(n, i) {
                                var r = t(i)[0].style.paddingRight,
                                    o = t(i).css("padding-right");
                                t(i).data("padding-right", r).css("padding-right", parseFloat(o) + e._scrollbarWidth + "px")
                            }), t(c.STICKY_CONTENT).each(function(n, i) {
                                var r = t(i)[0].style.marginRight,
                                    o = t(i).css("margin-right");
                                t(i).data("margin-right", r).css("margin-right", parseFloat(o) - e._scrollbarWidth + "px")
                            }), t(c.NAVBAR_TOGGLER).each(function(n, i) {
                                var r = t(i)[0].style.marginRight,
                                    o = t(i).css("margin-right");
                                t(i).data("margin-right", r).css("margin-right", parseFloat(o) + e._scrollbarWidth + "px")
                            });
                            var n = document.body.style.paddingRight,
                                i = t("body").css("padding-right");
                            t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px")
                        }
                    }, h._resetScrollbar = function() {
                        t(c.FIXED_CONTENT).each(function(e, n) {
                            var i = t(n).data("padding-right");
                            void 0 !== i && t(n).css("padding-right", i).removeData("padding-right")
                        }), t(c.STICKY_CONTENT + ", " + c.NAVBAR_TOGGLER).each(function(e, n) {
                            var i = t(n).data("margin-right");
                            void 0 !== i && t(n).css("margin-right", i).removeData("margin-right")
                        });
                        var e = t("body").data("padding-right");
                        void 0 !== e && t("body").css("padding-right", e).removeData("padding-right")
                    }, h._getScrollbarWidth = function() {
                        var t = document.createElement("div");
                        t.className = l.SCROLLBAR_MEASURER, document.body.appendChild(t);
                        var e = t.getBoundingClientRect().width - t.clientWidth;
                        return document.body.removeChild(t), e
                    }, n._jQueryInterface = function(e, i) {
                        return this.each(function() {
                            var o = t(this).data("bs.modal"),
                                s = r({}, n.Default, t(this).data(), "object" == typeof e && e);
                            if (o || (o = new n(this, s), t(this).data("bs.modal", o)), "string" == typeof e) {
                                if (void 0 === o[e]) throw new TypeError('No method named "' + e + '"');
                                o[e](i)
                            } else s.show && o.show(i)
                        })
                    }, i(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return o
                        }
                    }]), n
                }();
            return t(document).on(a.CLICK_DATA_API, c.DATA_TOGGLE, function(e) {
                var n, i = this,
                    o = J.getSelectorFromElement(this);
                o && (n = t(o)[0]);
                var s = t(n).data("bs.modal") ? "toggle" : r({}, t(n).data(), t(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();
                var l = t(n).one(a.SHOW, function(e) {
                    e.isDefaultPrevented() || l.one(a.HIDDEN, function() {
                        t(i).is(":visible") && i.focus()
                    })
                });
                h._jQueryInterface.call(t(n), s, this)
            }), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function() {
                return t.fn[e] = n, h._jQueryInterface
            }, h
        }(e),
        bt = function(t) {
            var e = "tooltip",
                n = ".bs.tooltip",
                o = t.fn[e],
                s = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                a = {
                    animation: "boolean",
                    template: "string",
                    title: "(string|element|function)",
                    trigger: "string",
                    delay: "(number|object)",
                    html: "boolean",
                    selector: "(string|boolean)",
                    placement: "(string|function)",
                    offset: "(number|string)",
                    container: "(string|element|boolean)",
                    fallbackPlacement: "(string|array)",
                    boundary: "(string|element)"
                },
                l = {
                    AUTO: "auto",
                    TOP: "top",
                    RIGHT: "right",
                    BOTTOM: "bottom",
                    LEFT: "left"
                },
                c = {
                    animation: !0,
                    template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                    trigger: "hover focus",
                    title: "",
                    delay: 0,
                    html: !1,
                    selector: !1,
                    placement: "top",
                    offset: 0,
                    container: !1,
                    fallbackPlacement: "flip",
                    boundary: "scrollParent"
                },
                h = {
                    SHOW: "show",
                    OUT: "out"
                },
                f = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    INSERTED: "inserted" + n,
                    CLICK: "click" + n,
                    FOCUSIN: "focusin" + n,
                    FOCUSOUT: "focusout" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n
                },
                u = {
                    FADE: "fade",
                    SHOW: "show"
                },
                d = {
                    TOOLTIP: ".tooltip",
                    TOOLTIP_INNER: ".tooltip-inner",
                    ARROW: ".arrow"
                },
                p = {
                    HOVER: "hover",
                    FOCUS: "focus",
                    CLICK: "click",
                    MANUAL: "manual"
                },
                g = function() {
                    function o(t, e) {
                        if (void 0 === vt) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                        this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                    }
                    var g = o.prototype;
                    return g.enable = function() {
                        this._isEnabled = !0
                    }, g.disable = function() {
                        this._isEnabled = !1
                    }, g.toggleEnabled = function() {
                        this._isEnabled = !this._isEnabled
                    }, g.toggle = function(e) {
                        if (this._isEnabled)
                            if (e) {
                                var n = this.constructor.DATA_KEY,
                                    i = t(e.currentTarget).data(n);
                                i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                            } else {
                                if (t(this.getTipElement()).hasClass(u.SHOW)) return void this._leave(null, this);
                                this._enter(null, this)
                            }
                    }, g.dispose = function() {
                        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                    }, g.show = function() {
                        var e = this;
                        if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                        var n = t.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            t(this.element).trigger(n);
                            var i = t.contains(this.element.ownerDocument.documentElement, this.element);
                            if (n.isDefaultPrevented() || !i) return;
                            var r = this.getTipElement(),
                                s = J.getUID(this.constructor.NAME);
                            r.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && t(r).addClass(u.FADE);
                            var a = "function" == typeof this.config.placement ? this.config.placement.call(this, r, this.element) : this.config.placement,
                                l = this._getAttachment(a);
                            this.addAttachmentClass(l);
                            var c = !1 === this.config.container ? document.body : t(this.config.container);
                            t(r).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(r).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new vt(this.element, r, {
                                placement: l,
                                modifiers: {
                                    offset: {
                                        offset: this.config.offset
                                    },
                                    flip: {
                                        behavior: this.config.fallbackPlacement
                                    },
                                    arrow: {
                                        element: d.ARROW
                                    },
                                    preventOverflow: {
                                        boundariesElement: this.config.boundary
                                    }
                                },
                                onCreate: function(t) {
                                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                },
                                onUpdate: function(t) {
                                    e._handlePopperPlacementChange(t)
                                }
                            }), t(r).addClass(u.SHOW), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                            var f = function() {
                                e.config.animation && e._fixTransition();
                                var n = e._hoverState;
                                e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === h.OUT && e._leave(null, e)
                            };
                            J.supportsTransitionEnd() && t(this.tip).hasClass(u.FADE) ? t(this.tip).one(J.TRANSITION_END, f).emulateTransitionEnd(o._TRANSITION_DURATION) : f()
                        }
                    }, g.hide = function(e) {
                        var n = this,
                            i = this.getTipElement(),
                            r = t.Event(this.constructor.Event.HIDE),
                            o = function() {
                                n._hoverState !== h.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e()
                            };
                        t(this.element).trigger(r), r.isDefaultPrevented() || (t(i).removeClass(u.SHOW), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[p.CLICK] = !1, this._activeTrigger[p.FOCUS] = !1, this._activeTrigger[p.HOVER] = !1, J.supportsTransitionEnd() && t(this.tip).hasClass(u.FADE) ? t(i).one(J.TRANSITION_END, o).emulateTransitionEnd(150) : o(), this._hoverState = "")
                    }, g.update = function() {
                        null !== this._popper && this._popper.scheduleUpdate()
                    }, g.isWithContent = function() {
                        return Boolean(this.getTitle())
                    }, g.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-tooltip-" + e)
                    }, g.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, g.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(d.TOOLTIP_INNER), this.getTitle()), e.removeClass(u.FADE + " " + u.SHOW)
                    }, g.setElementContent = function(e, n) {
                        var i = this.config.html;
                        "object" == typeof n && (n.nodeType || n.jquery) ? i ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[i ? "html" : "text"](n)
                    }, g.getTitle = function() {
                        var t = this.element.getAttribute("data-original-title");
                        return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                    }, g._getAttachment = function(t) {
                        return l[t.toUpperCase()]
                    }, g._setListeners = function() {
                        var e = this;
                        this.config.trigger.split(" ").forEach(function(n) {
                            if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                return e.toggle(t)
                            });
                            else if (n !== p.MANUAL) {
                                var i = n === p.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                    r = n === p.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                t(e.element).on(i, e.config.selector, function(t) {
                                    return e._enter(t)
                                }).on(r, e.config.selector, function(t) {
                                    return e._leave(t)
                                })
                            }
                            t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                return e.hide()
                            })
                        }), this.config.selector ? this.config = r({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, g._fixTitle = function() {
                        var t = typeof this.element.getAttribute("data-original-title");
                        (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, g._enter = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? p.FOCUS : p.HOVER] = !0), t(n.getTipElement()).hasClass(u.SHOW) || n._hoverState === h.SHOW ? n._hoverState = h.SHOW : (clearTimeout(n._timeout), n._hoverState = h.SHOW, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function() {
                            n._hoverState === h.SHOW && n.show()
                        }, n.config.delay.show) : n.show())
                    }, g._leave = function(e, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? p.FOCUS : p.HOVER] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = h.OUT, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function() {
                            n._hoverState === h.OUT && n.hide()
                        }, n.config.delay.hide) : n.hide())
                    }, g._isWithActiveTrigger = function() {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1
                    }, g._getConfig = function(n) {
                        return "number" == typeof(n = r({}, this.constructor.Default, t(this.element).data(), n)).delay && (n.delay = {
                            show: n.delay,
                            hide: n.delay
                        }), "number" == typeof n.title && (n.title = n.title.toString()), "number" == typeof n.content && (n.content = n.content.toString()), J.typeCheckConfig(e, n, this.constructor.DefaultType), n
                    }, g._getDelegateConfig = function() {
                        var t = {};
                        if (this.config)
                            for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                        return t
                    }, g._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(s);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, g._handlePopperPlacementChange = function(t) {
                        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                    }, g._fixTransition = function() {
                        var e = this.getTipElement(),
                            n = this.config.animation;
                        null === e.getAttribute("x-placement") && (t(e).removeClass(u.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
                    }, o._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data("bs.tooltip"),
                                i = "object" == typeof e && e;
                            if ((n || !/dispose|hide/.test(e)) && (n || (n = new o(this, i), t(this).data("bs.tooltip", n)), "string" == typeof e)) {
                                if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, i(o, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return c
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.tooltip"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return f
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return a
                        }
                    }]), o
                }();
            return t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function() {
                return t.fn[e] = o, g._jQueryInterface
            }, g
        }(e),
        Ct = function(t) {
            var e = "popover",
                n = ".bs.popover",
                s = t.fn[e],
                a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                l = r({}, bt.Default, {
                    placement: "right",
                    trigger: "click",
                    content: "",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }),
                c = r({}, bt.DefaultType, {
                    content: "(string|element|function)"
                }),
                h = {
                    FADE: "fade",
                    SHOW: "show"
                },
                f = {
                    TITLE: ".popover-header",
                    CONTENT: ".popover-body"
                },
                u = {
                    HIDE: "hide" + n,
                    HIDDEN: "hidden" + n,
                    SHOW: "show" + n,
                    SHOWN: "shown" + n,
                    INSERTED: "inserted" + n,
                    CLICK: "click" + n,
                    FOCUSIN: "focusin" + n,
                    FOCUSOUT: "focusout" + n,
                    MOUSEENTER: "mouseenter" + n,
                    MOUSELEAVE: "mouseleave" + n
                },
                d = function(r) {
                    function s() {
                        return r.apply(this, arguments) || this
                    }
                    o(s, r);
                    var d = s.prototype;
                    return d.isWithContent = function() {
                        return this.getTitle() || this._getContent()
                    }, d.addAttachmentClass = function(e) {
                        t(this.getTipElement()).addClass("bs-popover-" + e)
                    }, d.getTipElement = function() {
                        return this.tip = this.tip || t(this.config.template)[0], this.tip
                    }, d.setContent = function() {
                        var e = t(this.getTipElement());
                        this.setElementContent(e.find(f.TITLE), this.getTitle());
                        var n = this._getContent();
                        "function" == typeof n && (n = n.call(this.element)), this.setElementContent(e.find(f.CONTENT), n), e.removeClass(h.FADE + " " + h.SHOW)
                    }, d._getContent = function() {
                        return this.element.getAttribute("data-content") || this.config.content
                    }, d._cleanTipClass = function() {
                        var e = t(this.getTipElement()),
                            n = e.attr("class").match(a);
                        null !== n && n.length > 0 && e.removeClass(n.join(""))
                    }, s._jQueryInterface = function(e) {
                        return this.each(function() {
                            var n = t(this).data("bs.popover"),
                                i = "object" == typeof e ? e : null;
                            if ((n || !/destroy|hide/.test(e)) && (n || (n = new s(this, i), t(this).data("bs.popover", n)), "string" == typeof e)) {
                                if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        })
                    }, i(s, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return l
                        }
                    }, {
                        key: "NAME",
                        get: function() {
                            return e
                        }
                    }, {
                        key: "DATA_KEY",
                        get: function() {
                            return "bs.popover"
                        }
                    }, {
                        key: "Event",
                        get: function() {
                            return u
                        }
                    }, {
                        key: "EVENT_KEY",
                        get: function() {
                            return n
                        }
                    }, {
                        key: "DefaultType",
                        get: function() {
                            return c
                        }
                    }]), s
                }(bt);
            return t.fn[e] = d._jQueryInterface, t.fn[e].Constructor = d, t.fn[e].noConflict = function() {
                return t.fn[e] = s, d._jQueryInterface
            }, d
        }(e),
        At = function(t) {
            var e = "scrollspy",
                n = t.fn[e],
                o = {
                    offset: 10,
                    method: "auto",
                    target: ""
                },
                s = {
                    offset: "number",
                    method: "string",
                    target: "(string|element)"
                },
                a = {
                    ACTIVATE: "activate.bs.scrollspy",
                    SCROLL: "scroll.bs.scrollspy",
                    LOAD_DATA_API: "load.bs.scrollspy.data-api"
                },
                l = {
                    DROPDOWN_ITEM: "dropdown-item",
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active"
                },
                c = {
                    DATA_SPY: '[data-spy="scroll"]',
                    ACTIVE: ".active",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    NAV_LINKS: ".nav-link",
                    NAV_ITEMS: ".nav-item",
                    LIST_ITEMS: ".list-group-item",
                    DROPDOWN: ".dropdown",
                    DROPDOWN_ITEMS: ".dropdown-item",
                    DROPDOWN_TOGGLE: ".dropdown-toggle"
                },
                h = {
                    OFFSET: "offset",
                    POSITION: "position"
                },
                f = function() {
                    function n(e, n) {
                        var i = this;
                        this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(n), this._selector = this._config.target + " " + c.NAV_LINKS + "," + this._config.target + " " + c.LIST_ITEMS + "," + this._config.target + " " + c.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(a.SCROLL, function(t) {
                            return i._process(t)
                        }), this.refresh(), this._process()
                    }
                    var f = n.prototype;
                    return f.refresh = function() {
                        var e = this,
                            n = this._scrollElement === this._scrollElement.window ? h.OFFSET : h.POSITION,
                            i = "auto" === this._config.method ? n : this._config.method,
                            r = i === h.POSITION ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                            var n, o = J.getSelectorFromElement(e);
                            if (o && (n = t(o)[0]), n) {
                                var s = n.getBoundingClientRect();
                                if (s.width || s.height) return [t(n)[i]().top + r, o]
                            }
                            return null
                        }).filter(function(t) {
                            return t
                        }).sort(function(t, e) {
                            return t[0] - e[0]
                        }).forEach(function(t) {
                            e._offsets.push(t[0]), e._targets.push(t[1])
                        })
                    }, f.dispose = function() {
                        t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, f._getConfig = function(n) {
                        if ("string" != typeof(n = r({}, o, n)).target) {
                            var i = t(n.target).attr("id");
                            i || (i = J.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i
                        }
                        return J.typeCheckConfig(e, n, s), n
                    }, f._getScrollTop = function() {
                        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                    }, f._getScrollHeight = function() {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, f._getOffsetHeight = function() {
                        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                    }, f._process = function() {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            n = this._config.offset + e - this._getOffsetHeight();
                        if (this._scrollHeight !== e && this.refresh(), t >= n) {
                            var i = this._targets[this._targets.length - 1];
                            this._activeTarget !== i && this._activate(i)
                        } else {
                            if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                            for (var r = this._offsets.length; r--;) this._activeTarget !== this._targets[r] && t >= this._offsets[r] && (void 0 === this._offsets[r + 1] || t < this._offsets[r + 1]) && this._activate(this._targets[r])
                        }
                    }, f._activate = function(e) {
                        this._activeTarget = e, this._clear();
                        var n = this._selector.split(",");
                        n = n.map(function(t) {
                            return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                        });
                        var i = t(n.join(","));
                        i.hasClass(l.DROPDOWN_ITEM) ? (i.closest(c.DROPDOWN).find(c.DROPDOWN_TOGGLE).addClass(l.ACTIVE), i.addClass(l.ACTIVE)) : (i.addClass(l.ACTIVE), i.parents(c.NAV_LIST_GROUP).prev(c.NAV_LINKS + ", " + c.LIST_ITEMS).addClass(l.ACTIVE), i.parents(c.NAV_LIST_GROUP).prev(c.NAV_ITEMS).children(c.NAV_LINKS).addClass(l.ACTIVE)), t(this._scrollElement).trigger(a.ACTIVATE, {
                            relatedTarget: e
                        })
                    }, f._clear = function() {
                        t(this._selector).filter(c.ACTIVE).removeClass(l.ACTIVE)
                    }, n._jQueryInterface = function(e) {
                        return this.each(function() {
                            var i = t(this).data("bs.scrollspy"),
                                r = "object" == typeof e && e;
                            if (i || (i = new n(this, r), t(this).data("bs.scrollspy", i)), "string" == typeof e) {
                                if (void 0 === i[e]) throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        })
                    }, i(n, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }, {
                        key: "Default",
                        get: function() {
                            return o
                        }
                    }]), n
                }();
            return t(window).on(a.LOAD_DATA_API, function() {
                for (var e = t.makeArray(t(c.DATA_SPY)), n = e.length; n--;) {
                    var i = t(e[n]);
                    f._jQueryInterface.call(i, i.data())
                }
            }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function() {
                return t.fn[e] = n, f._jQueryInterface
            }, f
        }(e),
        It = function(t) {
            var e = t.fn.tab,
                n = {
                    HIDE: "hide.bs.tab",
                    HIDDEN: "hidden.bs.tab",
                    SHOW: "show.bs.tab",
                    SHOWN: "shown.bs.tab",
                    CLICK_DATA_API: "click.bs.tab.data-api"
                },
                r = {
                    DROPDOWN_MENU: "dropdown-menu",
                    ACTIVE: "active",
                    DISABLED: "disabled",
                    FADE: "fade",
                    SHOW: "show"
                },
                o = {
                    DROPDOWN: ".dropdown",
                    NAV_LIST_GROUP: ".nav, .list-group",
                    ACTIVE: ".active",
                    ACTIVE_UL: "> li > .active",
                    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
                    DROPDOWN_TOGGLE: ".dropdown-toggle",
                    DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
                },
                s = function() {
                    function e(t) {
                        this._element = t
                    }
                    var s = e.prototype;
                    return s.show = function() {
                        var e = this;
                        if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(r.ACTIVE) || t(this._element).hasClass(r.DISABLED))) {
                            var i, s, a = t(this._element).closest(o.NAV_LIST_GROUP)[0],
                                l = J.getSelectorFromElement(this._element);
                            if (a) {
                                var c = "UL" === a.nodeName ? o.ACTIVE_UL : o.ACTIVE;
                                s = t.makeArray(t(a).find(c)), s = s[s.length - 1]
                            }
                            var h = t.Event(n.HIDE, {
                                    relatedTarget: this._element
                                }),
                                f = t.Event(n.SHOW, {
                                    relatedTarget: s
                                });
                            if (s && t(s).trigger(h), t(this._element).trigger(f), !f.isDefaultPrevented() && !h.isDefaultPrevented()) {
                                l && (i = t(l)[0]), this._activate(this._element, a);
                                var u = function() {
                                    var i = t.Event(n.HIDDEN, {
                                            relatedTarget: e._element
                                        }),
                                        r = t.Event(n.SHOWN, {
                                            relatedTarget: s
                                        });
                                    t(s).trigger(i), t(e._element).trigger(r)
                                };
                                i ? this._activate(i, i.parentNode, u) : u()
                            }
                        }
                    }, s.dispose = function() {
                        t.removeData(this._element, "bs.tab"), this._element = null
                    }, s._activate = function(e, n, i) {
                        var s, a = this,
                            l = (s = "UL" === n.nodeName ? t(n).find(o.ACTIVE_UL) : t(n).children(o.ACTIVE))[0],
                            c = i && J.supportsTransitionEnd() && l && t(l).hasClass(r.FADE),
                            h = function() {
                                return a._transitionComplete(e, l, i)
                            };
                        l && c ? t(l).one(J.TRANSITION_END, h).emulateTransitionEnd(150) : h()
                    }, s._transitionComplete = function(e, n, i) {
                        if (n) {
                            t(n).removeClass(r.SHOW + " " + r.ACTIVE);
                            var s = t(n.parentNode).find(o.DROPDOWN_ACTIVE_CHILD)[0];
                            s && t(s).removeClass(r.ACTIVE), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                        }
                        if (t(e).addClass(r.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), J.reflow(e), t(e).addClass(r.SHOW), e.parentNode && t(e.parentNode).hasClass(r.DROPDOWN_MENU)) {
                            var a = t(e).closest(o.DROPDOWN)[0];
                            a && t(a).find(o.DROPDOWN_TOGGLE).addClass(r.ACTIVE), e.setAttribute("aria-expanded", !0)
                        }
                        i && i()
                    }, e._jQueryInterface = function(n) {
                        return this.each(function() {
                            var i = t(this),
                                r = i.data("bs.tab");
                            if (r || (r = new e(this), i.data("bs.tab", r)), "string" == typeof n) {
                                if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                                r[n]()
                            }
                        })
                    }, i(e, null, [{
                        key: "VERSION",
                        get: function() {
                            return "4.0.0"
                        }
                    }]), e
                }();
            return t(document).on(n.CLICK_DATA_API, o.DATA_TOGGLE, function(e) {
                e.preventDefault(), s._jQueryInterface.call(t(this), "show")
            }), t.fn.tab = s._jQueryInterface, t.fn.tab.Constructor = s, t.fn.tab.noConflict = function() {
                return t.fn.tab = e, s._jQueryInterface
            }, s
        }(e);
    ! function(t) {
        if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
        var e = t.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
    }(e), t.Util = J, t.Alert = $, t.Button = tt, t.Carousel = et, t.Collapse = nt, t.Dropdown = Et, t.Modal = Tt, t.Popover = Ct, t.Scrollspy = At, t.Tab = It, t.Tooltip = bt, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});