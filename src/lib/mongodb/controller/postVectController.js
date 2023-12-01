import { VectModel } from '$lib/mongodb/models/Vect'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const createVect = async (vect) => {
	try {
		await connectDB()
		return await VectModel.create({
			text1: vect.text1,
			vect_t1: vect.vect_t1
		})
	} catch (err) {
		console.error (err)
	}
}