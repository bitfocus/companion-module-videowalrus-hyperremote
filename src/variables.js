function getVariables() {
	const vars = [
		{ variableId: 'armed', name: 'Armed State' },
		{ variableId: 'deck_count', name: 'Deck Count' },
	]

	for (let i = 1; i <= 8; i++) {
		vars.push({ variableId: `deck_${i}_name`, name: `Deck ${i} Name` })
		vars.push({ variableId: `deck_${i}_state`, name: `Deck ${i} Transport State` })
		vars.push({ variableId: `deck_${i}_timecode`, name: `Deck ${i} Timecode` })
		vars.push({ variableId: `deck_${i}_remaining`, name: `Deck ${i} Remaining Time` })
		vars.push({ variableId: `deck_${i}_connected`, name: `Deck ${i} Connected` })
		vars.push({ variableId: `deck_${i}_format`, name: `Deck ${i} File Format` })
	}

	return vars
}

module.exports = { getVariables }
