interface insertData {
  targetURL?: string
  startIndex: number
  endIndex: number
  targetAge: number
  inputPrompt: string
}

export interface iClearData {
  data: data
  readOnlyData: readOnlyData
  rDatas: rDatas
  variableActions: variableActions
}

interface selectData {
  selectFilter: string
  selectModel: string
}

export interface data {
  iData: insertData
  sData: selectData
}

export interface readOnlyData {
  targetTitle: string
  targetContent: string
  resultData: string
}

export interface rDatas extends Array<readOnlyData> {}

export interface variableActions {
  actionButton: boolean
  isCheckedOnce: boolean
  isCheckedBeta: boolean
}
