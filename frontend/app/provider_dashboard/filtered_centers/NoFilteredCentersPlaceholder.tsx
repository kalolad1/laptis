import { Stack, Title, Text, Paper } from '@mantine/core'
import { IconPackages } from '@tabler/icons-react'

export default function NoFilteredCentersPlaceholder (): JSX.Element {
  return (
    <Paper shadow="xs" radius="lg" p="xl">
      <Stack align='center'>
        <IconPackages size={75} />
        <Title>No centers found.</Title>
        <Text ta='center'>There are no centers that meet your clients criteria.</Text>
      </Stack>
    </Paper>
  )
}
