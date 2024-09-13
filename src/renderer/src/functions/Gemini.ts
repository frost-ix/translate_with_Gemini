function ClearData(data: object, readOnlyData: object, rDatas: object, variableActions: object) {
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
  }
  readOnlyData = {
    targetTitle: '',
    targetContent: '대기중 ......',
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

function VisibleButtons(checkSum: number) {
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
