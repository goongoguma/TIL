import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://graphqlzero.almansi.me/api";

const useAlbums = () => {
    return useQuery("albums", () => 
    request(endpoint, gql`
      query {
        albums {
          data {
            id
            title
            user {
              id
              name
              email
              phone
            }
          }
        }
      }
    `
    ).then(res => res.album.data)
  )
}

const Albums = () => {
  const { data, error, isLoading } = useAlbums();

  if (isLoading) return 'loading...'

  console.log(data)
  return (
    <div>Albums</div>
  )
}

export default Albums;