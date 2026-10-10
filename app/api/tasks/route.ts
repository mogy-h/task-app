// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

type CreateTaskBody = {
  title: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CreateTaskBody;

  if (typeof body.title !== "string" || body.title.trim() === "") {
    return NextResponse.json({ error: "タイトルは必須です" }, { status: 400 });
  }
  if (typeof body.title !== "string") {
    return NextResponse.json(
      { error: "titleは文字列で指定してください" },
      { status: 400 },
    );
  }
  if (body.title.length > 200) {
    return NextResponse.json(
      { error: "titleは200文字以内で入力してください" },
      { status: 400 },
    );
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: body.title,
      },
    });

    // タスク作成後に /tasks ページを再検証して最新のタスク一覧を取得する
    // ここで一覧ページのキャッシュを無効化
    revalidatePath("/tasks");

    return NextResponse.json(task, { status: 201 });

  } catch (error) {
    console.error("failed to create task:", error);
    return NextResponse.json(
      { error: "保存に失敗しました。しばらくしてから再度お試しください。" },
      { status: 500 },
    );
  }

}
