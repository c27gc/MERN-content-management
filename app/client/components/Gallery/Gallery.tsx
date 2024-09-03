'use client'
import React from 'react';
import { useState } from 'react';
import { Box, Flex, Input, SimpleGrid, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Textarea, Alert, AlertIcon } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { GalleryCard } from './GalleryCard';
import { useTopic } from '@/providers/TopicProvider';
import withRoleComponentGuard from '@/hoc/withRoleComponentGuard';

const topicsData = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', topicName: 'Tema 1', contentCount: 10 },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', topicName: 'Tema 2', contentCount: 5 },
    // Otros temas...
];

export const Gallery = () => {
    const { createTopic, allowedContentTypes } = useTopic();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTopic, setNewTopic] = useState({ name: '', description: '', coverImage: '', allowedContentTypes: [] as string[] });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const filteredThemes = topicsData.filter((topic) =>
        topic.topicName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateTopic = async () => {
        try {
            setErrorMessage(null);
            await createTopic(newTopic.name, newTopic.description, newTopic.coverImage, newTopic.allowedContentTypes);
            setIsModalOpen(false);
        } catch (error) {
            //@ts-ignore
            setErrorMessage(error.message || 'Failed to create topic');
        }
    };

    // Crear el botón protegido
    const CreateTopicButton = withRoleComponentGuard(
        () => (
            <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
                Create New Topic
            </Button>
        ),
        ['admin']
    );

    return (
        <Box p={4} backgroundColor="gray.200">
            <Box mb={6}>
                <Heading size="xl" textAlign="center">
                    Find a topic
                </Heading>
            </Box>
            <Flex mb={6} gap={2} justify="center">
                <Input
                    placeholder="Find by topic name"
                    value={searchTerm}
                    backgroundColor={'white'}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CreateTopicButton />
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {filteredThemes.map((topic) => (
                    <GalleryCard
                        key={topic.id}
                        imageUrl={topic.imageUrl}
                        topicName={topic.topicName}
                        contentCount={topic.contentCount}
                    />
                ))}
            </SimpleGrid>

            {/* Modal para crear un nuevo topic */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a New Topic</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {errorMessage && (
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}
                        <FormControl mb={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Topic Name"
                                value={newTopic.name}
                                onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Topic Description"
                                value={newTopic.description}
                                onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Cover Image URL</FormLabel>
                            <Input
                                placeholder="https://example.com/image.jpg"
                                value={newTopic.coverImage}
                                onChange={(e) => setNewTopic({ ...newTopic, coverImage: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Allowed Content Types</FormLabel>
                            <Select
                                isMulti
                                options={allowedContentTypes.map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                                placeholder="Select content types"
                                closeMenuOnSelect={false}
                                value={newTopic.allowedContentTypes.map((type) => ({
                                    label: type,
                                    value: type,
                                }))}
                                onChange={(selectedOptions) =>
                                    setNewTopic({
                                        ...newTopic,
                                        allowedContentTypes: selectedOptions.map(option => option.value),
                                    })
                                }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleCreateTopic}>
                            Create Topic
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
