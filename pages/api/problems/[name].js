import dbConnect from '../../../lib/dbConnect'
import Problem from '../../../models/problems'
import User from '../../../models/users'
  
export default async function handler(req, res) {
    const {
      query: { name },
    } = req
  
    await dbConnect()
        try {
          const problem = await Problem.find({'name': name})
          const user = await User.find({'_id': problem[0].author})
          res.status(200).json({ success: true, data: [problem[0], user[0]] })
        } catch (error) {
          res.status(400).json({ success: false })
        }
}