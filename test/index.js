var a = require('assert')
var b = require('..')

a.equal(b('0.0.0', 'major'), '1.0.0')
a.equal(b('0.0.0', 'minor'), '0.1.0')
a.equal(b('0.0.0', 'patch'), '0.0.1')

a.equal(b('1.0.0', 1), '2.0.0')
a.equal(b('0.2.0', 2), '0.3.0')
a.equal(b('0.0.3', 3), '0.0.4')

a.equal(b('1.2.3', 'M'), '2.0.0')
a.equal(b('1.2.3', 'm'), '1.3.0')
a.equal(b('1.2.3', 'p'), '1.2.4')

