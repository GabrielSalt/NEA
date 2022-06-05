import React from 'react';
import IndexPage from '../../components/IndexPage.js'

export default function Quizzes ({ quizzes }){
    return <IndexPage data={quizzes} />
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/quizzes`)
    const data = await res.json()
    const quizzes = data.data
    return { props: { quizzes } }
}