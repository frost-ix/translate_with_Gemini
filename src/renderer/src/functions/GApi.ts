import { readOnlyData } from '@renderer/types/types'
import axios from 'axios'

async function CrawlingEpisodes(serverUrl: string, data: object): Promise<string[]> {
  const res = await axios.post(serverUrl + 'ce', data)
  return res.data
}

async function Crawling(serverUrl: string, url: string): Promise<readOnlyData> {
  const res = await axios.post(serverUrl + 'cr', { url })
  return res.data
}

async function SendPrompt(serverUrl: string, data: object): Promise<string> {
  const res = await axios.post(serverUrl + 'gemini', data)
  return res.data
}

export default { CrawlingEpisodes, Crawling, SendPrompt }
