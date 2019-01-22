/*!
 * xlsx-stream-reader
 * Copyright(c) 2016 Brian Taber
 * MIT Licensed
 */

"use strict";

const Path = require("path");

const XlsxStreamReaderWorkBook = require(Path.join(__dirname, "workbook"));

class XlsxStreamReader extends XlsxStreamReaderWorkBook {
  constructor({verbose = true, formatting = true} = {}) {
    const options = {
      saxStrict: true,
      saxTrim: true,
      saxNormalize: true,
      saxPosition: true,
      saxStrictEntities: true,
      verbose,
      formatting,
    };
    super(options);
    this.options = options;
  }
}

module.exports = XlsxStreamReader;