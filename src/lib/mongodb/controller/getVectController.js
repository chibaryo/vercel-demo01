import { VectModel } from '$lib/mongodb/models/Vect'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const fetchAllVect = async () => {
	try {
		await connectDB()
		return await VectModel.find({}).lean()
	} catch (err) {
		console.error (err)
	}
}