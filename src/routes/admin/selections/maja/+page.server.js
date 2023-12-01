import { SelectionModel } from '$lib/mongodb/models/Selection'

export const load = (async () => {
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()

	return {
		majaselections: JSON.stringify(maja_resp)
  }
})
