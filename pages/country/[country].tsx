import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Badge, Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/layout'
import days from 'dayjs'

import Layout from '../../components/Layout/Layout'
import { fetcher } from '../../utils/fetcher'
import { constants } from '../../utils/constants'
import { Spinner } from '@chakra-ui/spinner'

export default function Country() {
  const router = useRouter()
  const { country } = router.query

  const { data } = useSWR(
    `${constants.API_ENDPOINT}/countries/${country}`,
    fetcher,
    { refreshInterval: 0 }
  )

  return (
    <Layout>
      {!data ? (
        <Grid placeItems="center" minH="calc(100vh - 9rem)">
          <Spinner />
        </Grid>
      ) : (
        <Flex flexDir="column" overflowY="scroll" h="calc(100vh - 9rem)">
          <Heading textTransform="uppercase">{country}</Heading>

          <Stack spacing={4}>
            {Object.values(data)
              .sort(
                (a: any, b: any) =>
                  new Date(a.time).getTime() - new Date(b.time).getTime()
              )
              .map((result: any, index) => (
                <Stack key={index} spacing={5} borderWidth={1} p={6}>
                  <Box>
                    <Text fontSize="lg">Time</Text>
                    <Badge fontSize="md">
                      {days(result.time).format(`YYYY-MM-DD hh:mm A UTCZ`)}
                    </Badge>
                  </Box>

                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      Cases
                    </Text>
                    {Object.entries(result.cases).map(([key, value]: any) => (
                      <Box key={key}>
                        <Text fontWeight="semibold">{key}</Text>
                        <Text fontSize="lg">{value ? value : `0`}</Text>
                      </Box>
                    ))}
                  </Box>

                  <Box>
                    <Text fontSize="lg" fontWeight="bold">
                      Deaths
                    </Text>
                    {Object.entries(result.deaths).map(([key, value]: any) => (
                      <Box key={key}>
                        <Text fontWeight="semibold">{key}</Text>
                        <Text fontSize="lg">{value ? value : `0`}</Text>
                      </Box>
                    ))}
                  </Box>
                </Stack>
              ))}
          </Stack>
        </Flex>
      )}
    </Layout>
  )
}
