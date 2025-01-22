import { iClearData, data, readOnlyData, rDatas, variableActions } from '../types/interfaces'

/***
 * @description Clear Data
 * @param {data} data - Data
 * @param {readOnlyData} readOnlyDatas - Read Only Data
 * @param {rDatas} rDatas - Read Only Data Array
 * @param {variableActions} variableActions - Variable Actions
 * @returns {object} Cleared Data
 * @author frost-ix
 */
function ClearData(
  data: data,
  readOnlyData: readOnlyData,
  rDatas: rDatas,
  variableActions: variableActions
): iClearData {
  data = {
    iData: {
      targetURL: '',
      startIndex: 1,
      endIndex: 2,
      targetAge: 0,
      inputPrompt: ''
    },
    sData: {
      selectFilter: '',
      selectModel: ''
    }
  } as data
  readOnlyData = {
    targetTitle: '',
    targetContent: '대기중 ......',
    resultData: '대기중 ......'
  } as readOnlyData
  rDatas = [] as rDatas
  variableActions = {
    actionButton: false,
    isCheckedOnce: true,
    isCheckedBeta: false
  } as variableActions
  const clearData: iClearData = {
    data,
    readOnlyData,
    rDatas,
    variableActions
  }
  return clearData
}

/***
 * @description Check load episodes
 * @param {number} n - Start Index
 * @param {number} m - End Index
 * @returns {boolean} Check Load
 * @example CheckLoad(3, 1) -> false
 * @example CheckLoad(1, 20) -> true
 * @author frost-ix
 */
function CheckLoad(n: number, m: number): boolean {
  const maxLoad = 20
  if (maxLoad < m - n) {
    alert('요청 범위를 초과 했습니다 !')
    return true
  } else return false
}

/***
 * @description Visible Buttons
 * @param {number} checkSum - Check Sum
 * @returns {void} Visible Buttons
 * @example VisibleButtons(0) -> Hide All Buttons
 * @example VisibleButtons(1) -> Show Copy & Save Buttons
 * @example VisibleButtons(2) -> Show All Buttons
 * @author frost-ix
 */
function VisibleButtons(checkSum: number): void {
  const copyButton = document.getElementById('copyButton')
  const saveButton = document.getElementById('saveButton')
  const targetSelect = document.getElementById('targetSelect')
  const resSelect = document.getElementById('resSelect')
  if (copyButton && saveButton && targetSelect && resSelect) {
    if (checkSum === 0) {
      copyButton.style.visibility = 'hidden'
      saveButton.style.visibility = 'hidden'
      targetSelect.style.visibility = 'hidden'
      resSelect.style.visibility = 'hidden'
    } else {
      copyButton.style.visibility = 'visible'
      saveButton.style.visibility = 'visible'
      if (checkSum !== 1) {
        targetSelect.style.visibility = 'visible'
        resSelect.style.visibility = 'visible'
      }
    }
  }
}

export default {
  ClearData,
  CheckLoad,
  VisibleButtons
}
