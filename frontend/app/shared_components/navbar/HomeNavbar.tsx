'use client'

import Link from 'next/link'

import { Image, Group, Flex, Title } from '@mantine/core'

import classes from './HomeNavbar.module.css'

export default function HomeNavbar (): JSX.Element {
  return (
    <Flex className={classes.flex_container} justify="space-between" p="md">
      <Link href="/home/centers" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
        <Group>
          <Image
            src="/logo.svg"
            width={50}
            height={50}
          />
          <Title>Laptis</Title>
        </Group>
      </Link>
    </Flex>
  )
}
