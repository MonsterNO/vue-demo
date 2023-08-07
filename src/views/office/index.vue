<template>
  <div class="office">
    <!-- <div class="title">功能一：本地文件读取</div>
    <input type="file" name="file" @change="change">
    <div class="excel-content" v-html="htmlDOM"></div>

    <div class="title">功能二：把json数据转化为Excel</div>
    <button @click="jsonExcel">json保存</button>

    <div class="title">功能三：把table DOM转化为Excel</div>
    <button @click="tableExcel">table保存</button>
    <table ref="tableRef">
      <thead>
        <tr>
          <th>学号</th>
          <th>姓名</th>
          <th>成绩</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01</td>
          <td>张三</td>
          <td>100</td>
        </tr>
        <tr>
          <td>02</td>
          <td>李四</td>
          <td>60</td>
        </tr>
        <tr>
          <td>03</td>
          <td>王五</td>
          <td>70</td>
        </tr>
      </tbody>
    </table>

    <div class="title">功能四：excel预览</div>
    <input type="file" name="file" @change="preview">
    <vueofficeExcel :src="excelSrc" style="height: 92vh;"></vueofficeExcel> -->
    <vueofficeExcel :src="excelSrc" style="height: 92vh;"></vueofficeExcel>

    <div class="title">功能五：word预览</div>
    <vueofficeword :src="wordSrc" style="height: 92vh;"></vueofficeword>
  </div>
</template>

<script>
//引入xlsx工具
import { read, writeFile, utils } from 'xlsx'
import vueofficeword from '@vue-office/docx'
import vueofficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
export default {
  name: 'office',
  components: {
    vueofficeExcel,
    vueofficeword
  },
  data() {
    return {
      htmlDOM: '',
      excelSrc: '/a.xlsx',
      wordSrc: '/b.docx'
    }
  },
  methods: {
    change(e) {
      //获取文件
      let file = e.target.files[0]
      //转化为arrayBufferr
      file.arrayBuffer().then(res => {
        //读取book对象
        let wb = read(res)
        //取出sheet1表
        let sheet = wb.Sheets.Sheet1
        //数据转化为html，并渲染到页面
        this.htmlDOM = utils.sheet_to_html(sheet)
      })
    },
    jsonExcel() {
      let jsonArr = [
        { id: 1, name: '小明', age: 16 },
        { id: 2, name: '小红', age: 18 },
        { id: 3, name: '小张', age: 10 }
      ]
      //json转化excel
      //json转化为sheet
      let sheet = utils.json_to_sheet(jsonArr)
      //创建workbook
      let wb = utils.book_new()
      /**
       * 往工作簿里添加表
       * 参数一：工作簿
       * 参数二：工作表
       * 参数三：表名
       */
      utils.book_append_sheet(wb, sheet, 'sheet1')
      //文件下载
      writeFile(wb, 'test.xlsx')
    },
    tableExcel() {
      //获取dom
      let dom = this.$refs.tableRef
      //table转化为sheet
      let sheet = utils.table_to_sheet(dom)
      //创建workbook
      let wb = utils.book_new()
      //加入表
      utils.book_append_sheet(wb, sheet, 'sheet')
      // let wb = utils.table_to_book(dom)
      //保存
      writeFile(wb, 'test1.xlsx')
    },
    preview(e) {
      let file = e.target.files[0]
      let f = new FileReader()
      f.readAsDataURL(file)
      f.onload = (e => {
        this.excelSrc = e.target.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.office {
  .title {
    padding: 10px;
    font-weight: 700;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
  }

  .block {
    padding: 20px 0;
  }
}
</style>