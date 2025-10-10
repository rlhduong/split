import { Schema, model } from 'dynamoose';

const location = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const itinerary = new Schema({
  title: {
    type: String,
  },
  notes: {
    type: String,
  },
  time: {
    type: Number,
  }
});

const day = new Schema({
  itineraries: {
    type: Array,
    schema: [itinerary],
    default: [],
  },
});

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
      rangeKey: 'createdAt',
    },
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
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
  locations: {
    type: Array,
    schema: [location],
    required: true,
    default: [],
  },
  createdAt: {
    type: Number,
    required: true,
  },
  days: {
    type: Array,
    schema: [day],
    required: true,
    default: [],
  },
});

export default model('Tripping-Trip', schema, {
  create: true,
});
