// GRAB ALL HTML ELEMENT IN VARIABLES

console.log('connected')

// for sounds
let playButton = document.querySelector('.playButton')
let audio = document.querySelector('#myAudio')
let audioSrc = document.querySelector('#audioSrc')

let remainningTime = document.getElementsByClassName('remainningTime')

// hr , mins , ampm
let optionsSound = document.querySelector('#sound')
let hours = document.querySelector('#edit-hour')
let minutes = document.querySelector('#edit-minute')
let title = document.querySelector('.title')
let result = document.querySelector('.result')

// BOOLEAN
let activeAlarm = false
let currentTime
let alarmElement
let store
let isPlaying = false

let alarm_result = document.querySelector('.alarm_result')

// modal
const trigger = document.querySelector('#trigger')
const modalWrapper = document.querySelector('.modal__wrapper')
const closeBtn = document.querySelector('.close')

// DROPDOWN MUSIC LIST
async function getUserAsync(id) {
  let select = id
  for (let n = 0; n < select.length; n++) {
    const elem = select[n]
    if (elem.innerHTML == 'Rooster') {
      if (localStorage.getItem('sound') === null) {
        localStorage.setItem('sound', elem.innerHTML.toLowerCase())
        elem.setAttribute('selected', '')
      }
    }

    if (elem.innerHTML.toLowerCase() == localStorage.getItem('sound')) {
      localStorage.setItem('sound', elem.innerHTML.toLowerCase())
      elem.setAttribute('selected', '')
    }
  }
}

optionsSound.addEventListener('input', () => {
  localStorage.setItem('sound', optionsSound.value.toLowerCase())
})

getUserAsync(optionsSound)

// for playing audio
const playMusic = () => {
  audio.src = 'sounds/' + localStorage.getItem('sound').toLowerCase() + '.mp3'
  audio.play()
  audio.loop = true
  isPlaying = true
  playButton.classList.replace('fa-play', 'fa-pause')
}
// for pause audio
const pauseMusic = () => {
  audio.src = 'sounds/' + optionsSound.value.toLowerCase() + '.mp3'
  isPlaying = false
  audio.pause()
  playButton.classList.replace('fa-pause', 'fa-play')
}

// logic for playing pause music
playButton.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic()
})

// input audio select
optionsSound.addEventListener('input', () => {
  playMusic()
})

// when audio finished
audio.addEventListener('ended', () => {
  pauseMusic()
})

// RINGING THE ALARM FUNCTIONS
function startTime() {
  var today = new Date()
  var hr = today.getHours() //for hours
  var min = today.getMinutes() //for mins
  var sec = today.getSeconds() //for sec

  //Add a zero in front of numbers<10
  min = checkTime(min)
  sec = checkTime(sec)

  // AMPM LOGIC here
  ap = hr < 12 ? 'AM' : 'PM'
  hr = hr == 0 ? 12 : hr
  hr = hr > 12 ? hr - 12 : hr

  // today date and time printing...
  document.getElementById('clock').innerHTML =
    hr + ':' + min + ':' + sec + ' ' + `<span> ${ap} </span>`

  currentTime = hr + ':' + min + ' ' + ap

  setTimeout(function () {
    startTime()
  }, 500)
}
// calling function
startTime()

// ADDED ZEROS
function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}

for (let n = 0; n < hours.length; n++) {
  const elem = hours[n]

  if (elem.innerHTML.replace(/\&nbsp;/g, '') == moment().format('h A')) {
    elem.setAttribute('selected', '')
  }
}
for (let n = 0; n < minutes.length; n++) {
  const elem = minutes[n]
  if (elem.innerHTML == moment().format('mm')) {
    elem.setAttribute('selected', '')
  }
}

let alarm_alert_modal = document.querySelector('.alarm_alert_modal')
let alarmTime = document.getElementsByClassName('alarmTime')
let alarmTitle = document.getElementsByClassName('alarm-title')

// ALARM SET FUNCTION

document.addEventListener('DOMContentLoaded', () => {
  if (typeof localStorage == 'undefined') {
    alert('Your browser does not support HTML5 localStorage. Try upgrading.')
  } else {
    if (localStorage.getItem('background') != null) {
      alarm_result.style.background = localStorage.background
      alarmTitle[0].innerHTML = localStorage.getItem('alarmTitle')
      alarmTitle[1].innerHTML = localStorage.getItem('alarmTitle')
      alarmTime[0].innerHTML = localStorage.getItem('alarm')
      alarmTime[1].innerHTML = localStorage.getItem('alarm')
      document.querySelector('#set-Alarm').style.display = 'none'

      localStorage.getItem('remainningTime')
      alarm_result.style.display = 'block'

      let time = localStorage.getItem('alarm')
      let hoursValue = time.split(':')[0]
      let minitesValue = time.split(':')[1].split(' ')[0]
      let amPmValue = time.split(':')[1].split(' ')[1]

      if (hoursValue && minitesValue && amPmValue) {
        timeDiffererence(hoursValue, minitesValue, amPmValue)
      }
    }
  }
})

var my_timer

function onEnter() {
  if (activeAlarm == false) {
    pauseMusic()
    document.querySelector('#set-Alarm').style.display = 'none'
    setColour = 'rgb(26 26 26)'
    alarm_result.style.background = setColour
    localStorage.setItem('background', setColour)
    alarm_result.style.display = 'block'

    let hrs = hours.value.split(' ')
    let hoursValue = hrs[0]
    let amPm = hrs[1]


    alarmElement =
      hoursValue.replace(/\xA0/g, ' ') + ':' + minutes.value + ' ' + amPm


    localStorage.setItem('alarmTitle', title.value)
    let userAlarmTime = localStorage.setItem('alarm', alarmElement)


    let currentTime = new Date()
    currentTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), 00)

    let newHrsValue = hoursValue
    if (amPm === 'PM') {
      newHrsValue = parseInt(newHrsValue) + 12
    }

    var dateObject = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), newHrsValue, minutes.value, 00)

    if (currentTime.getTime() >= dateObject.getTime()) {
      dateObject = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, newHrsValue, minutes.value, 00)
    }

    localStorage.setItem("dateObject", JSON.stringify(dateObject))


    timeDiffererence(hoursValue, minutes.value, amPm)

    if (title.value !== '') {
      alarmTitle[0].innerHTML = localStorage.getItem('alarmTitle')
      alarmTitle[1].innerHTML = localStorage.getItem('alarmTitle')
    }
    alarmTime[0].innerHTML = localStorage.getItem('alarm')
    alarmTime[1].innerHTML = localStorage.getItem('alarm')
  }
}

// TimeDifferernece Function

function timeDiffererence(hoursEnd, minutesEnd, amPMEnd) {
  var today = new Date()
  var hours
  var hours24Format = today.getHours() //for hours
  var minutes = today.getMinutes() //for mins
  var seconds = today.getSeconds() //for sec
  var amPM
  var error = ''

  // AMPM LOGIC here
  amPM = hours24Format < 12 ? 'AM' : 'PM'
  hours = hours24Format == 0 ? 12 : hours24Format
  hours = hours24Format > 12 ? hours24Format - 12 : hours24Format

  var hoursStart = hours
  var minutesStart = minutes
  var secondsStart = seconds
  var hoursEnd = hoursEnd
  var minutesEnd = minutesEnd
  var secondsEnd = '0'
  var hours24FormatStart
  var hoursr24FormatEnd
  var amPMStart = amPM
  var amPMEnd = amPMEnd

  if (
    !isNaN(hoursStart) &&
    !isNaN(minutesStart) &&
    !isNaN(secondsStart) &&
    !isNaN(hoursEnd) &&
    !isNaN(minutesEnd) &&
    !isNaN(secondsEnd)
  ) {
    if (error == '') {
      hours24FormatStart = hoursStart

      if (
        (amPM == 'PM' && hoursStart < 12) ||
        (amPM == 'AM' && hoursStart == 12)
      ) {
        hours24FormatStart = hoursStart + 12
      }

      hours24FormatEnd = hoursEnd

      if (
        (amPMEnd == 'PM' && hoursEnd < 12) ||
        (amPMEnd == 'AM' && hoursEnd == 12)
      ) {
        hours24FormatEnd = parseInt(hoursEnd) + 12
        // console.log(amPMEnd)
      }

      start = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours24FormatStart,
        minutesStart,
        secondsStart
      )

      end = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours24FormatEnd,
        minutesEnd,
        secondsEnd
      )


      if (start > end) {
        end = end.addDays(1)
      }

      var duration = (end.getTime() - start.getTime()) / 1000
      startTimer(duration, hoursEnd, minutesEnd, amPMEnd)

    }
  }
}
//duratiop = 500000
// Date Formatting
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

// Counter Timer
var x
function startTimer(duration, hoursEnd, minutesEnd, amPMEnd) {
  remainningTime[1].innerHTML = ''

  var tempTime
  clearInterval(x)
  x = setInterval(function () {
    timeDiffererence(hoursEnd, minutesEnd, amPMEnd)
    var timer = duration,
      hours,
      minutes,
      seconds
    hours = parseInt(timer / 3600, 10)
    tempTime = parseInt(timer % 3600, 10)
    minutes = parseInt(tempTime / 60, 10)
    tempTime = parseInt(timer % 60, 10)
    seconds = tempTime

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    remainningTime[0].innerHTML = 'Remaining Time:'
    remainningTime[1].innerHTML = hours + ':' + minutes + ':' + seconds


    let oldDateObject = localStorage.getItem("dateObject")
    let newDateObject = new Date()
    oldDateObject = new Date(JSON.parse(oldDateObject))
    console.log('new', newDateObject.getTime(), "old", oldDateObject.getTime())

    if (newDateObject.getTime() > oldDateObject.getTime()) {
      openModal()
      playMusic()
      clearInterval(x)
      localStorage.removeItem('background')
      localStorage.removeItem('alarm')
      localStorage.removeItem('alarmTitle')
    }


    if (--timer < 0) {
      openModal()
      playMusic()
      clearInterval(x)
      localStorage.removeItem('background')
      localStorage.removeItem('alarm')
      localStorage.removeItem('alarmTitle')
      // localStorage.removeItem('sound', optionsSound.value)
    }

  }, 1000)
}

//  formatDateTime
function formatDateTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hh = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()
  var dd = 'AM'
  var h = hh

  if (h >= 12) {
    h = hh - 12
    dd = 'PM'
  }
  if (h == 0) {
    h = 12
  }

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  h = h < 10 ? '0' + h : h

  var display = month + '/' + day + '/' + year + ' ' + h + ':' + m
  display += ':' + s
  display += ' ' + dd

  return display
}

// RESET ALARM SET
document.querySelectorAll('.stop').forEach((item) => {
  item.addEventListener('click', (event) => {
    pauseMusic()
    document.querySelector('#set-Alarm').style.display = 'block'
    audio.pause()
    closeModal()
    alarm_result.style.display = 'none'
  })
})

// STOP
let stop2 = document.querySelector('.stop2')
stop2.addEventListener('click', () => {
  document.querySelector('#set-Alarm').style.display = 'block'
  clearInterval(x)
  // location.reload()
  alarm_result.style.display = 'none'
  localStorage.removeItem('background')
  localStorage.removeItem('alarm')
  localStorage.removeItem('alarmTitle')
  // localStorage.removeItem('sound', optionsSound.value)
})

// Modal Js
closeBtn.addEventListener('click', function () {
  closeModal()
})

modalWrapper.addEventListener('click', function (e) {
  if (e.target !== this) return
  closeModal()
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal()
  }
})

function openModal() {
  modalWrapper.classList.add('active')
}
function closeModal() {
  modalWrapper.classList.remove('active')
}
