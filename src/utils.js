export const colours = [
	'#00ff44',
	'#aaff00',
	'#fbff00',
	'#ffe100',
	'#ffc400',
	'#ff9d00',
	'#ff8400',
	'#ff5900',
	'#ff0000'
]

export const colorisor = (actualNumber, ranges) => {
	if (actualNumber <= ranges[0]) {
		return colours[0]
	} else if (actualNumber > ranges[0] && actualNumber <= ranges[1]) {
		return colours[1]
	} else if (actualNumber > ranges[1] && actualNumber <= ranges[2]) {
		return colours[2]
	} else if (actualNumber > ranges[2] && actualNumber <= ranges[3]) {
		return colours[3]
	} else if (actualNumber > ranges[3] && actualNumber <= ranges[4]) {
		return colours[4]
	} else if (actualNumber > ranges[4] && actualNumber <= ranges[5]) {
		return colours[5]
	} else if (actualNumber > ranges[5] && actualNumber <= ranges[6]) {
		return colours[6]
	} else if (actualNumber > ranges[6] && actualNumber <= ranges[7]) {
		return colours[7]
	} else if (actualNumber > ranges[7]) {
		return colours[8]
	}
}

export const usmPriceHighlight = (price) => {
	const difference = Math.abs(1.0 - Number.parseFloat(price))
	const ranges = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08]
	return colorisor(difference, ranges)
}

export const debtRatioHighlight = (debtRatio) => {
	const ranges = [0.5, 0.6, 0.65, 0.7, 0.725, 0.75, 0.775, 0.8]
	return colorisor(debtRatio, ranges)
}

export const oracleHighlight = (referencePrice, actualPrice) => {
	const difference = Math.abs(
		Number.parseFloat(referencePrice) - Number.parseFloat(actualPrice)
	)
	const ranges = [2, 4, 6, 8, 10, 12, 14, 20]
	return colorisor(difference, ranges)
}

export const decimalPlaces = (numberString, decimals = 2) => {
	const value = Number(Number.parseFloat(numberString).toFixed(decimals))

	if (isNaN(value)) {
		return ''
	} else {
		return value.toLocaleString(undefined, {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		})
	}
}

export const toPercentage = (decimalString) => {
	const num = Number.parseFloat(decimalString) * 100
	return decimalPlaces(num.toString())
}

export const stringMul = (a, b) => {
	return Number.parseFloat(a) * Number.parseFloat(b)
}
