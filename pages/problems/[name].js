import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from "@codemirror/theme-one-dark";

export default function Problem( { problem, author }) {
    const router = useRouter()
    const contentType = 'application/json'
    const [code, setCode] = useState(problem.prompt)
    const [message, setMessage] = useState('')
    const [results, setResults] = useState([false,false,false])
    const [time, setTime] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        setTime('Loading')
        postData(code)
      }
    
        const postData = async (code) => {
            try {
              const res = await fetch('/api/problems/submit', {
                method: 'POST',
                headers: {
                  Accept: contentType,
                  'Content-Type': contentType,
                },
                body: JSON.stringify({ code, problem }),
              })
              const data = await res.json()
              setMessage(data.message)
              results = data.results.map(result => {
                  return(typeof result === 'boolean' ? result : (result.replace(' ','') === 'False' ? false : true))
              })
              setResults(results)
              setTime(data.time)
        
              // Throw error with status code in case Fetch API req failed
              if (!res.ok) {
                throw new Error(res.status)
              }
            } catch (error) {
              setMessage(error.message)
            }
          }

    return (
    <div style={{display: 'flex'}}>
            <div style={{flex: '40%', margin: '5%'}}>
                <h1> {problem.name} </h1>
                <h5> {author.name} - {problem.datePublished.split("T")[0]} </h5>
                <h2> {problem.category} </h2>
                {problem.description.split('\n').map((item, index) => (
                    <span key={index}>
                        {item}
                        <br/>
                    </span>
                    )
                )
                }
                <h4> {problem.difficulty}</h4>
                <h5> {problem.hints[0]} </h5>
                <h5> {problem.hints[1]} </h5>
                <h5> {problem.hints[2]} </h5>
            </div>
            <div style={{flex: '40%', margin:'5%'}}>
            <div style={{display: 'grid', 'gridTemplateColumns': '200px 200px 200px'}}>
            <p>{results[0] ? 'Passed' : 'Failed'}</p><p>{results[1] ? 'Passed' : 'Failed'}</p><p>{results[2] ? 'Passed' : 'Failed'}</p>
            <p>{results[0] && results[1] && results[2] ? time: null}</p>
            </div>
            <CodeMirror
                value={problem.prompt}
                extensions={[python()]}
                theme={oneDark}
                smartindent='true'
                height="500px"
                onChange={(value, viewUpdate) => {
                    setCode(value)
                }}
            />
            <button onClick={handleSubmit}> Submit </button>
            <p>{message}</p>
            </div>
    </div>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const { name } = context.params;
    const res = await fetch(`http://localhost:3000/api/problems/${name}`)
    const data = await res.json()
    const problem = data.data[0]
    const author = data.data[1]
    // Pass data to the page via props
    return { props: { problem, author } }

}
