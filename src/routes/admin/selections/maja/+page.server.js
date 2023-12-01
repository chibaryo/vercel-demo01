import { SelectionModel } from '$lib/mongodb/models/Selection'

export const load = (async () => {
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

	console.log("maja_resp: (server): ", maja_resp)
	return {
		majaselections: JSON.stringify(maja_resp)
  }
})
