'use client'

import { Group, Flex, Button } from '@mantine/core'
import { IconHome } from '@tabler/icons-react'

// const links = [
//   { link: '/detox', label: 'Detox' },
//   { link: '/css', label: 'Clinical Stabilization Services' },
//   { link: '/tss', label: 'Transitional Support Services' },
//   { link: '/residential', label: 'Residential' }
// ]
export default function SecondNavbar (): any {
  return (
    <Flex justify="space-between" px="md" pt="md">
      <Group gap="xl">
        <IconHome />
        <IconHome />
        <IconHome />
        <IconHome />
      </Group>
      <Group>
        <Button>
          Find for me
        </Button>
      </Group>
    </Flex>
  )
}
