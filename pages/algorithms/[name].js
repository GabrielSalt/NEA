import React from 'react';

const Algorithm = ({ algorithm }) => (
    algorithm[0] ?
        <div>
            <h1> {algorithm[0].name} </h1>
            <h2> {algorithm[0].category} </h2>
            <h3> {algorithm[0].description} </h3>
        </div> 
        :
        <h1> Error 404 Not Found </h1>
)

export async function getServerSideProps(context) {
    // Fetch data from external API
    const { name } = context.params;
    const res = await fetch(`http://localhost:3000/api/algorithms/${name}`)
    const data = await res.json()
    const algorithm = data.data
    // Pass data to the page via props
    return { props: { algorithm } }
}

export default Algorithm;