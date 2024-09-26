import { readOnlyData } from '@renderer/types/interfaces'
import axios from 'axios'

/***
 * @description Crawling Episodes URL
 * @param {string} serverUrl - Gemini Server URL
 * @param {object} data - Crawling Data
 * @returns {string[]} Crawling Episodes URL List
 * @author frost-ix
 */
async function CrawlingEpisodes(serverUrl: string, data: object): Promise<Array<string>> {
  const res = await axios.post(serverUrl + 'ce', data)
  return res.data.episodeURL
}

/***
 * @description Crawling data from Target URL
 * @param {string} serverUrl - Gemini Server URL
 * @param {string} url - Target URL
 * @returns {readOnlyData} Crawling Data
 * @author frost-ix
 */
async function Crawling(serverUrl: string, url: string): Promise<readOnlyData> {
  const res = await axios.post(serverUrl + 'cr', { url })
  return res.data
}

/***
 *@description Connect to Gemini Server and Send Prompt
 *@param {string} serverUrl - Gemini Server URL
 *@param {object} data - Prompt Data
 *@returns {string} Prompt Response
 * @author frost-ix
 */
async function SendPrompt(serverUrl: string, data: object) {
  const res = await axios.post(serverUrl + 'gemini', data)
  return res.data
}

export default { CrawlingEpisodes, Crawling, SendPrompt }
