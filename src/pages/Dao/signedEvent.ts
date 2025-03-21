import { finalizeEvent, generateSecretKey } from 'nostr-tools/pure'

interface MsgData {
  kind: number
  created_at: number
  tags: string[][]
  content: string
}

export const signedEvent = (msgData: MsgData) => {
  const sk = generateSecretKey()
  return finalizeEvent(msgData, sk)
}
