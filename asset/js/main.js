/**
 * @author 陈建杭
 * 配置页
 */
require.config({
    paths: {
        'jquery': '../../asset/lib/jquery/jquery-1.10.2.min',
        'svgjs': '../../asset/lib/svgjs/svg.min'
    }
});
require(['index',], function(index) {
    index.init();
});