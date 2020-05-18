export default {
  api: 'http://wx.4006002222.com/crmtestapi',
  // 省市区 根据grade 或 grade和parenId获取列表
  getHnAreaByGrade: "/WxService?method=getHnAreaByGrade",
  //平台名称
  platform: "ddPlatform",
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
}
