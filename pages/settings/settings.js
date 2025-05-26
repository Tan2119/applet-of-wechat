Page({
  clearHistory() {
    wx.removeStorageSync('chatHistory');
    wx.showToast({ title: '已清除', icon: 'success' });
  }
});
