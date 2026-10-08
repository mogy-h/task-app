// app/tasks/page.tsx
import type { Task } from "@/lib/types";

async function getTasks(): Promise<Task[]> {
  const res = await fetch("http://localhost:3000/api/tasks", {
    //前回の結果の使い回し（キャッシュ）をやめて、毎回最新データを取得する
    cache: "no-store",
  });

  //ステータスコードが200番台かどうかを判定する
  if (!res.ok) {
    throw new Error("タスクの取得に失敗しました");
  }

  return res.json();
}

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">タスクがありません</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 p-4 border rounded-lg"
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  task.completed ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span
                className={task.completed ? "line-through text-gray-400" : ""}
              >
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
