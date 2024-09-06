function PromptError() {
  alert('프롬프트를 입력해주세요 !')
}

function FilterModelError() {
  alert('필터와 모델을 선택해주세요 !')
}

function UnderFlowError() {
  alert('시작 회차 또는 마지막 회차가 1 미만으로 설정 되어있습니다.')
}

function MissMatchError() {
  alert('시작 회차가 마지막 회차보다 큽니다.')
}

export default {
  PromptError,
  FilterModelError,
  UnderFlowError,
  MissMatchError
}
