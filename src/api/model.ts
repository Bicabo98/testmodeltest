import { haxios } from '@/lib/haxios'

export const getModels = async () => {
  return await haxios.get('/models')
}

export const nostrMessage = async (data: any) => {
  return await haxios.post('/api/v1/nostr/message', data)
}