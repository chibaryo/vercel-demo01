import * as getVectController from '$lib/mongodb/controller/getVectController'
import { OPENAI_APIKEY } from '$env/static/private'
import * as postChatHistoryController from '$lib/mongodb/controller/ChatHistory/postChatHistroyController'

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

	try {
		const resp = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${OPENAI_APIKEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				input: your_prompt,
				model: 'text-embedding-3-large'
			})
		})

		const resdata = await resp.json()
		console.log("resdata", resdata)
		return await resdata
	} catch (err) {
		console.error (err)
	}

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
			model: 'gpt-3.5-turbo-instruct', // deprecated: text-davinci-003
			prompt: prompt,
			max_tokens: max_tokens
		})
	})

	const data = await response.json()
	console.log('data["choices"][0]["text"]', data["choices"][0]['text'])

	// Store to DB
	await postChatHistoryController.createChatHistory({
		q_text: prompt,
		a_text: data["choices"][0]['text']
	});

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