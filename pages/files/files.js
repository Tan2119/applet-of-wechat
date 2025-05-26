Page({
  data: {
    files: []
  },

  onLoad() {
    const files = wx.getStorageSync('uploadedFiles') || [];
    this.setData({ files });
  },

  deleteFile(e) {
    const index = e.currentTarget.dataset.index;
    const files = [...this.data.files];
    files.splice(index, 1);
    this.setData({ files });
    wx.setStorageSync('uploadedFiles', files);
  }
});
