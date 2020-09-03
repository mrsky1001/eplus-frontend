import ApolloClient, {gql} from 'apollo-boost'
import fetch from 'node-fetch'

const dev = process.env.NODE_ENV === "development";
const uri = dev ? 'http://localhost:1337/graphql' : 'https://api.xn--c1adkmgpem4hrai.xn--p1ai/graphql'

export const client = new ApolloClient({
  // link: createHttpLink({
  uri,
  fetch,
  // }),
  // cache: new InMemoryCache(),
})

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'no-cache'
  }
};


export const PAGES_BY_SLUG_QUERY = gql`
  query ($slug: String!){
    pages(where: {slug: $slug}) {
      slug
      title
      sidebar{
        __typename
        ... on ComponentDefaultImage{
          image{
            formats
            alternativeText
          }
        }
      }
      content{
        __typename
        ... on ComponentDefaultParagraph{
          content
        }
      }
    }
  }
`

export const SITE_META = gql`
  query{
    siteMeta{
      title
      description
      redirects{
        ... on ComponentDefaultRedirect{
          from
          to
        }
      }
    }
  }
`

export const NEWS_ARTICLE_BY_SLUG_QUERY = gql`
  query ($slug: String!){
    newsArticles(where: {slug: $slug}) {
      slug
      title
      date
      image{
        url
        alternativeText
      }
      content{
        __typename
        ... on ComponentDefaultParagraph{
          content
        }
      }
    }
  }
`

export const NEWS_ARTICLES = gql`
  query {
    newsArticles {
      slug
      title
      date
      image{
        url
        formats
        alternativeText
      }
      summary
    }
  }
`
