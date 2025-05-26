const { getMessages } = require('../../utils/storage');

Page({
  data: {
    history: []
  },
  onLoad() {
    const history = getMessages().reverse(); // 倒序
    this.setData({ history });
  }
});
