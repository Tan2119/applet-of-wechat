const { saveMessage, getMessages,clearMessages } = require('../../utils/storage.js');
const { uploadFileToServer } = require('../../utils/api.js');


Page({
  data: {
    messages: [],
    inputText: '',
    showSidebar: false
  },

  onLoad() {
    this.setData({
      messages: getMessages()
    });
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  handleSend() {
    const text = this.data.inputText.trim();
    if (!text) return wx.showToast({ title: '内容不能为空', icon: 'none' });

    const message = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text'
    };

    this.addMessage(message);
    this.setData({ inputText: '' });

    // 模拟AI回复
    setTimeout(() => {
      this.addMessage({
        text: '您好，这是自动回复内容。',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        type: 'text'
      });
    }, 1000);
  },

  addMessage(msg) {
    const newList = [...this.data.messages, msg];
    this.setData({ messages: newList });
    saveMessage(msg);
  },

  chooseFile() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const file = res.tempFiles[0];
        uploadFileToServer(file.tempFilePath, file.name);
      }
    });
  },

  toggleSidebar() {
    console.log("菜单点击了"); 
    this.setData({ showSidebar: !this.data.showSidebar });
  },

  closeSidebar() {
    this.setData({ showSidebar: false });
  },

  goToHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    });
  },

  goToFileManager() {
    wx.navigateTo({
      url: '/pages/files/files'
    });
  },

  clearHistory() {
    wx.showModal({
      title: '清空历史记录',
      content: '确定要清空所有聊天记录吗？',
      success: (res) => {
        if (res.confirm) {
          clearMessages();
          this.setData({ messages: [] });
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  }
  
});
