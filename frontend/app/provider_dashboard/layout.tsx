'use client'

import { useEffect, useState } from 'react'

import { getLoggedInUser } from '@/app/api/get_logged_in_user'
import { type User } from '@/app/constants/types'

import { Container, Stack } from '@mantine/core'

import Navbar from '@/app/shared_components/navbar/dashboard/DashboardNavbar'

export default function ProviderDashboardLayout ({ children }: { children: any }): JSX.Element {
  const [providerUser, setProviderUser] = useState<User | null>(null)

  useEffect(() => {
    getLoggedInUser()
      .then((providerUser) => {
        setProviderUser(providerUser)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  function getFullName (): string {
    if (providerUser !== null) {
      return `${providerUser.firstName} ${providerUser.lastName}`
    }
    return ''
  }

  return (
    <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
      <Navbar loggedInUserName={getFullName()} ></Navbar>
      <Container w="100%" size="xl" pb="xl">
        {children}
      </Container>
    </Stack>
  )
}
