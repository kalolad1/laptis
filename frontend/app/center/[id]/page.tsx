import { HeaderMegaMenu } from "@/app/components/home/top_navbar";
import { SecondNavbar } from "@/app/components/home/second_navbar";
import { Image, Text } from "@mantine/core";


export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
          <header>
            <HeaderMegaMenu />
          </header>
          <main>
            <h1>Detailed View</h1>
            <h1>Bay Cove Substance Abuse (NAME)</h1>
            <Image src="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80" height={180}></Image>

            <div>
              <Text>Clinical Stabilization Services Facility</Text>
              <Text>66 Canal St, Boston, MA 02114</Text>
              <Text>10 beds available • 120 beds total • 4.3 / 5 • 54 reviews</Text>
              <Text>Accessible, dog-friendly, waterfront A-line with breathtaking views only 50 ft from lake. Stepless entry/shower, elevator. Newly renovated & stylishly furnished w/ 4 bedrooms, 3 full bathrooms, hot tub, sauna, gourmet kitchen, 12 person custom dining table, coffee bar, fireplace, game room w/ billiards/foosball/arcade, many outdoor games, 3 outdoor decks, Big Green Egg grill, fire pit, fire table, hammocks, many types of boats, fishing poles, work desk, high speed WiFi, 5 Smart TV’s, EV charger.</Text>
            </div>
          </main>
        </>
      );
}