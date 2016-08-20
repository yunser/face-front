/**
 * @author 陈建杭
 * 配置页
 */
require.config({
    /*
     shim: {
     hello: { exports: 'hello' }
     }
     */
    paths: {
        'jquery': '../../asset/lib/jquery/jquery-1.10.2.min'
    }
});
require(['index',], function(index) {
    index.init();
});