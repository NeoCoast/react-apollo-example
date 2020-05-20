import React from 'react';
import Post from 'Components/Post';
import Button from 'Components/Button';

import './index.scss';

const PostsList = ({
  fetchMore,
  hasMore,
  loading,
  posts,
}) => (
  <>
    <div className="posts-list">
      {
        posts.map((post) => (
          <Post
            key={post.id}
            {...post}
          />
        ))
      }
    </div>
    {
      hasMore && (
        <Button
          className="posts-list__pagination-button"
          loading={loading}
          onClick={fetchMore}
          type="button"
        >
          Load more!
        </Button>
      )
    }
  </>
);

export default PostsList;
