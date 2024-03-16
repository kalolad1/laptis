import CenterDetailView from '@/app/components/centers/detail_view/CenterDetailView'

export default function CenterDetailViewPage ({ params }: { params: { id: string } }): JSX.Element {
  return (
    <CenterDetailView centerId={params.id} />
  )
}
