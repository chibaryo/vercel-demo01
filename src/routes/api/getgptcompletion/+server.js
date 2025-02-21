import { gpt_createCompletion } from '../../chatmain/gpt_prepare'

export const POST = (async ({ request }) => {
  const { prompt } = await request.json()
  const max_tokens = 1024

  const response = await gpt_createCompletion(prompt, max_tokens)

  console.log("## server response ##", response)

  return new Response(JSON.stringify(
    { 
			message: 'OK',
			gotanswer: response
		}
  ))
}) // satisfies RequestHandler
