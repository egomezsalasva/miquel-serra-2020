// IMPORTS
//-Modules
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import marked from 'marked'
//- Data
import { contentfulClient } from  '../contentfulClient'
import { useParams } from "react-router-dom"



// STYLES
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



const Content = ({filterTypeProp}) => {

    // STATES
        const [allEntries, setAllEntries] = useState(null)
        const [loading, setLoading] = useState(true)
        const [filteredEntries, setFilteredEntries] = useState(null)
        const [filterLoading, setFilterLoading] = useState(true)
        const [currentEntry, setCurrentEntry] = useState(null)
        const [entryLoading, setEntryLoading] = useState(true)
        const [markedData, setMarkedData] = useState(null)
        const [paramNum, setParamNum] = useState(null)
    // 

    // GET ROUTE [:ID] PARAM
        const { id } = useParams()
    // 

    // FETCH DATA FROM CONTENTFUL
        useEffect(() => {
            contentfulClient.getEntries()
            .then((response) => { 
                setAllEntries(response.items)
                setLoading(false)
            })
            .catch(console.error)
        }, [])
    // 
    
    // FILTER BY TYPE (ONCE DATA IS LOADED)
        useEffect(() => {
            if( loading === false){
                setFilteredEntries(allEntries.filter( entry =>  entry.sys.contentType.sys.id === filterTypeProp))
                setFilterLoading(false)
                // Convert route [:id] param to number to match contentful's [orderId] 
                setParamNum(parseInt(id))
            }
        }, [loading, allEntries, filterTypeProp, id])
    // 

    //FIND MATCHING [ORDER ID] WITH [ROUTE ID PARAMETER] (ONCE FILTERED DATA IS LOADED)
        useEffect(() => {
            if( filterLoading === false){
                setCurrentEntry(filteredEntries.find( entry => entry.fields.orderId === paramNum).fields.content)
                setEntryLoading(false)
            }
        }, [filterLoading, filteredEntries, paramNum])
    // 
    
    // CONVERT MARKDOWN TO HTLM STRING
        useEffect(() => {
            if( entryLoading === false){
                setMarkedData(marked(currentEntry))
            }
        }, [entryLoading, currentEntry])
    // 

    return (
        <>
            {/* Convert HTML string to HTML */}
            <MarkdownStyl dangerouslySetInnerHTML={{ __html: markedData }} />
        </>
    )
}
export default Content
