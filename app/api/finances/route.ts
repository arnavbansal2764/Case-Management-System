import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const finances = await prisma.finance.findMany({ include: { case: true } })
  return NextResponse.json(finances)
}

export async function POST(request: Request) {
  const { amount, description, type, caseId } = await request.json()
  const finance = await prisma.finance.create({
    data: { amount, description, type, caseId },
  })
  return NextResponse.json(finance, { status: 201 })
}