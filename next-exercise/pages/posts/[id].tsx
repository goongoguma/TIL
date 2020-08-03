import React from 'react';

interface IPostProp {
  body: string;
  id: number;
  title: string;
  userId: number;
};

interface IPostProps {
  post: IPostProp
};

interface IPostStaticProps {
  props: IPostProps
};

interface IPostPages {
  paths: string;
  fallback: boolean;
};

const Post: React.FC<IPostProps> = ({post}) => {
  return (
    <div>
      <p>id: {post.id}</p>
      <p>title: {post.title}</p>
      <p>body: {post.body}</p>
    </div>
  )
}

export default Post;

export const getStaticPaths: () => Promise<IPostPages> = async() => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const res = await fetch(url);
  const posts = await res.json();
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }))

  return { paths, fallback: false}
}

export const getStaticProps: (params: any) => Promise<IPostStaticProps> = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post = await res.json();
  return {
    props: {
      post
    }
  }
};

