'use client'

import Link from 'next/link'
import { Group, Flex, Button, ActionIcon, Tooltip } from '@mantine/core'
import { IconAdjustments, IconArrowGuide, IconHome, IconPillOff, IconReportMedical } from '@tabler/icons-react'

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
        <Link href="/filter_questionnaire" passHref>
          <Button leftSection={<IconAdjustments size={14} />} variant="outline" color="black" size="md">
            Filters
          </Button>
        </Link>
      </Group>
    </Flex>
  )
}
