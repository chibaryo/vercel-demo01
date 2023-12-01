import { GrandChildModel, SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
/*	const minresp = await fetch(`/api/selections/min`, {
		method: 'GET',
	})
	const min_retdata = await minresp.json()
*/
	await connectDB()
	// Get min_selections[]
	const resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()
	console.log("resp: ", resp)

  return {
//		minselections: min_retdata["minselections"]
  }
}) // satisfies PageServerLoad
