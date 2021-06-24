import React, { createContext, useCallback, useEffect, useState } from 'react';

export const PostContext = createContext(null);

export default function PostProvider({ children }) {

  const [posts, setPosts] = useState({});

  const getPostById = useCallback((id) => {
    return posts[id];
  }, [posts])

  useEffect(() => {
    (async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await data.json();
      const postMap = {};
      json.forEach(post => {
        postMap[post.id] = post;
      })
      console.log(postMap);
      setPosts(postMap);
    })();
  }, [])

  return (
    <PostContext.Provider value={{ posts: Object.values(posts), getPostById }}>
      {children}
    </PostContext.Provider>
  )
}