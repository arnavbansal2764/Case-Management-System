import Dashboard from '@/components/dashboard'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Advocate Client Management</h1>
          <Image src="/law-symbol.png" alt="Law Symbol" width={80} height={80} className="rounded-full" />
        </div>
        <Dashboard />
      </div>
    </main>
  )
}