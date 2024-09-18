import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const clients = await prisma.client.findMany()
  return NextResponse.json(clients)
}

export async function POST(request: Request) {
  const { name, email, phone } = await request.json()
  const client = await prisma.client.create({
    data: { name, email, phone },
  })
  return NextResponse.json(client, { status: 201 })
}