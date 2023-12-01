import { SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

	return {
		majaselections: JSON.stringify(maja_resp)
  }
})

export const actions = {
	addnewmaja: async ({ request }) => {
		const data = await request.formData()
		const maja_name = data.get('maja_name')?.toString() ?? ''

		const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()
		const total_length = maja_resp.length

		const add_majaresp = await SelectionModel.create({
			itemId: total_length + 1,
			text: maja_name
		})

		return { added: add_majaresp } // add_majadata.inserted.itemId
	},
	editmajaselpost: async ({ request }) => {
		const data = await request.formData()
		console.log("data: ", data)
//		const maja_name = data.get('maja_name')?.toString() ?? ''

	}
} // satisfies Actions
