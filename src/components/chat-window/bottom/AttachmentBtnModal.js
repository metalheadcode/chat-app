import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmentBtnModal = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useModalState();
  const [fileList, setFileList] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onChange = fileArr => {
    const filtered = fileArr
      .filter(element => element.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);

    setFileList(filtered);
  };

  const onUpload = async () => {
    setIsLoading(true);
    try {
      const uploadPromises = fileList.map(file => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + file.name)
          .put(file.blobFile, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapshots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapshots.map(async snap => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setIsLoading(false);
      close();

      Alert.success('Succesfully uploaded', 4000);
    } catch (error) {
      setIsLoading(false);
      close();
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            className="w-100"
            autoUpload={false}
            action=""
            fileList={fileList}
            onChange={onChange}
            multiple
            listType="picture-text"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={onUpload} disabled={isLoading}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5MB are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
