import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーロー：カスタムカラーを使用 */}
      <section className="bg-brand-900 text-white text-center px-4 py-16 md:py-24">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">ダッシュボード</h2>
        <p className="text-brand-100 text-sm md:text-base max-w-xl mx-auto mb-6">
          タスクを効率的に管理して、チームの生産性を向上させましょう。
        </p>
        <Link
          href="/tasks/new"
          className="inline-block bg-accent text-white font-bold px-6 py-3 rounded hover:bg-amber-600"
        >
          新しいタスクを作成
        </Link>
      </section>

      {/* サービスカード */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
          タスク概要
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 hover:border-brand-500 transition-colors">
            <h3 className="text-lg font-bold text-brand-700 mb-2">Web開発</h3>
            <p className="text-gray-600 text-sm">
              React・Next.jsを活用した高品質なWebアプリケーション開発
            </p>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 hover:border-brand-500 transition-colors">
            <h3 className="text-lg font-bold text-brand-700 mb-2">
              コンサルティング
            </h3>
            <p className="text-gray-600 text-sm">
              ビジネス課題を分析し、最適なIT戦略をご提案
            </p>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 hover:border-brand-500 transition-colors">
            <h3 className="text-lg font-bold text-brand-700 mb-2">
              インフラ構築
            </h3>
            <p className="text-gray-600 text-sm">
              クラウドサービスを活用したスケーラブルなインフラ構築
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}