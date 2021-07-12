// GRAB ALL HTML ELEMENT IN VARIABLES

console.log('connected')
// for sounds
let playButton = document.querySelector('.playButton')
let audio = document.querySelector('#myAudio')
let audioSrc = document.querySelector('#audioSrc')

// hr , mins , ampm
let optionsSound = document.querySelector('#sound')
let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let AMPM = document.querySelector('#AMPM')
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
  let response = await fetch('sound.json')
  let data = await response.json()
  for (i = 0; i < data.length; i++) {
    select.options[select.options.length] = new Option(data[i].sound_name)
  }
}

optionsSound.addEventListener('input', () => {
  localStorage.setItem('sound', optionsSound.value)
})

getUserAsync(optionsSound)

// for playing audio
const playMusic = () => {
  audio.src = 'sounds/' + localStorage.getItem('sound') + '.mp3'
  audio.play()
  audio.loop = true
  isPlaying = true
  playButton.classList.replace('fa-play', 'fa-pause')
}
// for pause audio
const pauseMusic = () => {
  audio.src = 'sounds/' + optionsSound.value + '.mp3'
  isPlaying = false
  audio.pause()
  playButton.classList.replace('fa-pause', 'fa-play')
}

// logic for playing pause music
playButton.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic()
})

// input audio select
// optionsSound.addEventListener('input', () => {
//   playMusic()
// })

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
  let alarmSet = localStorage.getItem('alarm')

  if (currentTime == alarmSet) {
    openModal()
    playMusic()
  } else {
    setTimeout(function () {
      startTime()
    }, 500)
  }
}

// calling function
startTime()

// ADD ZERO
function checkTime(i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
// ADD ZERO
function addMinSec(id) {
  let select = id
  let min = 59
  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? '0' + i : i)
  }
}
// ADD ZERO
function addHour(id) {
  let select = id
  let hrs = 12
  for (i = 1; i <= hrs; i++) {
    if (i == 12) {
      select.options[select.options.length] = new Option(i + ' ' + 'AM')
    }
  }
  for (i = 1; i < hrs; i++) {
    if (i < 12) {
      select.options[select.options.length] = new Option(i + ' ' + 'AM')
    }
  }
}
function addHour2(id) {
  let select = id
  let hrs = 12
  for (i = 1; i <= hrs; i++) {
    if (i == 12) {
      select.options[select.options.length] = new Option(i + ' ' + 'PM')
    }
  }
  for (i = 1; i < hrs; i++) {
    if (i < 12) {
      select.options[select.options.length] = new Option(i + ' ' + 'PM')
    }
  }
}

//add
addHour(hours)
addHour2(hours)
addMinSec(minutes)

let alarm_alert_modal = document.querySelector('.alarm_alert_modal')
let alarmTime = document.getElementsByClassName('alarmTime')
let alarmTitle = document.getElementsByClassName('alarm-title')

// ALARM SET FUNCTION

window.onload = function () {
  if (typeof localStorage == 'undefined') {
    alert('Your browser does not support HTML5 localStorage. Try upgrading.')
  } else {
    if (localStorage.getItem('background') != null) {
      alarm_result.style.background = localStorage.background
      alarmTitle[0].innerHTML = localStorage.getItem('alarmTitle')
      alarmTitle[1].innerHTML = localStorage.getItem('alarmTitle')
      alarmTime[0].innerHTML = localStorage.getItem('alarm')
      alarmTime[1].innerHTML = localStorage.getItem('alarm')
      alarm_result.style.display = 'block'
    }
  }
}

function onEnter() {
  var currentTime = moment()
  let Chr = moment(currentTime).format('h A')
  // console.log(Chr.split(' '))
  // console.log(hours.value.split(' '))

  let cTime = Chr.split(' ')[1]
  let uTime = hours.value.split(' ')[1]

  if (cTime === uTime) {
    console.log('true')
    console.log(parseInt(hours.value) - Chr.split(' ')[0])
  }
  if (cTime !== uTime) {
    console.log(parseInt(hours.value) + parseInt(Chr.split(' ')[0] - 2))
  }

  // let min = moment(currentTime).format('mm')
  // let sec = moment(currentTime).format('ss')
  // let time = hr + ':' + min + ':' + sec
  // let t = time.split(':')
  // hr = parseInt(hours.value) - parseInt(t[0])
  // console.log(hours.value)
  // min = parseInt(minutes.value) - parseInt(t[1])
  // sec = parseInt(t[2])
  // setInterval(() => {
  //   if (sec == 0) {
  //     if (min > 0) {
  //       sec = 59
  //       min--
  //     } else if (hr > 0) {
  //       min = 59
  //       sec = 59
  //       hr--
  //     } else {
  //       timeup = true
  //     }
  //   } else {
  //     sec--
  //   }

  //   document.querySelector('.remainTime').innerHTML = hr + ':' + min + ':' + sec
  //   console.log(hr + ' ' + 'Hours' + ':' + min + ' ' + 'minutes' + ':' + sec)
  // }, 800)

  if (activeAlarm == false) {
    setColour = 'rgb(26 26 26)'
    alarm_result.style.background = setColour
    localStorage.setItem('background', setColour)
    alarm_result.style.display = 'block'

    let hrs = hours.value.split(' ')
    let hoursValue = hrs[0]
    let amPm = hrs[1]

    alarmElement = hoursValue + ':' + minutes.value + ' ' + amPm

    localStorage.setItem('alarmTitle', title.value)
    localStorage.setItem('alarm', alarmElement)

    if (title.value !== '') {
      alarmTitle[0].innerHTML = localStorage.getItem('alarmTitle')
      alarmTitle[1].innerHTML = localStorage.getItem('alarmTitle')
    }
    alarmTime[0].innerHTML = localStorage.getItem('alarm')
    alarmTime[1].innerHTML = localStorage.getItem('alarm')
  }
}

// RESET ALARM SET
document.querySelectorAll('.stop').forEach((item) => {
  item.addEventListener('click', (event) => {
    location.reload()
    audio.pause()
    closeModal()
    alarm_result.style.visibility = 'hidden'
    localStorage.removeItem('background')
    localStorage.removeItem('alarm')
    localStorage.removeItem('alarmTitle')
  })
})

// STOP
let stop2 = document.querySelector('.stop2')
stop2.addEventListener('click', () => {
  alarm_result.style.display = 'none'
  localStorage.removeItem('background')
  localStorage.removeItem('alarm')
  localStorage.removeItem('alarmTitle')
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
