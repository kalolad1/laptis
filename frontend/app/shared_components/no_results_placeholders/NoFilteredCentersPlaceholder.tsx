'use client'

import { Stack, Title, Text } from '@mantine/core'
import { IconPackages } from '@tabler/icons-react'

export default function NoFilteredCentersPlaceholder (): JSX.Element {
  return (
    <Stack align='center'>
      <IconPackages />
      <Title>No centers found.</Title>
      <Text>There are no centers that meet your clients criteria.</Text>
    </Stack>
  )
}
