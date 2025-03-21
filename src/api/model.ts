import { haxios } from '@/lib/haxios'

export const getModels = async () => {
  return await haxios.get('/api/models')
}

export const nostrMessage = async (data: any) => {
  return await haxios.post('/api/v1/nostr/message', data)
}

export const aiChat = async (data: any) => {
  return await haxios.post('/api/chat', data)
}

export const aiChatHistory = async  ( data:any) => {
  return await haxios.post('/api/chat/history', data)
}