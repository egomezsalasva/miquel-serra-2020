import React, { useEffect, useState } from 'react'
import marked from 'marked'
import styled from 'styled-components'
import { contentfulClient } from  '../contentfulClient'


const MarkdownStyl = styled.div`

    h2{
        margin-top: 20px;
        font-size: 1.25rem;
        font-weight: 500;
        &:first-of-type{
            margin-top: 0;
        }
    } 
    h3{
        margin-top: 20px;
        font-size: 1rem;
        font-weight: 500;
    }
    p{
        margin-top: 10px;
        font-size: 0.75rem;
        line-height: 1rem;
    }
    strong{
        font-weight: 500;
        /* text-decoration: underline;
        text-decoration-color: #A6FF1A; */
    }

    a{
        color: blue;
        /* font-weight: 500; */
    }
`

const Home = () => {

    // STATES
        const [homeIntro, setHomeIntro] = useState(null)
    // 

    // FETCH DATA FROM CONTENTFUL
        useEffect(() => {
        contentfulClient.getEntries()
        .then((response) => { 
            setHomeIntro(marked(response.items.filter( entry =>  entry.sys.contentType.sys.id === "home")[0].fields.introduction))
        })
        .catch(console.error)
        }, [])
    // 

    return (
        <>
            {/* Convert HTML string to HTML */}
            <MarkdownStyl dangerouslySetInnerHTML={{ __html: homeIntro }} />
        </>
    )
}
export default Home
