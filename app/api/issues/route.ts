import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const create_issue_schema = z.object({
  title: z.string().min(1,'the title is required').max(255),
  description: z.string().min(1,'description is required'),
});
export async function POST(req: NextRequest) {
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
