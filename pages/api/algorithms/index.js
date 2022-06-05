import dbConnect from '../../../lib/dbConnect'
import algorithm from '../../../models/algorithms'

export default async function handler(req, res) {
  await dbConnect()
      try {
        const algorithms = await algorithm.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: algorithms })
      } catch (error) {
        res.status(400).json({ success: false })
      }
}