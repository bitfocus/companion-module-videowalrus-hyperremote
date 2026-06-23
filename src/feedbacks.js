const { combineRgb } = require('@companion-module/base')

function getFeedbacks(self) {
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
		'is-armed': {
			type: 'boolean',
			name: 'Armed',
			description: 'Change button style when gang controls are armed',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.state.armed === true
			},
		},
		'any-recording': {
			type: 'boolean',
			name: 'Any Deck Recording',
			description: 'Change button style when any deck is recording',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				const decks = self.state.decks || {}
				return Object.values(decks).some((d) => d.transportState === 'record')
			},
		},
		'deck-recording': {
			type: 'boolean',
			name: 'Deck Recording',
			description: 'Change button style when a specific deck is recording',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: deckOption,
			callback: (feedback) => {
				const deck = (self.state.decks || {})[feedback.options.ip]
				return deck && deck.transportState === 'record'
			},
		},
		'deck-playing': {
			type: 'boolean',
			name: 'Deck Playing',
			description: 'Change button style when a specific deck is playing',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: deckOption,
			callback: (feedback) => {
				const deck = (self.state.decks || {})[feedback.options.ip]
				return deck && deck.transportState === 'play'
			},
		},
		'deck-connected': {
			type: 'boolean',
			name: 'Deck Connected',
			description: 'Change button style when a specific deck is connected',
			defaultStyle: {
				bgcolor: combineRgb(0, 180, 0),
				color: combineRgb(255, 255, 255),
			},
			options: deckOption,
			callback: (feedback) => {
				const deck = (self.state.decks || {})[feedback.options.ip]
				return deck && deck.connected === true
			},
		},
	}
}

module.exports = { getFeedbacks }
