import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Post from './Post';

describe('Post.js', () => {
  it ('Should render Post correctly', () => {
    const { getByTestId } = render(<Post post={{ title: 'post-title', body: 'post-body' }} comments={[]} setComments={() => {}} />);
    const postContainer = getByTestId('post');
    const postTitle = getByTestId('post-title');
    const postBody = getByTestId('post-body');
    expect(postContainer).toBeTruthy();
    expect(postTitle.innerHTML).toEqual('post-title');
    expect(postBody.innerHTML).toEqual('post-body');
  })

  it ('Should render Comment correctly', () => {
    const { getByTestId } = render(<Post
      post={{ title: 'post-title', body: 'post-body' }}
      comments={[{ name: 'user1', body: 'comment-body' }]}
      setComments={() => {}} />
    );
    const postContainer = getByTestId('post');
    const postTitle = getByTestId('post-title');
    const postBody = getByTestId('post-body');
    const commentContainer = getByTestId('comment-container');
    const commentName = getByTestId('comment-name');
    const commentBody = getByTestId('comment-body');

    expect(postContainer).toBeTruthy();
    expect(postTitle.innerHTML).toEqual('post-title');
    expect(postBody.innerHTML).toEqual('post-body');
    expect(commentContainer).toBeTruthy();
    expect(commentName.innerHTML).toBe('user1');
    expect(commentBody.innerHTML).toBe('comment-body');
  })

  it ('Should render error message if not all fields provided and successfully submit when fields are provided', () => {
    const { getByTestId, queryByTestId, rerender } = render(
      <Post
        post={{ title: 'post-title', body: 'post-body' }}
        comments={[]}
        setComments={() => {}} />
    );
    const postButton = getByTestId('post-button');
    const nameField = getByTestId('name-field');
    const emailField = getByTestId('email-field');
    const bodyField = getByTestId('body-field');
    fireEvent.click(postButton);
    const errorMessage = getByTestId('error-message');
    expect(errorMessage.innerHTML).toBe('Must provide all fields');

    fireEvent.change(nameField, {
      target: {
        value: 'user1'
      }
    });
    fireEvent.change(emailField, {
      target: {
        value: 'user1@gmail.com'
      }
    });
    fireEvent.change(bodyField, {
      target: {
        value: 'body of comment'
      }
    });
    fireEvent.click(postButton);

    expect(nameField.value).toBe('user1');
    expect(emailField.value).toBe('user1@gmail.com');
    expect(bodyField.value).toBe('body of comment');
  })

});
