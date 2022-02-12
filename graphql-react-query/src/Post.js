import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "https://graphqlzero.almansi.me/api";

function usePost(postId) {
  return useQuery(
    ["post", postId],
    async () => {
      const { post } = await request(
        endpoint,
        gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `
      );

      return post;
    },
    {
      enabled: !!postId,
    }
  );
}

function Post({ postId, setPostId }) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default Post;
