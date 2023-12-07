import { VectModel } from '$lib/mongodb/models/Vect'
import xlsx from 'node-xlsx'
import { get_vectorized_arr } from '../../chatmain/gpt_prepare'

import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const vect_resp = await VectModel.find({}).lean()

  return {
		vectors: JSON.stringify(vect_resp)
  }
}) // satisfies PageServerLoad

export const actions = {
	addvect: async ({ request }) => {
		const data = await request.formData()
		const text1 = data.get('text1') ?? ''
		const vect_t1 = await get_vectorized_arr(text1)

		// Consult Vect DB for their length
		const vectCount = await VectModel.countDocuments({}).exec()

		try {
			await connectDB()
			const resp = await VectModel.create({
				itemId: vectCount + 1,
				text1: text1,
				vect_t1: vect_t1
			})

			return { 
				added: JSON.stringify({ resp })
			}
		} catch (err) {
			console.error (err)
		}
	},
	deletebycsv:  async ({ request }) => {
		const data = await request.formData()

		const lowerlimit = data.get('lowerlimit') ?? ''
		const upperlimit = data.get('upperlimit') ?? ''
		const csv = data.get('sourcefile')

		try {
			await connectDB()
			const resp = await VectModel.deleteMany({ itemId: { $gte: lowerlimit, $lte: upperlimit } })
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

		// Load xlsx
		const workbook = xlsx.parse(csvArray)
		const tmp_arr = await Promise.all(workbook[0]["data"].map(async (elem) => ({
				itemId: elem[0],
				text1: elem[1],
				vect_t1: await get_vectorized_arr(elem[1])
			})
		))

		console.log("tmp_arr: ", tmp_arr)

		try {
			await connectDB()
			const insmany_resp = await VectModel.insertMany(tmp_arr)

			return { added: JSON.stringify(insmany_resp) }
		} catch (err) {
			console.error (err)
		}
	}
}
