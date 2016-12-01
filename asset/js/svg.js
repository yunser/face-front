/**
 * @author zhaoguo
 */
define(function(require) {
    window.toUTF8 = function(str) {
        if( typeof( str ) !== "string" ) {
            throw new TypeError("toUTF8 function only accept a string as its parameter.");
        }
        var ret = [];
        var c1, c2, c3;
        var cc = 0;
        for( var i = 0, l = str.length; i < l; i++ ) {
            cc = str.charCodeAt(i);
            if( cc > 0xFFFF ) { throw new Error("InvalidCharacterError"); }
            if( cc > 0x80 ) {
                if( cc < 0x07FF ) {
                    c1 = String.fromCharCode( ( cc >>>  6 ) | 0xC0 );
                    c2 = String.fromCharCode( ( cc & 0x3F ) | 0x80 );
                    ret.push( c1, c2 );
                } else {
                    c1 = String.fromCharCode(   ( cc >>> 12 )          | 0xE0 );
                    c2 = String.fromCharCode( ( ( cc >>>  6 ) & 0x3F ) | 0x80 );
                    c3 = String.fromCharCode(   ( cc          & 0x3F ) | 0x80 );
                    ret.push( c1, c2, c3 );
                }
            } else {
                ret.push(str[i]);
            }
        }
        return ret.join('');
    };

    var SVG = require('svgjs');
    
    var gs = {}, g;
    return {
        addPath: function(parentId, data, key, faceColor, hairColor, style) {
            var _svg = SVG('svg');
            if (gs[parentId]) {
                SVG.get(parentId + '2').clear();
                SVG.get('hairBack2').clear();
                gs[parentId] = null;
            }
            if (!gs[parentId]) {
                gs[parentId] = SVG.get(parentId + '2');
            }
            var _data = data[key], obj;
            if (!_data) {
                return false;
            }
            g = gs[parentId];
            if (_data.frontSide.frontPath) {
                // frontpath
                for (var i = 0, path; path = _data.frontSide.frontPath[i]; i++) {
                    if (path.type != null) {
                        if (path.type === 'line') {
                            obj = g.line(0,0,0,0);
                        } else {
                            obj = g[path.type]();
                        }
                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }
                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                obj.attr(attr.attr, attr.val);
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    obj.fill(faceColor)
                                }
                            }
                            else if (attr.attr == 'text') {
                                p.text(attr.val);
                            }
                            else {
                                obj.attr(attr.attr, attr.val);
                            }
                        }
                    }
                    if (path.path != null) {
                        obj = g.path();
                        obj.plot(path.path);
                        if (path.style.length > 0) {
                            obj.fill(hairColor);
                        }
                    }
                    if (style != null) {
                        console.log('未处理样式'+style);
                    }
                }
            }
            if (_data.frontSide.path) {
                // 在 svg 中插入一個 path
                for (var i = 0, path; path = _data.frontSide.path[i]; i++) {
                    if (path.type != null) {
                        if (path.type === 'line') {
                            obj = g.line(0,0,0,0);
                        } else {
                            obj = g[path.type]();
                        }

                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }

                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                obj.attr(attr.attr, attr.val)
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    obj.fill(faceColor);
                                }
                            }
                            else if (attr.attr == 'text') {
                                p.text(attr.val);
                            }
                            else {
                                obj.attr(attr.attr, attr.val)
                            }
                        }
                    }
                    if (path.path != null) {
                        obj = g.path();
                        obj.plot(path.path);
                        if (path.style.length > 0) {
                            obj.fill(hairColor);
                        }
                    }
                    if (style != null) {
                        console.log('未处理样式'+style);
                    }
                }
            }
            if (_data.frontSide.backPath) {
                if (parentId == 'hair') {
                    g = SVG('hairBack2');
                }
                // 在 svg 中插入一個 path 
                for (var i = 0, path; path = _data.frontSide.backPath[i]; i++) {
                    if (path.type != null) {
                        if (path.type === 'line') {
                            obj = g.line(0,0,0,0);
                        } else {
                            obj = g[path.type]();
                        }

                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }
                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                obj.attr(attr.attr, attr.val)
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    obj.fill(faceColor);
                                }
                            }
                            else if (attr.attr == 'text') {
                                //p.text(attr.val);
                                console.log('未处理文字')
                            }
                            else {
                                obj.attr(attr.attr, attr.val)
                            }
                        }
                    }
                    if (path.path != null) {
                        obj = g.path();
                        obj.plot(path.path);
                        if (path.style.length > 0) {
                            obj.fill(hairColor);
                        }
                    }
                    if (style != null) {
                        console.log('未处理样式', style);
                    }
                }
            }
            _data = null;
        },
        getSVGPathes: function() {
            var html = $('#svg')[0].outerHTML;
            return html;
        },
        createDataURL: function() {
            html = window.toUTF8(this.getSVGPathes());
            return 'data:image/svg+xml;base64,'+ btoa(html);
        }
    };
});
