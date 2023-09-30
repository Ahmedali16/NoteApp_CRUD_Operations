import React ,{useEffect}from 'react'
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { Formik ,Form} from 'formik';
import { URL } from '../Api/URL';

interface CreateFormProps{
  isOpen: boolean;
  onClose(): void;
  fetch:()=>void
}
type createNote={
  name:string;
    title:string;
    description:string;
}

const CreateForm = ( {isOpen, onClose,fetch}:CreateFormProps, ) =>{
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const createNewNote = async (values:createNote) => {
        try {
          const response = await axios.post(URL, values);
          fetch()
        } catch (error) {
          console.error(error);
        }
      };
    
  
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New note</ModalHeader>
                    <ModalCloseButton />
                    <Formik
  initialValues={{ name:"",title: '', description: '' }}
  onSubmit={(values) => {
    createNewNote(values)
    console.log(values);
  }}
>
  {({handleChange}) => (
    <Form>
      <ModalBody>
      <FormControl>
          <FormLabel>Name</FormLabel>
          <Input onChange={handleChange} name="name" placeholder="Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input onChange={handleChange} name="title" placeholder="Note Title" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input onChange={handleChange}  name="description" placeholder="Note Description" />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button type="submit" onClick={onClose} colorScheme="blue" mr={3} >
          Save
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Form>
  )}
</Formik>

                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateForm
