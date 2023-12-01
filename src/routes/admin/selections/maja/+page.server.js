import { SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

	return {
		majaselections: JSON.stringify(maja_resp)
  }
})
