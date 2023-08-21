var dayjs = require("dayjs");

// 获取当前时间到指定时间的时间差
// date格式：yyyy-mm-ss hh:mm:ss
export default function getDifferenceAndNow(date) {
  let showDate = dayjs(date);
  let nowDate = dayjs();

  let d_year = nowDate.diff(showDate, "year");
  let d_month = nowDate.diff(showDate, "month");
  let d_week = nowDate.diff(showDate, "week");
  let d_hour = nowDate.diff(showDate, "hour");
  let d_day = nowDate.diff(showDate, "day");
  let d_minute = nowDate.diff(showDate, "minute");

  if (d_year >= 1) {
    return d_year + " 年前";
  } else if (d_month >= 1) {
    return d_month + " 月前";
  } else if (d_week >= 1) {
    return d_week + " 周前";
  } else if (d_day >= 1) {
    return d_day + " 天前";
  } else if (d_hour >= 1) {
    return d_hour + " 小时前";
  } else if (d_minute >= 1) {
    return d_minute + " 分钟前";
  } else {
    return "刚刚";
  }
}
