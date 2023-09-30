import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import EditModal from "./EditModal";
import { EditIcon } from "@chakra-ui/icons";

function CreateButton({ fetch, id }: { fetch: () => void; id: string }) {
  const [editModalForm, seteditModalForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon
        cursor={"pointer"}
        onClick={() => {
          ModalOpen();
          seteditModalForm(true);
        }}
        color={"green"}
        as={EditIcon}
      >
        {" "}
      </Icon>
      {editModalForm && (
        <EditModal
          fetch={fetch}
          isOpen={isModalOpen}
          editId={id}
          onClose={ModalOpen}
        />
        // <CreateForm fetch={fetch} isOpen={isModalOpen} onClose={ModalOpen} />
      )}
    </>
  );
}

export default CreateButton;
