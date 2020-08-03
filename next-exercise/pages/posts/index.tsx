import React from 'react';
import useSWR, { SWRConfig } from 'swr';
import Link from 'next/link';

const fetcher = async (url: string) => await fetch(url).then(res => res.json());

const Posts: React.FC = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const { data, error } = useSWR(url, fetcher);

  return (
    <ul>
      {
        data?.map(item => (
        <Link href={`/posts/${item.id}`} key={item.id}>
          <li key={item.title}>{item.title}</li>
        </Link>
        ))
      }
    </ul>
  )
}

export default Posts;

