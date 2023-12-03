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
	},
	deletebycsv:  async ({ request }) => {
		const data = await request.formData()

		const lowerlimit = data.get('lowerlimit') ?? ''
		const upperlimit = data.get('upperlimit') ?? ''
		const csv = data.get('sourcefile')

		try {
			const resp = await SelectionModel.deleteMany({ itemId: { $gte: lowerlimit, $lte: upperlimit } })
			console.log("resp", resp)

			return { 
				range: JSON.stringify({ lowerlimit: lowerlimit, upperlimit: upperlimit })
			}
		} catch (err) {
			if (err.code === 11000 && err.keyPattern.itemId === 1) {
				return fail(400, {
						itemId, dupval: true
				})
			}
		}
	},
	addbycsv: async ({ request }) => {
		const data = await request.formData()
		const csv = data.get('sourcefile')

		console.log("csv.type: ", csv.type)
		let csvArray = new Uint8Array(await csv.arrayBuffer())
		const str = new TextDecoder().decode(csvArray)
		const lines = str.split('\r\n')

		const obj = await Promise.all(lines.filter(i => {
			const csv_row = i.split(',')
			if (Number(csv_row[0]) >= 1)
				return true
		}).map(async (item) => ({
				itemId: Number(item.split(',')[0]),
				text: item.split(',')[1]
			})
		))
		console.log("obj: ", obj)

		await connectDB()

		let addmany_resp = await SelectionModel.insertMany( obj )
		console.log("addmany_resp", addmany_resp)

		return { added: JSON.stringify(addmany_resp) }
	},
} // satisfies Actions
