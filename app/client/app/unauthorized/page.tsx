'use client'
import React from "react";
import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Unauthorized: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.200"
    >
      <Box textAlign="center" p={6} rounded="md" boxShadow="lg" backgroundColor="white">
        <Heading as="h1" size="xl" color="red.500" mb={4}>
          Access Denied
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={4}>
          You do not have permission to view this page.
        </Text>
        <Button colorScheme="teal" onClick={handleRedirect}>
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
};

export default Unauthorized;
