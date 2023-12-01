import * as getVectController from '$lib/mongodb/controller/getVectController'
//import { OPENAI_APIKEY } from '$env/static/private'

const dot = (vect_a, vect_b) => {
	let product = 0
	const length = vect_a.length

	for (let i = 0; i < length; i++) {
		product += vect_a[i] * vect_b[i]
	}

	return product
}

const get_embedding = async (your_prompt) => {
	const url = 'https://api.openai.com/v1/embeddings'

	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.OPENAI_APIKEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			input: your_prompt,
			model: 'text-embedding-ada-002'
		})
	})

	return await resp.json()
}

const norm = (vect) => {
	let norm = 0.0
	const length = Object.keys(vect).length

	for (let i = 0; i < length; i++) {
		norm += vect[i] * vect[i]
	}

	return Math.sqrt(norm)
}

export const cosine_similarity = async (vect_a, vect_b) => {
	const dot_product = dot(vect_a, vect_b)
	const norm_a = norm(vect_a)
	const norm_b = norm(vect_b)
	console.log("norm_a: ", norm_a)

	const similarity = dot_product / (norm_a * norm_b)

	return similarity
}

export const get_vectorized_arr = async (yourStr) => {
	const response = await get_embedding(yourStr)

	const embedding_data = response.data[0]['embedding']
	return embedding_data
}

export const gpt_createCompletion = async (prompt, max_tokens) => {
	const url = 'https://api.openai.com/v1/completions'
	const response = await fetch(url, {
		method: "POST",
		headers: {
			'Authorization': `Bearer ${OPENAI_APIKEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'text-davinci-003',
			prompt: prompt,
			max_tokens: max_tokens
		})
	})

	const data = await response.json()

	return data["choices"][0]['text']
}

export const compareWithVect = async (yourVect) => {
	const max_elems = 1

	// Get vects from DB
	const arr_vects = await getVectController.fetchAllVect()
	const arr_similarity = []
	for (let i = 0; i < arr_vects.length; i++) {
		const similarity = await cosine_similarity(arr_vects[i]['vect_t1'], yourVect)
		arr_similarity.push({id: i, similarity_score: similarity, textchunk: arr_vects[i]['text1']})
	}

	arr_similarity.sort((a, b) => {
		return a.similarity_score < b.similarity_score ? 1 : -1
	})

	let items_arr = arr_similarity.splice(0, max_elems)

	return items_arr
}