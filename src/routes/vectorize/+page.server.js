import { get_vectorized_arr } from '../chatmain/gpt_prepare'
import * as postVectController from '$lib/mongodb/controller/postVectController'

/** @type {import('./$types').Actions} */
export const actions = {
	registervect: async ({ request }) => {
		const data = await request.formData()
		console.log("data", data)

		const text1 = data.get('text1')?.toString() ?? ''
//		const text2 = data.get('text2')?.toString() ?? ''

		const vect_t1 = await get_vectorized_arr(text1)
//		const vect_t2 = await get_vectorized_arr(text2)
		const resp = await postVectController.createVect({ text1: text1, vect_t1: vect_t1 })
		//		const emailaddr = data.get('emailaddr')?.toString() ?? ''
/*		const resp = await fetch('http://localhost:8055/api/vectregister', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text1: text1,
				vect_t1: vect_t1,
//				text2: text2,
//				vect_t2: vect_t2,
			})
		})
*/

		//const respdata = await resp.json()
		console.log("respdata: ", resp)
		return { newpost: JSON.stringify(resp) }
	},
	addcsvvect: async ({ request }) => {
		const data = await request.formData()
		const csv = data.get('sourcefile')

		console.log("csv.type: ", csv.type)
		let csvArray = new Uint8Array(await csv.arrayBuffer())
		const str = new TextDecoder().decode(csvArray)
		const lines = str.split('\r\n')

		console.log("lines", lines)

		return
	}
} // satisfies Actions