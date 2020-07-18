import { EscortIndexed } from './../../types';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const escortSchema = new Schema({
  escortId: String,
  location: String,
  services: [String],
  hair: String,
  bodyType: String,
  bust: String,
  incallRate: String,
});

const Escorts = mongoose.model('Escort', escortSchema);

export default Escorts;
