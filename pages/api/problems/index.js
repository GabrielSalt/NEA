import dbConnect from '../../../lib/dbConnect'
import problem from '../../../models/problems'

export default async function handler(req, res) {
  await dbConnect()
      try {
        const problems = await problem.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: problems })
      } catch (error) {
        res.status(400).json({ success: false })
      }
}