import { HeaderMegaMenu } from "@/app/components/home/top_navbar";
import { SecondNavbar } from "@/app/components/home/second_navbar";
import { MainContent } from "./components/home/main_content";

export default function HomePage() {
  return (
    <>
      <header>
        <HeaderMegaMenu />
        <SecondNavbar />
      </header>
      <main>
        <MainContent />
      </main>
    </>
  );
}
