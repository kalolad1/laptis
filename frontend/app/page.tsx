import { MainNavbar } from '@/app/components/home/main_navbar'
import { SecondNavbar } from '@/app/components/home/second_navbar'
import { MainContent } from './components/home/main_content'

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
