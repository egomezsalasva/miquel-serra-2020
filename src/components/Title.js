//IMPORTS
//-Modules
import React from 'react'
import { NavLink } from "react-router-dom"



// MAIN COMPONENT
const Title = ({contentfulEntryProp, routeProp}) => {

    const { title, orderId } = contentfulEntryProp.fields
    
    return (
        <NavLink to={`/${routeProp}/${orderId}`} className="title" activeClassName="titleActive">
            <span>{title}</span>
        </NavLink>
    )
}
export default Title
