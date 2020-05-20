import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';

import NewPostModal from 'Components/NewPostModal';
import Layout from 'Components/Layout';
import Loader from 'Components/Loader';
import PostsList from 'Components/PostsList';
import UserData from 'Components/UserData';
import FETCH_HOME from 'GraphQL/queries/home.query.gql';
import CREATE_POST from 'GraphQL/queries/post.mutation.gql';
import LOGOUT from 'GraphQL/queries/logout.mutation.gql';

const Home = ({ history }) => {
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [logout] = useMutation(LOGOUT, {
    update(cache) {
      cache.reset();

      localStorage.removeItem('token');
      history.replace('/login');
    },
  })
  const { loading, error, data, fetchMore, ...rest } = useQuery(FETCH_HOME, { notifyOnNetworkStatusChange: true });
  const [createPost, { loading: creatingPost, error: postError }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      const homeQueryData = cache.readQuery({ query: FETCH_HOME });

      cache.writeQuery({
        query: FETCH_HOME,
        data: {
          ...homeQueryData,
          posts: {
            ...homeQueryData.posts,
            totalCount: homeQueryData.posts.totalCount + 1,
            nodes: [
              createPost.post,
              ...homeQueryData.posts.nodes,
            ],
          },
        },
      });

      setIsOpenNewPostModal(false);
    }
  }
  );

  return (
    <Layout>
      {loading && !data && <Loader />}
      {
        error && (
          <div>
            Oops :(
          </div>
        )
      }

      {
        (!loading || data) && !error && (
          <>
            <UserData
              {...data.me}
              logout={logout}
              postsCount={data.posts.totalCount}
              openNewPostModal={() => setIsOpenNewPostModal(true)}
            />

            <PostsList
              hasMore={data.posts.pageInfo.hasNextPage}
              fetchMore={() => {
                fetchMore({
                  variables: {
                    cursor: data.posts.pageInfo.endCursor,
                  },
                  updateQuery: (prevRes, { fetchMoreResult }) => {
                    const { posts } = fetchMoreResult;

                    return {
                      ...prevRes,
                      posts: {
                        ...prevRes.posts,
                        nodes: [
                          ...prevRes.posts.nodes,
                          ...posts.nodes,
                        ],
                        pageInfo: posts.pageInfo,
                      },
                    };
                  },
                });
              }}
              loading={loading}
              posts={data.posts.nodes}
            />

            <NewPostModal
              closeModal={() => setIsOpenNewPostModal(false)}
              createPost={(title, body) => {
                createPost({
                  variables: {
                    input: {
                      attributes: {
                        body,
                        title,
                      },
                    }
                  },
                });
              }}
              isOpen={isOpenNewPostModal}
              loading={creatingPost}
              hasError={postError}
            />
          </>
        )
      }
    </Layout>
  );
}

export default withRouter(Home);
