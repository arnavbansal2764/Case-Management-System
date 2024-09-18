'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Briefcase, DollarSign } from 'lucide-react'

export default function Dashboard() {
  const [clients, setClients] = useState([])
  const [cases, setCases] = useState([])
  const [finances, setFinances] = useState([])
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '' })
  const [newFinance, setNewFinance] = useState({ amount: '', description: '', type: 'Income', caseId: '' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const clientsRes = await fetch('/api/clients')
    const casesRes = await fetch('/api/cases')
    const financesRes = await fetch('/api/finances')

    setClients(await clientsRes.json())
    setCases(await casesRes.json())
    setFinances(await financesRes.json())
  }

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient),
    })
    setNewClient({ name: '', email: '', phone: '' })
    fetchData()
  }

  const handleAddFinance = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/finances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newFinance,
        amount: parseFloat(newFinance.amount)
      }),
    })
    setNewFinance({ amount: '', description: '', type: 'Income', caseId: '' })
    fetchData()
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {clients.map((client: any) => (
                <li key={client.id} className="text-sm bg-blue-50 p-2 rounded">{client.name}</li>
              ))}
            </ul>
            <form onSubmit={handleAddClient} className="space-y-3">
              <Input
                type="text"
                placeholder="Name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="border-blue-300 text-black focus:ring-blue-500"
              />
              <Input
                type="email"
                placeholder="Email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                className="border-blue-300 text-black focus:ring-blue-500"
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                className="border-blue-300 text-black focus:ring-blue-500"
              />
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 transition-colors">
                Add Client
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Gavel className="mr-2" />
              Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {cases.map((case_: any) => (
                <li key={case_.id} className="text-sm bg-green-50 p-2 rounded">
                  <strong>{case_.title}</strong>
                  <p className="text-xs text-gray-600">{case_.description}</p>
                  <p className="text-xs text-gray-500">Status: {case_.status}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" />
              Finances
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="space-y-2 mb-4 max-h-40 overflow-y-auto">
              {finances.map((finance: any) => (
                <li key={finance.id} className="text-sm bg-yellow-50 p-2 rounded flex justify-between">
                  <span>{finance.description}</span>
                  <span className={`font-semibold ${finance.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                    {finance.type === 'Income' ? '+' : '-'}${finance.amount}
                  </span>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddFinance} className="space-y-3">
              <Input
                type="number"
                placeholder="Amount"
                value={newFinance.amount}
                onChange={(e) => setNewFinance({ ...newFinance, amount: e.target.value })}
                className="border-yellow-300 focus:ring-yellow-500"
              />
              <Input
                type="text"
                placeholder="Description"
                value={newFinance.description}
                onChange={(e) => setNewFinance({ ...newFinance, description: e.target.value })}
                className="border-yellow-300 focus:ring-yellow-500"
              />
              <select
                value={newFinance.type}
                onChange={(e) => setNewFinance({ ...newFinance, type: e.target.value })}
                className="w-full border-yellow-300 focus:ring-yellow-500 rounded-md"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <select
                value={newFinance.caseId}
                onChange={(e) => setNewFinance({ ...newFinance, caseId: e.target.value })}
                className="w-full border-yellow-300 focus:ring-yellow-500 rounded-md"
              >
                <option value="">Select Case</option>
                {cases.map((case_: any) => (
                  <option key={case_.id} value={case_.id}>{case_.title}</option>
                ))}
              </select>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors">
                Add Finance Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}