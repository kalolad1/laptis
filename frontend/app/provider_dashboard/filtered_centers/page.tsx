'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

import { filterCenters } from '@/app/api/filter_centers'
import { type Center } from '@/app/constants/types'

import CenterCardsGrid from '@/app/shared_components/centers/list_view/CenterCardsGrid'
import NoFilteredCentersPlaceholder from '@/app/shared_components/no_results_placeholders/NoFilteredCentersPlaceholder'

export default function SuspenseWrapper (): JSX.Element {
  return (
    <Suspense>
      <FilteredCentersContent />
    </Suspense>
  )
}

function FilteredCentersContent (): JSX.Element {
  const searchParams = useSearchParams()
  const userPatientId = searchParams.get('userPatientId') ?? ''
  const patientApplicationContextId = searchParams.get('patientApplicationContextId') ?? ''

  const [centers, setCenters] = useState<Center[]>([])
  const [hasCenters, setHasCenters] = useState<boolean>(true)

  useEffect(() => {
    filterCenters(userPatientId, patientApplicationContextId)
      .then(centers => {
        setCenters(centers)
        if (centers.length === 0) {
          setHasCenters(false)
        }
      })
      .catch(error => { console.error('Error:', error) })
  }, [userPatientId, patientApplicationContextId])

  return (
    <>
      {hasCenters
        ? (
          <CenterCardsGrid
            centers={centers}
            userPatientId={userPatientId}
            patientApplicationContextId={patientApplicationContextId}
          />
          )
        : (
          <NoFilteredCentersPlaceholder />
          )}
    </>
  )
}
