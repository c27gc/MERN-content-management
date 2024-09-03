'use client';

import { Box, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, Card, CardBody, CardFooter } from '@chakra-ui/react';

interface GalleryCardProps {
  imageUrl: string;
  topicName: string;
  contentCount: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ imageUrl, topicName, contentCount }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={imageUrl} alt={topicName} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{topicName}</Heading>
          <Text>Este tema incluye {contentCount} contenidos.</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Ver más
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
