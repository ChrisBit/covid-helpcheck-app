import Link from 'next/link'
import useSWR from 'swr'
import { useCallback, useState } from 'react'
import {
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/layout'

import { constants } from '../utils/constants'

import Layout from '../components/Layout/Layout'
import { Spinner } from '@chakra-ui/spinner'

import { useColorModeValue } from '@chakra-ui/color-mode'
import { fetcher } from '../utils/fetcher'
import { Radio, RadioGroup } from '@chakra-ui/radio'

export default function Home() {
  const { data } = useSWR(`${constants.API_ENDPOINT}/continents`, fetcher, {
    refreshInterval: 0,
  })
  const [filterValue, setFilterValue] = useState(`all`)
  const hoverBg = useColorModeValue(`gray.200`, `gray.700`)
  const borderColor = useColorModeValue(`gray.200`, `gray.700`)

  const filteredContinent = useCallback(() => {
    if (!data) {
      return []
    }

    if (filterValue === `all`) {
      return Object.entries(data)
    }

    return Object.entries(data).filter(([key]: any) => key === filterValue)
  }, [filterValue, data])

  function handleChange(value: string) {
    setFilterValue(value)
  }

  return (
    <Layout>
      {!data ? (
        <Grid placeItems="center" minH="calc(100vh - 9rem)">
          <Spinner />
        </Grid>
      ) : (
        <Grid templateColumns={{ base: `1fr`, md: `240px 1fr` }} py={3}>
          <Flex as="aside" flexDir="column">
            <Heading as="h3" fontSize="lg" my={2}>
              Filter by continent
            </Heading>
            <RadioGroup
              defaultValue="all"
              onChange={handleChange}
              value={filterValue}
            >
              <Stack>
                <Radio
                  value="all"
                  cursor="pointer"
                  p={2}
                  _hover={{ bg: hoverBg, borderRadius: `md` }}
                >
                  All
                </Radio>
                {Object.keys(data)
                  .sort()
                  .map((key) => (
                    <Radio
                      value={key}
                      key={key}
                      cursor="pointer"
                      p={2}
                      _hover={{ bg: hoverBg, borderRadius: `md` }}
                    >
                      {key}
                    </Radio>
                  ))}
              </Stack>
            </RadioGroup>
          </Flex>

          <Box as="section" p={10} h="calc(100vh - 9rem)" overflowY="auto">
            {filteredContinent().map(([key, continent]: any) => (
              <>
                <Heading key={`${key}-continent`} my={3}>
                  {key}
                </Heading>
                <Grid
                  key={key}
                  templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                  gap={4}
                >
                  {continent.map((country: any, index2: any) => (
                    <Link
                      href={`country/${country.country.toLowerCase()}`}
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
                            .filter((value) =>
                              [`new`, `active`].includes(value)
                            )
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

                        <Badge fontSize="lg" colorScheme="red">
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
              </>
            ))}
          </Box>
        </Grid>
      )}
    </Layout>
  )
}
