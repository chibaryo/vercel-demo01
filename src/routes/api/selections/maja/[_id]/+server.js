import { SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ params }) => {
	await connectDB()

	// Get all maja_selections[]
	const resp = await SelectionModel.findById( params.itemId ).lean()

//	const resp = await SelectionModel.aggregate([
//		{ $match: { id: { $gte: 0 }} },
//		{ $sort: { id: 1 } },
//		{ $project: { _id: 0, id: 1, text: 1 }}
//	])

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			majaselections: resp
		}
  ))

}) // satisfies RequestHandler

export const PUT = (async ({ params, request }) => {
	const { text } = await request.json()

	await connectDB()
	const response = await SelectionModel.findByIdAndUpdate(
		params.itemId,
		{
			text: text,
		}, { returnDocument: 'after' }
	)

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			updated: response
		}
  ))

}) // satisfies RequestHandler

export const DELETE = (async ({ params, request }) => {
	const _id = params._id

	await connectDB()
	const response = await SelectionModel.findByIdAndDelete({ _id: _id })

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			deleted: response
		}
  ))

})
