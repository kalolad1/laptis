'use client'

import {
  Image,
  Group,
  Button,
  Flex,
  Title
} from '@mantine/core'
import { IconAdjustments } from '@tabler/icons-react'
import classes from './main_navbar.module.css'
import Link from 'next/link'

export default function MainNavbar (): any {
  return (
    <Flex className={classes.flex_container} justify="space-between" p="md">
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
        <Group>
          <Image
            src="/logo.svg"
            width={50}
            height={50}
          />
          <Title>Laptis</Title>
        </Group>
      </Link>
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
