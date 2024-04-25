import { useForm } from '@mantine/form'

import { createPatient } from '@/app/api/create_patient'
import { type NewPatientInfo } from '@/app/constants/types'

import { Modal, Group, TextInput, NumberInput } from '@mantine/core'

import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

import baseClasses from '@/app/base.module.css'

interface NewPatientModalProps {
  opened: boolean
  close: () => void
  callGetPatients: () => void
}

export default function NewPatientModal ({ opened, close, callGetPatients }: NewPatientModalProps): JSX.Element {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      age: 25
    }
  })
  function handleNewPatientModalSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const newPatientInfo: NewPatientInfo = form.values
    createPatient(newPatientInfo)
      .then(response => {
        console.log(response)
        callGetPatients()
        close()
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
    <Modal opened={opened} onClose={handleModalClose} title="Find a treatment center" centered>
      <form onSubmit={handleNewPatientModalSubmit}>
        <TextInput
          className={baseClasses.normal_text}
          label="First name"
          placeholder="John"
          required
          {...form.getInputProps('firstName')}
        />
        <TextInput
          className={baseClasses.normal_text}
          label="Last name"
          placeholder="Doe"
          required
          {...form.getInputProps('lastName')}
        />
        <NumberInput
          className={baseClasses.normal_text}
          label="Age"
          placeholder="25"
          required
          {...form.getInputProps('age')}
        />

        <Group justify="flex-end" mt="md">
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </Group>
      </form>
    </Modal>
  )
}
