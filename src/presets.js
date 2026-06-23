const { combineRgb } = require('@companion-module/base')

function getPresets() {
	const presets = {}

	// Gang Control

	presets['gang-record'] = {
		type: 'button',
		category: 'Gang Control',
		name: 'Gang Record',
		style: {
			text: 'REC',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'gang-record' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'any-recording',
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	presets['gang-play'] = {
		type: 'button',
		category: 'Gang Control',
		name: 'Gang Play',
		style: {
			text: 'PLAY',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'gang-play' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['gang-stop'] = {
		type: 'button',
		category: 'Gang Control',
		name: 'Gang Stop',
		style: {
			text: 'STOP',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'gang-stop' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['gang-ee'] = {
		type: 'button',
		category: 'Gang Control',
		name: 'Gang E-E',
		style: {
			text: 'E-E',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'gang-ee' }],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['arm-toggle'] = {
		type: 'button',
		category: 'Gang Control',
		name: 'Arm Toggle',
		style: {
			text: 'ARM',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'toggle-arm' }],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'is-armed',
				style: {
					bgcolor: combineRgb(255, 0, 0),
					color: combineRgb(255, 255, 255),
				},
			},
		],
	}

	// Status displays

	presets['deck-1-timecode'] = {
		type: 'button',
		category: 'Status',
		name: 'Deck 1 Timecode',
		style: {
			text: '$(videowalrus-hyperremote:deck_1_timecode)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['deck-1-state'] = {
		type: 'button',
		category: 'Status',
		name: 'Deck 1 Status',
		style: {
			text: '$(videowalrus-hyperremote:deck_1_name)\\n$(videowalrus-hyperremote:deck_1_state)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['deck-2-timecode'] = {
		type: 'button',
		category: 'Status',
		name: 'Deck 2 Timecode',
		style: {
			text: '$(videowalrus-hyperremote:deck_2_timecode)',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	presets['deck-2-state'] = {
		type: 'button',
		category: 'Status',
		name: 'Deck 2 Status',
		style: {
			text: '$(videowalrus-hyperremote:deck_2_name)\\n$(videowalrus-hyperremote:deck_2_state)',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [],
				up: [],
			},
		],
		feedbacks: [],
	}

	return presets
}

module.exports = { getPresets }
