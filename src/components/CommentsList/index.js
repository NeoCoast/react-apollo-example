import React, { useState } from 'react';
import { ReactComponent as CommentsIcon } from 'Assets/comment.svg';
import Comment from 'Components/Comment';
import Input from 'Components/Input';
import Button from 'Components/Button';

import './index.scss';

const CommentsList = ({
  comments,
  createComment,
  loading,
}) => {
  const [body, setBody] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    createComment(body, () => {
      setBody('');
    });
  }

  return (
    <div className="comments-list">
      <div
        className="comments-list__trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex="0"
      >
        <div>{isOpen ? 'Hide' : 'See'} comments...</div>
        <div className="comments-list__count">
          <span>
            {comments.length}
          </span>
          <CommentsIcon />
        </div>
      </div>
      {
        isOpen && (
          <>
            {
              comments.map(comment => (
                <Comment key={comment.id} {...comment} />
              ))
            }

            <form onSubmit={onSubmit}>
              <Input
                placeholder="I think GraphQL rocks because..."
                value={body}
                onChange={(ev) => setBody(ev.target.value)}
              />

              <Button
                className="comments-list__submit-btn"
                loading={loading}
                type="submit"
              >
                Comment
              </Button>
            </form>
          </>
        )
      }
    </div>
  );
};

export default CommentsList;
