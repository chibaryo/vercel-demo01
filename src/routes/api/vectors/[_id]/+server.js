import { VectModel } from '$lib/mongodb/models/Vect'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ params }) => {
	const _id = params._id	
	await connectDB()

	// Get mid_selections[]
	const resp = await VectModel.findById( _id ).lean()

	console.log("resp.length ", resp.length)
	return new Response(JSON.stringify(
    { 
			message: 'OK',
			vectors: resp
		}
  ))
})

export const DELETE = (async ({ params, request }) => {
	const _id = params._id

	await connectDB()
	const response = await VectModel.findByIdAndDelete({ _id: _id })

	return new Response(JSON.stringify(
    { 
			message: 'OK',
			deleted: response
		}
  ))
}) // satisfies RequestHandler
