import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { create_issue_schema } from "../../ValidationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return NextResponse.json("no auth", { status: 401 });
  }
  const body = await req.json();
  const validation = create_issue_schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  let created = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
