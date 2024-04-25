import { useRouter } from 'next/navigation'
import { useForm } from '@mantine/form'

import { type PatientApplicationContext } from '@/app/constants/types'
import { createPatientApplicationContext } from '@/app/api/create_patient_application_context'
import { PROVIDER_DASHBOARD_FILTERED_CENTERS } from '@/app/constants/paths'

import { Modal, Select, Group, Stack } from '@mantine/core'

import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

interface PacModalProps {
  opened: boolean
  close: () => void
  userPatientId: string
}

export default function PacModal ({ opened, close, userPatientId }: PacModalProps): JSX.Element {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      hasHadSuicidalThoughtsInLast90Days: 'No',
      hasUsedDrugsInLast90Days: 'No'
    }
  })
  function handlePacModalSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const patientApplicationContext: PatientApplicationContext = {
      userPatientId,
      hasHadSuicidalThoughtsInLast90Days: form.values.hasHadSuicidalThoughtsInLast90Days === 'Yes',
      hasUsedDrugsInLast90Days: form.values.hasUsedDrugsInLast90Days === 'Yes'
    }
    createPatientApplicationContext(patientApplicationContext)
      .then(response => {
        const urlParams = new URLSearchParams({ userPatientId, patientApplicationContextId: response.patientApplicationContextId })
        const queryString = urlParams.toString()
        router.push(`${PROVIDER_DASHBOARD_FILTERED_CENTERS}?` + queryString)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function handleModalClose (): void {
    form.reset()
    close()
  }

  return (
    <Modal opened={opened} onClose={handleModalClose} title="Find a treatment center" size="lg" radius="lg" centered>
      <form onSubmit={handlePacModalSubmit}>
        <Stack p="lg">
          <Select
            label="Has this client had thoughts of suicide within the last 90 days?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            {...form.getInputProps('hasHadSuicidalThoughtsInLast90Days')}
          />

          <Select
            label="Has this client used drugs within the last 90 days?"
            placeholder="Pick value"
            data={['Yes', 'No']}
            {...form.getInputProps('hasUsedDrugsInLast90Days')}
          />

          <Group justify="center" mt="md">
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
