let interval
let time = 75
let distance = 0.2
let unit = 'rem'
let shadow = 'white'
let colors = ["red", "orange", "yellow", "green", "blue", "darkblue", "purple"]
let length = colors.length
let editable = true

const shadowMapper = (distance, color) =>
  `${`${distance}${unit} `.repeat(2)} ${color}`

function oida() {
  // debugger
  return Array(length + 1).fill(distance).map((distance, i) => distance * (i + 1))
    .map((distance, i) => i === 0
         ? shadowMapper(distance, shadow)
         : shadowMapper(distance, colors[i % colors.length]))
    .join(', ')
}

const getParams = () => new URLSearchParams(location.search)

function whee() {
  if (!interval) {
    interval = setInterval(() => {
      colors = [ ...colors.slice(1), colors[0] ]
      document.querySelector('body').style.textShadow = oida()
    }, time)
  }
}

const makeLine = text => {
  const el = document.createElement('span')
  el.innerText = text
  return el
}

const getText = () => document.querySelectorAll('.oida > *').map(el => el.innerText).join('\n')

if (location.hash) {
  const text = decodeURIComponent(location.hash.slice(1))
  document.querySelectorAll('.oida > *').forEach(el => el.remove())
  text.split('\n').map(makeLine).forEach(el => document.body.appendChild(el))
}

const falsey = v => (['false', '0'].includes(v))

if (location.search.length > 0) {
  const params = getParams()
  document.body.style.fontSize = params.get('size')
  document.body.style.background = params.get('background')
  document.body.style.color = params.get('color')
  if (params.get('font') !== null) document.body.style.fontFamily = params.get('font')
  if (params.get('shadow') !== null) shadow = params.get('shadow')
  else if (params.get('background') !== null) shadow = params.get('background')
  if (params.get('time') !== null && Number(params.get('time'))) {
    time = Number(params.get('time'))
  }
  if (params.get('length') !== null && !isNaN(Number(params.get('length')))) {
    length = Number(params.get('length'))
  }
  if (params.get('distance') !== null && Number(params.get('distance'))) {
    distance = Number(params.get('distance'))
  }
  if (params.get('unit') !== null) unit = params.get('unit')
}

if (getParams().get('whee') === null || !falsey(getParams().get('whee'))) {
  whee()
} else {
  console.log(`%cVisit ${location.origin}/?whee for a more fabulous experience.`, `font-size: 130%`)
  console.log('%cWarning: Flashy rainbow trails.', 'color: darkred')
}

if (getParams().get('editable') !== null && falsey(getParams().get('editable'))) {
  document.body.contentEditable = 'false'
}

const update = () => setTimeout(() => {
  location.hash = encodeURIComponent(document.body.innerText)
  document.title = document.body.innerText.split('\n')[0] || 'oida'
})

const throttledUpdate = _.debounce(update, 500, { trailing: true })

let observer = new MutationObserver(throttledUpdate)
observer.observe(document.body, { attributes: false, childList: true, subtree: true })
document.body.addEventListener('keydown', throttledUpdate)

console.log(`%cmany options, much wow`, 'font-size: 130%')
console.log(`${location.origin}/?size=7rem&color=white&background=black&shadow=black` +
            `&font=Comic%20Sans%20MS,monospace&time=50&distance=3&unit=px&length=3&editable=false` +
            `#much%20wow`)
