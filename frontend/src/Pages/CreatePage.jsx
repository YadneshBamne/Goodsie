import {
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Box,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();

  // Handle adding a new product with input validation
  const handleAddProduct = async () => {
    const { name, price, description, image } = newProduct;

    // Validate required fields
    if (!name || !price || !description || !image) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast({
        title: "Product Added",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", description: "", image: "" });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            mt={6}
            mb={6}
            zIndex={10}
          >
            Create New Product
          </Heading>
        </motion.div>

        {/* Form Container */}
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            {/* Input fields */}
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            {/* Submit button */}
            <Button
              colorScheme="blue"
              onClick={handleAddProduct}
              w="full"
              _hover={{ bg: "blue.600" }}
            >
              Add New Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
