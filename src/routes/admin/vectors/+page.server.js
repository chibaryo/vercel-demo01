import { VectModel } from '$lib/mongodb/models/Vect'
import mongoose from 'mongoose'
import pkg from 'mongoose'
const { Types, Schema, Document, Model, models } = pkg
import { connectDB } from '$lib/mongodb/plugins/dbconnection'

export const load = (async () => {
	await connectDB()
	const vect_resp = await VectModel.find({}).lean()

  return {
		vectors: JSON.stringify(vect_resp)
  }
}) // satisfies PageServerLoad
