import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, TrendingUp, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getLeaderboard() {
  const supabase = await createClient();

  // Get users with their trade stats
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, balance")
    .order("balance", { ascending: false })
    .limit(50);

  // Calculate rankings with additional stats
  const leaderboard = await Promise.all(
    (profiles || []).map(async (profile, index) => {
      const { count: tradesCount } = await supabase
        .from("trades")
        .select("*", { count: "exact", head: true })
        .eq("user_id", profile.id);

      return {
        ...profile,
        rank: index + 1,
        tradesCount: tradesCount || 0,
        profit: profile.balance - 10000, // Starting balance was 10,000
      };
    })
  );

  return leaderboard;
}

export default async function LeaderboardPage() {
  const leaderboard = await getLeaderboard();

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
            <Trophy className="h-5 w-5 text-white" />
          </div>
        );
      case 2:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <Medal className="h-5 w-5 text-white" />
          </div>
        );
      case 3:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700">
            <Medal className="h-5 w-5 text-white" />
          </div>
        );
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <span className="font-bold text-muted-foreground">{rank}</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top traders ranked by portfolio value
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Traders</p>
                <p className="text-2xl font-bold">{leaderboard.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Balance</p>
                <p className="text-2xl font-bold">
                  {(topThree[0]?.balance || 0).toLocaleString()} KSH
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Profit</p>
                <p className="text-2xl font-bold text-emerald-500">
                  +{Math.max(topThree[0]?.profit || 0, 0).toLocaleString()} KSH
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[topThree[1], topThree[0], topThree[2]]
              .filter(Boolean)
              .map((trader, index) => {
                const actualRank = index === 0 ? 2 : index === 1 ? 1 : 3;
                const isFirst = actualRank === 1;

                return (
                  <Card
                    key={trader.id}
                    className={`${isFirst ? "md:-mt-4 md:order-2" : index === 0 ? "md:order-1" : "md:order-3"} ${
                      isFirst ? "border-yellow-500/50 bg-yellow-500/5" : ""
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        {getRankIcon(actualRank)}
                      </div>
                      <h3 className="mb-1 text-lg font-bold">
                        {trader.username || "Anonymous"}
                      </h3>
                      <p className="mb-3 text-2xl font-bold text-primary">
                        {trader.balance.toLocaleString()} KSH
                      </p>
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <span>{trader.tradesCount} trades</span>
                        <span
                          className={
                            trader.profit >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }
                        >
                          {trader.profit >= 0 ? "+" : ""}
                          {trader.profit.toLocaleString()} KSH
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}

        {/* Rest of Leaderboard */}
        {rest.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rest.map((trader) => (
                  <div
                    key={trader.id}
                    className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      {getRankIcon(trader.rank)}
                      <div>
                        <p className="font-medium">
                          {trader.username || "Anonymous"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trader.tradesCount} trades
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {trader.balance.toLocaleString()} KSH
                      </p>
                      <p
                        className={`text-sm ${
                          trader.profit >= 0
                            ? "text-emerald-500"
                            : "text-red-500"
                        }`}
                      >
                        {trader.profit >= 0 ? "+" : ""}
                        {trader.profit.toLocaleString()} KSH
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {leaderboard.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Trophy className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                No traders yet. Be the first to join!
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
