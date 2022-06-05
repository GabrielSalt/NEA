import React from 'react';
import IndexPage from '../../components/IndexPage.js'

export default function Classes ( { classes } ){
    return <IndexPage data={classes} />
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/classes`)
    const data = await res.json()
    const classes = data.data
    return { props: { classes } }
}