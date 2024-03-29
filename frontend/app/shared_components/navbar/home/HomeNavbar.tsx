'use client'

import Link from 'next/link'

import { HOME_CENTERS_PATH, LOGIN_PATH, SIGNUP_PATH } from '@/app/constants/paths'

import { Image, Group, Button, Flex, Text } from '@mantine/core'

import baseClasses from '@/app/base.module.css'
import classes from '@/app/shared_components/navbar/home/HomeNavbar.module.css'

export default function HomeNavbar (): JSX.Element {
  return (
    <Flex className={classes.navbar} justify="space-between" p="md" px="xl" bg="white">
      <Link href={HOME_CENTERS_PATH} style={{ textDecoration: 'none', color: 'inherit' }} passHref>
        <Group>
          <Image
            src="/logo.svg"
            width={50}
            height={50}
          />
          <Text className={baseClasses.title_main}>Laptis</Text>
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
    <Link href={LOGIN_PATH} passHref>
      <Button className={baseClasses.normal_text} variant="outline" color="black" size="md">
        Log in
      </Button>
    </Link>
  )
}

function SignUpButton (): JSX.Element {
  return (
    <Link href={SIGNUP_PATH} passHref>
      <Button variant="filled" color="black" size="md">
        Sign up
      </Button>
    </Link>
  )
}
