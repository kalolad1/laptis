'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ACCESS_TOKEN } from '@/app/constants/local_storage'
import { PROVIDER_DASHBOARD_PATIENTS_TAB_PATH } from '@/app/constants/paths'

import { Container, Stack } from '@mantine/core'

import MainNavbar from '@/app/shared_components/navbar/home/HomeNavbar'

export default function HomeLayout ({ children }: { children: any }): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
      // TODO: Check if provider or center
      router.push(PROVIDER_DASHBOARD_PATIENTS_TAB_PATH)
    }
  }, [router])

  return (
    <Stack justify='flex-start' gap='lg'>
      <MainNavbar />
      <Container w="95%" size="xl" pb="xl">
        {children}
      </Container>
    </Stack>
  )
}
