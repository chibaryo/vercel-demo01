import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg

const GrandChildSchema = new Schema({
	itemId: { type: Number, unique: true },
	parentId: { type: Schema.Types.ObjectId, ref: 'Child' },
	text: { type: String, required: true, unique: true }
}, { timestamps: true })

const ChildSchema = new Schema({
	itemId: { type: Number, unique: true },
	parentId: { type: Schema.Types.ObjectId, ref: 'Selection' },
	text: { type: String, required: true, unique: true },
//	children: [GrandChildSchema]
}, { timestamps: true })

const SelectionSchema = new Schema({
	itemId: { type: Number, unique: true },
	text: { type: String, required: true },
//	children: [ChildSchema]
}, { timestamps: true })

const GrandChildModel = models.GrandChild || mongoose.model('GrandChild', GrandChildSchema)
const ChildModel = models.Child || mongoose.model('Child', ChildSchema)
const SelectionModel = models.Selection || mongoose.model('Selection', SelectionSchema)
export { SelectionModel, ChildModel, GrandChildModel }