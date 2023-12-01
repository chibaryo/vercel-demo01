import { SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ url }) => {
	await connectDB()

	// Get all maja_selections[]
	const resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

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

export const POST = (async ({ request }) => {
	const { itemId, text } = await request.json()

	await connectDB()
	const response = await SelectionModel.create({
		itemId: itemId,
		text: text,
	})

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			inserted: response
		}
  ))

}) // satisfies RequestHandler