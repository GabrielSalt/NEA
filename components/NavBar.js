import React, {useState} from 'react';
import { useRouter } from 'next/router';

export default function NavBar ({ selected }) {
    const options = ['Home', 'Algorithms', 'Code Problems', 'Quizzes', 'Lessons', 'My Classes', 'Assignments']
    return(
    <div >
        {options.map((box) => (
            <div>
                <h1> {box.name} </h1>
                <h2> {box.category} {box.class} {box.subject} </h2>
                <h3> {box.difficulty} </h3>
                <h4> {box.teacher} </h4>
            </div>
        ))}
    </div>
    )
}