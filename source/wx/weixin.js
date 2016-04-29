function Weixin(url, title) {
  this.url = url;
  this.sign();
  this.events();
}

Weixin.prototype.sign = function() {
  var self = this;
  var jsTicketUrl = encodeURIComponent(window.location.origin + window.location.pathname + window.location.search);
  $.getJSON('http://hotu.co/hotu-api/api/weixin/sign?url=' + jsTicketUrl,
    function(data, status) {
      data = data || {};
      var config = data.config;
      config.debug = false;
      wx.config(config);
      self.genShare();
    });
};

Weixin.prototype.genShare = function() {
  var self = this;
  var url = this.url;
  wx.ready(function() {
    var title = '糊涂';
    var picUrl = 'http://open-wedding.qiniudn.com/tu.shu.png';
    var desc = '涂鸦神器|记录创造的瞬间';
    var state = url.genState({
      fromid: self.userid || 'open_id_err',
      drawid: self.drawid || 'draw_id_err'
    });

    var shareUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05125e8c1635642f&redirect_uri=http://hotu.co/hua?response_type=code&scope=snsapi_base&state=' + state + '&connect_redirect=1&from=timeline&isappinstalled=0#wechat_redirect';
    var shareObj = {
      title: title,
      link: shareUrl,
      imgUrl: picUrl,
      desc: desc,
      success: function() {
        // window.location.href = 'http://mankattan.mathartworld.com/hotu/';
        // 用户确认分享后执行的回调函数
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    };

    wx.onMenuShareTimeline(shareObj);
    wx.onMenuShareAppMessage(shareObj);
  });
};