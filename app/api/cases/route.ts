import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const cases = await prisma.case.findMany({ include: { client: true } })
  return NextResponse.json(cases)
}

export async function POST(request: Request) {
  const { title, description, status, clientId } = await request.json()
  const newCase = await prisma.case.create({
    data: { title, description, status, clientId },
  })
  return NextResponse.json(newCase, { status: 201 })
}