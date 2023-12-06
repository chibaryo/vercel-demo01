import { get_vectorized_arr } from '../chatmain/gpt_prepare'
import * as postVectController from '$lib/mongodb/controller/postVectController'
import { VectModel } from '$lib/mongodb/models/Vect'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

import xlsx from 'node-xlsx'
import { promises as fs } from 'fs'

/** @type {import('./$types').Actions} */
export const actions = {
	registervect: async ({ request }) => {
		const data = await request.formData()

		const text1 = data.get('text1')?.toString() ?? ''

		const vect_t1 = await get_vectorized_arr(text1)
		const resp = await postVectController.createVect({ text1: text1, vect_t1: vect_t1 })

		return { newpost: JSON.stringify(resp) }
	},
	addcsvvect: async ({ request }) => {
		const data = await request.formData()
		const csv = data.get('sourcefile')
		let csvArray = new Uint8Array(await csv.arrayBuffer())

		const workbook = xlsx.parse(csvArray)
		const tmp_arr = await Promise.all(workbook[0]["data"].map(async (elem) => ({
				text1: elem[0],
				vect_t1: await get_vectorized_arr(elem[0])
			})
		))

		try {
			await connectDB()
			const insmany_resp = await VectModel.insertMany(tmp_arr)

			return { added: JSON.stringify(insmany_resp) }
		} catch (err) {
			console.error (err)
		}
	}
} // satisfies Actions