import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg

const ChatHistorySchema = new Schema({
	q_text: { type: String },
	a_text: { type: String },
}, { timestamps: true })

const ChatHistoryModel = models.ChatHistory || mongoose.model('ChatHistory', ChatHistorySchema)
export { ChatHistoryModel }