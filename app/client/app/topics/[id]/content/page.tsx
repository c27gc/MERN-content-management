'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Flex,
  Input,
  Select,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ContentModal } from '../../../../components/ContentModel';

type ContentDataType = {
  id: number;
  type: string;
  content: string;
};

const contentData: ContentDataType[] = [
  { id: 1, type: 'Article', content: 'Content 1 for this topic' },
  { id: 2, type: 'Video', content: 'Content 2 for this topic' },
  { id: 3, type: 'Podcast', content: 'Content 3 for this topic' },
];

const contentTypes = ['Article', 'Video', 'Podcast'];

const ThemeContentPage = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState<ContentDataType | null>(null);

  const filteredContent = contentData.filter(
    (content) =>
      content.type.includes(filterType) &&
      content.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContentClick = (content: ContentDataType) => {
    setSelectedContent(content);
    onOpen();
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="flex-start"
      alignItems="center"
      p={4}
    >
      <Box width="full" maxWidth="900px" p={4} backgroundColor="white" borderRadius="md">
        <VStack spacing={4} mb={6} align="stretch">
          <Box>
            <Heading size="lg" textAlign="center">
              Tema {id} - Nombre del Tema
            </Heading>
          </Box>
          <Box>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
              alt="Imagen del Tema"
              borderRadius="lg"
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </Box>
        </VStack>
        <Box mb={4}>
          <Input
            placeholder="Buscar por contenido"
            mb={4}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            backgroundColor="white"
          />
          <Select
            placeholder="Filtrar por tipo"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            backgroundColor="white"
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filteredContent.map((content) => (
            <Box
              key={content.id}
              p={4}
              backgroundColor="gray.100"
              borderRadius="md"
              onClick={() => handleContentClick(content)}
              cursor="pointer"
            >
              <Text fontSize="md">{content.content}</Text>
              <Text fontSize="sm" color="gray.600">
                {content.type}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      {selectedContent && (
        <ContentModal
          isOpen={isOpen}
          onClose={onClose}
          content={selectedContent.content}
          type={selectedContent.type}
        />
      )}
    </Flex>
  );
};

export default ThemeContentPage;
