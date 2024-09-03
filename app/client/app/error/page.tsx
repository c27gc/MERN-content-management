import React from "react";
import { Flex, Heading, Text, Box } from "@chakra-ui/react";

const Unauthorized: React.FC = () => {
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
        <Text fontSize="lg" color="gray.600">
          Unexpected Error, contact support
        </Text>
      </Box>
    </Flex>
  );
};

export default Unauthorized;
