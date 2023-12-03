import { GrandChildModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ params }) => {
	const _id = params._id
	await connectDB()

	// Get mid_selections[]
	const resp = await GrandChildModel.find({ parentId: _id }).populate('parentId').lean()

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			children: resp
		}
  ))
})
