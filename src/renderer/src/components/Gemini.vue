<script lang="ts">
import gemini from '@renderer/functions/Gemini'
import exception from '@renderer/error/ExceptionHandler'
import EnvControl from '@renderer/functions/EnvControl'
import GApi from '@renderer/functions/GApi'
import { data, rDatas, readOnlyData, variableActions } from '@renderer/types/interfaces'

export default {
  data(): {
    data: data
    readOnlyData: readOnlyData
    variableActions: variableActions
    readOnlyDatas: rDatas
    targetE: number
    resultE: number
  } {
    return {
      data: {
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
      } as data,
      readOnlyData: {
        targetTitle: '',
        targetContent: '대기중 ......',
        resultData: '대기중 ......'
      } as readOnlyData,
      readOnlyDatas: [] as rDatas,
      variableActions: {
        actionButton: false,
        isCheckedOnce: true,
        isCheckedBeta: false
      } as variableActions,
      targetE: 0,
      resultE: 0
    }
  },
  methods: {
    async fetchData() {
      try {
        const serverUrl: string = EnvControl()

        const maxLoad: boolean = gemini.CheckLoad(
          this.data.iData.startIndex,
          this.data.iData.endIndex
        )
        if (maxLoad) {
          return
        }

        if (!this.data.iData.inputPrompt) {
          this.exceptionHandler('p')
          return
        }

        if (!this.data.sData.selectFilter || !this.data.sData.selectModel) {
          this.exceptionHandler('fM')
          return
        }

        this.variableActions.actionButton = true

        if (this.data.iData.targetURL) {
          const url: string = this.data.iData.targetURL
          if (this.variableActions.isCheckedOnce) {
            const crawlingData: readOnlyData = await GApi.Crawling(serverUrl, url)
            this.readOnlyData.targetTitle = crawlingData.targetTitle
            this.readOnlyData.targetContent = crawlingData.targetContent
          } else {
            if (this.data.iData.startIndex < 1 || this.data.iData.endIndex < 2) {
              this.exceptionHandler('uF')
              return
            }
            if (this.data.iData.startIndex > this.data.iData.endIndex) {
              this.exceptionHandler('mM')
              return
            }
            const targetUrls: Array<string> = await GApi.CrawlingEpisodes(serverUrl, {
              url,
              targetIndex: {
                startIndex: this.data.iData.startIndex - 1,
                endIndex: this.data.iData.endIndex
              }
            })
            await targetUrls.forEach((r) => {
              GApi.Crawling(serverUrl, r).then((data) => {
                this.readOnlyDatas.push(data)
              })
            })
          }
        } else {
          this.readOnlyData.targetContent = 'Gemini 질의응답 모드 입니다.'
        }
        if (this.readOnlyDatas !== undefined && this.readOnlyDatas.length > 0) {
          await this.readOnlyDatas.forEach((r) => {
            GApi.SendPrompt(serverUrl, {
              insertData: this.data.iData,
              targetContent: r.targetContent,
              selectData: this.data.sData
            }).then((data) => {
              r.resultData = data
            })
          })
          gemini.VisibleButtons(2)
        } else {
          this.readOnlyData.resultData = await GApi.SendPrompt(serverUrl, {
            insertData: this.data.iData,
            targetContent: this.readOnlyData.targetContent,
            selectData: this.data.sData
          })

          gemini.VisibleButtons(1)
        }

        this.variableActions.actionButton = false
      } catch (error) {
        this.variableActions.actionButton = false
        this.readOnlyData.resultData = '에러가 발생했습니다.\n다시 시도 해주세요 !!\n' + error
        return
      }
    },

    /**
     * @description Exception Handling
     * - p : PromptError
     * - fM : FilterModelError
     * - uF : UnderFlowError
     * - mM : MissMatchError
     * @param {string} val - 예외 처리를 위한 값
     */
    exceptionHandler(val: string) {
      if (val === 'p') {
        exception.PromptError()
      }
      if (val === 'fM') {
        exception.FilterModelError()
      }
      if (val === 'uF') {
        exception.UnderFlowError()
      }
      if (val === 'mM') {
        exception.MissMatchError()
      }
    },
    /***
     * @description Reset datas
     * - target data : data & readOnlyData & readOnlyDatas & variableActions
     * - deactivate action buttons
     */
    clear() {
      const rData = gemini.ClearData(
        this.data,
        this.readOnlyData,
        this.readOnlyDatas,
        this.variableActions
      )
      this.data = rData.data as data
      this.readOnlyData = rData.readOnlyData as readOnlyData
      this.readOnlyDatas = rData.rDatas as rDatas
      this.variableActions = rData.variableActions as variableActions
      gemini.VisibleButtons(0)
      console.clear()
    },

    /***
     * @description Copy Result data to clipboard
     * - if result data is null, copy blank
     * - else copy result data to clipboard
     */
    copyResData() {
      window.navigator.clipboard.writeText(
        this.readOnlyData.resultData ? this.readOnlyData.resultData : ''
      )
    },

    /***
     * @description Save result data to .txt file
     * - if result data is null, no action
     * - else save result data to .txt file
     */
    saveResData() {
      const saveText = this.readOnlyData.resultData ? this.readOnlyData.resultData : ''
      const blob: Blob = new Blob([saveText], { type: 'text/plain' })
      const url: string = window.URL.createObjectURL(blob)
      const a: HTMLAnchorElement = document.createElement('a')
      a.href = url
      a.download = '결과.txt'
      a.click()
    }
  }
}
</script>

<template>
  <div id="inputSection">
    <div id="textArea">
      <div id="inputTitle">
        <label for="inputTitle">52shuku 사이트 입력</label> <br />
        <input
          id="oneEpisode"
          v-model="variableActions.isCheckedOnce"
          type="checkbox"
          name="caseOne"
          value="episode"
        />
        1회만
        <input
          id="inputText"
          v-model="data.iData.targetURL"
          type="text"
          placeholder="사이트를 입력 해주세요 !"
        />
      </div>
      <div id="inputPrompt">
        명령어 설정<br />
        <textarea
          id="inputText"
          v-model="data.iData.inputPrompt"
          type="text"
          placeholder="프롬프트 설정을 해주세요 !"
        />
      </div>
    </div>
    <div id="textArea countLabels" :style="{ opacity: variableActions.isCheckedOnce ? 0 : 1 }">
      <div id="inputMin">
        <label for="minLabel">시작 회차</label> <br />
        <input
          id="inputLabel"
          v-model="data.iData.startIndex"
          type="number"
          placeholder="시작 회차"
        />
      </div>
      <div id="inputMax">
        <label for="minLabel">끝 회차</label> <br />
        <input
          id="inputLabel"
          v-model="data.iData.endIndex"
          type="number"
          placeholder="마지막 회차"
        />
      </div>
    </div>
    <div id="setAge">
      <div id="setAgeLabel">
        <label for="setAge">연령 설정</label>
        <input id="inputLabel" v-model="data.iData.targetAge" type="number" />
      </div>
    </div>
    <div id="selectorBox">
      <select id="selectFilter" v-model="data.sData.selectFilter">
        <option disabled value="">필터를 선택 해주세요 !</option>
        <option value="0">v1</option>
        <option value="1">v1Alpha</option>
        <option value="2">v1Beta</option>
      </select>
      <br />
      <input
        id="modelBeta"
        v-model="variableActions.isCheckedBeta"
        type="checkbox"
        name="modelBeta"
      />
      베타
      <select
        v-if="variableActions.isCheckedBeta === false"
        id="selectModel"
        v-model="data.sData.selectModel"
      >
        <option disabled value="">모델을 선택 해주세요 !</option>
        <option value="0">Gemini 1.5 Flash</option>
        <option value="1">Gemini 1.5 Pro</option>
      </select>
      <select v-else id="selectModel" v-model="data.sData.selectModel">
        <option disabled value="">모델을 선택 해주세요 !</option>
        <option value="10">Gemini-1.5-flash-8b-exp-0827</option>
        <option value="11">Gemini-1.5-pro-exp-0801</option>
        <option value="12">Gemini-1.5-pro-exp-0827</option>
      </select>
    </div>
  </div>
  <div id="actionsLayer" class="actions">
    <div class="action">
      <a class="action" @click="fetchData">{{
        variableActions.actionButton === true ? '진행중' : '실행'
      }}</a>
    </div>
    <div class="action"><a class="action" @click="clear">초기화</a></div>
  </div>
  <div class="text" style="padding-bottom: -5%">
    {{ variableActions.isCheckedOnce === true ? '1회차 모드' : '다회차 모드' }}
  </div>
  <div id="readOnly">
    <div id="targetSection">
      <span id="target">원문</span>
      <select v-if="readOnlyDatas.length !== 0" id="targetSelect" v-model="readOnlyDatas" name="ep">
        <option v-for="r in readOnlyDatas.length" :key="r">{{ r }}</option>
      </select>
      <div id="showData">
        <textarea
          v-if="readOnlyDatas.length === 0"
          id="targetData"
          v-model="readOnlyData.targetContent"
          readonly
        />
        <textarea v-else id="targetData" v-model="readOnlyDatas[targetE].targetContent" readonly />
      </div>
    </div>
    <div id="resultSection">
      <span id="result">결과</span>
      <select v-if="readOnlyDatas.length !== 0" id="resSelect" v-model="readOnlyDatas" name="ep">
        <option v-for="r in readOnlyDatas.length" :key="r">{{ r }}</option>
      </select>
      <span class="action">
        <a id="copyButton" class="action" @click="copyResData">복사</a>
        <a id="saveButton" class="action" @click="saveResData">저장</a>
      </span>
      <div id="showData">
        <textarea
          v-if="readOnlyDatas.length === 0"
          id="resultData"
          v-model="readOnlyData.resultData"
          readonly
        />
        <textarea v-else id="targetData" v-model="readOnlyDatas[resultE].resultData" readonly />
      </div>
    </div>
  </div>
</template>

<style>
@import '../assets/style.css';
</style>
