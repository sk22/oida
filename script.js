let interval
let colors = ["white", "red", "orange", "yellow", "green", "blue", "darkblue", "purple"]
const keywords = ['whee', 'hui']
function oida() {
  return Array(colors.length).fill(25).map((n, i) => n * (i + 1) / 100).map(n => `${n}rem `.repeat(2)).map((x, i) => `${x}${colors[i]}`).join(', ')
}

const getParams = () => new URLSearchParams(location.search)

function whee() {
  if (!interval) {
    interval = setInterval(() => {
      colors = [ colors[0], ...colors.slice(2), colors[1] ]
      document.querySelector('body').style.textShadow = oida()
    }, 100)
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

const params = getParams()
if (params.get('whee') === null || !falsey(params.get('whee'))) whee()
document.body.style.fontSize = params.get('size')
document.body.style.background = params.get('background')
document.body.style.color = params.get('color')
if (params.get('font') !== null) document.body.style.fontFamily = params.get('font')
if (params.get('shadow') !== null) colors[0] = params.get('shadow')

const update = () => setTimeout(() => {
  location.hash = encodeURIComponent(document.body.innerText)
})

const throttledUpdate = _.debounce(update, 500, { trailing: true })

let observer = new MutationObserver(throttledUpdate)
observer.observe(document.body, { attributes: false, childList: true, subtree: true })
document.body.addEventListener('keydown', throttledUpdate)

if (getParams().get('whee') === null) {
  console.log(`%cVisit ${location.origin}/?whee for a more fabulous experience.`, `font-size: 130%`)
  console.log('%cWarning: Flashy rainbow trails.', 'color: darkred')
}
