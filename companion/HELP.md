## Video Walrus HyperRemote

This module connects to the HyperRemote 4 application to provide gang control of multiple Blackmagic HyperDeck recorders.

### Configuration

- **Host**: IP address of the machine running HyperRemote 4 (default: `127.0.0.1`)
- **Port**: WebSocket port (default: `9119`)

### Features

- Gang record, play, stop, and E-E (preview) across all enabled decks
- Arm/disarm safety toggle
- Per-deck transport control
- Live timecode and transport state variables
- Recording and connection status feedbacks

### Requirements

HyperRemote 4 v4.6.0 or later must be running with its Companion WebSocket server active on port 9119.
