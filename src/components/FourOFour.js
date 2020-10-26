import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const FourOFourStyle = styled.div`

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

    return (
        <>
            <FourOFourStyle>
                <h2>404</h2>
                <p>Sorry We couldn't establish a connection to this URL</p>
                <Link to="/">Go Back Home</Link>
                <p>or email</p>
                <a href="mailto: miquel.serra.burriel@gmail.com">miquel.serra.burriel@gmail.com</a>
            </FourOFourStyle>
        </>
    )
}
export default Home
