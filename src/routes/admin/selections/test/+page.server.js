import { GrandChildModel, SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
//	const minresp = await fetch(`https://${process.env.VERCEL_URL}/api/selections/min`, {
//		method: 'GET',
//	})
//	const min_retdata = await minresp.json()
	console.log("vercel api server url: ", 'https://' + process.env.VERCEL_URL + '/api/selections/min')

	//	await connectDB()
//	const resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()
//	console.log("min_retdata: ", min_retdata)

  return {
//		minselections: min_retdata["minselections"]
  }
}) // satisfies PageServerLoad
