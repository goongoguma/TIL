import { request, gql } from "graphql-request";
import { useQuery, useMutation, useQueryClient } from "react-query";

const endpoint = "https://graphqlzero.almansi.me/api";

const useAlbum = (id) => {
    return useQuery(["album", id], () => 
     request(endpoint, gql`
      query {
       album(id: ${id}) {
         id
         title
         user {
           id
           username
           phone
         }
       }
      }
    `
    ).then(res => res.album)
  )
}

const useUpdateAlbum = () => {
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("album");
  const onError = (error) => alert(error);

  return useMutation(({ id, title }) => {
    return request(endpoint, gql`
    mutation {
      updateAlbum(id: ${id}, input: { title: "${title}", userId: ${id} }) {
        id
        title
      }
    }
  `)
  }, {
    retry: 0,
    onSuccess,
    onError
  })
}

const Album = () => {
  const { data, error, isLoading } = useAlbum("1");
  const { mutate: updateAlbum } = useUpdateAlbum()

  if (isLoading) return 'loading...'

  console.log(data)

  const onUpdate = () => {
    updateAlbum({ id: "1", title: "hello graphql"})
  }
  return (
    <>
      <div>Album</div>
      <button onClick={onUpdate}>Update</button>
    </>
  )
}

export default Album;