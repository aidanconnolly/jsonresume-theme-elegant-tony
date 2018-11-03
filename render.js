#!/usr/bin/env node
//
// Usage:
// `node render SOURCE TARGET`
//

const fs = require('fs')
const path = require('path')
const theme = require('./index.js')
const args = require('minimist')(process.argv.slice(2))

let source = args._[0]
let target = args._[1] || source && (path.basename(source, '.json') + '.html') || 'index.html'

let dir = source && path.dirname(source) || path.join(__dirname, 'build')
let resume = source && JSON.parse(fs.readFileSync(source)) || require('resume-schema').resumeJson

if ( !fs.existsSync(dir) )
    fs.mkdirSync(dir)

fs.writeFile(path.join(dir, target), theme.render(resume), function(err) {
    console.log(err || `written ${target} to ${dir}.`)
})
