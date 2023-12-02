import { SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'
import { error, fail } from '@sveltejs/kit'

export const load = (async () => {
	await connectDB()
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

	return {
		majaselections: JSON.stringify(maja_resp)
  }
})

export const actions = {
	addmajaselpost: async ({ request }) => {
		const data = await request.formData()
		console.log("data: ", data)
		const text = data.get('text')?.toString() ?? ''
		const itemId = data.get('itemId')

		try {
			await connectDB()
			const add_majaresp = await SelectionModel.create({
				itemId: itemId,
				text: text
			})
	
			return { added: JSON.stringify(add_majaresp) } // add_majadata.inserted.itemId
			} catch (err) {
				if (err.code === 11000 && err.keyPattern.itemId === 1) {
					return fail(400, {
							itemId, dupval: true
					})
				}
			}
	},
	editmajaselpost: async ({ request }) => {
		const data = await request.formData()

		const _id = data.get('_id').toString()
		const itemId = Number(data.get('itemId'))
		const text = data.get('text')?.toString() ?? ''

		try {
			await connectDB()
			const resp = await SelectionModel.findByIdAndUpdate(
				_id,
			{
				itemId: itemId,
				text: text,
			}, { returnDocument: 'after' }
		)
		return { updated: JSON.stringify(resp) }

		} catch (err) {
			if (err.code === 11000 && err.keyPattern.itemId === 1) {
				return fail(400, {
						itemId, dupval: true
				})
			}
		}
	}
} // satisfies Actions
