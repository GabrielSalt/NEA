import React, {useState} from 'react';
import { useRouter } from 'next/router';

export default function IndexPage ({ data }) {
    return(
    <div>
        {data.map((box) => (
            <div key={box.id}>
                <h1> {box.name} </h1>
                <h2> {box.category} {box.class} {box.subject} </h2>
                <h3> {box.difficulty} </h3>
                <h4> {box.teacher} </h4>
            </div>
        ))}
    </div>
    )
}