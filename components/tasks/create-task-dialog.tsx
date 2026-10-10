// components/tasks/create-task-dialog.tsx
"use client";

import {useRouter} from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateTaskDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      //JSONのパースに失敗する可能性があるため、catchで空オブジェクトを返すようにする
      const data = await response.json().catch(() => ({}));
      alert(data.error ?? "追加に失敗しました");
      return;
    }

    setTitle("");
    setOpen(false);
    router.refresh(); // タスク一覧を更新するためにページを再読み込み
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>新規作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>タスクを追加</DialogTitle>
        </DialogHeader>
        {/* フォームは次のセクションで追加 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="例: 買い物に行く"
          />
          {/*  追加ボタンはタイトルが空の場合は無効化する */}
          <Button type="submit" disabled={title.trim() === ""}>
            追加
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
