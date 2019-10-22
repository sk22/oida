let interval
let colors = ["white", "red", "orange", "yellow", "green", "blue", "darkblue", "purple"]
function oida() {
  return Array(colors.length).fill(25).map((n, i) => n * (i + 1) / 100).map(n => `${n}rem `.repeat(2)).map((x, i) => `${x}${colors[i]}`).join(', ') + ';'
}
console.log(colors)
console.log(oida)

function whee() {
  interval = setInterval(() => {
    colors = [ colors[0], ...colors.slice(2), colors[1] ]
    document.querySelectorAll('body > *').forEach(e => e.setAttribute('style', `text-shadow: ${oida()};`))
  }, 100)
}

const makeP = text => {
  const el = document.createElement('p')
  el.innerText = text
  return el
}

const getText = () => document.querySelectorAll('.oida > *').map(el => el.innerText).join('\n')

if (location.hash) {
  const textEndPosition = location.hash.indexOf('?')
  const text = decodeURIComponent(location.hash.slice(1, textEndPosition > 0 ? textEndPosition : undefined))
  document.querySelectorAll('.oida > *').forEach(el => el.remove())
  text.split('\n').map(makeP).forEach(el => document.body.appendChild(el))
  
  if (textEndPosition > 0 && location.hash.slice(textEndPosition + 1) === 'whee') {
    whee()
  }
}

const update = () => setTimeout(() => {
  history.replaceState(
    undefined, document.body.innerText, `#${encodeURIComponent(document.body.innerText)}`)
})

const throttledUpdate = _.debounce(update, 500, { trailing: true })

document.body.addEventListener('keydown', throttledUpdate)

let observer = new MutationObserver(throttledUpdate)
  .observe(document.body, { attributes: true, childList: true, subtree: true })
