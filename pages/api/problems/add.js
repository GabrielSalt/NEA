import dbConnect from '../../../lib/dbConnect'
import Problem from '../../../models/problems'
import ForumPost from '../../../models/forumposts'
import reactDom from 'react-dom'


export default async function handler(req, res) {
    await dbConnect()
        try {
          console.log(req.body.difficulty)
          const forumpost = await ForumPost.create({
            title: req.body.name,
            author: "6296730eeccac307dbd5f93a",
            category: 'Code Problem',
            description: `This is the automated forum post relating to code problem ${req.body.name}.`,
            likes: 0,
            comments: [],
            datePosted: new Date(),
          })

          const problem = await Problem.create({
            author: "6296730eeccac307dbd5f93a",
            name: req.body.name, 
            category: req.body.category, 
            description: req.body.description,
            testcases: [req.body.testcase1,req.body.testcase2,req.body.testcase3],
            hints: [req.body.hint1,req.body.hint2,req.body.hint3],
            difficulty: req.body.difficulty,
            prompt: req.body.prompt,
            datePublished: new Date(),
            forumpost: `${forumpost._id}`,
          })
          res.status(200).json({ success: true, data: problem })
        } catch (error) {
          res.status(400).json({ success: false, error })
        }
}