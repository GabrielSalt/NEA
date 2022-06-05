import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from "@codemirror/theme-one-dark";

function Problems({ formId, problemForm }){
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    testcase1: '',
    testcase2: '',
    testcase3: '',
    hint1: '',
    hint2: '',
    hint3: '',
    difficulty: 'Easy',
    prompt: '',
  })

  const handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postData(form)
  }

    const postData = async (form) => {
        try {
          const res = await fetch('/api/problems/add', {
            method: 'POST',
            headers: {
              Accept: contentType,
              'Content-Type': contentType,
            },
            body: JSON.stringify(form),
          })
    
          // Throw error with status code in case Fetch API req failed
          if (!res.ok) {
            throw new Error(res.status)
          }
          router.push(`/problems/${form.name}`)
        } catch (error) {
          setMessage('Failed to add problem')
        }
      }

    return (
      <div style={{display: 'flex'}}>
      <div style={{flex: '40%', margin: '5%', width: '40%'}}>
         <form onSubmit={handleSubmit}>
             Name
             <input type='text' name='name' value={form.name}
          onChange={handleChange}></input>
             <br></br>
             Description
             <textarea rows='15' cols='60' max-cols='80' type='text' name='description' value={form.description}
          onChange={handleChange}></textarea>
             <br></br>
             Category
             <input type='text' name='category' value={form.category}
          onChange={handleChange}></input>
            <br></br>
             TestCase1 ([input(s)], result)
             <input type='text' name='testcase1' value={form.testcase1}
          onChange={handleChange}></input>
             <br></br>
             TestCase2
             <input type='text' name='testcase2' value={form.testcase2}
          onChange={handleChange}></input>
             <br></br>
             TestCase3
             <input type='text' name='testcase3' value={form.testcase3}
          onChange={handleChange}></input>
             <br></br>
             Hint1
             <input type='text' name='hint1' value={form.hint1}
          onChange={handleChange}></input>
             <br></br>
             Hint2 
             <input type='text' name='hint2' value={form.hint2}
          onChange={handleChange}></input>
             <br></br>
             Hint3
             <input type='text' name='hint3' value={form.hint3}
          onChange={handleChange}></input>
             <br></br>
             Difficulty
             <select name='difficulty'
          onChange={handleChange}>
                 <option value='Easy'>Easy</option>
                 <option value='Medium'>Medium</option>
                 <option value='Hard'>Hard</option>
             </select>
             <br></br>
             <input type='submit' name='submit'></input>
         </form>
      </div>
      <div style={{flex: '40%', margin: '5%'}}>
      Prompt
             <CodeMirror
                name='prompt'
                value=''
                extensions={[python()]}
                theme={oneDark}
                smartindent='true'
                height="500px"
                onChange={handleChange}
            />
      </div>
      </div>
    );
}

export default Problems;
