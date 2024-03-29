// source --> https://www.donut.com/wp-content/plugins/svg-support/js/min/svgs-inline-min.js?ver=1.0.0
jQuery(document).ready(function ($) {
    (bodhisvgsInlineSupport = function () {
        if ("true" === ForceInlineSVGActive && jQuery("img").each(function () {
            jQuery(this).attr("src").match(/\.(svg)/) && (jQuery(this).hasClass(cssTarget.ForceInlineSVG) || jQuery(this).addClass(cssTarget.ForceInlineSVG))
        }), String.prototype.endsWith || (String.prototype.endsWith = function (t, e) {
            var r = this.toString();
            ("number" != typeof e || !isFinite(e) || Math.floor(e) !== e || e > r.length) && (e = r.length), e -= t.length;
            var s = r.lastIndexOf(t, e);
            return -1 !== s && s === e
        }), String.prototype.endsWith = function (t) {
            var e = this.length - t.length;
            return e >= 0 && this.lastIndexOf(t) === e
        }, "true" === ForceInlineSVGActive) var t = "img." !== cssTarget.Bodhi ? cssTarget.Bodhi : "img.style-svg"; else var t = "img." !== cssTarget ? cssTarget : "img.style-svg";
        $(t).each(function (t) {
            var e = jQuery(this), r = e.attr("id"), s = e.attr("class"), i = e.attr("src");
            i.endsWith("svg") && $.get(i, function (i) {
                var n = $(i).find("svg"), a = n.attr("id");
                void 0 === r ? void 0 === a ? (r = "svg-replaced-" + t, n = n.attr("id", r)) : r = a : n = n.attr("id", r), void 0 !== s && (n = n.attr("class", s + " replaced-svg svg-replaced-" + t)), n = n.removeAttr("xmlns:a"), e.replaceWith(n), $(document).trigger("svg.loaded", [r])
            }, "xml")
        })
    })()
});
