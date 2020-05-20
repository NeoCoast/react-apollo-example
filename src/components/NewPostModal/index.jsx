import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';

import { ReactComponent as Close } from 'Assets/close.svg';
import Button from 'Components/Button';
import Form from 'Components/Form';
import Input from 'Components/Input';

import './index.scss';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(12, 26, 61, 0.3)',
    zIndex: 2,
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding: 0,
    borderRadius: 15,
  }
};

Modal.setAppElement('#mount')

const NewPostModal = ({
  closeModal,
  createPost,
  isOpen,
  loading,
  hasError,
}) => {
  const titleInput = useRef();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {
        if (titleInput && titleInput.current)
          titleInput.current.focus();
      }}
      onAfterClose={() => {
        setTitle('');
        setBody('');
      }}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="New post modal"
    >
      <div className="new-post-modal__header">
        <Close onClick={closeModal} />
      </div>
      <div className="new-post-modal__content">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            createPost(title, body);
          }}
        >
          <Input
            disabled={loading}
            ref={titleInput}
            placeholder="My awesome post about GraphQL"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          <textarea
            disabled={loading}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas justo quam, rhoncus eget tempor quis, convallis eget ex. Nam aliquet enim est, eu commodo mi semper in."
            rows={4}
            value={body}
            onChange={(ev) => setBody(ev.target.value)}
          />

          <Button disabled={loading} loading={loading} type="submit">
            Post
          </Button>
        </form>
      </div>
    </Modal>
  );
}


export default NewPostModal;
