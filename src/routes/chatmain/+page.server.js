import { GrandChildModel, ChildModel, SelectionModel } from '$lib/mongodb/models/Selection'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

// import type { PageServerLoad, Actions } from './$types'
import { get_vectorized_arr, cosine_similarity, compareWithVect, gpt_createCompletion } from './gpt_prepare'

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params }) => {
	await connectDB()
	const maja_resp = await SelectionModel.find({}).sort({ itemId: 1 }).lean()
	const mid_resp = await ChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()
	const min_resp = await GrandChildModel.find({}).populate('parentId').sort({ "parentId.text": 1 }).lean()

	/*	const maja_resp = await fetch(`/api/selections/maja`, {
		method: 'GET',
	})
	const maja_retdata = await maja_resp.json()

	const midresp = await fetch(`/api/selections/mid`, {
		method: 'GET',
	})
	const mid_retdata = await midresp.json()

	const minresp = await fetch('/api/selections/min', {
		method: 'GET',
	})
	const min_retdata = await minresp.json()
*/

  return {
		majaselections: JSON.stringify(maja_resp),
		midselections: JSON.stringify(mid_resp),
		minselections: JSON.stringify(min_resp)
  }
}) // satisfies PageServerLoad

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const max_tokens = 1024

		const data = await request.formData()
		const yourstr = data.get('yourstr')?.toString() || ''
		const majsel = data.get('majsel')?.toString() || ''
		const midsel = data.get('midsel')?.toString() || ''
		const minsel = data.get('minsel')?.toString() || ''
		//
		let origStr = ""
		if (majsel != "" && midsel != "" && minsel != "") {
			origStr = minsel + yourstr
		}
		if (majsel != "" && midsel != "" && minsel == "") {
			origStr = midsel + yourstr
		}
		if (majsel != "" && midsel == "" && minsel == "") {
			origStr = majsel + yourstr
		}
		if (majsel == "" && midsel == "" && minsel == "" && yourstr != "") {
			origStr = yourstr
		}
		console.log("origStr: ", origStr)
		const vectYourStr = await get_vectorized_arr(origStr)

		const items_arr = await compareWithVect(vectYourStr)
		let joined_hints = ''
		items_arr.map((item, idx) => {
			console.log("item, idx", idx, item['textchunk'], item['similarity_score'])
			joined_hints += item['textchunk']
		})

		// Generate prompt
//		const prompt = `以下の情報をコンテキスト情報として回答してください。\n#コンテキスト情報： ${joined_hints}\n#質問： ${origStr}\n#回答：`
		const prompt = `以下の情報をコンテキスト情報として、詳細な情報やコツを、行頭を・で始まる箇条書きで300文字以内で丁寧に教えてください。コンテキスト情報に合致する答えがない場合、積極的に「回答を持ち合わせていないため、和洋女子大学 進路支援センターにお問い合わせください。【受付時間】\n平日 9:00～17:00　土曜 9:00～14:00\n※日曜・祝日、大学の行事日、夏期および年末年始の休業期間は、事務取扱はありません。\n\n和洋女子大学 進路支援センター\n東館2階（教務課の向かい側）\n047-371-1125\nshinro@g.wayo.ac.jp」と回答してください。\n#コンテキスト情報： ${joined_hints}\n#質問： ${origStr}\n#回答：`
		console.log("prompt: ", prompt)
//		const response = await gpt_createCompletion(prompt, max_tokens)

		return {
				//newpost: response,
				prompt: prompt,
				success: 'ok'
			}
	}
} // satisfies Actions