import React, { useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik'; 
import { URL } from '../Api/URL';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fetch: () => void;
  editId: string;
}

 const EditModal = ({ isOpen, onClose, fetch, editId }: EditModalProps) => {
  const formik = useFormik({
    initialValues: { name: '', title: '', description: '' },
    onSubmit: async (values) => {
      try {
        await axios.put(`${URL}/${editId}`, values); 
        fetch(); 
        onClose(); 
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getSingleNote = async () => {
    try {
      const {data} = await axios.get(`${URL}/${editId}`);
      formik.setValues({
        name: data.name,
        title: data.title,
        description: data.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      getSingleNote();
    
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Edit name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder="Edit note Title"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Edit note Description"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;

