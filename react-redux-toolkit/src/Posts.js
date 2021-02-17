import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './redux/postsSlice';

function Posts() {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state);

  console.log(posts)

  useEffect(() => {
    dispatch(getPosts)
  }, [dispatch]);
  
  return (
    <div>
      
    </div>
  )
}

export default Posts
