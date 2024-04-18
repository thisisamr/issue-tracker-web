
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { create_issue_schema } from "@/app/ValidationSchemas";
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    
    const body = await req.json();
    const validation = create_issue_schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    let updated = await prisma.issue.update({where:{id:parseInt(params.id)},
        data: {
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(updated, { status: 200 });
}