// Full screen
let expand_btn = document.querySelector('.expand_btn')
let el = document.querySelector('.full_screen_preview')
let clockDate = document.querySelector('#clockdate')
expand_btn.addEventListener('click', () => {
  if (el.requestFullscreen) {
    let styles = `
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    `

    el.style = 'background:rgb(242, 48, 48);'
    clockDate.style = styles
    el.requestFullscreen()
  }
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
})

document.addEventListener('fullscreenchange', exitHandler)
document.addEventListener('webkitfullscreenchange', exitHandler)
document.addEventListener('mozfullscreenchange', exitHandler)
document.addEventListener('MSFullscreenChange', exitHandler)

function exitHandler() {
  if (
    !document.fullscreenElement &&
    !document.webkitIsFullScreen &&
    !document.mozFullScreen &&
    !document.msFullscreenElement
  ) {
    ///fire your event
    el.style = ''
    clockDate.style.height = 'auto'
    clockDate.style.padding = '35px'
  }
}

expand_btn.onclick = function (event) {
  if (document.fullscreenElement) {
    el.style = ''
    clockDate.style.height = 'auto'
    clockDate.style.padding = '35px'
    document
      .exitFullscreen()
      .then(() => console.log('Document Exited from Full screen mode'))
      .catch((err) => console.error(err))
  } else {
    document.documentElement.requestFullscreen()
  }
}

let minus_btn = document.querySelector('.minus_btn')
minus_btn.addEventListener('click', () => {
  document.querySelector('.clockdate-wrapper').style.fontSize = '60px'
})

let plus_btn = document.querySelector('.plus_btn')
plus_btn.addEventListener('click', () => {
  document.querySelector('.clockdate-wrapper').style.fontSize = '100px'
})
