interface insertData {
  targetURL?: string
  startIndex: number
  endIndex: number
  targetAge: number
  inputPrompt: string
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
  resultData?: string
}

export interface rDatas extends Array<readOnlyData> {}

export interface variableActions {
  actionButton: boolean
  isChecked: boolean
}
