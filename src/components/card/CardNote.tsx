import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  ring,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { URL } from "../Api/URL";
import axios from "axios";
import { type } from "os";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Deleted from "../DeletedNote/Deleted";
import CreateButton from "../navbar/CreateButton";
import EditModal from "../EditNote/EditModal";
import EditBtn from "../EditNote/EditBtn";

const API = URL;
type ApiResponse = {
  name: string;
  description: string;
  _id: string;
  title: string;
};

const CardNote = () => {
  const [apiData, setApiData] = useState([]);
  const [deleteNote, setDeleteNote] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [idDeleting, setIdDeletig] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const IsDeleteModalOpen = () => {
    setDeleteModal(!deleteModal);
  };

  const fetchApiData = async () => {
    try {
      const response = await axios.get(API);
      console.log(response.data);
      setApiData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchApiData();
    // console.log(fetchApiData());
  }, []);

  return (
    <>
      <CreateButton  fetch={fetchApiData} />
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {apiData.map((item: ApiResponse, index) => {
          return (
            <GridItem key={index}>
              <Card m={4} w="100%" boxShadow={"lg"}>
                <CardHeader>
                  <Flex justifyContent={"space-between"}>
                    <Flex>
                      {" "}
                      <Heading size="md"> {item.name} </Heading>
                    </Flex>
                    <Flex>
                      <EditBtn id={item._id} fetch={fetchApiData} />
                      <Icon
                        cursor={"pointer"}
                        color={"red.500"}
                        ml={2}
                        fontSize={14}
                        as={DeleteIcon}
                        onClick={() => {
                          IsDeleteModalOpen();
                          setDeleteNote(true);
                          setIdDeletig(item._id);
                        }}
                      ></Icon>
                    </Flex>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Text>{item.title}</Text>
                  <Text fontSize={12}>{item.description}</Text>
                  {/* <Text fontSize={12}>{item._id}</Text> */}
                </CardBody>
                <CardFooter>
                  <Flex fontSize={8} justifyContent={"space-between"}>
                    <Box flex={1}>
                      <Text>Published on -</Text>
                      <Text> {new Date().toLocaleDateString()}</Text>
                    </Box>
                    <Box flex={1} float={"right"}>
                      Updated on - {new Date().toLocaleDateString()}
                    </Box>
                  </Flex>
                </CardFooter>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
      {deleteNote && (
        <Deleted
          idDeleting={idDeleting}
          isOpen={deleteModal}
          onClose={IsDeleteModalOpen}
          fetch={fetchApiData}
        />
      )}
    </>
  );
};

export default CardNote;
