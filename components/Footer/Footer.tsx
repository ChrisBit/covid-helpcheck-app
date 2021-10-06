import { Box, Container } from '@chakra-ui/layout'

export default function Footer() {
  return (
    <Container
      as="footer"
      maxW="container.xl"
      d="flex"
      justifyContent="center"
      alignItems="center"
      minH="5rem"
    >
      <Box>Nicarao Agency | {new Date().getFullYear()}</Box>
    </Container>
  )
}
