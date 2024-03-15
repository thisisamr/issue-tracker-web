import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { create_issue_schema } from "../../ValidationSchemas";
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
