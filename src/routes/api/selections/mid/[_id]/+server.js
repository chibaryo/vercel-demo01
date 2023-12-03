import { ChildModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ params }) => {
	const _id = params._id	
	await connectDB()

	// Get mid_selections[]
	const resp = await ChildModel.findById( _id ).populate('parentId').lean()

	console.log("resp.length ", resp.length)
	return new Response(JSON.stringify(
    { 
			message: 'OK',
			midselections: resp
		}
  ))
})

export const DELETE = (async ({ params, request }) => {
	const _id = params._id

	await connectDB()
	const response = await ChildModel.findByIdAndDelete({ _id: _id }).populate('parentId')

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			deleted: response
		}
  ))
}) // satisfies RequestHandler
