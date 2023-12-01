import { GrandChildModel, SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ url }) => {
	await connectDB()
	// Get min_selections[]
	const resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()
	
	return new Response(JSON.stringify(
    { 
			message: 'OK',
			minselections: resp
		}
  ))

}) // satisfies RequestHandler

export const POST = (async ({ request }) => {

		const { itemId, text, parentId } = await request.json()
		console.log("itemId", itemId)
		console.log("text", text)
	
		await connectDB()
		const response = await GrandChildModel.create({
			itemId: itemId,
			parentId: parentId,
			text: text,
		})
	
		return new Response(JSON.stringify(
			{ 
				message: 'OK',
				inserted: response
			}
		))
	
}) // satisfies RequestHandler
