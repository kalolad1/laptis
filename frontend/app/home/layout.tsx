'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ACCESS_TOKEN } from '@/app/constants/local_storage'

import MainNavbar from '@/app/shared_components/navbar/home/HomeNavbar'

export default function HomeLayout ({ children }: { children: any }): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
      // TODO: Check if provider or center
      router.push('/provider_dashboard/patients')
    }
  }, [router])

  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>{children}</main>
    </>
  )
}
