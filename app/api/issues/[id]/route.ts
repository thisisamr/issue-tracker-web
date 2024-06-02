import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { create_issue_schema, create_issue_schema_with_assignedissues } from "@/app/ValidationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   return NextResponse.json("no auth", { status: 401 })
  // }
  const body = await req.json();
  const validation = create_issue_schema_with_assignedissues.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  let { userid } = body
  if (userid) {

    const user = await prisma.user.findUnique({ where: { id: userid } });
    if (!user) return NextResponse.json("error, invalid user.", { status: 500 })
  }
  try {

    let updated = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
        assignedto: userid
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (e) {
    return NextResponse.json((e as Error).message, { status: 500 })
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json("no auth", { status: 401 })
  }
  try {
    let deleted = await prisma.issue.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 405 });
  }
}
