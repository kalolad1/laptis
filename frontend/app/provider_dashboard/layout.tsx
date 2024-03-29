import { Container, Stack } from '@mantine/core'

import Navbar from '@/app/shared_components/navbar/dashboard/DashboardNavbar'

export default function ProviderDashboardLayout ({ children }: { children: any }): JSX.Element {
  return (
    <Stack justify='flex-start' gap='lg' style={{ height: '100vh' }}>
      <Navbar></Navbar>
      <Container w="95%" size="xl" pb="xl">
        {children}
      </Container>
    </Stack>
  )
}
