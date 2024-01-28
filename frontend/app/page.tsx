import { MainNavbar } from '@/app/navbar/main_navbar'
import { SecondNavbar } from '@/app/navbar/second_navbar'
import { MainContent } from './home/main_content'

export default function HomePage (): any {
  return (
    <>
      <header>
        <MainNavbar />
        <SecondNavbar />
      </header>
      <main>
        <MainContent />
      </main>
    </>
  )
}
