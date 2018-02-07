// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var aaa = this;
    wx.request({
      url: "http://127.0.0.1:8082/demo/listArea",
      method:'Get',
      data:{},
      success:function(res){
        var list = res.data.areaList;
        if(list == null){
          var toast = '获取数据失败';
          wx.showToast({
            title: toast,
            icon:"",
            duration:2000
          })
        }else{
          aaa.setData({
            list:list
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  addArea:function(){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  deleteArea:function(e){
    var aaa = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除区域名称吗？' + e.target.dataset.name,
      success:function(model){
        if(model.confirm){
          wx.request({
            url: "http://127.0.0.1:8082/demo/deleteArea",
            data: { "areaId": e.target.dataset.areaid},
            method:'GET',
            success:function(res){
              var result = res.data.success;
              var toastText = "删除成功";
              if(result != true){
                toastText = "删除失败";
              }else{
                aaa.data.list.splice(e.target.dataset.index,1);
                aaa.setData({
                  list:aaa.data.list
                });
              }
            }
          })
        }
      }
    })
  }
})