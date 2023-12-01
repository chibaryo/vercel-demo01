import { ChildModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ url }) => {
	const majselno = url.searchParams.get('majselno')
	await connectDB()

	// Get mid_selections[]
	const resp = await ChildModel.find({}).populate('parentId').sort({ itemId: 1 }).lean()

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			midselections: resp
		}
  ))
})
