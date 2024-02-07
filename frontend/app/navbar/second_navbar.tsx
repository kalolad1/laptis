'use client'

import { useDisclosure } from '@mantine/hooks'

import { Group, Flex, Button, ActionIcon, Tooltip, Modal } from '@mantine/core'
import { IconAdjustments, IconArrowGuide, IconHome, IconPillOff, IconReportMedical } from '@tabler/icons-react'

import FilterQuestionnaire from '../filter_questionnaire/filter_questionnaire'

export default function SecondNavbar (): any {
  const [opened, { open, close }] = useDisclosure(false)

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
        <Modal opened={opened} onClose={close} title="Filters" centered>
          <FilterQuestionnaire />
        </Modal>
        <Button leftSection={<IconAdjustments size={14} />} variant="outline" color="black" size="md" onClick={open}>
          Filters
        </Button>
      </Group>
    </Flex>
  )
}
