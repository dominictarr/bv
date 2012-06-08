#! /usr/bin/env node

var semver = require('semver')

var slots = {
  major: 1, minor: 2, patch: 3, M: 1, m:2, p: 3
}

module.exports = bump

function bump(version, slot) {

  if(!slot)
    slot = 3
  if('string' == typeof slot)
    slot = slots[slot]
  if(!slot)
    throw new Error('expected major, minor, or patch') 

  var parsed = semver.parse(version)
  var bumped = []

  //copy the significant fields.
  var i = 1
  while (i <= slot) {
    bumped.push(parsed[i++])
  }
  //bump the version
  bumped[slot - 1] = 1 + (+bumped[slot - 1])

  //pad with zeros

  while (bumped.length < 3)
    bumped.push(0)

  return bumped.join('.')

}

if (!module.parent) {

  var fs     = require('fs')
  var jsup   = require('jsup')
  var argv   = require('optimist').argv
  var cp     = require('child_process')

  var p = fs.readFileSync('./package.json', 'utf8')
  var pkg1 = JSON.parse(p)
  var v1 = pkg1.version, v2
  var pup = jsup(p)
    .set(['version'], v2 = bump(v1, argv._[0]))
    .stringify()

  console.error('bumping ' + pkg1.name + '[' + v1 + ' -> ' + v2 + ']')

  if(argv.s) {
    console.log(pup)
    process.exit(0)
  }
  fs.writeFileSync('./package.json', pup) 
  if(argv.n)
    return
  
  function exec(cmd, skip, next) {
    if(!next) next = skip, skip = null
    if(skip) return next()
    var c =cp.exec(cmd, next)
    c.stdout.pipe(process.stdout, {end: false})
    c.stderr.pipe(process.stderr, {end: false})
  }
  //this is what I would do manually.
  //considered putting this into a bash script, but would have to pass the version out some how.
  //probably monkeying around with regexps.

  exec('git commit package.json -m '+v2 , false , function () {
    exec('git tag -a '+v2 + ' -m ' + v2 , argv.t, function () {
      exec('git push origin master'     , argv.g, function () {})
      exec('npm publish'                , argv.n, function () {})
  })})
}
