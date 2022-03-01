---
---



let getScript =  document.currentScript
const userHrVal = getScript.dataset.hour
const userMinsValue = getScript.dataset.minute
const userAPVal = getScript.dataset.ap



let playButton = document.querySelector('.playButton')
let audioSrc = document.querySelector('#audioSrc')

let testAlarm = document.querySelector('.testAlarm')
let modal__wrapper2 = document.querySelector('.modal__wrapper2')

// hr , mins , ampm
let optionsSound = document.querySelector('#sound')
let hours = document.querySelector('#edit-hour')
let minutes = document.querySelector('#edit-minute')
let AMPM = document.querySelector('#AMPM')
let title = document.querySelector('.title')
let result = document.querySelector('.result')

let edit_alarm_result = document.querySelector('.edit_alarm_result')
let editremainningTime = document.getElementsByClassName('editremainningTime')

let store
let isPlaying = false


// DROPDOWN MUSIC LIST
async function getUserAsync(id) {
  let select = id
  for (let n = 0; n < select.length; n++) {
    const elem = select[n]
  
    if (elem.innerHTML == 'Bells') {
      if (localStorage.getItem(`${URL}-sound`) === null) {
        localStorage.setItem(`${URL}-sound`, elem.innerHTML.toLowerCase())
        elem.setAttribute('selected', '')
      }
    }

    if (elem.innerHTML.toLowerCase() == localStorage.getItem(`${URL}-sound`)) {
      localStorage.setItem(`${URL}-sound`, elem.innerHTML.toLowerCase())
      elem.setAttribute('selected', '')
    }
  }
}

optionsSound.addEventListener('input', () => {
  localStorage.setItem(`${URL}-sound`, optionsSound.value.toLowerCase())
})

getUserAsync(optionsSound)

// for playing audio
const playMusic = () => {
  audio.src =
    'sounds/' + localStorage.getItem(`${URL}-sound`).toLowerCase() + '.mp3'
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



// ADD ZERO
function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}



if(userHrVal && userMinsValue && userAPVal){
for (let n = 0; n < hours.length; n++) {
  const elem = hours[n]
  if (elem.innerHTML.replace(/\&nbsp;/g, '') == userHrVal + " " + userAPVal) {
    elem.setAttribute('selected', '')
  }
}
for (let n = 0; n < minutes.length; n++) {
  const elem = minutes[n]
  if (elem.innerHTML == userMinsValue) {
    elem.setAttribute('selected', '')
  }
}
}else{
  for (let n = 0; n < hours.length; n++) {
    const elem = hours[n]
  
    if (elem.innerHTML.replace(/\&nbsp;/g, '') == moment().format('h A')) {
      elem.setAttribute('selected', '')
    }
  }
  for (let n = 0; n < minutes.length; n++) {
    const elem = minutes[n]
    if (elem.innerHTML == moment().add(userMinsValue, 'minutes').format('mm')) {
      elem.setAttribute('selected', '')
    }
  }
}

let alarm_alert_modal = document.querySelector('.alarm_alert_modal')
let alarmTime = document.getElementsByClassName('alarmTime')
let alarmTitles = document.getElementsByClassName('edit-alarm-title')
// ALARM SET FUNCTION

function Edit() {
  if (activeAlarm == false) {
    pauseMusic()
    setAlarmTxt.innerHTML = ''
    testAlarm.style.display = 'none'
    editAlarm.style.display = 'none'
    btn1.style.display = 'none'
    setColour = 'rgb(26 26 26)'
    edit_alarm_result.style.background = setColour
    localStorage.setItem(`${URL}-EditOptionbackground`, setColour)
    edit_alarm_result.style.display = 'block'

    let hrs = hours.value.split(' ')
    let hoursValue = hrs[0]
    let amPm = hrs[1]

    alarmElement = hoursValue.replace(/\xA0/g, ' ') + ':' + minutes.value + ' ' + amPm

    localStorage.setItem(`${URL}-alarmTitle`, title.value)
    localStorage.setItem(`${URL}-alarm`, alarmElement)

    
    EdittimeDiffererence(hoursValue, minutes.value, amPm)
   
    

    if (title.value !== '') {
      alarmTitles[0].innerHTML = localStorage.getItem(`${URL}-alarmTitle`)
      // alarmTitles[1].innerHTML = localStorage.getItem('alarmTitle')
    }
    alarmTime[0].innerHTML = localStorage.getItem(`${URL}-alarm`)
    alarmTime[1].innerHTML = localStorage.getItem(`${URL}-alarm`)
  }
}

// TimeDifferernece Function

function EdittimeDiffererence(hoursEnd, minutesEnd, amPMEnd) {
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
        console.log(amPMEnd)
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

      EditstartTimer(duration)
    }
  }
}
// Date Formatting
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

// Counter Timer
var x
function EditstartTimer(duration) {
  remainningTime[1].innerHTML = ''

  var timer = duration,
    hours,
    minutes,
    seconds

  var tempTime
  clearInterval(x)
  x = setInterval(function () {
    hours = parseInt(timer / 3600, 10)
    tempTime = parseInt(timer % 3600, 10)
    minutes = parseInt(tempTime / 60, 10)
    tempTime = parseInt(timer % 60, 10)
    seconds = tempTime

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    editremainningTime[0].innerHTML = 'Remaining Time:'
    editremainningTime[1].innerHTML = hours + ':' + minutes + ':' + seconds
    console.log(hours + ':' + minutes + ':' + seconds)

    if (--timer < 0) {
      openModal2()
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
function EditformatDateTime(date) {
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
document.querySelectorAll('.stopEditAlarm').forEach((item) => {
  item.addEventListener('click', (event) => {
    location.reload()
    audio.pause()
    closeModal()
    edit_alarm_result.style.display = 'none'
    localStorage.removeItem(`${URL}-EditOptionbackground`)
    localStorage.removeItem(`${URL}-alarm`)
    localStorage.removeItem(`${URL}-alarmTitle`)
    // localStorage.removeItem(`${URL}-sound`, optionsSound.value)
  })
})

// STOP
let stopEditAlarm2 = document.querySelector('.stopEditAlarm2')
stopEditAlarm2.addEventListener('click', () => {
  testAlarm.style.display = 'block'
  editAlarm.style.display = 'block'
  btn1.style.display = 'block'
  edit_alarm_result.style.display = 'none'
  localStorage.removeItem(`${URL}-EditOptionbackground`)
  localStorage.removeItem(`${URL}-alarm`)
  localStorage.removeItem(`${URL}-alarmTitle`)
  // localStorage.removeItem(`${URL}-sound`, optionsSound.value)
})

// Modal Js
closeBtn.addEventListener('click', function () {
  closeModal()
})

modal__wrapper2.addEventListener('click', function (e) {
  if (e.target !== this) return
  closeModal()
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal()
  }
})

function openModal2() {
  modal__wrapper2.classList.add('active')
}
function closeModal2() {
  modal__wrapper2.classList.remove('active')
}
