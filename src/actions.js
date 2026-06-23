function getActions(self) {
	const deckChoices = self.getDeckChoices()
	const defaultDeck = deckChoices.length > 0 ? deckChoices[0].id : ''

	const deckOption = [
		{
			type: 'dropdown',
			id: 'ip',
			label: 'Deck',
			default: defaultDeck,
			choices: deckChoices,
		},
	]

	return {
		'gang-record': {
			name: 'Gang Record',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'gang-record' })
			},
		},
		'gang-play': {
			name: 'Gang Play',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'gang-play' })
			},
		},
		'gang-stop': {
			name: 'Gang Stop',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'gang-stop' })
			},
		},
		'gang-ee': {
			name: 'Gang E-E/Preview',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'gang-ee' })
			},
		},
		arm: {
			name: 'Arm',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'arm' })
			},
		},
		disarm: {
			name: 'Disarm',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'disarm' })
			},
		},
		'toggle-arm': {
			name: 'Toggle Arm/Disarm',
			options: [],
			callback: () => {
				self.sendCommand({ command: 'toggle-arm' })
			},
		},
		'deck-record': {
			name: 'Deck Record',
			options: deckOption,
			callback: (action) => {
				self.sendCommand({ command: 'deck-record', ip: action.options.ip })
			},
		},
		'deck-play': {
			name: 'Deck Play',
			options: deckOption,
			callback: (action) => {
				self.sendCommand({ command: 'deck-play', ip: action.options.ip })
			},
		},
		'deck-stop': {
			name: 'Deck Stop',
			options: deckOption,
			callback: (action) => {
				self.sendCommand({ command: 'deck-stop', ip: action.options.ip })
			},
		},
	}
}

module.exports = { getActions }
