/**
 * 入口
 */

import faceData from './data/faceData';
import bgData from './data/bgData';
import bubbleData from './data/bubbleData';
import bodyData from './data/bodyData';
import clothData from './data/clothData';
import expressData from './data/expressData';
import eyebrowData from './data/eyebrowData';
import eyeData from './data/eyeData';
import featureData from './data/featureData';
import glassData from './data/glassData';
import hairData from './data/hairData';
import hatData from './data/hatData';
import hobbyData from './data/hobbyData';
import noseData from './data/noseData';
import mouthData from './data/mouthData';
import svg from './svg';

let $lastMenuItem; // 上一次选择的菜单项


// 菜单项的选择事件
let checkMenuItem = function(dom) {

    if (!dom) {
        return false;
    }
    let $menuItem = $(dom);
    let index = parseInt($menuItem.data('menu'));
    if ($lastMenuItem) {
        $lastMenuItem.removeClass('active');
    }

    $menuItem.addClass('active');
    $lastMenuItem = $menuItem;
    refreshList(index);
};

let menuData = []; // 菜单项数据，下标从0开始分别表示发型、发色、脸型、肤色、眉毛、眼睛、、、

let initMenu = function (data) {
    let dom = document.getElementById('menuFrame');
    if (!dom) {
        return false;
    }
    menuData = data || [];
    let html = [];
    for (let i = 0, d; d = menuData[i]; i++) {
        html.push('<div id="menuBtn_' + i + '" data-menu="' + i + '" class="menu-item">' + d.name + '</div>');
    }
    dom.innerHTML = html.join('');
    html = null;
};
let currentData;
let refreshList = function (index) {
    let dom = document.getElementById('list');
    let data = menuData[index];
    if (!dom || !data) {
        return false;
    }
    dom.scrollTop = 0;
    currentData = data; //标记当前数据大集合
    let html = [
       '<ul class="table-list">'
    ];
    for (let i = 0, d; d = data.list[i]; i++) {
        html.push('<li id="listTd_' + i + '" class="table-item" data-item="' + i + '">');
        if (d.src) {
            html.push('    <img id="listItem_' + i + '" src="' + d.src + '" style="width:110px;height:110px;" />');
        }
        else if (d.bgColor) {
            html.push('    <div id="listItem_' + i + '" style="width:110px;height:110px;margin:auto;background:' + d.bgColor + ';"></div>');
        }
        html.push('</li>');
    }
    html.push('</ul>');
    dom.innerHTML = html.join('');
    checkListItem(data.selectedIndex);
    html = null;
};

let $lastItem; // 上一次表格项的选择项

// 勾选用户选择的item，index 表格里面的第几项
let checkListItem = function(index, list) {

    let $item = $('#' + 'listTd_' + index);
    if ($lastItem) {
        $lastItem.removeClass('active');
    }
    $item.addClass('active');
    $lastItem = $item;


    let _list = list || currentData;
    if (_list) {
        _list.selectedIndex = index;
        let item = _list.list[index];
        if (item) {
            switch (_list.type) {
                case 'hair':
                    svg.addPath('hair', hairData, item.svgId, null, _list.hairColor); //头发
                    break;
                case 'hairColor':
                    menuData[0].hairColor = item.bgColor;
                    svg.addPath('hair', hairData, menuData[0].list[menuData[0].selectedIndex].svgId, null, menuData[0].hairColor); //头发颜色
                    break;
                case 'face':
                    svg.addPath('body', bodyData, 'body1', _list.faceColor); //身体
                    svg.addPath('face', faceData, item.svgId, _list.faceColor); //脸型
                    break;
                case 'faceColor':
                    menuData[2].faceColor = item.bgColor;
                    svg.addPath('body', bodyData, 'body1', menuData[2].faceColor); //身体
                    svg.addPath('face', faceData, menuData[2].list[menuData[2].selectedIndex].svgId, menuData[2].faceColor); //皮肤颜色
                    break;
                case 'eyebrow':
                    svg.addPath('express', expressData, 'express0'); //表情
                    svg.addPath('eyebrow', eyebrowData, item.svgId); //眉毛
                    break;
                case 'eye':
                    svg.addPath('express', expressData, 'express0'); //表情
                    svg.addPath('eye', eyeData, item.svgId); //眼睛
                    break;
                case 'mouth':
                    svg.addPath('express', expressData, 'express0'); //表情
                    svg.addPath('mouth', mouthData, item.svgId); //嘴
                    break;
                case 'nose':
                    svg.addPath('express', expressData, 'express0'); //表情
                    svg.addPath('nose', noseData, item.svgId); //鼻子
                    break;
                case 'feature':
                    svg.addPath('feature', featureData, item.svgId); //特征
                    break;
                case 'glass':
                    svg.addPath('glass', glassData, item.svgId); //眼镜
                    break;
                case 'cloth':
                    svg.addPath('cloth', clothData, item.svgId); //衣服
                    break;
                case 'hat':
                    svg.addPath('hat', hatData, item.svgId); //帽子
                    break;
                case 'hobby':
                    svg.addPath('hobby', hobbyData, item.svgId, menuData[2].faceColor); //爱好
                    break;
                case 'bg':
                    svg.addPath('bg', bgData, item.svgId); //背景
                    break;
                case 'express':
                    if(item.svgId != 'express0') {
                        svg.addPath('eyebrow', eyebrowData, 'eyebrow0'); //眉毛
                        svg.addPath('eye', eyeData, 'eye0'); //眼睛
                        svg.addPath('mouth', mouthData, 'mouth0'); //嘴
                        svg.addPath('nose', noseData, 'nose0'); //鼻子
                    }
                    svg.addPath('express', expressData, item.svgId); //表情
                    break;
                case 'bubble':
                    svg.addPath('bubble', bubbleData, item.svgId); //气泡
                    break;
                default:
                    break;
            }
        }
        item = null;
    }
};

let sex = 'man';

// 设置性别
let setSex = function (sex) {

    if (sex == 'man') {
        menuData[0].list = [
            { src: 'img/hair/male/pic_s1_0.png', svgId: 'hair0' },
            { src: 'img/hair/male/pic_s1_1.png', svgId: 'hair44' },
            { src: 'img/hair/male/pic_s1_2.png', svgId: 'hair19' },
            { src: 'img/hair/male/pic_s1_3.png', svgId: 'hair56' },
            { src: 'img/hair/male/pic_s1_4.png', svgId: 'hair29' },
            { src: 'img/hair/male/pic_s1_5.png', svgId: 'hair58' },
            { src: 'img/hair/male/pic_s1_6.png', svgId: 'hair26' },
            { src: 'img/hair/male/pic_s1_7.png', svgId: 'hair16' },
            { src: 'img/hair/male/pic_s1_8.png', svgId: 'hair55' },
            { src: 'img/hair/male/pic_s1_9.png', svgId: 'hair24' },
            { src: 'img/hair/male/pic_s1_10.png', svgId: 'hair8' },
            { src: 'img/hair/male/pic_s1_11.png', svgId: 'hair10' },
            { src: 'img/hair/male/pic_s1_12.png', svgId: 'hair21' },
            { src: 'img/hair/male/pic_s1_13.png', svgId: 'hair25' },
            { src: 'img/hair/male/pic_s1_14.png', svgId: 'hair60' },
            { src: 'img/hair/male/pic_s1_15.png', svgId: 'hair59' },
            { src: 'img/hair/male/pic_s1_16.png', svgId: 'hair6' },
            { src: 'img/hair/male/pic_s1_17.png', svgId: 'hair22' },
            { src: 'img/hair/male/pic_s1_18.png', svgId: 'hair11' },
            { src: 'img/hair/male/pic_s1_19.png', svgId: 'hair33' },
            { src: 'img/hair/male/pic_s1_60.png', svgId: 'hair9' },
            { src: 'img/hair/male/pic_s1_56.png', svgId: 'hair18' },
            { src: 'img/hair/male/pic_s1_45.png', svgId: 'hair40' },
            { src: 'img/hair/male/pic_s1_46.png', svgId: 'hair41' },
            { src: 'img/hair/male/pic_s1_50.png', svgId: 'hair42' },
            { src: 'img/hair/male/pic_s1_23.png', svgId: 'hair43' },
            { src: 'img/hair/male/pic_s1_63.png', svgId: 'hair46' },
            { src: 'img/hair/male/pic_s1_49.png', svgId: 'hair54' },
            { src: 'img/hair/male/pic_s1_65.png', svgId: 'hair61' },
            { src: 'img/hair/male/pic_s1_68.png', svgId: 'hair69' },
            { src: 'img/hair/male/pic_s1_58.png', svgId: 'hair70' },
            { src: 'img/hair/male/pic_s1_70.png', svgId: 'hair71' },
            { src: 'img/hair/male/pic_s1_73.png', svgId: 'hair74' }
        ];
    } else {
        menuData[0].list = [
            { src: 'img/hair/female/pic_s1_g_1.png', svgId: 'hair10032' },
            { src: 'img/hair/female/pic_s1_g_2.png', svgId: 'hair10031' },
            { src: 'img/hair/female/pic_s1_g_3.png', svgId: 'hair10013' },
            { src: 'img/hair/female/pic_s1_g_68.png', svgId: 'hair10058' },
            { src: 'img/hair/female/pic_s1_g_5.png', svgId: 'hair10011' },
            { src: 'img/hair/female/pic_s1_g_6.png', svgId: 'hair10085' },
            { src: 'img/hair/female/pic_s1_g_7.png', svgId: 'hair10086' },
            { src: 'img/hair/female/pic_s1_g_8.png', svgId: 'hair10012' },
            { src: 'img/hair/female/pic_s1_g_9.png', svgId: 'hair10006' },
            { src: 'img/hair/female/pic_s1_g_10.png', svgId: 'hair10005' },
            { src: 'img/hair/female/pic_s1_g_11.png', svgId: 'hair10007' },
            { src: 'img/hair/female/pic_s1_g_12.png', svgId: 'hair10004' },
            { src: 'img/hair/female/pic_s1_g_13.png', svgId: 'hair10008' },
            { src: 'img/hair/female/pic_s1_g_14.png', svgId: 'hair10009' },
            { src: 'img/hair/female/pic_s1_g_15.png', svgId: 'hair10010' },
            { src: 'img/hair/female/pic_s1_g_16.png', svgId: 'hair10015' },
            { src: 'img/hair/female/pic_s1_g_17.png', svgId: 'hair10067' },
            { src: 'img/hair/female/pic_s1_g_18.png', svgId: 'hair10084' },
            { src: 'img/hair/female/pic_s1_g_19.png', svgId: 'hair10053' },
            { src: 'img/hair/female/pic_s1_g_20.png', svgId: 'hair10072' },
            { src: 'img/hair/female/pic_s1_g_82.png', svgId: 'hair65' }
        ];
    }
    let dom = document.getElementById('menuFrame').children[0];
    checkMenuItem(dom);
};

// 首页的初始化
let init = function() {
    document.onselectstart = function() { return false; };


    window.onresize = function() {
        document.getElementById('list').style.height = (window.innerHeight - 310) + 'px';
    };
    window.onresize();
    // 在 body 中插入一個 svg
    // //svg.addPath('bg', bgData, 'bgUse', null, null, { fill: '#CCC' }); //背景
    // svg.addPath('svgBg', bgData, 'bg3'); //背景
    //svg.addPath('body', bodyData, 'body1', '#FFF'); //身体
    // svg.addPath('cloth', clothData, 'cloth5'); //衣服
    // svg.addPath('face', faceData, 'face20001', '#FFF'); //脸
    // svg.addPath('eyebrow', eyebrowData, 'eyebrow20012'); //眉毛
    //svg.addPath('eye', eyeData, 'eye11'); //眼睛
    // svg.addPath('mouth', mouthData, 'mouth7', '#FFF'); //嘴
    // svg.addPath('nose', noseData, 'nose20007', '#FFF'); //鼻子
    // svg.addPath('feature', featureData, 'feature20021'); //特征
    // //svg.addPath('express', expressData, 'express10'); //表情
    // svg.addPath('hair', hairData, 'hair1', null, '#333'); //头发
    // svg.addPath('glass', glassData, 'glass10'); //眼镜
    // svg.addPath('hat', hatData, 'hat20008'); //帽子
    // svg.addPath('hobby', hobbyData, 'hobby1', '#FFF'); //手势
    //svg.addPath('bdBubble', bdBubbleData, 'bdBubble40057'); //板型气泡
    //svg.addPath('bubble', bubbleData, 'bubble30'); //说话泡泡



    $(document).on('click', '.menu-item', function(e){
        checkMenuItem(e.target);
    });

    $(document).on('click', '.table-item', function(){
        checkListItem($(this).data('item'));
    });

    // 更改性别
    $('#change-sex').on('click', function(){
        sex = (sex === 'man') ? 'woman' : 'man';
        setSex(sex); //更改性别
    });

    let canvas;

    // 完成
    $('#finish').on('click', function(){

        let imgSrc = svg.createDataURL();
        //document.getElementById('testImg').src = imgSrc;

        canvas = document.getElementById("canvas");
        canvas.width = 300;
        canvas.height = 300;

        // 加载图片并绘制到画布
        let img = new Image();
        img.src = imgSrc;
        img.onload = function(){
            let myctx = canvas.getContext("2d");
            myctx.drawImage(img, 0, 0, 640, 640, 0, 0, 640 * 410 / 300, 640 * 410 / 300);
        };

        $('#result-box').show();
        /*$('#svg-form-code').text(html);
        $('#svg-form').submit();*/

    });

    // 下载
    $('#download').on('click', function () {
        let a = document.createElement('a');
        a.download = 'yunser.com.png';
        a.href = canvas.toDataURL('image/png');

        let clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });

        a.dispatchEvent(clickEvent);
    });

    // 返回编辑器
    $('#close').on('click', function () {
        $('#result-box').hide();
    });

    initMenu([
        { i: 0, name: '发型', type: 'hair', hairColor: '#282828', selectedIndex: 1, list: [] },
        { i: 1, name: '发色', type: 'hairColor', selectedIndex: 0, list: [
            { bgColor: '#282828', svgId: '' },
            { bgColor: '#340002', svgId: '' },
            { bgColor: '#000000', svgId: '' },
            { bgColor: '#3F3432', svgId: '' },
            { bgColor: '#BE7019', svgId: '' },
            { bgColor: '#A2352F', svgId: '' },
            { bgColor: '#8E4F0C', svgId: '' },
            { bgColor: '#415200', svgId: '' },
            { bgColor: '#33836D', svgId: '' },
            { bgColor: '#337583', svgId: '' },
            { bgColor: '#96529C', svgId: '' },
            { bgColor: '#F5C73C', svgId: '' },
            { bgColor: '#FFE374', svgId: '' },
            { bgColor: '#FFFFFF', svgId: '' },
            { bgColor: '#3E7E4E', svgId: '' },
            { bgColor: '#68B83E', svgId: '' },
            { bgColor: '#BFD000', svgId: '' },
            { bgColor: '#B386B8', svgId: '' },
            { bgColor: '#5BBFE4', svgId: '' },
            { bgColor: '#B9F0EF', svgId: '' },
            { bgColor: '#EE7119', svgId: '' },
            { bgColor: '#FA9595', svgId: '' },
            { bgColor: '#FF6057', svgId: '' },
            { bgColor: '#EA5F46', svgId: '' },
            { bgColor: '#EF4324', svgId: '' }
        ] },
        { i: 2, name: '脸型', type: 'face', selectedIndex: 0, faceColor: '#FEDCB7', list: [
            { src: 'img/face/pic_s2_20000.png', svgId: 'face20000' },
            { src: 'img/face/pic_s2_20001.png', svgId: 'face20001' },
            { src: 'img/face/pic_s2_20002.png', svgId: 'face20002' },
            { src: 'img/face/pic_s2_20003.png', svgId: 'face20003' },
            { src: 'img/face/pic_s2_20004.png', svgId: 'face20004' },
            { src: 'img/face/pic_s2_20005.png', svgId: 'face20005' },
            { src: 'img/face/pic_s2_20006.png', svgId: 'face20006' },
            { src: 'img/face/pic_s2_20007.png', svgId: 'face20007' },
            { src: 'img/face/pic_s2_20008.png', svgId: 'face20008' },
            { src: 'img/face/pic_s2_20009.png', svgId: 'face20009' },
            { src: 'img/face/pic_s2_20010.png', svgId: 'face20010' },
            { src: 'img/face/pic_s2_20011.png', svgId: 'face20011' },
            { src: 'img/face/pic_s2_20012.png', svgId: 'face20012' },
            { src: 'img/face/pic_s2_20013.png', svgId: 'face20013' },
            { src: 'img/face/pic_s2_20014.png', svgId: 'face20014' },
            { src: 'img/face/pic_s2_20015.png', svgId: 'face20015' },
            { src: 'img/face/pic_s2_20016.png', svgId: 'face20016' },
            { src: 'img/face/pic_s2_20017.png', svgId: 'face20017' },
            { src: 'img/face/pic_s2_20018.png', svgId: 'face20018' },
            { src: 'img/face/pic_s2_20019.png', svgId: 'face20019' }
        ] },
        { i: 3, name: '肤色', type: 'faceColor', selectedIndex: 5, list: [
            { bgColor: '#FFFAF6', svgId: '' },
            { bgColor: '#FFF6EF', svgId: '' },
            { bgColor: '#FFEFDF', svgId: '' },
            { bgColor: '#FFEACB', svgId: '' },
            { bgColor: '#FFE2C0', svgId: '' },
            { bgColor: '#FEDCB7', svgId: '' },
            { bgColor: '#FFD5BC', svgId: '' },
            { bgColor: '#EDBF9D', svgId: '' },
            { bgColor: '#E2AE86', svgId: '' },
            { bgColor: '#D29E79', svgId: '' },
            { bgColor: '#C68F70', svgId: '' },
            { bgColor: '#B8866D', svgId: '' },
            { bgColor: '#A97F69', svgId: '' },
            { bgColor: '#A65A4A', svgId: '' },
            { bgColor: '#8F7044', svgId: '' },
            { bgColor: '#846A37', svgId: '' },
            { bgColor: '#7E7258', svgId: '' },
            { bgColor: '#554A34', svgId: '' },
            { bgColor: '#FFE4DD', svgId: '' },
            { bgColor: '#FFD9D0', svgId: '' },
            { bgColor: '#FED1CE', svgId: '' }
        ] },
        { i: 4, name: '眉毛', type: 'eyebrow', selectedIndex: 0, list: [
            { src: 'img/eyebrow/pic_s3_1.png', svgId: 'eyebrow1' },
            { src: 'img/eyebrow/pic_s3_2.png', svgId: 'eyebrow2' },
            { src: 'img/eyebrow/pic_s3_3.png', svgId: 'eyebrow3' },
            { src: 'img/eyebrow/pic_s3_4.png', svgId: 'eyebrow4' },
            { src: 'img/eyebrow/pic_s3_5.png', svgId: 'eyebrow5' },
            { src: 'img/eyebrow/pic_s3_6.png', svgId: 'eyebrow6' },
            { src: 'img/eyebrow/pic_s3_7.png', svgId: 'eyebrow7' },
            { src: 'img/eyebrow/pic_s3_8.png', svgId: 'eyebrow8' },
            { src: 'img/eyebrow/pic_s3_9.png', svgId: 'eyebrow9' },
            { src: 'img/eyebrow/pic_s3_10.png', svgId: 'eyebrow10' },
            { src: 'img/eyebrow/pic_s3_11.png', svgId: 'eyebrow11' },
            { src: 'img/eyebrow/pic_s3_12.png', svgId: 'eyebrow12' },
            { src: 'img/eyebrow/pic_s3_13.png', svgId: 'eyebrow13' },
            { src: 'img/eyebrow/pic_s3_14.png', svgId: 'eyebrow14' },
            { src: 'img/eyebrow/pic_s3_15.png', svgId: 'eyebrow15' },
            { src: 'img/eyebrow/pic_s3_15.png', svgId: 'eyebrow15' },
            { src: 'img/eyebrow/pic_s3_16.png', svgId: 'eyebrow16' },
            { src: 'img/eyebrow/pic_s3_17.png', svgId: 'eyebrow17' },
            { src: 'img/eyebrow/pic_s3_18.png', svgId: 'eyebrow18' },
            { src: 'img/eyebrow/pic_s3_19.png', svgId: 'eyebrow19' },
            { src: 'img/eyebrow/pic_s3_20.png', svgId: 'eyebrow20' },
            { src: 'img/eyebrow/pic_s3_21.png', svgId: 'eyebrow21' },
            { src: 'img/eyebrow/pic_s3_22.png', svgId: 'eyebrow22' },
            { src: 'img/eyebrow/pic_s3_23.png', svgId: 'eyebrow23' },
            { src: 'img/eyebrow/pic_s3_24.png', svgId: 'eyebrow24' },
            { src: 'img/eyebrow/pic_s3_25.png', svgId: 'eyebrow25' },
            { src: 'img/eyebrow/pic_s3_26.png', svgId: 'eyebrow26' },
            { src: 'img/eyebrow/pic_s3_27.png', svgId: 'eyebrow27' },
            { src: 'img/eyebrow/pic_s3_28.png', svgId: 'eyebrow28' },
            { src: 'img/eyebrow/pic_s3_29.png', svgId: 'eyebrow29' },
            { src: 'img/eyebrow/pic_s3_30.png', svgId: 'eyebrow30' },
            { src: 'img/eyebrow/pic_s3_31.png', svgId: 'eyebrow31' }
        ] },
        { i: 5, name: '眼睛', type: 'eye', selectedIndex: 0, list: [
            { src: 'img/eye/pic_s4_1.png', svgId: 'eye1' },
            { src: 'img/eye/pic_s4_2.png', svgId: 'eye2' },
            { src: 'img/eye/pic_s4_3.png', svgId: 'eye3' },
            { src: 'img/eye/pic_s4_4.png', svgId: 'eye4' },
            { src: 'img/eye/pic_s4_5.png', svgId: 'eye5' },
            { src: 'img/eye/pic_s4_6.png', svgId: 'eye6' },
            { src: 'img/eye/pic_s4_7.png', svgId: 'eye7' },
            { src: 'img/eye/pic_s4_8.png', svgId: 'eye8' },
            { src: 'img/eye/pic_s4_9.png', svgId: 'eye9' },
            { src: 'img/eye/pic_s4_10.png', svgId: 'eye10' },
            { src: 'img/eye/pic_s4_11.png', svgId: 'eye11' },
            { src: 'img/eye/pic_s4_12.png', svgId: 'eye12' },
            { src: 'img/eye/pic_s4_13.png', svgId: 'eye13' },
            { src: 'img/eye/pic_s4_14.png', svgId: 'eye14' },
            { src: 'img/eye/pic_s4_15.png', svgId: 'eye15' },
            { src: 'img/eye/pic_s4_16.png', svgId: 'eye16' },
            { src: 'img/eye/pic_s4_17.png', svgId: 'eye17' },
            { src: 'img/eye/pic_s4_18.png', svgId: 'eye18' },
            { src: 'img/eye/pic_s4_19.png', svgId: 'eye19' },
            { src: 'img/eye/pic_s4_20.png', svgId: 'eye20' }
        ] },
        { i: 6, name: '嘴巴', type: 'mouth', selectedIndex: 0, list: [
            { src: 'img/mouth/pic_s5_1.png', svgId: 'mouth1' },
            { src: 'img/mouth/pic_s5_2.png', svgId: 'mouth2' },
            { src: 'img/mouth/pic_s5_3.png', svgId: 'mouth3' },
            { src: 'img/mouth/pic_s5_4.png', svgId: 'mouth4' },
            { src: 'img/mouth/pic_s5_5.png', svgId: 'mouth5' },
            { src: 'img/mouth/pic_s5_6.png', svgId: 'mouth6' },
            { src: 'img/mouth/pic_s5_7.png', svgId: 'mouth7' },
            { src: 'img/mouth/pic_s5_8.png', svgId: 'mouth8' },
            { src: 'img/mouth/pic_s5_9.png', svgId: 'mouth9' },
            { src: 'img/mouth/pic_s5_10.png', svgId: 'mouth10' },
            { src: 'img/mouth/pic_s5_11.png', svgId: 'mouth11' },
            { src: 'img/mouth/pic_s5_12.png', svgId: 'mouth12' },
            { src: 'img/mouth/pic_s5_13.png', svgId: 'mouth13' },
            { src: 'img/mouth/pic_s5_14.png', svgId: 'mouth14' },
            { src: 'img/mouth/pic_s5_15.png', svgId: 'mouth15' },
            { src: 'img/mouth/pic_s5_16.png', svgId: 'mouth16' },
            { src: 'img/mouth/pic_s5_17.png', svgId: 'mouth17' },
            { src: 'img/mouth/pic_s5_18.png', svgId: 'mouth18' },
            { src: 'img/mouth/pic_s5_19.png', svgId: 'mouth19' },
            { src: 'img/mouth/pic_s5_20.png', svgId: 'mouth20' }
        ] },
        { i: 7, name: '鼻子', type: 'nose', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'nose0' },
            { src: 'img/nose/pic_s14_20000.png', svgId: 'nose20000' },
            { src: 'img/nose/pic_s14_20001.png', svgId: 'nose20001' },
            { src: 'img/nose/pic_s14_20002.png', svgId: 'nose20002' },
            { src: 'img/nose/pic_s14_20003.png', svgId: 'nose20003' },
            { src: 'img/nose/pic_s14_20004.png', svgId: 'nose20004' },
            { src: 'img/nose/pic_s14_20005.png', svgId: 'nose20005' },
            { src: 'img/nose/pic_s14_20006.png', svgId: 'nose20006' },
            { src: 'img/nose/pic_s14_20007.png', svgId: 'nose20007' },
            { src: 'img/nose/pic_s14_20008.png', svgId: 'nose20008' },
            { src: 'img/nose/pic_s14_20009.png', svgId: 'nose20009' },
            { src: 'img/nose/pic_s14_20010.png', svgId: 'nose20010' },
            { src: 'img/nose/pic_s14_20011.png', svgId: 'nose20011' },
            { src: 'img/nose/pic_s14_20012.png', svgId: 'nose20012' },
            { src: 'img/nose/pic_s14_20013.png', svgId: 'nose20013' }
        ] },
        { i: 8, name: '特征', type: 'feature', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'feature0' },
            { src: 'img/feature/pic_s6_1.png', svgId: 'feature1' },
            { src: 'img/feature/pic_s6_2.png', svgId: 'feature2' },
            { src: 'img/feature/pic_s6_3.png', svgId: 'feature3' },
            { src: 'img/feature/pic_s6_4.png', svgId: 'feature4' },
            { src: 'img/feature/pic_s6_5.png', svgId: 'feature5' },
            { src: 'img/feature/pic_s6_6.png', svgId: 'feature6' },
            { src: 'img/feature/pic_s6_7.png', svgId: 'feature7' },
            { src: 'img/feature/pic_s6_8.png', svgId: 'feature8' },
            { src: 'img/feature/pic_s6_9.png', svgId: 'feature9' },
            { src: 'img/feature/pic_s6_10.png', svgId: 'feature10' },
            { src: 'img/feature/pic_s6_11.png', svgId: 'feature11' },
            { src: 'img/feature/pic_s6_12.png', svgId: 'feature12' },
            { src: 'img/feature/pic_s6_13.png', svgId: 'feature13' },
            { src: 'img/feature/pic_s6_14.png', svgId: 'feature14' },
            { src: 'img/feature/pic_s6_15.png', svgId: 'feature15' },
            { src: 'img/feature/pic_s6_16.png', svgId: 'feature16' },
            { src: 'img/feature/pic_s6_17.png', svgId: 'feature17' }
        ] },
        { i: 9, name: '眼镜', type: 'glass', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'glass0' },
            { src: 'img/glass/pic_s7_1.png', svgId: 'glass1' },
            { src: 'img/glass/pic_s7_2.png', svgId: 'glass2' },
            { src: 'img/glass/pic_s7_3.png', svgId: 'glass3' },
            { src: 'img/glass/pic_s7_4.png', svgId: 'glass4' },
            { src: 'img/glass/pic_s7_5.png', svgId: 'glass5' },
            { src: 'img/glass/pic_s7_6.png', svgId: 'glass6' },
            { src: 'img/glass/pic_s7_7.png', svgId: 'glass7' },
            { src: 'img/glass/pic_s7_8.png', svgId: 'glass8' },
            { src: 'img/glass/pic_s7_9.png', svgId: 'glass9' },
            { src: 'img/glass/pic_s7_10.png', svgId: 'glass10' },
            { src: 'img/glass/pic_s7_11.png', svgId: 'glass12' },
            { src: 'img/glass/pic_s7_12.png', svgId: 'glass13' },
            { src: 'img/glass/pic_s7_13.png', svgId: 'glass14' },
            { src: 'img/glass/pic_s7_14.png', svgId: 'glass15' },
            { src: 'img/glass/pic_s7_15.png', svgId: 'glass16' },
            { src: 'img/glass/pic_s7_16.png', svgId: 'glass17' },
            { src: 'img/glass/pic_s7_17.png', svgId: 'glass18' },
            { src: 'img/glass/pic_s7_18.png', svgId: 'glass19' },
            { src: 'img/glass/pic_s7_20.png', svgId: 'glass20' }
        ] },
        { i: 10, name: '衣服', type: 'cloth', selectedIndex: 0, list: [
            { src: 'img/cloth/pic_s8_1.png', svgId: 'cloth1' },
            { src: 'img/cloth/pic_s8_2.png', svgId: 'cloth2' },
            { src: 'img/cloth/pic_s8_3.png', svgId: 'cloth3' },
            { src: 'img/cloth/pic_s8_4.png', svgId: 'cloth4' },
            { src: 'img/cloth/pic_s8_5.png', svgId: 'cloth5' },
            { src: 'img/cloth/pic_s8_6.png', svgId: 'cloth6' },
            { src: 'img/cloth/pic_s8_7.png', svgId: 'cloth7' },
            { src: 'img/cloth/pic_s8_8.png', svgId: 'cloth8' },
            { src: 'img/cloth/pic_s8_9.png', svgId: 'cloth9' },
            { src: 'img/cloth/pic_s8_10.png', svgId: 'cloth10' },
            { src: 'img/cloth/pic_s8_11.png', svgId: 'cloth11' },
            { src: 'img/cloth/pic_s8_12.png', svgId: 'cloth12' },
            { src: 'img/cloth/pic_s8_13.png', svgId: 'cloth13' },
            { src: 'img/cloth/pic_s8_14.png', svgId: 'cloth14' },
            { src: 'img/cloth/pic_s8_15.png', svgId: 'cloth15' },
            { src: 'img/cloth/pic_s8_16.png', svgId: 'cloth16' },
            { src: 'img/cloth/pic_s8_17.png', svgId: 'cloth17' },
            { src: 'img/cloth/pic_s8_18.png', svgId: 'cloth18' },
            { src: 'img/cloth/pic_s8_19.png', svgId: 'cloth19' },
            { src: 'img/cloth/pic_s8_20.png', svgId: 'cloth20' }
        ] },
        { i: 11, name: '帽子', type: 'hat', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'hat0' },
            { src: 'img/hat/pic_s9_1.png', svgId: 'hat1' },
            { src: 'img/hat/pic_s9_2.png', svgId: 'hat2' },
            { src: 'img/hat/pic_s9_3.png', svgId: 'hat3' },
            { src: 'img/hat/pic_s9_4.png', svgId: 'hat4' },
            { src: 'img/hat/pic_s9_5.png', svgId: 'hat5' },
            { src: 'img/hat/pic_s9_6.png', svgId: 'hat6' },
            { src: 'img/hat/pic_s9_7.png', svgId: 'hat7' },
            { src: 'img/hat/pic_s9_8.png', svgId: 'hat8' },
            { src: 'img/hat/pic_s9_9.png', svgId: 'hat9' },
            { src: 'img/hat/pic_s9_10.png', svgId: 'hat10' },
            { src: 'img/hat/pic_s9_11.png', svgId: 'hat11' },
            { src: 'img/hat/pic_s9_12.png', svgId: 'hat12' },
            { src: 'img/hat/pic_s9_13.png', svgId: 'hat13' },
            { src: 'img/hat/pic_s9_14.png', svgId: 'hat14' },
            { src: 'img/hat/pic_s9_15.png', svgId: 'hat15' },
            { src: 'img/hat/pic_s9_16.png', svgId: 'hat16' },
            { src: 'img/hat/pic_s9_17.png', svgId: 'hat17' },
            { src: 'img/hat/pic_s9_18.png', svgId: 'hat18' }
        ] },
        { i: 12, name: '爱好', type: 'hobby', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'hobby0' },
            { src: 'img/hobby/pic_s10_1.png', svgId: 'hobby1' },
            { src: 'img/hobby/pic_s10_2.png', svgId: 'hobby2' },
            { src: 'img/hobby/pic_s10_3.png', svgId: 'hobby3' },
            { src: 'img/hobby/pic_s10_4.png', svgId: 'hobby4' },
            { src: 'img/hobby/pic_s10_5.png', svgId: 'hobby5' },
            { src: 'img/hobby/pic_s10_6.png', svgId: 'hobby6' },
            { src: 'img/hobby/pic_s10_7.png', svgId: 'hobby7' },
            { src: 'img/hobby/pic_s10_8.png', svgId: 'hobby8' },
            { src: 'img/hobby/pic_s10_9.png', svgId: 'hobby9' },
            { src: 'img/hobby/pic_s10_10.png', svgId: 'hobby10' },
            { src: 'img/hobby/pic_s10_11.png', svgId: 'hobby11' },
            { src: 'img/hobby/pic_s10_12.png', svgId: 'hobby12' },
            { src: 'img/hobby/pic_s10_13.png', svgId: 'hobby13' },
            { src: 'img/hobby/pic_s10_14.png', svgId: 'hobby14' },
            { src: 'img/hobby/pic_s10_15.png', svgId: 'hobby15' },
            { src: 'img/hobby/pic_s10_16.png', svgId: 'hobby16' },
            { src: 'img/hobby/pic_s10_17.png', svgId: 'hobby17' },
            { src: 'img/hobby/pic_s10_18.png', svgId: 'hobby18' },
            { src: 'img/hobby/pic_s10_19.png', svgId: 'hobby19' },
            { src: 'img/hobby/pic_s10_20.png', svgId: 'hobby20' }
        ] },
        { i: 13, name: '背景', type: 'bg', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'bg0' },
            { src: 'img/bg/pic_s11_1.png', svgId: 'bg1' },
            { src: 'img/bg/pic_s11_2.png', svgId: 'bg2' },
            { src: 'img/bg/pic_s11_3.png', svgId: 'bg3' },
            { src: 'img/bg/pic_s11_4.png', svgId: 'bg4' },
            { src: 'img/bg/pic_s11_5.png', svgId: 'bg5' },
            { src: 'img/bg/pic_s11_6.png', svgId: 'bg6' },
            { src: 'img/bg/pic_s11_7.png', svgId: 'bg7' },
            { src: 'img/bg/pic_s11_8.png', svgId: 'bg8' },
            { src: 'img/bg/pic_s11_9.png', svgId: 'bg9' },
            { src: 'img/bg/pic_s11_10.png', svgId: 'bg10' },
            { src: 'img/bg/pic_s11_11.png', svgId: 'bg11' },
            { src: 'img/bg/pic_s11_12.png', svgId: 'bg12' },
            { src: 'img/bg/pic_s11_13.png', svgId: 'bg13' },
            { src: 'img/bg/pic_s11_14.png', svgId: 'bg14' },
            { src: 'img/bg/pic_s11_15.png', svgId: 'bg15' },
            { src: 'img/bg/pic_s11_16.png', svgId: 'bg16' },
            { src: 'img/bg/pic_s11_17.png', svgId: 'bg17' },
            { src: 'img/bg/pic_s11_18.png', svgId: 'bg18' },
            { src: 'img/bg/pic_s11_19.png', svgId: 'bg19' },
            { src: 'img/bg/pic_s11_20.png', svgId: 'bg20' }
        ] },
        { i: 14, name: '表情', type: 'express', selectedIndex: 0, list: [
            { src: 'img/none.png', svgId: 'express0' },
            { src: 'img/express/pic_s13_1.png', svgId: 'express1' },
            { src: 'img/express/pic_s13_2.png', svgId: 'express2' },
            { src: 'img/express/pic_s13_3.png', svgId: 'express3' },
            { src: 'img/express/pic_s13_4.png', svgId: 'express4' },
            { src: 'img/express/pic_s13_5.png', svgId: 'express5' },
            { src: 'img/express/pic_s13_6.png', svgId: 'express6' },
            { src: 'img/express/pic_s13_7.png', svgId: 'express7' },
            { src: 'img/express/pic_s13_8.png', svgId: 'express8' },
            { src: 'img/express/pic_s13_9.png', svgId: 'express9' },
            { src: 'img/express/pic_s13_10.png', svgId: 'express10' },
            { src: 'img/express/pic_s13_11.png', svgId: 'express11' },
            { src: 'img/express/pic_s13_12.png', svgId: 'express12' },
            { src: 'img/express/pic_s13_13.png', svgId: 'express13' },
            { src: 'img/express/pic_s13_14.png', svgId: 'express14' },
            { src: 'img/express/pic_s13_15.png', svgId: 'express15' },
            { src: 'img/express/pic_s13_16.png', svgId: 'express16' },
            { src: 'img/express/pic_s13_17.png', svgId: 'express17' },
            { src: 'img/express/pic_s13_18.png', svgId: 'express18' },
            { src: 'img/express/pic_s13_19.png', svgId: 'express19' },
            { src: 'img/express/pic_s13_20.png', svgId: 'express20' }
        ] }

        // { i: 15, name: '气泡', type: 'bubble', selectedIndex: 0, list: [
        // { src: 'img/none.png', svgId: 'bubble0' },
        // { src: 'img/bubble/pic_s12_1.png', svgId: 'bubble2' },
        // { src: 'img/bubble/pic_s12_2.png', svgId: 'bubble3' },
        // { src: 'img/bubble/pic_s12_3.png', svgId: 'bubble4' },
        // { src: 'img/bubble/pic_s12_4.png', svgId: 'bubble5' },
        // { src: 'img/bubble/pic_s12_5.png', svgId: 'bubble6' },
        // { src: 'img/bubble/pic_s12_6.png', svgId: 'bubble7' },
        // { src: 'img/bubble/pic_s12_7.png', svgId: 'bubble8' },
        // { src: 'img/bubble/pic_s12_8.png', svgId: 'bubble9' },
        // { src: 'img/bubble/pic_s12_9.png', svgId: 'bubble10' },
        // { src: 'img/bubble/pic_s12_10.png', svgId: 'bubble11' },
        // { src: 'img/bubble/pic_s12_11.png', svgId: 'bubble12' },
        // { src: 'img/bubble/pic_s12_12.png', svgId: 'bubble13' },
        // { src: 'img/bubble/pic_s12_13.png', svgId: 'bubble14' },
        // { src: 'img/bubble/pic_s12_14.png', svgId: 'bubble15' },
        // { src: 'img/bubble/pic_s12_15.png', svgId: 'bubble16' },
        // { src: 'img/bubble/pic_s12_16.png', svgId: 'bubble17' },
        // { src: 'img/bubble/pic_s12_17.png', svgId: 'bubble18' },
        // { src: 'img/bubble/pic_s12_18.png', svgId: 'bubble19' },
        // { src: 'img/bubble/pic_s12_19.png', svgId: 'bubble20' },
        // { src: 'img/bubble/pic_s12_20.png', svgId: 'bubble21' },
        // { src: 'img/bubble/pic_s12_21.png', svgId: 'bubble22' },
        // { src: 'img/bubble/pic_s12_22.png', svgId: 'bubble23' },
        // { src: 'img/bubble/pic_s12_23.png', svgId: 'bubble24' }
        // ] }
    ]);
    checkListItem(0, menuData[2]); // 脸
    checkListItem(0, menuData[4]); // 眉毛
    checkListItem(0, menuData[5]); // 眼睛
    checkListItem(1, menuData[6]); // 嘴巴
    checkListItem(0, menuData[10]); // 衣服
    setSex('man');
};

init();
