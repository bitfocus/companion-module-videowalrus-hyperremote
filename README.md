# Video Walrus HyperRemote — Companion Module

A [Bitfocus Companion](https://bitfocus.io/companion) module for the **[Video Walrus HyperRemote 4](https://videowalrus.com/projects/hyper-remote)** application, providing gang control of multiple Blackmagic HyperDeck recorders.

The module connects to HyperRemote 4 over WebSocket and exposes its transport, arming, and per-deck controls as Companion actions, feedbacks, variables, and presets.

## Requirements

- Bitfocus Companion (Node.js `^18.12 || ^22.8` runtime)
- HyperRemote 4 **v4.6.0 or later** running with its Companion WebSocket server active (default port `9119`)

## Installation

Install the packaged `.tgz` in Companion via **Settings → Modules → Install module from file**, or add the module folder to Companion's Developer Modules path for hot-reload during development.

## Configuration

| Field | Default     | Description                             |
| ----- | ----------- | --------------------------------------- |
| Host  | `127.0.0.1` | IP of the machine running HyperRemote 4 |
| Port  | `9119`      | HyperRemote 4 Companion WebSocket port  |

The module auto-reconnects every 5 seconds if the connection drops.

## Actions

### Gang (all enabled decks)

- **Gang Record**
- **Gang Play**
- **Gang Stop**
- **Gang E-E / Preview**

### Arming

- **Arm** — enable gang controls
- **Disarm** — disable gang controls
- **Toggle Arm/Disarm**

### Per-deck

- **Deck Record** — record a selected deck
- **Deck Play** — play a selected deck
- **Deck Stop** — stop a selected deck

Per-deck actions take a **Deck** dropdown, populated live from the decks reported by HyperRemote 4.

## Feedbacks

All feedbacks are boolean (apply a button style when true):

| Feedback           | Default style | Condition                  |
| ------------------ | ------------- | -------------------------- |
| Armed              | Red bg        | Gang controls are armed    |
| Any Deck Recording | Red bg        | Any deck is recording      |
| Deck Recording     | Red bg        | Selected deck is recording |
| Deck Playing       | Green bg      | Selected deck is playing   |
| Deck Connected     | Green bg      | Selected deck is connected |

## Variables

Global:

- `$(videowalrus-hyperremote:armed)` — `Armed` / `Disarmed`
- `$(videowalrus-hyperremote:deck_count)` — number of decks

Per deck `1`–`8` (`$(videowalrus-hyperremote:deck_N_*)`):

- `deck_N_name` — deck name
- `deck_N_state` — transport state
- `deck_N_timecode` — current timecode
- `deck_N_remaining` — remaining record time
- `deck_N_connected` — `Connected` / `Disconnected`
- `deck_N_format` — file format

## Presets

The module ships ready-made presets for gang transport, arming, and per-deck status buttons. Add them from the **Presets** tab in Companion.

## How it works

HyperRemote 4 runs a WebSocket server; this module is the client. The app pushes `{ state: { ... } }` messages, which the module merges into its internal state, then refreshes feedbacks and variables. Commands are sent as `{ command: '...' }` (with an `ip` field for per-deck actions). Action and feedback definitions are only re-registered when the deck list changes, to avoid resetting button render state on every state tick.

## Development

```sh
yarn install
yarn package   # produces videowalrus-hyperremote-<version>.tgz
yarn format    # prettier
```

## License

[MIT](LICENSE) — © Video Walrus Ltd
