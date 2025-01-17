import {
  Box,
  Heading,
  HStack,
  Image,
  useColorModeValue,
  Text,
  IconButton,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Input,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from "../store/product.js";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct: updateProductInStore } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid, updatedProductData) => {
    const { success, message } = await updateProductInStore(pid, updatedProductData);
    toast({
      title: success ? "Updated Successfully" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.2s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} w={"100%"} h={"200px"} objectFit={"cover"} />
      <Box p={4}>
        <Heading size={"md"}>{product.name}</Heading>
        <Text color={textColor}>{product.description}</Text>
        <HStack mt={4} justifyContent={"space-between"} alignItems={"center"} spacing={4}>
          <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
            />
          </HStack>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, description: e.target.value })
                }
              />
              <Input
                placeholder="Image"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"blue"}
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
