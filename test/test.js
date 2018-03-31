var assert = require('assert')
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })
})

describe('something slow', function() {
	this.slow(10000)

	it('should take long enough for me to go make a sandwich', function() {
		// ...
	})
})
