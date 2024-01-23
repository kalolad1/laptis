import { HeaderMegaMenu } from "@/app/components/home/top_navbar";
import { SecondNavbar } from "@/app/components/home/second_navbar";


export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
          <header>
            <HeaderMegaMenu />
          </header>
          <main>
            <h1>Detailed View</h1>
          </main>
        </>
      );
}