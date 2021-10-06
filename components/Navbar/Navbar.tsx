import Image from 'next/image'
import { Container, Flex, Grid, List, ListItem } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'

export default function Navbar() {
  const bg = useColorModeValue(`gray.50`, `gray.700`)
  const src = useColorModeValue(
    `/nicarao-horizontal-light.png`,
    `/nicarao-horizontal.png`
  )

  return (
    <Flex as="nav" bg={bg} minH="4rem" w="full" alignItems="center">
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(2, 1fr)">
          <Flex>
            <Image src={src} alt="logo" width="180px" height="50px" />
          </Flex>

          <Flex justifyContent="end" alignItems="center">
            <List>
              <ListItem>Help Check</ListItem>
            </List>
          </Flex>
        </Grid>
      </Container>
    </Flex>
  )
}
