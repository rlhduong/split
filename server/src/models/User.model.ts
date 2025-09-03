import { Schema, model } from 'dynamoose';

const schema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    required: true,
    index: {
      name: 'email',
      type: 'global',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default model('User', schema, {
  create: true,
});
