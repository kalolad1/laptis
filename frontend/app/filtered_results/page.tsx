'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { filterCenters } from '@/app/api/filter_centers'

import MainNavbar from '@/app/navbar/main_navbar'
import CenterCardsGrid from '@/app/center_list_view/center_cards_grid'

export default function HomePageSuspenseWrapper (): any {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  )
}

function HomePage (): any {
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams)

  const [centers, setCenters] = useState([])

  useEffect(() => {
    filterCenters(params)
      .then(data => {
        setCenters(data)
      })
      .catch(error => { console.error('Error:', error) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
