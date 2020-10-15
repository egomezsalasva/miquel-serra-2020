import * as contentful from 'contentful'

// Test
export const contentfulClient = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
})