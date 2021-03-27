import * as icons from '@fortawesome/free-brands-svg-icons'
import stringSimilarity from 'string-similarity'

function findIcon(word) {
  const iconsNames = Object.keys(icons)

  var matches = stringSimilarity.findBestMatch(word, iconsNames)
  const bestMathch = matches.bestMatch.target
  const Icon = icons[bestMathch]
  return Icon
}
export default findIcon
