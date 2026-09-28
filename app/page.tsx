"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const users: User[] = [
  {
    id: 1,
    name: "山田太郎",
    email: "taro@example.com",
    role: "エンジニア",
    status: "アクティブ",
  },
  {
    id: 2,
    name: "鈴木花子",
    email: "hanako@example.com",
    role: "デザイナー",
    status: "アクティブ",
  },
  {
    id: 3,
    name: "佐藤次郎",
    email: "jiro@example.com",
    role: "マネージャー",
    status: "アクティブ",
  },
  {
    id: 4,
    name: "田中美咲",
    email: "misaki@example.com",
    role: "エンジニア",
    status: "休止中",
  },
  {
    id: 5,
    name: "高橋健一",
    email: "kenichi@example.com",
    role: "デザイナー",
    status: "アクティブ",
  },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="p-6">
      {/* ページヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">ユーザー管理</h1>
          <p className="text-muted-foreground">登録ユーザーの一覧と管理</p>
        </div>
        <Button>新規追加</Button>
      </div>

      {/* ユーザー一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>ユーザー一覧</CardTitle>
          <CardDescription>全{users.length}件のユーザー</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メール</TableHead>
                <TableHead>役職</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={
                        user.status === "アクティブ"
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                    >
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ユーザー詳細ダイアログ */}
      <Dialog
        open={selectedUser !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ユーザー詳細</DialogTitle>
            <DialogDescription>ユーザー情報の確認と編集</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="detail-name">名前</Label>
                <Input id="detail-name" defaultValue={selectedUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="detail-email">メールアドレス</Label>
                <Input id="detail-email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="detail-role">役職</Label>
                <Input id="detail-role" defaultValue={selectedUser.role} />
              </div>
              <div className="space-y-2">
                <Label>ステータス</Label>
                <p
                  className={
                    selectedUser.status === "アクティブ"
                      ? "text-green-600 font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {selectedUser.status}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedUser(null)}>
              閉じる
            </Button>
            <Button>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
