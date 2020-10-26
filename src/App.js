//IMPORTS
//-Modules
import React, { useState, useEffect } from 'react'
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom"
import styled, { createGlobalStyle } from 'styled-components'
//-Components
import Home from './components/Home'
import TitleList from './components/TitleList'
import Content from './components/Content'
import FourOFour from './components/FourOFour'
//- Data
import { contentfulClient } from  './contentfulClient'
//-Fonts
import GraebenbachRegEOT from './fonts/Grabenbach-Regular.eot'
import GraebenbachRegWOFF from './fonts/Grabenbach-Regular.woff'
import GraebenbachRegWOFF2 from './fonts/Grabenbach-Regular.woff2'
import GraebenbachRegTTF from './fonts/Grabenbach-Regular.ttf'
import GraebenbachRegSVG from './fonts/Grabenbach-Regular.svg'
import GraebenbachMedEOT from './fonts/Grabenbach-Medium.eot'
import GraebenbachMedWOFF from './fonts/Grabenbach-Medium.woff'
import GraebenbachMedWOFF2 from './fonts/Grabenbach-Medium.woff2'
import GraebenbachMedTTF from './fonts/Grabenbach-Medium.ttf'
import GraebenbachMedSVG from './fonts/Grabenbach-Medium.svg'




//STYLES
  const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'Graebenbach';
      font-style: normal;
      font-weight: 900;
      src: url(${GraebenbachRegEOT});
      src: url('${GraebenbachRegEOT}?#iefix') format('embedded-opentype'),
          url(${GraebenbachRegWOFF}) format('woff'),
          url(${GraebenbachRegWOFF2}) format('woff2'),  
          url(${GraebenbachRegTTF}) format('truetype'),
          url('${GraebenbachRegSVG}#Graphik-Black') format('svg');
    }
    @font-face {
      font-family: 'Graebenbach';
      font-style: normal;
      font-weight: normal;  
      src: url(${GraebenbachMedEOT});
      src: url('${GraebenbachMedEOT}?#iefi') format('embedded-opentype'),
          url(${GraebenbachMedWOFF}) format('woff'),
          url(${GraebenbachMedWOFF2}) format('woff2'),
          url(${GraebenbachMedTTF}) format('truetype'),
          url('${GraebenbachMedSVG}#Graphik-Regular') format('svg');
    }
    *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body,
    html {
      font-family: 'Graebenbach', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #020301;
    }
    a{
      color: #020301;
      text-decoration: none;
    }
  `
  //-Vars
  const displayToptHeight = "17.65vh"
  const displayLeftWidth = "33%"
  //TOPBAR
    //-Comp
    const TopBarStl = styled.div`
      position: relative;
      width: 100vw;
      height: ${displayToptHeight};
      
      .left{
        position: absolute;
        left: 0;
        top: 0;
        width: ${displayLeftWidth};
        height: 100%;
        background: #A6FF1A;

        p{
          position: absolute;
          top: 20px;
          left: 30px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }

      .right{
        position: absolute;
        right: 0;
        top: 0;
        width: calc( 100% - ${displayLeftWidth} );
        height: 100%;

        nav{
          position: absolute;
          top: 20px;
          left: 30px;
          ul{
            li{
              display: inline-block;

              a{
                font-size: 0.75rem;
                margin: 0 0.25rem;
                &:hover{
                  text-decoration: underline;
                }
                &.active{
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
    `
  //
  //BOTTOM
    const BottomStl = styled.div`
      position: relative;
      width: 100vw;
      height: calc(100vh - ${displayToptHeight});
      .left{
        position: absolute;
        left: 0;
        width: ${displayLeftWidth};
        height: 100%;
        background: #DBDDD9;
        overflow: scroll;
        border: 30px solid #DBDDD9;
        border-right: 20px solid #DBDDD9;
        &::-webkit-scrollbar {
          width: 4px;
          height: 100%;
        }
        &::-webkit-scrollbar-thumb {
          background: #fff; 
        }
        &::-webkit-scrollbar-track {
          background: transparent; 
        }

        .titlesWrapper{
          padding-right: 10px;

          ul{

            li{

              .title{
                display: flex;
                margin-bottom: 20px;
                list-style: none;
                cursor: pointer;
                font-size: 0.75rem;
                line-height: 1.125rem;

                &:hover::before{
                    content: "● ";
                    color: #ABBDFF;
                }

                &::before{
                    content: "○ ";
                    margin-right: 5px;
                }

                span{
                  font-size: 0.75rem; 
                }
              }

              .titleActive{
                &::before{
                    content: "● ";
                    margin-right: 5px;
                }
                &:hover::before{
                    content: "● ";
                    color: #020301;
                }
              }
            }
          }
        }
      }

      .right{
        position: absolute;
        right: 0;
        width: calc(100% - ${displayLeftWidth});
        height: 100%;
        background: #ABBDFF;
        overflow: scroll;
        border: 30px solid #ABBDFF;
        padding: 0 20px;
        &::-webkit-scrollbar {
          width: 4px;
          height: 100%;
        }
        &::-webkit-scrollbar-thumb {
          background: #A6FF1A; 
        }
        &::-webkit-scrollbar-track {
          background: transparent; 
        }
 

        .contentWrapper{
          /* width: 75%; */
          width: 100%;
          max-width: 664px;

          .content{
            font-size: 0.75rem;
            line-height: 1.125rem;
          }
        }
      }
    `
  //
//



//MAIN COMPONENT
const App = () => {

  // STATES
    const [allEntries, setAllEntries] = useState(null)
    const [loading, setLoading] = useState(true)
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

  // PUBLICATIONS REROUTING

    // STATE
      const [publicationsEntries, setPublicationsEntries] = useState(null)
      const [publicationsLoading, setPublicationsLoading] = useState(true)
      const [publicationsLength, setPublicationsLength] = useState(null)
      const [publicationsArrayLengthLoading, setPublicationsArrayLengthLoading] = useState(true)
    // 

    // FILTER BY PUBLICATIONS (ONCE DATA IS LOADED)
      useEffect(() => {
        if( loading === false){
            setPublicationsEntries(allEntries.filter( entry =>  entry.sys.contentType.sys.id === "publications"))
            setPublicationsLoading(false)
        }
      }, [ loading, allEntries ])
    // 

    // LENGTH OF ARRAY (ONCE PUBLICATIONS DATA IS LOADED)
      useEffect(() => {
        if( publicationsLoading === false){
          // Find highest number
          let entryOrderIdList = publicationsEntries.map( entrie => entrie.fields.orderId)
          const biggestNumberOrderId = Math.max(...entryOrderIdList)
          setPublicationsLength(biggestNumberOrderId)
          setPublicationsArrayLengthLoading(false)
        }
      }, [ publicationsLoading, publicationsEntries ])
    // 

    // CONDITIONAL RENDERING
      let PublicationsRedirect = () =>{
        if (publicationsArrayLengthLoading === false) {
          return <Redirect to={`/publications/${publicationsLength}`} />;
        }
        return 0;
      }
    // 

  //

  // CV REROUTING

    // STATE
      const [cvEntries, setCvEntries] = useState(null)
      const [cvLoading, setCvLoading] = useState(true)
      const [cvLength, setCvLength] = useState(null)
      const [cvArrayLengthLoading, setCvArrayLengthLoading] = useState(true)
    // 

    // FILTER BY PUBLICATIONS (ONCE DATA IS LOADED)
      useEffect(() => {
        if( loading === false){
          setCvEntries(allEntries.filter( entry =>  entry.sys.contentType.sys.id === "cv"))
          setCvLoading(false)
        }
      }, [ loading, allEntries ])
    // 

    // LENGTH OF ARRAY (ONCE PUBLICATIONS DATA IS LOADED)
      useEffect(() => {
        if( cvLoading === false){
          let entryOrderIdList = cvEntries.map( entrie => entrie.fields.orderId)
          const biggestNumberOrderId = Math.max(...entryOrderIdList)
          setCvLength(biggestNumberOrderId)
          setCvArrayLengthLoading(false)
        }
      }, [ cvLoading, cvEntries ])
    // 

    // CONDITIONAL RENDERING
      let CvRedirect = () =>{
        if (cvArrayLengthLoading === false) {
          return <Redirect to={`/cv/${cvLength}`} />;
        }
        return 0;
      }
    // 

  //

  // NETWORK REROUTING

    // STATE
      const [networkEntries, setNetworkEntries] = useState(null)
      const [networkLoading, setNetworkLoading] = useState(true)
      const [networkLength, setNetworkLength] = useState(null)
      const [networkArrayLengthLoading, setNetworkArrayLengthLoading] = useState(true)
    // 

    // FILTER BY PUBLICATIONS (ONCE DATA IS LOADED)
      useEffect(() => {
        if( loading === false){
          setNetworkEntries(allEntries.filter( entry =>  entry.sys.contentType.sys.id === "network"))
          setNetworkLoading(false)
        }
      }, [ loading, allEntries ])
    // 

    // LENGTH OF ARRAY (ONCE PUBLICATIONS DATA IS LOADED)
      useEffect(() => {
        if( networkLoading === false){
          let entryOrderIdList = networkEntries.map( entrie => entrie.fields.orderId)
          const biggestNumberOrderId = Math.max(...entryOrderIdList)
          setNetworkLength(biggestNumberOrderId)
          setNetworkArrayLengthLoading(false)
        }
      }, [ networkLoading, networkEntries ])
    // 

    // CONDITIONAL RENDERING
      let NetworkRedirect = () =>{
        if (networkArrayLengthLoading === false) {
          return <Redirect to={`/network/${networkLength}`} />;
        }
        return 0;
      }
    // 

  //

  // CONTACT REROUTING

    // STATE
      const [contactEntries, setContactEntries] = useState(null)
      const [contactLoading, setContactLoading] = useState(true)
      const [contactLength, setContactLength] = useState(null)
      const [contactArrayLengthLoading, setContactArrayLengthLoading] = useState(true)
    // 

    // FILTER BY PUBLICATIONS (ONCE DATA IS LOADED)
      useEffect(() => {
        if( loading === false){
          setContactEntries(allEntries.filter( entry =>  entry.sys.contentType.sys.id === "contact"))
          setContactLoading(false)
        }
      }, [ loading, allEntries ])
    // 

    // LENGTH OF ARRAY (ONCE PUBLICATIONS DATA IS LOADED)
      useEffect(() => {
        if( contactLoading === false){
          let entryOrderIdList = contactEntries.map( entrie => entrie.fields.orderId)
          const biggestNumberOrderId = Math.max(...entryOrderIdList)
          setContactLength(biggestNumberOrderId)
          setContactArrayLengthLoading(false)
        }
      }, [ contactLoading, contactEntries ])
    // 

    // CONDITIONAL RENDERING
      let ContactRedirect = () =>{
        if (contactArrayLengthLoading === false) {
          return <Redirect to={`/contact/${contactLength}`} />;
        }
        return 0;
      }
    // 

  //

  return (
    <>
      <GlobalStyle/>

      <TopBarStl>
        <div className="left">
          <Link to="/"><p>Miquel Serra</p></Link>
        </div>
        <div className="right">
          <nav>
            <ul>
              <li><NavLink to="/publications" activeClassName="active">(Publications)</NavLink></li>
              <li><NavLink to="/cv" activeClassName="active">(C.V.)</NavLink></li>
              <li><NavLink to="/network" activeClassName="active">(Network)</NavLink></li>
              <li><NavLink to="/contact" activeClassName="active">(Contact)</NavLink></li>
            </ul>
          </nav>
        </div>
      </TopBarStl>

      <BottomStl>
        <div className="left">
          <div className="titlesWrapper">
            <Route path="/publications">
              <TitleList filterTypeProp="publications"/>
            </Route>
            <Route path="/cv">
              <TitleList filterTypeProp="cv"/>
            </Route>
            <Route path="/network">
              <TitleList filterTypeProp="network"/>
            </Route>
            <Route path="/contact">
              <TitleList filterTypeProp="contact"/>
            </Route> 
          </div>
        </div>
        <div className="right">
          <div className="contentWrapper">

            <Switch>

              <Route exact path="/publications"><PublicationsRedirect/></Route>
              <Route path="/publications/:id">
                <Content filterTypeProp="publications"/>
              </Route>

              <Route exact path="/cv"><CvRedirect/></Route>
              <Route path="/cv/:id">
                <Content filterTypeProp="cv"/>
              </Route>

              <Route exact path="/network"><NetworkRedirect/></Route>
              <Route path="/network/:id">
                <Content filterTypeProp="network"/>
              </Route>

              <Route exact path="/contact"><ContactRedirect/></Route>
              <Route path="/contact/:id">
                <Content filterTypeProp="contact"/>
              </Route> 

              <Route exact path="/"><Home/></Route>

              <Route><FourOFour /></Route>
            </Switch>

          </div>
        </div>
      </BottomStl>
    </>
  )
}
export default App
