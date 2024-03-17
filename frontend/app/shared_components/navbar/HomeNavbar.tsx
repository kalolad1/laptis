'use client'

import Link from 'next/link'

import { Image, Group, Button, Flex, Title } from '@mantine/core'

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
      <Group>
        <Link href="/home/login" passHref>
          <Button variant="outline" color="black" size="md">
            Login
          </Button>
        </Link>
        <Link href="/home/signup" passHref>
          <Button variant="filled" color="black" size="md">
            Signup
          </Button>
        </Link>
      </Group>
    </Flex>
  )
}
