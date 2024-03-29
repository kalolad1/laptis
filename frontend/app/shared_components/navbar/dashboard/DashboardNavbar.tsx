import Link from 'next/link'

import { ActionIcon, Button, Group, Image, Menu } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons-react'

import { logOutUser } from '@/app/api/log_out'
import { PROVIDER_DASHBOARD_PATIENTS_TAB_PATH } from '@/app/constants/paths'

import baseClasses from '@/app/base.module.css'
import classes from '@/app/shared_components/navbar/dashboard/DashboardNavbar.module.css'

export default function DashboardNavbar (): JSX.Element {
  function handleLogOutButtonClick (event: React.MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault()
    void logOutUser()
  }

  return (
    <Group justify='space-between' bg="white" py="md" px="xl" className={classes.navbar}>
      <Group gap="xl">
        <Link href={PROVIDER_DASHBOARD_PATIENTS_TAB_PATH} style={{ textDecoration: 'none', color: 'inherit' }} passHref>
          <Image
            src="/logo.svg"
            w="auto"
            fit="contain"
            height={50}
          />
        </Link>

        <Button component={Link} href={PROVIDER_DASHBOARD_PATIENTS_TAB_PATH} className={baseClasses.normal_text} variant='subtle'>
          Patients
        </Button>
      </Group>
      <Group>
        <Menu trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <ActionIcon variant="transparent">
              <IconUserCircle size={48} color='black' />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component='a' onClick={handleLogOutButtonClick}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group >
  )
}
