import PrimaryButton from '@/app/shared_components/buttons/PrimaryButton'

export default function NewPatientButton ({ handleNewPatientButtonClick }: any): JSX.Element {
  return (
    <PrimaryButton onClick={handleNewPatientButtonClick}>
      New Patient
    </PrimaryButton>
  )
}
