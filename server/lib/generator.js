function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  cpu: function () {
    const CPU_LOAD_MIN = 20;
    const CPU_LOAD_MAX = 100;

    return getRandom(CPU_LOAD_MIN, CPU_LOAD_MAX);
  },

  pkg: function () {
    const PKG_IDLE_MAX = 60;
    const PKG_SENT_MAX = 60;

    return {
      idle: getRandom(0, PKG_IDLE_MAX),
      sent: getRandom(0, PKG_SENT_MAX)
    };
  }
};