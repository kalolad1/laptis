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
        <LogInSignUpButtons />
      </Group>
    </Flex>
  )
}

function LogInSignUpButtons (): JSX.Element {
  return (
    <>
      <LogInButton />
      <SignUpButton />
    </>
  )
}

function LogInButton (): JSX.Element {
  return (
    <Link href="/home/login" passHref>
      <Button variant="outline" color="black" size="md">
        Log in
      </Button>
    </Link>
  )
}

function SignUpButton (): JSX.Element {
  return (
    <Link href="/home/signup" passHref>
      <Button variant="filled" color="black" size="md">
        Sign up
      </Button>
    </Link>
  )
}
