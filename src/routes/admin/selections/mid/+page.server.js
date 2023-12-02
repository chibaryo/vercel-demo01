import { SelectionModel, ChildModel, GrandChildModel } from '$lib/mongodb/models/Selection'
import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()
	const mid_resp = await ChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()
	const min_resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()

  return {
		majaselections: JSON.stringify(maja_resp),
		midselections: JSON.stringify(mid_resp),
		minselections: JSON.stringify(min_resp)
  }
}) // satisfies PageServerLoad

export const actions = {
	deletebycsv: async ({ request }) => {
		const data = await request.formData()
		console.log("data: ", data)
		const lowerlimit = data.get('lowerlimit') ?? ''
		const upperlimit = data.get('upperlimit') ?? ''
		const csv = data.get('target')

		return

	},
	addbycsv: async ({ request }) => {
		const data = await request.formData()
		const csv = data.get('target')

		console.log("csv.type: ", csv.type)
		let csvArray = new Uint8Array(await csv.arrayBuffer())
		const str = new TextDecoder().decode(csvArray)
		const lines = str.split('\r\n')
		let tmp_arr = []
		const csv_rows = lines.filter(i => {
			const csv_row = i.split(',')
			if (Number(csv_row[0]) >= 1){
				tmp_arr.push({ itemId: Number(csv_row[0]), parentId: csv_row[1], text: csv_row[2] })
				return true
			}
		})

		const addmany_resp = await GrandChildModel.insertMany(tmp_arr)
		console.log("addmany_resp", addmany_resp)

		return
	},
	addminselpost: async ({ request	}) => {
		const data = await request.formData()
		const itemId = data.get('itemId')
		const text = data.get('text')?.toString() ?? ''
		const parentId_id = data.get('parentId_id')

		await connectDB()
/*		const add_minresp = await fetch('/api/selections/min', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemId: itemId,
				parentId: parentId_id,
				text: text
			})
		})
*/
		let response = await GrandChildModel.create({
			itemId: itemId,
			parentId: parentId_id,
			text: text,
		})
		response = await response.populate('parentId')
		console.log("resese", response)

		return { added: JSON.stringify(response) }
	},
	editmidselpost: async ({ request }) => {
		const data = await request.formData()
		console.log("minsel data: ", data)

		const _id = data.get('_id').toString()
		const itemId = Number(data.get('itemId'))
		const parentId_id = data.get('parentId_id').toString()
		const text = data.get('text')?.toString() ?? ''

		const resp = await ChildModel.findByIdAndUpdate(
			_id,
			{
				itemId: itemId,
				parentId: parentId_id,
				text: text,
			}, { returnDocument: 'after' }
		).populate('parentId').lean()
		console.log("resp", resp)
	
		return { updated: JSON.stringify(resp) }
	},
	addnewmid: async ({ request }) => {
		const data = await request.formData()
		console.log("add new mid data: ", data)

		const text = data.get('text')?.toString() ?? ''
		const parentId_id = data.get('parentId_id').toString() ?? ''

		// Get total mid items:
		await connectDB()
		const mid_resp = await ChildModel.find({}).sort({ itemId: 1 }).lean()
/*		const mid_resp =  await fetch('/api/selections/mid', {
			method: 'GET'
		}) */
		const total_length = mid_resp.length

		let add_midresp = await ChildModel.create({
			itemId: total_length + 1,
			parentId: parentId_id,
			text: text
		})
/*		const add_midresp = await fetch('/api/selections/mid', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemId: total_length + 1,
				text: mid_name
			})
		})
*/
		add_midresp = await add_midresp.populate('parentId')

		return { added: JSON.stringify(add_midresp) } // add_majadata.inserted.itemId
	},
	addnewmaja: async ({ request }) => {
		const data = await request.formData()
		console.log("add new maja data: ", data)

		const maja_name = data.get('maja_name')?.toString() ?? ''

		// Get total maja items:
		const maja_resp =  await fetch('/api/selections/maja', {
			method: 'GET'
		})
		const maja_respdata = await maja_resp.json()
		const total_length = maja_respdata["majaselections"].length

		const add_majaresp = await fetch('/api/selections/maja', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemId: total_length + 1,
				text: maja_name
			})
		})

		const add_majadata = await add_majaresp.json()

		return { added: add_majadata } // add_majadata.inserted.itemId
	}
} // satisfies Actions