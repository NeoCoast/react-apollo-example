import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ReactComponent as Avatar } from 'Assets/avatar.svg';
import CommentsList from 'Components/CommentsList';
import CREATE_COMMENT from 'GraphQL/queries/comment.mutation.gql';
import FETCH_HOME from 'GraphQL/queries/home.query.gql';

import './index.scss';

const Post = ({
  body,
  comments,
  id,
  title,
  user,
}) => {
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

  return (
    <div className="post">
      <div className="post__user">
        <Avatar width={56} height={56} />
        <div className="post__userdata">
          <span>{user.fullName}</span>
          <span>{user.email}</span>
        </div>
      </div>
      <div className="post__title">
        {title}
      </div>
      <div className="post__body">
        {body}
      </div>

      <CommentsList
        comments={comments}
        createComment={(body, cb) => {
          createComment({
            variables: {
              input: {
                postId: id,
                attributes: { body },
              },
            },
            update: (cache, { data: { createComment } }) => {
              const homeQueryData = cache.readQuery({ query: FETCH_HOME });

              const newNodes = [...homeQueryData.posts.nodes];
              const postIdx = newNodes.findIndex(({ id }) => id === createComment.comment.post.id);
              newNodes[postIdx] = {
                ...newNodes[postIdx],
                comments: [
                  ...newNodes[postIdx].comments,
                  createComment.comment,
                ]
              }

              cache.writeQuery({
                query: FETCH_HOME,
                data: {
                  ...homeQueryData,
                  posts: {
                    ...homeQueryData.posts,
                    nodes: newNodes,
                  },
                },
              });

              if (cb) cb();
            },
          });
        }}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default Post;
