'use client'

import { Group, Flex, Button, ActionIcon, Tooltip } from '@mantine/core'
import { IconArrowGuide, IconHome, IconPillOff, IconReportMedical } from '@tabler/icons-react'

export default function SecondNavbar (): any {
  return (
    <Flex justify="space-between" px="md" pt="md">
      <Group gap="xl">
        <Tooltip label="Detox" position="bottom">
          <ActionIcon variant="subtle" color="black" size="xl">
            <IconPillOff />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Clinical Stabilization Services" position="bottom">
          <ActionIcon variant="subtle" color="black" size="xl">
            <IconReportMedical />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Transitional Stabilization Services" position="bottom">
          <ActionIcon variant="subtle" color="black" size="xl">
            <IconArrowGuide />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Residential" position="bottom">
          <ActionIcon variant="subtle" color="black" size="xl">
            <IconHome />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Group>
        <Button>
          Find for me
        </Button>
      </Group>
    </Flex>
  )
}
