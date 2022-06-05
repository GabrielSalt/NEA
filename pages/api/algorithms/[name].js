import dbConnect from '../../../lib/dbConnect'
import Algorithm from '../../../models/Algorithms'
  
export default async function handler(req, res) {
    const {
      query: { name },
    } = req
  
    await dbConnect()
        try {
          const algorithm = await Algorithm.find({'name': name})
          res.status(200).json({ success: true, data: algorithm })
        } catch (error) {
          res.status(400).json({ success: false })
        }
}