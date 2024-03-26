'use client'

import { useRouter } from 'next/navigation'
import { useForm } from '@mantine/form'

import { signUpProvider } from '@/app/api/sign_up_provider'
import { PROVIDER_DASHBOARD_PATIENT_TAB_PATH } from '@/app/constants/paths'

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button
} from '@mantine/core'

export default function SignupPage (): JSX.Element {
  const form = useForm({ initialValues: { email: '', password: '' } })
  const router = useRouter()

  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    signUpProvider(form.values.email, form.values.password)
      .then((response) => {
        router.push(PROVIDER_DASHBOARD_PATIENT_TAB_PATH)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Container size={420} my={40}>
      <form onSubmit={handleSubmit}>
        <Title ta="center">
          Welcome!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component="button">
            Log in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required mt="md"
            {...form.getInputProps('password')}
          />
          <Button type="submit" fullWidth mt="xl">
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
