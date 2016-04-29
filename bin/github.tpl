<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
		<title><%= title %></title>
    <script type="text/javascript">
    var ua = navigator.userAgent.toLowerCase();
    var thishref = window.location.href;
   if (ua.indexOf('micromessenger') !== -1 && (thishref.indexOf('code') === -1)) {//微信中打开 且短网址 如不是从长网址回退
    thishref = window.encodeURI(thishref);
   // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05125e8c1635642f&redirect_uri='+thishref+'?response_type=code&scope=snsapi_base&state=22&connect_redirect=1&from=timeline&isappinstalled=0#wechat_redirect';
}
    </script>
		<link rel="stylesheet" href="http://7i7ifh.com1.z0.glb.clouddn.com/github-markdown.css">
    <link rel="stylesheet" href=" http://cdn.bootcss.com/highlight.js/8.6/styles/github-gist.min.css">
		<style>
			body {
				min-width: 200px;
				max-width: 790px;
				margin: 0 auto;
				padding: 30px;
			}
		</style>
	</head>
	<body>
		<article class="markdown-body">
		<%= markdown %>
		</article>
	</body>
	<script type="text/javascript" src="http://cdn.bootcss.com/zepto/1.1.6/zepto.min.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>  
	<script type="text/javascript">

  hljs.initHighlightingOnLoad();

  var jsTicketUrl = encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
  $.getJSON('http://hotu.co/hotu-api/api/weixin/sign?url=' + jsTicketUrl,
    function(data, status) {
      data = data || {};
      var config = data.config;
      config.debug = false;
      wx.config(config);
      genShare();
    });

function genShare() {
  wx.ready(function() {
    var title = '<%= title %>';
    var picUrl = 'http://7i7ifh.com1.z0.glb.clouddn.com/8f2281a623e8a03.jpg';
    var desc = '美的数学世界|' + '<%= title %>' + '\n设计师的代码修炼之路';
    var shareUrl = '<%= shareUrl %>';
    var shareObj = {
      title: title,
      link: shareUrl,
      imgUrl: picUrl,
      desc: desc,
      success: function() {
      },
      cancel: function() {
      }
    };

    wx.onMenuShareTimeline(shareObj);
    wx.onMenuShareAppMessage(shareObj);
  });
};
	</script>
</html>
