'use client'

import { useEffect, useState } from 'react'

import { getLoggedInUser } from '@/app/api/get_logged_in_user'
import { type User } from '@/app/constants/types'

import { Grid, Stack } from '@mantine/core'

import Sidebar from '@/app/shared_components/sidebar/Sidebar'
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

  return (
    <Grid gutter={0}>
      <Grid.Col span={3}>
        <Sidebar></Sidebar>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
          <Navbar loggedInUserName={`${providerUser?.firstName} ${providerUser?.lastName}`} ></Navbar>
          {children}
        </Stack>
      </Grid.Col>
    </Grid >
  )
}
