import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../prisma/client'
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })
    return NextResponse.json(users, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }

}
