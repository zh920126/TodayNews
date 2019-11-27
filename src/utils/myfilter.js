export const newTime = (data, spe) => {
  // console.log(data)
  spe = spe || '-'
  let year = data.getFullYear()
  let months = data.getMonth() + 1
  let days = data.getDate()
  let hours = data.getHours()
  let min = data.getMinutes()
  let sec = data.getSeconds()
  return year + spe + months + spe + days + ' ' + hours + ':' + min + ':' + sec
}
