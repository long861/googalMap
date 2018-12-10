<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <style type="text/css">
      body,html,#container{
        width: 100%;
        height: 100%;
        margin: 0px
      }
    </style>
    <title>API加载</title>
  </head>
  <body>
    <div id="container" tabindex="0"></div>
    <script src="https://webapi.amap.com/maps?v=1.4.11&key=您申请的key值"></script>
    <script type="text/javascript">
        var map = new AMap.Map('container', {
           resizeEnable: true,
           center:[116.480983, 39.989628],
           zoom:11
        });
        AMap.plugin('AMap.ToolBar',function(){
           var toolbar = new AMap.ToolBar();
           map.addControl(toolbar)
        })
    </script>
    <script type="text/javascript" src="https://webapi.amap.com/demos/js/liteToolbar.js"></script>
  </body>
</html>