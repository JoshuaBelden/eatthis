const createMatch = (expression, value) => {
  const re = new RegExp(expression, 'i')
  return re.exec(value)
}

const parseFraction = (input) => {
  const wholeParts = input.split(' ')
  let wholeResult = 0
  let fractionString = ''
  if (wholeParts.length > 1) {
    wholeResult = parseInt(wholeParts[0], 10)
    fractionString = wholeParts[1]
  } else {
    fractionString = wholeParts[0]
  }

  const fractionParts = fractionString.split('/')
  const numerator = parseInt(fractionParts[0], 10)
  const denominator = parseInt(fractionParts[1], 10)
  const fractionResult = numerator / denominator

  return parseFloat((wholeResult + fractionResult).toFixed(2))
}

const isFraction = (input) => {
  return input.includes('/')
}

const parseUnit = (input, unitsOfMeasure) => {
  for (const set of unitsOfMeasure) {
    for (const value of set[1]) {
      const match = createMatch(`(${value})`, input)
      if (!match) {
        continue
      }

      return set[0].includes('$1') ? set[0].replace('$1', match[2]) : set[0]
    }
  }

  return null
}

const expressionIncludesCapture = (expression) => {
  return expression.includes('(')
}

const parseQuantity = (input) => {
  const quantityMatch = input.match(/[-]?[0-9]+[ ,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/i)
  if (!quantityMatch) {
    return 1
  }

  return isFraction(quantityMatch[0])
    ? parseFraction(quantityMatch[0])
    : parseFloat(quantityMatch[0])
}

const parseForFoodItemMatch = (input, foodData) => {
  for (const foodItem of foodData) {
    const match = createMatch(`\\b(${foodItem})[s]*\\b`, input)
    if (!match) {
      continue
    }

    return match[expressionIncludesCapture(foodItem) ? 2 : 1]
  }

  return null
}

const parseForExpressionMatch = (expressions, input) => {
  for (const expression of expressions) {
    const match = createMatch(`\\b(${expression})[s]*\\b`, input)
    if (!match) {
      continue
    }

    return match[expressionIncludesCapture(expression) ? 2 : 1]
  }

  return null
}

const parse = (input, unitsOfMeasure, foodPreparations, foodModifiers, foodData) => {
  if (!input) {
    throw new Error('Ingredient line cannot be empty.')
  }

  const value = input.toLowerCase()
  const name = parseForFoodItemMatch(value, foodData)
  const quantity = parseQuantity(value)
  const unitOfMeasure = parseUnit(value, unitsOfMeasure)
  const modifier = parseForExpressionMatch(foodModifiers, value)
  const preparation = parseForExpressionMatch(foodPreparations, value)

  return {
    input,
    quantity,
    unitOfMeasure,
    name,
    modifier,
    preparation,
  }
}

module.exports = { parse }
