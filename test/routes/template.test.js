const app = require('./../../server/index')
const request = require('supertest')(app)
const assert = require('assert')

describe('# test routes', function() {
  it('GET /xhr/v1/demo', function(done) {
    request.get('/xhr/v1/demo')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(Array.isArray(res.body.data))
        done()
      })
  })

  it('POST /xhr/v1/demo', function(done) {
    const temp = {
      name: 'mocho-test',
      template: '<dd></dd>',
      data: 'today is sunny'
    }

    request.post('/xhr/v1/demo', temp)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        assert(res.body.code === 200)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object')
        console.log(res.body.data)
        assert(res.body.data.name === temp.name, '返回的数据是新增模板内的值')
        done()
      })
  })

  it('GET /xhr/v1/demo/:id', function(done) {
    const id = '5f18c6cc7eb5296b3014d655'
    request.get(`/xhr/v1/demo/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回的数据应该是一个对象')
        assert(res.body.data.name === 'test', '返回的数据应该与数据库中的相同')
        done()
      })
  })
  it('PUT /xhr/v1/demo/:id', function(done) {
    const id = '5f18c6cc7eb5296b3014d655'
    const temp = {
      name: 'mocho-test',
      template: '<dd></dd>',
      data: 'today is sunny'
    }
    request.put(`/xhr/v1/demo/${id}`, temp)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回的数据应该是一个对象')
        assert(res.body.data.name === 'test', '返回的数据应该与数据库中的相同')
        done()
      })
  })
  it('DELETE /xhr/v1/demo/:id', function(done) {
    const id = '5f18c6cc7eb5296b3014d655'
    request.delete(`/xhr/v1/demo/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        assert(res.body.msg === 'success')
        assert(typeof res.body.data === 'object', '返回的数据应该是一个对象')
        assert(res.body.data.name === 'test', '返回的数据应该与数据库中的相同')
        done()
      })
  })
})