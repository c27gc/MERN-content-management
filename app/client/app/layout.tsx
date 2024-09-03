import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/providers/AuthProvider'; // Asegúrate de que la ruta es correcta
import { TopicProvider } from '@/providers/TopicProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#E2E8F0"}}>
        <ChakraProvider>
        <TopicProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          </TopicProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
