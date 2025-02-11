'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { filterCenters } from '@/app/api/filter_centers'
import { type Center } from '@/app/constants/types'

import { Flex, Stack, Text } from '@mantine/core'
import CenterCardsGrid from '@/app/shared_components/centers/list_view/CenterCardsGrid'
import NoFilteredCentersPlaceholder from '@/app/provider_dashboard/filtered_centers/NoFilteredCentersPlaceholder'

import baseClasses from '@/app/base.module.css'

export default function FilteredCentersPage (): JSX.Element {
  return (
    <FilteredCentersContent />
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
          <Stack>
            <Flex ml="xs">
              <CenterResultsCountTitle count={centers.length} />
            </Flex>
            <CenterCardsGrid
              centers={centers}
              userPatientId={userPatientId}
              patientApplicationContextId={patientApplicationContextId}
            />
          </Stack>
          )
        : (
          <NoFilteredCentersPlaceholder />
          )}
    </>
  )
}

function CenterResultsCountTitle ({ count }: { count: number }): JSX.Element {
  return (
    <>
      {count === 1
        ? (
          <Text className={baseClasses.normal_text}>Found {count} center that meets your client&apos;s criteria.</Text>
          )
        : (
          <Text className={baseClasses.normal_text}>Found {count} centers that meet your client&apos;s criteria.</Text>
          )}
    </>
  )
}
