// Current Date
var date = new Date()
var day = date.getDate()
var year = date.getFullYear()

var monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

var weekdayLabel = (document.getElementsByClassName(
  'weekday-label'
)[0].innerHTML = dayNames[date.getDay(0)] + ' ')

var monthLabel = (document.getElementsByClassName('month-label')[0].innerHTML =
  '-' + ' ' + monthNames[date.getMonth()])

var dayLabel = (document.getElementsByClassName('day-label')[0].innerHTML = day)

var year = (document.getElementsByClassName('year')[0].innerHTML = '.' + year)
// Current date close
