// IMPORTS
//- Modules
import React, { useState, useEffect } from 'react'
//- Data
import { contentfulClient } from  '../contentfulClient'
//- Components
import Title from '../components/Title'



// MAIN COMPONENT
const TitleList = ({ filterTypeProp }) => {

    // STATES
        const [allEntries, setAllEntries] = useState(null)
        const [loading, setLoading] = useState(true)
        const [filteredEntries, setFilteredEntries] = useState(null)
        const [filterLoading, setFilterLoading] = useState(true)
        const [sortedEntries, setSortedEntries] = useState(null)
        const [sortedLoading, setSortedLoading] = useState(true)
        // const [markedData, setMarkedData] = useState(null)
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
            }
        }, [ loading, allEntries, filterTypeProp ])
    //
    
    //SORT BY ORDER ID (ONCE FILTERED DATA IS LOADED)
        useEffect(() => {
            if( filterLoading === false){
                filteredEntries.sort(function(a, b){
                    return a.fields.orderId === b.fields.orderId ? 0 : +(a.fields.orderId < b.fields.orderId) || -1 
                })
                setSortedEntries(filteredEntries)
                setSortedLoading(false)
            }
        }, [ filterLoading, filteredEntries ])
    //

    return (
        <ul>
            { sortedLoading === false 

            ? sortedEntries.map((entry, index) =>   
                <li key={index}>
                    <Title contentfulEntryProp={entry} routeProp={filterTypeProp}/>
                </li>
            ) 
            
            : <p style={{fontSize: "0.75rem", lineHeight: "1rem"}}>loading...</p>}
        </ul>
    )
}
export default TitleList
