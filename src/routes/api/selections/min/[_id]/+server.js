import { GrandChildModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const DELETE = (async ({ params, request }) => {
	const _id = params._id

	await connectDB()
	const response = await GrandChildModel.findByIdAndDelete({ _id: _id }).populate('parentId')

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			deleted: response
		}
  ))

})
