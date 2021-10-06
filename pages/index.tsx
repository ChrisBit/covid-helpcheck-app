import axios from 'axios'
import Link from 'next/link'
import useSWR from 'swr'
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/layout'

import { constants } from '../utils/constants'

import Layout from '../components/Layout/Layout'
import { Spinner } from '@chakra-ui/spinner'

import { useColorModeValue } from '@chakra-ui/color-mode'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function Home() {
  const { data, error } = useSWR(
    `${constants.API_ENDPOINT}/continents`,
    fetcher,
    { refreshInterval: 0 }
  )
  const hoverBg = useColorModeValue(`gray.200`, `gray.700`)
  const borderColor = useColorModeValue(`gray.200`, `gray.700`)

  console.log(data)

  return (
    <Layout>
      {!data ? (
        <Grid placeItems="center" minH="calc(100vh - 9rem)">
          <Spinner />
        </Grid>
      ) : (
        <Grid templateColumns={{ base: `1fr`, md: `140px 1fr` }} py={3}>
          <Flex as="aside" flexDir="column">
            <Heading as="h3" fontSize="lg" my={2}>
              Filter by continent
            </Heading>
            <List w="full">
              <ListItem
                cursor="pointer"
                p={2}
                _hover={{ bg: hoverBg, borderRadius: `md` }}
              >
                All
              </ListItem>
              {Object.keys(data)
                .sort()
                .map((key) => (
                  <ListItem
                    key={key}
                    cursor="pointer"
                    p={2}
                    _hover={{ bg: hoverBg, borderRadius: `md` }}
                  >
                    {key}
                  </ListItem>
                ))}
            </List>
          </Flex>

          <Box
            as="section"
            mx={10}
            p={10}
            h="calc(100vh - 9rem)"
            overflowY="auto"
          >
            {Object.values(data).map((continent: any, index) => (
              <Grid
                key={index}
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                gap={4}
              >
                {continent.map((country: any, index2: any) => (
                  <Link
                    href={`country/${country.country}`}
                    key={index2}
                    passHref
                  >
                    <Box
                      borderWidth="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      boxShadow="sm"
                      p={3}
                      transition={`all 0.3s`}
                      _hover={{
                        cursor: `pointer`,
                        boxShadow: `lg`,
                        transform: `scale(1.05)`,
                        zIndex: 4,
                      }}
                    >
                      <Heading as="h4" fontSize="lg">
                        {country.country}
                      </Heading>

                      <Divider my={3} />

                      <Badge fontSize="lg" colorScheme="green">
                        Cases
                      </Badge>
                      <Grid templateColumns="repeat(2, 1fr)">
                        {Object.keys(country.cases)
                          .filter((value) => [`new`, `active`].includes(value))
                          .map((value: any) => (
                            <Box key={value}>
                              <Text>{value}</Text>
                              <Text>
                                {country.cases[value]
                                  ? country.cases[value]
                                  : '0'}
                              </Text>
                            </Box>
                          ))}
                      </Grid>

                      <Badge fontSize="lg" colorScheme="green">
                        Death
                      </Badge>
                      <Grid templateColumns="repeat(2, 1fr)">
                        {Object.keys(country.deaths)
                          .filter((value) => [`new`, `total`].includes(value))
                          .map((value: any) => (
                            <Box key={value}>
                              <Text>{value}</Text>
                              <Text>
                                {country.deaths[value]
                                  ? country.deaths[value]
                                  : '0'}
                              </Text>
                            </Box>
                          ))}
                      </Grid>
                    </Box>
                  </Link>
                ))}
              </Grid>
            ))}
          </Box>
        </Grid>
      )}
    </Layout>
  )
}
