import MainNavbar from '@/app/shared_components/navbar/home/HomeNavbar'

export default function HomeLayout ({ children }: { children: any }): JSX.Element {
  return (
    <>
      <header>
        <MainNavbar />
      </header>
      <main>{children}</main>
    </>
  )
}
