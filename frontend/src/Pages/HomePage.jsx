import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product.js";
import ProductCard from "../Components/ProductCard.jsx";

const NoProductsMessage = () => (
  <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
    No products found 😢{" "}
    <Link to="/create">
      <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
        Create a product
      </Text>
    </Link>
  </Text>
);

const HomePage = () => {
  const { fetchProducts, products, loading } = useProductStore();

  useEffect(() => {
    // Ensure products are fetched on component mount
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    // Loading spinner for better UX
    return (
      <Container maxW="container.xl" py={12} textAlign="center">
        <Spinner size="xl" color="blue.500" />
      </Container>
    );
  }

  // Main JSX
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🚀
        </Text>

        {/* Check for products and render accordingly */}
        {products && products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => {
              // Fallback for potentially undefined product data
              if (!product || !product._id) {
                return null;
              }
              return <ProductCard key={product._id} product={product} />;
            })}
          </SimpleGrid>
        ) : (
          <NoProductsMessage />
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
