import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

export function InvalidPost({ postId }) {
  const classes = useStyles();

  return (
    <div className={classes.invalidPostContainer}>
      <p>{`Invalid postId: ${postId}`}</p>
      <Link to='/'>Go to Home</Link>
    </div>
  );
}

function Comment({ comment }) {
  const classes = useStyles();

  return (
    <div className={classes.commentContainer} data-testid='comment-container'>
      <span className={classes.commentName} data-testid='comment-name'>{comment.name}</span>
      <p className={classes.commentBody} data-testid='comment-body'>{comment.body}</p>
    </div>
  )
}

function CommentSection({ comments }) {
  const classes = useStyles();
  return (
    <div className={classes.commentsContainer}>
      {comments.map((comment, index) => <Comment key={index} comment={comment} />)}
    </div>
  )
}

function Actions({ setComments }) {
  
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async function() {
    if (name && email && body) {
      await fetch(`https://jsonplaceholder.typicode.com/comments`, {
        method: 'POST',
        body: {
          name,
          email,
          body
        }
      })
      setComments(comments => {
        return comments.concat({ name, email, body })
      });
      setError(null);
    } else {
      setError('Must provide all fields')
    }
  }

  return (
    <div className={classes.actionContainer}>
      <div className={classes.inputContainer}>
        <div className={classes.nameAndEmailRow}>
          <input data-testid='name-field' value={name} placeholder='Name' onChange={e => setName(e.target.value)}/>
          <input data-testid='email-field'  value={email} placeholder='Email' onChange={e => setEmail(e.target.value)} />
        </div>
        <textarea data-testid='body-field'  value={body} onChange={e => setBody(e.target.value)} className={classes.commentInput} placeholder='Comment'/>
      </div>
      <div>
        {error && <p className={classes.error} data-testid='error-message'>{error}</p>}
        <button className={classes.postButton} data-testid='post-button' onClick={handleSubmit }>Post</button>
      </div>
    </div>
  )
} 

export default function Post({ post, comments, setComments }) {
  const classes = useStyles();

  return (
    <div className={classes.postContainer} data-testid='post'>
      <p className={classes.postTitle} data-testid='post-title'>{post.title}</p>
      <p className={classes.postBody} data-testid='post-body'>{post.body}</p>
      <CommentSection comments={comments} />
      <Actions setComments={setComments} />
    </div>
  )
}

const useStyles = makeStyles({
  postContainer: {
    width: '50%',
    boxShadow: '0 0 10px',
    margin: '20px 10px',
    padding: '20px'
  },
  postTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px'
  },
  postBody: {
    textAlign: 'center',
    padding: '0px 50px'
  },
  commentsContainer: {
    marginTop: '1%',
    paddingLeft: '15px',
    borderLeft: '2px solid #ddd',
    marginBottom: '20px'
  },
  commentContainer: {
    margin: '10px 0px'
  },
  commentName: {
    fontWeight: 'bold',
    display: 'block'
  },
  commentBody: {
    marginLeft: '15px',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  inputContainer: {
    border: '2px solid #ddd',
    padding: '20px'
  },
  postButton: {
    margin: '0px 20px',
    padding: '0px 30px',
    height: '50px'
  },
  nameAndEmailRow: {
    display: 'flex',
    flexDirection: 'flex-start',
    '& input': {
      margin: '0px 10px'
    }
  },
  commentInput: {
    margin: '10px',
    height: '75px',
    width: '400px',
    padding: '10px'
  },
  invalidPostContainer: {
    margin: '20px'
  },
  error: {
    color: 'red',
    margin: '10px'
  }
});