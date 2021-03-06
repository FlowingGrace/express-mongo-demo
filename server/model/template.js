const mongoose = require('mongoose');

const TemplateSchema = mongoose.Schema({
  id: String,
  name: String,
  template: String,
  data: String
})

const Template = module.exports = mongoose.model('template', TemplateSchema)