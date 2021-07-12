// GRAB ALL HTML ELEMNTS

// hr , mins , ampm
let hours = document.querySelector('#hours')
let minutes = document.querySelector('#minutes')
let seconds = document.querySelector('#seconds')

let audio = document.querySelector('#audio')
let playAudio = document.querySelector('#playAudio')
let playButton = document.querySelector('.playButton')
let isPlaying = false

let start = document.getElementById('start')
let stop = document.getElementById('stop')
let ok = document.querySelector('#ok')
let timer = document.querySelector('#timer')

let title = document.getElementById('title')
let timerTitle = document.querySelector('.timerTitle')

// modal
const trigger = document.querySelector('#trigger')
const modalWrapper = document.querySelector('.modal__wrapper')
const closeBtn = document.querySelector('.close')

// SHOWTIMER
function showTimer() {
  let time = localStorage.getItem('timer')
  timer.innerHTML = localStorage.getItem('timer')
  let timerDiv = document.querySelector('.timerDiv')
  timerDiv.innerHTML = time

  my_timer = setInterval(() => {
    let hr = 0,
      min = 0,
      sec = 0,
      timeup = false
    t = time.split(':')
    hr = parseInt(t[0])
    min = parseInt(t[1])
    sec = parseInt(t[2])
    // console.log(min)
    if (sec == 0) {
      if (min > 0) {
        sec = 59
        min--
      } else if (hr > 0) {
        min = 59
        sec = 59
        hr--
      } else {
        timeup = true
      }
    } else {
      sec--
    }
    if (hr < 10) {
      hr = '0' + hr
    }
    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }

    time = hr + ':' + min + ':' + sec
    timerDiv.innerHTML = time
    if (timeup) {
      openModal()
      clearInterval(my_timer)
      playMusic()
      start.style.display = 'inline-block'
      stop.style.display = 'none'
      timerTitle.innerHTML = localStorage.getItem('timerTitle')
    }
  }, 1000)
}

start.addEventListener('click', () => {
  start.style.display = 'none'
  stop.style.display = 'inline-block'
  showTimer()
})

stop.addEventListener('click', () => {
  start.style.display = 'inline-block'
  stop.style.display = 'none'
  clearInterval(my_timer)
})

ok.addEventListener('click', () => {
  pauseMusic()
  closeModal()
})

async function getUserAsync(id) {
  let select = id
  let response = await fetch('sound.json')
  let data = await response.json()
  for (i = 0; i < data.length; i++) {
    select.options[select.options.length] = new Option(data[i].sound_name)
  }
}

// calling function
getUserAsync(audio)

// for playing audio
const playMusic = () => {
  playAudio.src = 'sounds/' + audio.value + '.mp3'
  isPlaying = true
  playAudio.play()
  playButton.classList.replace('fa-play-circle', 'fa-pause-circle')
}
// for pause audio
const pauseMusic = () => {
  playAudio.src = 'sounds/' + audio.value + '.mp3'
  isPlaying = false
  playAudio.pause()
  playButton.classList.replace('fa-pause-circle', 'fa-play-circle')
}

// logic for playing pause music
playButton.addEventListener('click', () => {
  isPlaying ? pauseMusic() : playMusic()
})
// input audio select
// audio.addEventListener('input', () => {
//   playMusic()
// })
// when audio finished
playAudio.addEventListener('ended', () => {
  pauseMusic()
})

function addMinSec(id) {
  let select = id
  let min = 59
  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? '0' + i : i)
  }
}
function addHour(id) {
  let select = id
  let hrs = 24
  for (i = 0; i < hrs; i++) {
    select.options[select.options.length] = new Option(i < 10 ? '0' + i : i)
  }
}

//add
addHour(hours)
addMinSec(minutes)
addMinSec(seconds)

let editTimer = document.querySelector('#editTimer')
let editTimer2 = document.querySelector('#editTimer2')
function onEnter() {
  localStorage.setItem('timerTitle', title.value)
  editTimer.style.display = 'none'
  editTimer2.style.display = 'inline-block'
  stop.style.display = 'inline-block'
  let timeSet = hours.value + ':' + minutes.value + ':' + seconds.value
  localStorage.setItem('timer', timeSet)
  showTimer()
}
editTimer2.addEventListener('click', () => {
  start.style.display = 'none'
  clearInterval(my_timer)
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
