// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
      console.error(error);
    return NextResponse.json(
      { error: "タスクの取得に失敗しました" },
      { status: 500 },
    );
  }
}
