import { Button, useDisclosure } from '@chakra-ui/react'
import {useState} from 'react'
import CreateForm from './CreateForm'


function CreateButton({fetch}:{fetch:()=>void}) {
    const [ModalForm, setModalForm] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const ModalOpen=()=>{
        setIsModalOpen(!isModalOpen);
    }
    
    // const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
        <>
            <Button colorScheme={"green"} onClick={()=>{   ModalOpen();
               setModalForm(true);
             }}>Create new note</Button>
            {
                ModalForm && (
                    <CreateForm fetch={fetch} isOpen={isModalOpen} onClose={ModalOpen} />
                )
            }
        </>
    )
}

export default CreateButton
