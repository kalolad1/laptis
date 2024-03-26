'use client'

import Link from 'next/link'

import { Center, Image } from '@mantine/core'
import { IconUsers, IconLogout } from '@tabler/icons-react'

import classes from './Sidebar.module.css'

const tabs = [
  { link: 'patients', label: 'Patients', icon: <IconUsers /> }
]

export default function Sidebar (): JSX.Element {
  const links = tabs.map((item) => (
    <Link href={item.link} className={classes.link} key={item.label}>
      {item.label}
    </Link>
  ))

  return (
    <nav className={classes.navbar}>
      <Center>
        <Link href="/home/centers" style={{ textDecoration: 'none', color: 'inherit' }} passHref>
          <Image
            src="/logo.svg"
            w="auto"
            fit="contain"
            height={75}
          />
        </Link>
      </Center>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => { event.preventDefault() }}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
