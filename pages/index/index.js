Page({
  data: {
    chatList: [],
    inputValue: '',
    showSidebar: false
  },

  toggleSidebar() {
    this.setData({ showSidebar: !this.data.showSidebar });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    const msg = this.data.inputValue.trim();
    if (!msg) return;

    const chatList = this.data.chatList;
    chatList.push({ from: 'user', content: msg });

    this.setData({ chatList, inputValue: '' });

    // 模拟智能回复
    setTimeout(() => {
      chatList.push({ from: 'bot', content: `你说的是：“${msg}”？我正在处理...` });
      this.setData({ chatList });
    }, 500);
  },

  uploadFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const file = res.tempFiles[0];
        wx.showToast({ title: '文件上传中...', icon: 'loading' });
        // 可添加：上传逻辑至云函数 or 云托管 API
        console.log('上传文件:', file.name);
      }
    });
  },

  goToHistory() {
    wx.showToast({ title: '前往历史记录', icon: 'none' });
  },
  goToFavorites() {
    wx.showToast({ title: '前往收藏夹', icon: 'none' });
  },
  goToFiles() {
    wx.showToast({ title: '前往文件管理', icon: 'none' });
  },
  goToSettings() {
    wx.showToast({ title: '前往系统设置', icon: 'none' });
  }
});
