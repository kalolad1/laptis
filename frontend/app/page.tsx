'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { HOME_CENTERS_PATH } from './constants/paths'

export default function Page (): JSX.Element {
  // Redirect to home centers.
  const router = useRouter()

  useEffect(() => {
    router.replace(HOME_CENTERS_PATH)
  }, [router])

  return (
    <>
    </>
  )
}
