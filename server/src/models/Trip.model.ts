import { Schema, model } from 'dynamoose';

const participant = new Schema({
  name: {
    type: String,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
  net: {
    type: Number,
    required: true,
    default: 0,
  },
});

const schema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  userId: {
    type: String,
    required: true,
    index: {
      name: 'userId',
      type: 'global',
    },
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  participants: {
    type: Array,
    schema: [participant],
    required: true,
    default: [],
  },
});

export default model('Trip', schema, {
  create: true,
});
