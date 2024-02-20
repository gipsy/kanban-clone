import { Schema, models, model, Document } from 'mongoose'

export interface IIssue extends Document {
  title: string;
  status: string;
  rank: string;
  description: string;
  boardId: string;
  createdAt: Date;
}

const IssueSchema = new Schema<IIssue>({
  title: {type: String, required: true},
  status: {type: String, default: 'to-do'},
  rank: {type: String, required: true},
  description: {type: String},
  boardId: {type: String, ref: 'Board'},
  createdAt: {type: Date, default: Date.now}
})

const Issue = models.Issue || model('Issue', IssueSchema)

export default Issue
