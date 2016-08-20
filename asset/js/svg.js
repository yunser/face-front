/**
 * @author zhaoguo
 */
define([
    '../lib/d3v3min'
], function(d3) {
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
    window.fromUTF8 = function(str) {
        if( typeof( str ) !== "string" ) {
            throw new TypeError("fromUTF8 function only accept a string as its parameter.");
        }
        if( /[^\x20-\xEF]/.test(str) ) { throw new Error("InvalidCharacterError"); }
        var ret = [];
        var cc = 0;
        var ct = 0;
        for( var i = 0, l = str.length; i < l; ) {
            cc = str.charCodeAt( i++ );
            if( cc > 0xE0 ) {
                ct =  ( cc & 0x0F ) << 12;
                cc = str.charCodeAt( i++ );
                ct |= ( cc & 0x3F ) <<  6;
                cc = str.charCodeAt( i++ );
                ct |=   cc & 0x3F        ;
                ret.push( String.fromCharCode( ct ) );
            } else if( cc > 0xC0 ) {
                ct =  ( cc & 0x1F ) << 6;
                cc = str.charCodeAt( i++ );
                ct |= ( cc & 0x3F ) << 6;
                ret.push( String.fromCharCode( ct ) );
            } else if( cc > 0x80 ) {
                //throw new Error("InvalidCharacterError");
            } else {
                ret.push( str[i] );
            }
        }
        return ret.join('');
    };
    var svgs = {}, svg;
    return {
        addPath: function(parentId, data, key, faceColor, hairColor, style) {
            if (svgs[parentId]) {
                d3.select('#' + parentId).select('svg').remove();
                d3.select('#hairBack').select('svg').remove();
                svgs[parentId] = null;
            }
            if (!svgs[parentId]) {
                svgs[parentId] = d3.select('#' + parentId).append('svg').attr('width', 640).attr('height', 640);
            }
            var _data = data[key], p, attrObj, styleObj; 
            if (!_data) {
                return false;
            }
            svg = svgs[parentId];
            //svg.node().innerHTML = '';
            if (_data.frontSide.frontPath) {
                // frontpath
                for (var i = 0, path; path = _data.frontSide.frontPath[i]; i++) {
                    attrObj = {};
                    styleObj = {};
                    if (path.type != null) {
                        p = svg.append(path.type);
                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }
                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                styleObj[attr.attr] = attr.val;
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    styleObj['fill'] = faceColor;
                                }
                            }
                            else if (attr.attr == 'text') {
                                p.text(attr.val);
                            }
                            else {
                                attrObj[attr.attr] = attr.val;
                            }
                        }
                    }
                    if (path.path != null) {
                        p = svg.append('path');
                        attrObj['d'] = path.path;
                        if (path.style.length > 0) {
                            styleObj['fill'] = hairColor;
                        }
                    }
                    if (style != null) {
                        styleObj = style;
                    }
                    p.attr(attrObj).style(styleObj);
                } 
            }
            if (_data.frontSide.path) {
                // 在 svg 中插入一個 path 
                for (var i = 0, path; path = _data.frontSide.path[i]; i++) {
                    attrObj = {};
                    styleObj = {};
                    if (path.type != null) {
                        p = svg.append(path.type);
                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }
                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                styleObj[attr.attr] = attr.val;
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    styleObj['fill'] = faceColor;
                                }
                            }
                            else if (attr.attr == 'text') {
                                p.text(attr.val);
                            }
                            else {
                                attrObj[attr.attr] = attr.val;
                            }
                        }
                    }
                    if (path.path != null) {
                        p = svg.append('path');
                        attrObj['d'] = path.path;
                        if (path.style.length > 0) {
                            styleObj['fill'] = hairColor;
                        }
                    }
                    if (style != null) {
                        styleObj = style;
                    }
                    p.attr(attrObj).style(styleObj);
                } 
            }
            if (_data.frontSide.backPath) {
                if (parentId == 'hair') {
                    svg = d3.select('#hairBack').append('svg').attr('width', 640).attr('height', 640);
                }
                // 在 svg 中插入一個 path 
                for (var i = 0, path; path = _data.frontSide.backPath[i]; i++) {
                    attrObj = {};
                    styleObj = {};
                    if (path.type != null) {
                        p = svg.append(path.type);
                        for (var j = 0, attr; attr = path.style[j]; j++) {
                            if (attr.val == '') {
                                continue;
                            }
                            if (attr.attr == 'fill' || attr.attr == 'stroke-width' || attr.attr == 'stroke' || attr.attr == 'font-size') {
                                styleObj[attr.attr] = attr.val;
                            }
                            else if (attr.attr == 'class') {
                                if (attr.val == 'faceColor') {
                                    styleObj['fill'] = faceColor;
                                }
                            }
                            else if (attr.attr == 'text') {
                                p.text(attr.val);
                            }
                            else {
                                attrObj[attr.attr] = attr.val;
                            }
                        }
                    }
                    if (path.path != null) {
                        p = svg.append('path');
                        attrObj['d'] = path.path;
                        if (path.style.length > 0) {
                            styleObj['fill'] = hairColor;
                        }
                    }
                    if (style != null) {
                        styleObj = style;
                    }
                    p.attr(attrObj).style(styleObj);
                } 
            }
            _data = p = attrObj = null;
        },
        getSVGPathes: function() {
            var html = ['<svg width="640" height="640" version="1.1" xmlns="http://www.w3.org/2000/svg">'], _getSvgs = d3.selectAll("svg")[0] || [];
            var _innerHTML;
            for (var i = 0, getSvg; getSvg = _getSvgs[i]; i++) {
                _innerHTML = d3.select(getSvg).node().parentNode.innerHTML;
                _innerHTML = _innerHTML.replace('<svg width="640" height="640">', '');
                _innerHTML = _innerHTML.replace('</svg>', '');
                html.push(_innerHTML);
            }
            html.push('</svg>');
            return html.join('');
        },
        createDataURL: function() {
            // var html = d3.select("svg")
            // .attr("version", 1.1)
            // .attr("xmlns", "http://www.w3.org/2000/svg")
            // .node().parentNode.innerHTML;
            // html = window.toUTF8(html);
            // console.error(html);
            // return 'data:image/svg+xml;base64,'+ btoa(html);
            
            // var html = ['<svg width="640" height="640" version="1.1" xmlns="http://www.w3.org/2000/svg">'], _getSvgs = d3.selectAll("svg")[0] || [];
            // for (var i = 0, getSvg; getSvg = _getSvgs[i]; i++) {
                // html.push(d3.select(getSvg).node().innerHTML);
            // }
            // html.push('</svg>');
            // html = window.toUTF8(html.join(''));
            // return 'data:image/svg+xml;base64,'+ btoa(html);
            
            html = window.toUTF8(this.getSVGPathes());
            return 'data:image/svg+xml;base64,'+ btoa(html);
        }
    };
});
