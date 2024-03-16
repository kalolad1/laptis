'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

import { filterCenters } from '@/app/api/filter_centers'

import CenterCardsGrid from '@/app/components/centers/list_view/center_cards_grid'
import MainNavbar from '@/app/components/navbar/main_navbar'
import { type Center } from '@/app/constants/types'

export default function HomePageSuspenseWrapper (): any {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  )
}

function HomePage (): any {
  const searchParams = useSearchParams()

  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    filterCenters(Object.fromEntries(searchParams))
      .then(data => {
        setCenters(data)
      })
      .catch(error => { console.error('Error:', error) })
  }, [searchParams])

  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>
        <CenterCardsGrid centers={centers} />
      </main>
    </>
  )
}
