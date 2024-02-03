'use client'

import { useState, useEffect } from 'react'
import { getCenters } from '@/app/api/get_centers'

import MainNavbar from '@/app/navbar/main_navbar'
import SecondNavbar from '@/app/navbar/second_navbar'
import CenterCardsGrid from './home/center_cards_grid'

export default function HomePage (): any {
  const [centers, setCenters] = useState([])

  useEffect(() => {
    getCenters()
      .then(data => { setCenters(data) })
      .catch(error => { error('Error:', error) })
  }, [])

  return (

    <>
      <header>
        <MainNavbar/>
        <SecondNavbar/>
      </header>
      <main>
        <CenterCardsGrid centers={centers}/>
      </main>
    </>
  )
}
