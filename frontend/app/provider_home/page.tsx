import { Group } from '@mantine/core'

import MainContent from '@/app/provider_home/MainContent'
import Sidebar from '@/app/provider_home/Sidebar'

export default function ProviderDashboard (): JSX.Element {
  return (
    <Group>
      <Sidebar></Sidebar>
      <MainContent></MainContent>
    </Group>
  )
}
