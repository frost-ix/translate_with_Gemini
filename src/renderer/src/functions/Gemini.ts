function ClearData(data: object, readOnlyData: object, variableActions: object) {
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
  readOnlyData = [
    {
      targetTitle: '',
      targetContent: '',
      resultData: '대기중 ......'
    }
  ]
  variableActions = {
    actionButton: false,
    isChecked: false
  }
  return { data, readOnlyData, variableActions }
}

function PromptError() {
  alert('프롬프트를 입력해주세요 !')
}

function FilterModelError() {
  alert('필터와 모델을 선택해주세요 !')
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
  if (copyButton && saveButton) {
    if (resultData === '대기중 ......') {
      copyButton.style.visibility = 'hidden'
      saveButton.style.visibility = 'hidden'
    } else {
      copyButton.style.visibility = 'visible'
      saveButton.style.visibility = 'visible'
    }
  }
}

export default { ClearData, PromptError, FilterModelError, CheckLoad, VisibleButtons }
