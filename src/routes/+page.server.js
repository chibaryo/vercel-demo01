//import { API_KEY } from '$env/static/private'

/** @type {import('./$types').PageServerLoad} */
export const load = (async ({ params }) => {

	return { 
		message: 'ok',
//		yourkey: API_KEY
	}
})
