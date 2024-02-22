import { ChatHistoryModel } from '$lib/mongodb/models/ChatHistory'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const createChatHistory = async (chathistory) => {
	try {
		await connectDB()
		return await ChatHistoryModel.create({
			q_text: chathistory.q_text,
			a_text: chathistory.a_text,
		})
	} catch (err) {
		console.error (err)
	}
}