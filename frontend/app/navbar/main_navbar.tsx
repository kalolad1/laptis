'use client'

import {
  Image,
  Group,
  Button,
  Flex
} from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'
import classes from './main_navbar.module.css'
import Link from 'next/link'

export default function MainNavbar (): any {
  return (
    <Flex className={classes.flex_container} justify="space-between" p="md">
      <Group>
        <Image
          src="/logo.png"
          width={40}
          height={40}
        />
      </Group>
      <Group>
        <Link href="/filter_questionnaire" passHref>
          <Button leftSection={<IconAdjustments size={14} />} variant="outline" color="black" size="md">
            Filter
          </Button>
        </Link>
      </Group>
    </Flex>
  )
}
