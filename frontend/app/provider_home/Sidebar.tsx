import { Stack } from '@mantine/core'

export default function Sidebar (): JSX.Element {
  return (
    <Stack>
      {/* <Logo></Logo> */}
      <Tabs></Tabs>
    </Stack>
  )
}

function Tabs (): JSX.Element {
  return (
    <div>
      <ul>
        <li>Dashboard</li>
        <li>Centers</li>
        <li>Profile</li>
      </ul>
    </div>
  )
}
