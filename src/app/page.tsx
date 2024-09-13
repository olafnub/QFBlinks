import { GlobeDemo } from "../components/globe"
import Link from "next/link"
import FadeIn from "../components/FadeIn"
import "./globals.css"

export default function Home() {
  return (
    <main className="flex flex-col">
      <GlobeDemo />
      <FadeIn>
        <h2 className="text-center text-2xl">3 Tracks</h2>
        <div className="flex items-center justify-center p-6 bg-gray-100 mb-3 mt-2">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Contributing towards</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-left font-semibold">Link</th>
              </tr>
            </thead>
            <tbody className="text-black">
              <tr className="border-b">
                <td className="px-6 py-4">Individuals</td>
                <td className="px-6 py-4">
                  Dedicated to helping those who need a hand up. Whether it&#39;s supporting someone&#39;s education, covering unexpected medical expenses, or simply helping them get back on their feet, your donations can make a life-changing difference. By contributing to this track you will impact 3 individuals directly.
                </td>
                <td className="px-6 py-4 text-blue-500 hover:underline"><Link href="https://www.gofundme.com/">https://www.gofundme.com/</Link></td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-6 py-4">Causes</td>
                <td className="px-6 py-4">
                  Focuses on supporting a variety of important social, environmental, and humanitarian causes. From funding clean water initiatives and climate action projects to supporting mental health programs and disaster relief efforts, this track allows you to directly impact the issues you care about most.
                </td>
                <td className="px-6 py-4 text-blue-500 hover:underline"><Link href="https://www.globalgiving.org/">https://www.globalgiving.org/</Link></td>
              </tr>
              <tr>
                <td className="px-6 py-4">Animals</td>
                <td className="px-6 py-4">
                  Helping of our furry friends. By donating to this track, you&#39;ll provide essential resources to animal shelters, helping them care for abandoned, abused, and homeless animals. Your contributions will ensure these animals receive the medical care, food.
                </td>
                <td className="px-6 py-4 text-blue-500 hover:underline"><Link href="https://www.gofundme.com/f/help-mulwera-animal-shelter?qid=3883543730ec6afb982c3083d614f102">https://www.gofundme.com/f/help-mulwera-animal-shelter</Link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeIn>
      
      <section className="split-screen">
        <div className="text-center">
          <h2 className="text-2xl"> Contribute to all or donate to one</h2>
          <p className="text-sm">Note: please understand what <Link className="text-rose-400 hover:underline" href="https://www.wtfisqf.com/">QF</Link> is to fully maximize on the impact when choosing below</p>
        </div>
        <div className="flex flex-1">
          <Link className="cool-button" href="/match-funds">
            <button>Match Funds</button>
          </Link>
            
          <Link className="cool-button" href="/individual">
            <button>Individual donator</button>
          </Link>
        </div>
      </section>
      <footer>
        <div>
          Contact: li002488@umn.edu
        </div>
      </footer>
    </main>
  );
}

