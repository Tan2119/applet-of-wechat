const MAX_HISTORY = 50;

function saveMessage(message) {
  let history = wx.getStorageSync('chatHistory') || [];
  history.push(message);
  if (history.length > MAX_HISTORY) history.shift();
  wx.setStorageSync('chatHistory', history);
}

function getMessages() {
  return wx.getStorageSync('chatHistory') || [];
}

function clearMessages() {
  wx.removeStorageSync('chatHistory');
}

module.exports = {
  saveMessage,
  getMessages,
  clearMessages
};
