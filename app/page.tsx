import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: todos, error } = await supabase.from("todos").select();
  if (error) console.error(error);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li key={todo.id} className="p-2 border rounded">
            {todo.task}
          </li>
        ))}
      </ul>
    </main>
  );
}
