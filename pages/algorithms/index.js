import React from 'react';
import IndexPage from '../../components/IndexPage'

export default function Algorithms ({ algorithms }){
    return <IndexPage data={algorithms} />
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/algorithms`)
    const data = await res.json()
    const algorithms = data.data
    return { props: { algorithms } }
}