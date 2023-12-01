import { GrandChildModel, SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()

  return {
		minselections: JSON.stringify(resp)
  }
}) // satisfies PageServerLoad
