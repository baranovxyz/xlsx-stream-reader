/*!
 * xlsx-stream-reader
 * Copyright(c) 2016 Brian Taber
 * MIT Licensed
 *
 * example1
 *
 */

'use strict'

const fs = require('fs')
const path = require('path')
const XlsxStreamReader = require('../')

var workBookReader = new XlsxStreamReader()
workBookReader.on('error', function (error) {
  throw error
})

var rows = []

workBookReader.on('worksheet', function (workSheetReader) {
  if (workSheetReader.id > 1) {
    // we only want first sheet
    console.log('Skip Worksheet:', workSheetReader.id)
    workSheetReader.skip()
    return
  }
  console.log('Worksheet:', workSheetReader.id)

  let c = 0
  workSheetReader.on('row', function (row) {
    c++
    if (c % 100 === 0) console.log(c)
    rows.push(row.values)
    // row.values.forEach(function (rowVal, colNum) {
    //   console.log('RowNum', row.attributes.r, 'colNum', colNum, 'rowValLen', rowVal.length, 'rowVal', "'" + rowVal + "'")
    // })
  })

  workSheetReader.on('end', function () {
    // console.log('Worksheet', workSheetReader.id, 'rowCount:', workSheetReader.rowCount)
    console.log(`Sheet length: ${rows.length} rows.`)
  })

  // call process after registering handlers
  workSheetReader.process()
})
workBookReader.on('end', function () {
  console.log('finished!')
})

// fs.createReadStream('example/example1.xlsx').pipe(workBookReader)
const filePath = path.join(__dirname, '..', '..', 'busher_eq.zip')
console.log(filePath)
fs.createReadStream(filePath).pipe(workBookReader)
