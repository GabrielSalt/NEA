import React from 'react';
import IndexPage from '../../components/IndexPage.js'

export default function Lessons ( { lessons } ){
    return <IndexPage data={lessons} />
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/lessons`)
    const data = await res.json()
    const lessons = data.data
    return { props: { lessons } }
}