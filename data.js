(function () {
  const datepicker = {};
  /**
   * @param {number} year
   * @param {number} month
   */
  datepicker.getMonthData = function (year, month) {
    const ret = [];
    if (!year || !month) {
      const today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }
    const firstDay = new Date(year, month - 1, 1);
    let firstDayWeekDay = firstDay.getDay();
    if (firstDayWeekDay === 0) { // 如果是 0 的话，那么指的是周日
      firstDayWeekDay = 7;
    }

    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    const lastDayOfLastMonth = new Date(year, month - 1, 0);
    const lastDateOfLastMonth = lastDayOfLastMonth.getDate();
    const preMonthDayCount = firstDayWeekDay - 1;
    const lastDay = new Date(year, month, 0);
    const lastDate = lastDay.getDate();

    for (let i = 0; i < 7 * 6; i++) {
      const date = i + 1 - preMonthDayCount;
      let showDate = date;
      let thisMonth = month;
      if (date <= 0) { // 上一月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) { // 下一月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }
      if (thisMonth === 0) {
        thisMonth = 12;
      }
      if (thisMonth === 13) {
        thisMonth = 1;
      }
      ret.push({
        month: thisMonth,
        date,
        showDate,
      });
    }
    return {
      year,
      month,
      days: ret,
    };
  };
  window.datepicker = datepicker;
})();