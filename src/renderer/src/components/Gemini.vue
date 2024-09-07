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
  } {
    return {
      data: {
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
      } as data,
      readOnlyData: {
        targetTitle: '',
        targetContent: '',
        resultData: '대기중 ......'
      } as readOnlyData,
      variableActions: {
        actionButton: false,
        isCheckedOnce: true,
        isCheckedBeta: false
      } as variableActions
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
            if (this.data.iData.startIndex < 1 || this.data.iData.endIndex < 1) {
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
            console.log(targetUrls)
            const res: rDatas = new Array(targetUrls.length)
            for (let i = 0; i < targetUrls.length; i++) {
              const crawlingData: readOnlyData = await GApi.Crawling(serverUrl, targetUrls[i])
              res[i] = {
                targetTitle: crawlingData.targetTitle,
                targetContent: crawlingData.targetContent,
                resultData: crawlingData.resultData
              }
            }
            for (let i = 0; i < res.length; i++) {
              console.log(res[i])
            }
            alert('현재 구현 중 입니다.')
            return
          }
        } else {
          this.readOnlyData.targetContent = 'Gemini 질의응답 모드 입니다.'
        }

        if (this.readOnlyData.targetContent) {
          const res: string = await GApi.SendPrompt(serverUrl, {
            insertData: this.data.iData,
            targetContent: this.readOnlyData.targetContent,
            selectData: this.data.sData
          })

          this.readOnlyData.resultData = res

          gemini.VisibleButtons(res)
        }

        this.variableActions.actionButton = false
      } catch (error) {
        this.variableActions.actionButton = false
        this.readOnlyData.resultData = '에러가 발생했습니다.\n다시 시도 해주세요 !!\n' + error
        return
      }
    },
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
    clear() {
      const rData = gemini.ClearData(this.data, this.readOnlyData, this.variableActions)
      this.data = rData.data as data
      this.readOnlyData = rData.readOnlyData[0] as readOnlyData
      this.variableActions = rData.variableActions as variableActions
      gemini.VisibleButtons(this.readOnlyData.resultData)
      console.clear()
    },
    copyResData() {
      window.navigator.clipboard.writeText(
        this.readOnlyData.resultData ? this.readOnlyData.resultData : ''
      )
    },
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
  <div id="introduceBar" class="text">
    <span id="target">원문</span>
    <span id="result">결과</span>
    <span class="action">
      <a id="copyButton" class="action" @click="copyResData">복사</a>
      <a id="saveButton" class="action" @click="saveResData">저장</a>
    </span>
  </div>
  <div id="showData" class="text">
    <span>
      <textarea id="targetData" v-model="readOnlyData.targetContent" readonly />
    </span>
    <span>
      <textarea id="resultData" v-model="readOnlyData.resultData" readonly />
    </span>
    <span class="action"><a id="episodeTrigger" class="action">test</a></span>
  </div>
</template>

<style>
@import '../assets/style.css';
</style>
