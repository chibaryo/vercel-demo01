import { VectModel } from '$lib/mongodb/models/Vect'
import { connectDB } from '$lib/mongodb/plugins/dbconnection'
import xlsx from 'node-xlsx'

/** @type {import('./$types').RequestHandler} */
export const GET = (async ({ params }) => {
        const _id = params._id        
        await connectDB()

        // Get vectors[]
        const resp = await VectModel.find({}).sort({ "itemId": 1}).lean()
        // Convert array of objects to array of arrays
        const headers = Object.keys(resp[0]); // Extract headers
        const data = resp.map(obj => headers.map(header => obj[header])); // Convert objects to arrays
        const result = [headers, ...data]; // Combine headers and data


  // Write
  var buffer = xlsx.build([{ name: 'mySheetName', data: result }]); // Returns a buffer


          // Set headers for file download
        const headersResponse = new Headers({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="vectors.xlsx"'
        });

        // Return the XLSX file as a response
        return new Response(buffer, { headers: headersResponse });
})