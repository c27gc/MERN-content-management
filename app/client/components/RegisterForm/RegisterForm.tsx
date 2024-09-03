'use client';

import { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormLabel,
  Select,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope, FaUserTag } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider"; // Asegúrate de que la ruta es correcta

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);
const CFaUserTag = chakra(FaUserTag);

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role initially empty
  const [error, setError] = useState<string | null>(null); // Estado para el error
  const { register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirigir si ya hay un token en las cookies
    const token = getCookie("token");
    if (token) {
      router.push("/topics");
    }
  }, [router]);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Resetear error antes de intentar registrar
    try {
      await register(username, email, password, role);
      router.push("/topics");
    } catch (err) {
      setError(`Failed to register. Please try again. ${err}`); // Manejar error
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <Flex
      flexDirection="column"
      width="100vw"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">MERN Content Manager</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleRegister}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaEnvelope color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"/>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select role
                    </option>
                    <option value="Creador">Creador</option>
                    <option value="Lector">Lector</option>
                  </Select>
                </InputGroup>
              </FormControl>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error:</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                disabled={!role} // Disable button if role is not selected
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={4}>
        Already have an account?{" "}
        <Link color="teal.500" onClick={handleLoginClick}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export { RegisterForm };
