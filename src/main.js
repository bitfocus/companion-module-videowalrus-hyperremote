const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const WebSocket = require('ws')
const { getActions } = require('./actions')
const { getFeedbacks } = require('./feedbacks')
const { getPresets } = require('./presets')
const { getVariables } = require('./variables')
const { UpgradeScripts } = require('./upgrades')

class HyperRemoteInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
		this.ws = null
		this.reconnectTimer = null
		this.state = {
			armed: false,
			clipPrefix: '',
			clipSuffix: '',
			appendDate: false,
			decks: {},
		}
	}

	async init(config) {
		this.config = config
		this.setActionDefinitions(getActions(this))
		this.setFeedbackDefinitions(getFeedbacks(this))
		this.setPresetDefinitions(getPresets())
		this.setVariableDefinitions(getVariables())
		this.updateVariables()
		this.initWebSocket()
	}

	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Host',
				default: '127.0.0.1',
				width: 8,
			},
			{
				type: 'number',
				id: 'port',
				label: 'Port',
				default: 9119,
				min: 1,
				max: 65535,
				width: 4,
			},
		]
	}

	async configUpdated(config) {
		this.config = config
		this.initWebSocket()
	}

	initWebSocket() {
		this.closeWebSocket()

		if (!this.config.host || !this.config.port) {
			this.updateStatus(InstanceStatus.BadConfig)
			return
		}

		this.updateStatus(InstanceStatus.Connecting)

		const url = `ws://${this.config.host}:${this.config.port}`
		this.ws = new WebSocket(url)

		this.ws.on('open', () => {
			this.updateStatus(InstanceStatus.Ok)
			this.log('debug', `Connected to HyperRemote at ${url}`)
		})

		this.ws.on('message', (raw) => {
			try {
				const msg = JSON.parse(raw.toString())
				if (msg.state) {
					const prevDeckKey = this.getDeckKey()
					this.state = { ...this.state, ...msg.state }
					const nextDeckKey = this.getDeckKey()

					// Only refresh defs when deck list actually changes — re-registering
					// on every state tick resets feedback render state on buttons.
					if (prevDeckKey !== nextDeckKey) {
						this.setActionDefinitions(getActions(this))
						this.setFeedbackDefinitions(getFeedbacks(this))
					}

					this.checkFeedbacks('is-armed', 'any-recording', 'deck-recording', 'deck-playing', 'deck-connected')
					this.updateVariables()
				}
			} catch (e) {
				this.log('warn', `Failed to parse message: ${e.message}`)
			}
		})

		this.ws.on('close', () => {
			this.updateStatus(InstanceStatus.Disconnected)
			this.scheduleReconnect()
		})

		this.ws.on('error', (err) => {
			this.log('error', `WebSocket error: ${err.message}`)
			this.updateStatus(InstanceStatus.ConnectionFailure)
			this.ws.close()
		})
	}

	scheduleReconnect() {
		if (this.reconnectTimer) return
		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null
			this.initWebSocket()
		}, 5000)
	}

	closeWebSocket() {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer)
			this.reconnectTimer = null
		}
		if (this.ws) {
			this.ws.removeAllListeners()
			this.ws.close()
			this.ws = null
		}
	}

	sendCommand(cmd) {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(cmd))
		} else {
			this.log('warn', 'Cannot send command — not connected')
		}
	}

	getDeckIPs() {
		return Object.keys(this.state.decks || {})
	}

	getDeckKey() {
		const decks = this.state.decks || {}
		return Object.entries(decks)
			.map(([ip, d]) => `${ip}:${d.name || ''}`)
			.sort()
			.join('|')
	}

	getDeckChoices() {
		const decks = this.state.decks || {}
		return Object.entries(decks).map(([ip, deck]) => ({
			id: ip,
			label: deck.name || ip,
		}))
	}

	updateVariables() {
		const decks = this.state.decks || {}
		const ips = Object.keys(decks)
		const values = {
			armed: this.state.armed ? 'Armed' : 'Disarmed',
			deck_count: String(ips.length),
		}

		for (let i = 0; i < 8; i++) {
			const n = i + 1
			const deck = ips[i] ? decks[ips[i]] : null
			values[`deck_${n}_name`] = deck ? deck.name || ips[i] : ''
			values[`deck_${n}_state`] = deck ? deck.transportState || 'unknown' : ''
			values[`deck_${n}_timecode`] = deck ? deck.timecode || '00:00:00:00' : ''
			values[`deck_${n}_remaining`] = deck ? deck.remainingTime || '--:--:--' : ''
			values[`deck_${n}_connected`] = deck ? (deck.connected ? 'Connected' : 'Disconnected') : ''
			values[`deck_${n}_format`] = deck ? deck.fileFormat || '' : ''
		}

		this.setVariableValues(values)
	}

	async destroy() {
		this.closeWebSocket()
	}
}

runEntrypoint(HyperRemoteInstance, UpgradeScripts)
