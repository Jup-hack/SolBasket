"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, FileText, List, PieChart as PieChartIcon, TrendingUp, ChevronRight } from "lucide-react";
import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";

// Mock data for an existing basket
const basketData = {
  name: "DeFi Blue Chips",
  symbol: "DEFIBLUE",
  description: "A basket of top-tier DeFi protocol tokens, offering diversified exposure to the decentralized finance sector.",
  tokens: [
    { name: "Uniswap", symbol: "UNI", address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", amount: 10, fill: "var(--color-uniswap)" },
    { name: "Aave", symbol: "AAVE", address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", amount: 5, fill: "var(--color-aave)" },
    { name: "Maker", symbol: "MKR", address: "0x9f8F72aA9304c8B593d555F12EF6589cC3A579A2", amount: 2, fill: "var(--color-maker)" },
    { name: "Solana", symbol: "SOL", address: "0x1111111111111111111111111111111111111111", amount: 8, fill: "var(--color-solana)" },
    { name: "Chainlink", symbol: "LINK", address: "0x2222222222222222222222222222222222222222", amount: 3, fill: "var(--color-chainlink)" },
  ],
};

const chartConfig = {
  uniswap: {
    label: "Uniswap",
    color: "hsl(262 83% 58%)", // Solana Purple
  },
  aave: {
    label: "Aave",
    color: "hsl(142 71% 45%)", // Solana Green
  },
  maker: {
    label: "Maker",
    color: "hsl(262 83% 70%)", // Lighter Solana Purple
  },
  solana: {
    label: "Solana",
    color: "hsl(142 71% 60%)", // Lighter Solana Green
  },
  chainlink: {
    label: "Chainlink",
    color: "hsl(262 83% 40%)", // Darker Solana Purple
  },
} satisfies ChartConfig;

// Mock historical data for the last 5 years
const historicalData = [
  { year: '2020', value: 100 },
  { year: '2021', value: 150 },
  { year: '2022', value: 120 },
  { year: '2023', value: 180 },
  { year: '2024', value: 250 },
];

const historicalChartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function BasketDetailsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4" style={{ backgroundImage: `url('/solana-background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-50 shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold text-solana-purple dark:text-solana-green">{basketData.name}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Symbol: {basketData.symbol}</CardDescription>
            </div>
            <Button size="lg" className="bg-solana-purple hover:bg-solana-green text-white dark:bg-solana-purple dark:hover:bg-solana-green">
              <TrendingUp className="mr-2 h-5 w-5" />
              Invest Now
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center text-solana-purple dark:text-solana-green"><FileText className="mr-2 h-5 w-5 text-solana-purple dark:text-solana-green" /> Description</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {basketData.description}
            </p>
          </div>
          <Separator />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-solana-purple dark:text-solana-green"><PieChartIcon className="mr-2 h-5 w-5 text-solana-purple dark:text-solana-green" /> Token Distribution</h3>
              <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                  <Pie
                    data={basketData.tokens}
                    dataKey="amount"
                    nameKey="name"
                    label
                    labelLine={false}
                  />
                </PieChart>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {basketData.tokens.map((token, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <span
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: token.fill.replace('var(', '').replace(')', '') }}
                      ></span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{token.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-solana-purple dark:text-solana-green"><List className="mr-2 h-5 w-5 text-solana-purple dark:text-solana-green" /> Tokens</h3>
              <div className="space-y-4">
                {basketData.tokens.map((token, index) => (
                  <div key={index} className="p-4 border rounded-lg flex justify-between items-center transition-colors" style={{ backgroundColor: token.fill.replace('var(', '').replace(')', '') + '20', borderColor: token.fill.replace('var(', '').replace(')', '') }}>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100">{token.name} ({token.symbol})</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Address: {token.address}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">{token.amount} units</p>
                      <ChevronRight className="ml-2 h-5 w-5 text-solana-purple dark:text-solana-green" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-xl font-semibold flex items-center text-solana-purple dark:text-solana-green"><AreaChart className="mr-2 h-5 w-5 text-solana-purple dark:text-solana-green" /> Historical Performance (5Y)</h3>
            <div className="mt-4">
              <ChartContainer config={historicalChartConfig} className="w-full h-[300px]">
                <LineChart data={historicalData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={true} />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-600 dark:text-gray-400">
          <p>Disclaimer: Investing in crypto assets is subject to market risk. Please do your own research.</p>
        </CardFooter>
      </Card>
    </div>
  );
}