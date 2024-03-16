'use client'

import { useState, useEffect } from 'react'

import { getCenters } from '@/app/api/get_centers'
import { type Center } from '@/app/constants/types'

import CenterCardsGrid from '@/app/components/centers/list_view/center_cards_grid'
import MainNavbar from '@/app/components/navbar/main_navbar'

export default function HomePage (): JSX.Element {
  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    getCenters()
      .then(data => { setCenters(data) })
      .catch(error => { console.error('Error:', error) })
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
