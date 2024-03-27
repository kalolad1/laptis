'use client'

import { useState, useEffect } from 'react'

import { getCenters } from '@/app/api/get_centers'
import { type Center } from '@/app/constants/types'

import CenterCardsGrid from '@/app/shared_components/centers/list_view/CenterCardsGrid'

export default function Home (): JSX.Element {
  const [centers, setCenters] = useState<Center[]>([])

  useEffect(() => {
    getCenters()
      .then(data => { setCenters(data) })
      .catch(error => { console.error('Error:', error) })
  }, [])

  return (
    <CenterCardsGrid centers={centers} userPatientId={''} patientApplicationContextId={''} />
  )
}
