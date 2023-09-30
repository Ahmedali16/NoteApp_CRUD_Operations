import React, { useRef,useEffect } from 'react';
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { URL } from '../Api/URL';
interface DeletedProps {
    isOpen: boolean;
    onClose: () => void;
    fetch: () => void;
    idDeleting:string;
  }
const Deleted=({ isOpen, onClose, fetch,idDeleting }: DeletedProps)=> {
    console.log(idDeleting,"i a, new one")
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const deleteFromApi=async ()=>{
    try {
        const deleted = await axios.delete(URL+"/"+idDeleting)
        fetch()
        
    } catch (error) {
        console.error(error)
    }
  }
  useEffect(() => {
      console.log(deleteFromApi,"i am from deleted page")
  }, [])

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader fontSize={16} fontWeight={"bold"}>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize={14}>
            Are you sure you want to discard all of your notes? 
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} ref={cancelRef} onClick={() => { onClose(); deleteFromApi(); }}>
  Yes
</Button>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Deleted;
