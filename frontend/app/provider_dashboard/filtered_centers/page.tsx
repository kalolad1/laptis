'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

import { filterCenters } from '@/app/api/filter_centers'

import CenterCardsGrid from '@/app/components/center_list_view/center_cards_grid'
import { type Center } from '@/app/constants/types'

export default function SuspenseWrapper (): JSX.Element {
  return (
    <Suspense>
      <FilteredCentersContent />
    </Suspense>
  )
}

function FilteredCentersContent (): JSX.Element {
  const searchParams = useSearchParams()

  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    const userId = searchParams.get('userId') ?? ''
    const patientApplicationContextId = searchParams.get('patientApplicationContextId') ?? ''

    filterCenters(userId, patientApplicationContextId)
      .then(data => {
        setCenters(data)
      })
      .catch(error => { console.error('Error:', error) })
  }, [searchParams])

  return (
      <CenterCardsGrid centers={centers} />
  )
}
