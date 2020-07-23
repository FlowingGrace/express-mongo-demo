const express = require('express');
const Template = require('./../model/template')

const Router = express.Router()


Router.get('/demo', async (req, res) => {
  try {
    const temps = await Template.find();
    console.log(temps)
    res.$success(temps)
  } catch (error) {
    console.log(JSON.stringify(error))
    res.$error('服务端错误', 500);
  }
})

Router.get('/demo/:id', async (req, res) => {
  try {
      const temp = await Template.findById({_id: req.params.id})
      if (temp) {
          res.$success(temp);
      } else {
          res.$error('无数据', 400);
      }
  } catch (e) {
      res.$error('无数据', 403);
  }
})

Router.post('/demo', async (req, res) => {
  if (req.body) {
    try {
      console.log(req.body)
      const temp = await Template.create(req.body);
      res.$success(temp);
    } catch (e) {
      res.$error(e, 403);
    }
    
  } else {
    res.$error('无数据', 403);
  }
})

Router.put('/demo/:id', async (req, res) => {
  const temp = await Template.findByIdAndUpdate({_id: req.params.id}, req.body, {
      new: true
  })
  res.$success(temp);
})

Router.delete('/demo/:id', async (req, res) => {
  const temp = await Template.findByIdAndRemove({_id: req.params.id})
  res.$success(temp);
})

module.exports = Router;