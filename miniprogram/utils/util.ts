export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const formatMinutesAndSeconds = (totalSeconds: number): string => {
  if (!totalSeconds || totalSeconds == 0) {
    return "00:00"
  }
  totalSeconds = Math.trunc(totalSeconds);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

const padTo2Digits = (num: number): string => {
  return num.toString().padStart(2, '0');
}

export const getPercent = (num: number, total: number): number => {
  num = parseFloat(String(num));
  total = parseFloat(String(total));
  if (isNaN(num) || isNaN(total)) {
    return 0;
  }
  return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
}
