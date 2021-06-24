import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PostContext } from './PostProvider';
import Post, { InvalidPost } from './Post';

export default function PostView() {

  const location = useLocation();
  const { getPostById } = useContext(PostContext);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      if (location) {
        const tokens = location.pathname.split('/');
        const id = tokens[tokens.length - 1];
        const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const commentJson = await commentResponse.json();
        setCurrentPostId(id);
        setComments(commentJson);
      }
    })();

  }, [location])

  const currentPost = currentPostId && getPostById(currentPostId);

  return !currentPost
    ? (
      <InvalidPost postId={currentPostId}/>
    ) : (
      <Post post={currentPost} comments={comments} setComments={setComments} />
    )
}