function ClearData(data: object, readOnlyData: object, rDatas: object, variableActions: object) {
  data = {
    iData: {
      targetURL: '',
      startIndex: 1,
      endIndex: 1,
      targetAge: 0,
      inputPrompt: ''
    },
    sData: {
      selectFilter: '',
      selectModel: ''
    }
  }
  readOnlyData = {
    targetTitle: '',
    targetContent: '',
    resultData: '대기중 ......'
  }
  rDatas = []
  variableActions = {
    actionButton: false,
    isCheckedOnce: true,
    isCheckedBeta: false
  }
  return { data, readOnlyData, rDatas, variableActions }
}

function CheckLoad(n: number, m: number): boolean {
  const maxLoad = 20
  if (maxLoad < m - n) {
    alert('요청 범위를 초과 했습니다 !')
    return true
  } else return false
}

function VisibleButtons(resultData) {
  const copyButton = document.getElementById('copyButton')
  const saveButton = document.getElementById('saveButton')
  const episodeSelect = document.getElementById('episodeSelect')
  if (copyButton && saveButton && episodeSelect) {
    if (resultData === '대기중 ......') {
      copyButton.style.visibility = 'hidden'
      saveButton.style.visibility = 'hidden'
      episodeSelect.style.visibility = 'hidden'
    } else {
      copyButton.style.visibility = 'visible'
      saveButton.style.visibility = 'visible'
      episodeSelect.style.visibility = 'visible'
    }
  }
}

export default {
  ClearData,
  CheckLoad,
  VisibleButtons
}
