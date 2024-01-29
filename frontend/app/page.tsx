import { MainNavbar } from '@/app/navbar/main_navbar'
import { SecondNavbar } from '@/app/navbar/second_navbar'
import { CenterCardsGrid } from './home/center_cards_grid'

const MOCK_CENTERS_DATA = [
  {
    id: '1234',
    title: 'Bay Cove Substance Abuse Center',
    location: '66 Canal St, Boston, MA 02114',
    centerType: 'Clinical Stabilization Services',
    imageUrl: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '1234',
    title: 'Bay Cove Substance Abuse Center',
    location: '66 Canal St, Boston, MA 02114',
    centerType: 'Clinical Stabilization Services',
    imageUrl: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
  }
]

export default function HomePage (): any {
  return (
    <>
      <header>
        <MainNavbar/>
        <SecondNavbar/>
      </header>
      <main>
        <CenterCardsGrid centers={MOCK_CENTERS_DATA}/>
      </main>
    </>
  )
}
