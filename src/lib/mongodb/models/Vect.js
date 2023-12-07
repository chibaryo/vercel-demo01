import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg

/*
export interface VectDoc extends Document {
	text1: string
	vect_t1: number[]
}
*/
//export type VectType = Pick<VectDoc, "text1" | "vect_t1">

const VectSchema = new Schema({
	itemId: { type: Number, unique: true },
	text1: { type: String, required: true, unique: true },
	vect_t1: { type: [Number], required: true },
}, { timestamps: true })

const VectModel = models.Vect || mongoose.model('Vect', VectSchema)
export { VectModel }