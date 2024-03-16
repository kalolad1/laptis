'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

import { filterCenters } from '@/app/api/filter_centers'
import { type Center } from '@/app/constants/types'

import CenterCardsGrid from '@/app/components/centers/list_view/center_cards_grid'

export default function SuspenseWrapper (): JSX.Element {
  return (
    <Suspense>
      <FilteredCentersContent />
    </Suspense>
  )
}

function FilteredCentersContent (): JSX.Element {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') ?? ''
  const patientApplicationContextId = searchParams.get('patientApplicationContextId') ?? ''

  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    filterCenters(userId, patientApplicationContextId)
      .then(data => {
        setCenters(data)
      })
      .catch(error => { console.error('Error:', error) })
  }, [userId, patientApplicationContextId])

  return (
    <CenterCardsGrid centers={centers} userId={userId} patientApplicationContextId={patientApplicationContextId} />
  )
}
