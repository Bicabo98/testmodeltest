//const {generateSecretKey, getPublicKey, finalizeEvent, verifyEvent } = require('nostr-tools')
import { finalizeEvent, verifyEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { useWebSocketImplementation } from 'nostr-tools/relay'
import WebSocket from 'ws'
import { Relay } from 'nostr-tools/relay'

let topic = process.argv[2]
let content = process.argv[3]

useWebSocketImplementation(WebSocket)

let sk = generateSecretKey()
let pk = getPublicKey(sk)
//console.log(sk, pk)

//let event = finalizeEvent({
//  kind: 1,
//  created_at: Math.floor(Date.now() / 1000),
//  tags: [],
//  content: 'hello',
//}, sk)
//console.log(JSON.stringify(event));
//let isGood = verifyEvent(event)
//console.log(event,isGood)


//const relay = await Relay.connect('ws://localhost:10547')
//console.log(`connected to ${relay.url}`)

let eventTemplate = {
  kind: 42,
  created_at: Math.floor(Date.now() / 1000),
  tags: [
      ["e", topic]
  ],
  content: content,
}

// this assigns the pubkey, calculates the event id and signs the event in a single step
const signedEvent = finalizeEvent(eventTemplate, sk)
console.log(JSON.stringify(signedEvent))
//await relay.publish(signedEvent)

//relay.close()
