import { Schema, model } from 'dynamoose';

const schema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  tripId: {
    type: String,
    required: true,
    index: {
      name: 'tripId',
      type: 'global',
    },
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  payer: {
    type: String,
    required: true,
  },
  participants: {
    type: Array,
    schema: [String],
    required: true,
  },
});

export default model('Expense', schema, {
  create: true,
});
