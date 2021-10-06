import { Box, Container } from '@chakra-ui/layout'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <Container
        as="main"
        h="calc(100vh - 9rem)"
        maxW="container.xl"
        overflow="hidden"
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}
