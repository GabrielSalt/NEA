import React from 'react';
import IndexPage from '../../components/IndexPage.js'

export default function Problems ( { problems } ){
    return <IndexPage data={problems} />
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/problems`)
    const data = await res.json()
    const problems = data.data
    return { props: { problems } }
}