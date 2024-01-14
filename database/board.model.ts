import { Schema, models, model, Document, Types } from 'mongoose'

export interface IBoard extends Document {
  title: string;
  issues: Types.ObjectId[];
  createdAt: Date;
}

const BoardSchema = new Schema<IBoard>({
  title: {type: String, required: true},
  issues: [{type: Schema.Types.ObjectId, ref: 'Issue'}],
  createdAt: {type: Date, default: Date.now}
})

const Board = models.Board || model('Board', BoardSchema)

export default Board
