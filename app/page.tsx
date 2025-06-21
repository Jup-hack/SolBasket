'use client';

import DashboardLayout from '@/components/dashboard-layout';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';
import {
	TrendingUp,
	TrendingDown,
	ArrowUpDown,
	Repeat,
	ExternalLink,
} from 'lucide-react';

// Mock data
const portfolioData = {
	totalNAV: { sol: 45.67, usd: 12450.67 },
	dayChange: { amount: 234.56, percentage: 1.92 },
	weekChange: { amount: -89.34, percentage: -0.71 },
};

const pieData = [
	{ name: 'SOL', value: 35, color: '#9945FF' },
	{ name: 'USDC', value: 25, color: '#2775CA' },
	{ name: 'RAY', value: 15, color: '#14F195' },
	{ name: 'SRM', value: 12, color: '#00D4AA' },
	{ name: 'Others', value: 13, color: '#FF6B6B' },
];

const sparklineData = [
	{ time: '6d', value: 12200 },
	{ time: '5d', value: 12150 },
	{ time: '4d', value: 12380 },
	{ time: '3d', value: 12290 },
	{ time: '2d', value: 12400 },
	{ time: '1d', value: 12216 },
	{ time: 'now', value: 12450 },
];

const holdings = [
	{
		token: 'SOL',
		symbol: 'SOL',
		qty: 16.789,
		weight: 35.2,
		costBasis: 89.45,
		currentPrice: 145.67,
		pnl: 8.9,
		pnlPercent: 62.8,
	},
	{
		token: 'USD Coin',
		symbol: 'USDC',
		qty: 3125.45,
		weight: 25.1,
		costBasis: 1.0,
		currentPrice: 1.0,
		pnl: 0,
		pnlPercent: 0,
	},
	{
		token: 'Raydium',
		symbol: 'RAY',
		qty: 234.56,
		weight: 15.3,
		costBasis: 2.34,
		currentPrice: 2.89,
		pnl: 129.01,
		pnlPercent: 23.5,
	},
	{
		token: 'Serum',
		symbol: 'SRM',
		qty: 456.78,
		weight: 12.1,
		costBasis: 3.45,
		currentPrice: 2.98,
		pnl: -214.68,
		pnlPercent: -13.6,
	},
	{
		token: 'Others',
		symbol: '6 tokens',
		qty: 0,
		weight: 12.3,
		costBasis: 0,
		currentPrice: 0,
		pnl: 45.23,
		pnlPercent: 3.2,
	},
];

const recentTx = [
	{
		type: 'Rebalance',
		basket: 'DeFi Alpha',
		time: '2h ago',
		amount: '+$234.56',
		status: 'completed',
	},
	{
		type: 'Buy',
		basket: 'SOL Ecosystem',
		time: '1d ago',
		amount: '+$1,200.00',
		status: 'completed',
	},
	{
		type: 'Sell',
		basket: 'GameFi',
		time: '2d ago',
		amount: '-$567.89',
		status: 'completed',
	},
	{
		type: 'Rebalance',
		basket: 'Blue Chip',
		time: '3d ago',
		amount: '+$89.23',
		status: 'completed',
	},
];

export default function Dashboard() {
	return (
		<DashboardLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Portfolio Overview
					</h1>
					<p className='text-muted-foreground'>
						Track your Solana baskets and manage your investments
					</p>
				</div>

				{/* Key Metrics Cards */}
				<div className='grid gap-4 md:grid-cols-3'>
					{/* Total NAV */}
					<Card className='glass'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>Total NAV</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>
								${portfolioData.totalNAV.usd.toLocaleString()}
							</div>
							<p className='text-xs text-muted-foreground'>
								{portfolioData.totalNAV.sol} SOL
							</p>
						</CardContent>
					</Card>

					{/* 24h P&L */}
					<Card className='glass'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>24h P&L</CardTitle>
							{portfolioData.dayChange.percentage > 0 ? (
								<TrendingUp className='h-4 w-4 text-green-500' />
							) : (
								<TrendingDown className='h-4 w-4 text-red-500' />
							)}
						</CardHeader>
						<CardContent>
							<div
								className={`text-2xl font-bold ${
									portfolioData.dayChange.percentage > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}>
								${portfolioData.dayChange.amount.toLocaleString()}
							</div>
							<p
								className={`text-xs ${
									portfolioData.dayChange.percentage > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}>
								{portfolioData.dayChange.percentage > 0 ? '+' : ''}
								{portfolioData.dayChange.percentage}%
							</p>
						</CardContent>
					</Card>

					{/* 7d P&L */}
					<Card className='glass'>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>7d P&L</CardTitle>
							{portfolioData.weekChange.percentage > 0 ? (
								<TrendingUp className='h-4 w-4 text-green-500' />
							) : (
								<TrendingDown className='h-4 w-4 text-red-500' />
							)}
						</CardHeader>
						<CardContent>
							<div
								className={`text-2xl font-bold ${
									portfolioData.weekChange.percentage > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}>
								${Math.abs(portfolioData.weekChange.amount).toLocaleString()}
							</div>
							<p
								className={`text-xs ${
									portfolioData.weekChange.percentage > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}>
								{portfolioData.weekChange.percentage > 0 ? '+' : ''}
								{portfolioData.weekChange.percentage}%
							</p>
						</CardContent>
					</Card>
				</div>

				<div className='grid gap-6 lg:grid-cols-2'>
					{/* Performance Chart */}
					<Card className='glass'>
						<CardHeader>
							<CardTitle>Performance</CardTitle>
							<CardDescription>7-day portfolio value trend</CardDescription>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width='100%' height={200}>
								<LineChart data={sparklineData}>
									<XAxis
										dataKey='time'
										axisLine={false}
										tickLine={false}
										className='text-xs'
									/>
									<YAxis hide />
									<Tooltip
										formatter={(value) => [
											`$${value.toLocaleString()}`,
											'Value',
										]}
										labelStyle={{ color: 'white' }}
										contentStyle={{
											backgroundColor: 'hsl(var(--popover))',
											border: '1px solid hsl(var(--border))',
										}}
									/>
									<Line
										type='monotone'
										dataKey='value'
										stroke='#9945FF'
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Token Allocation */}
					<Card className='glass'>
						<CardHeader className='flex flex-row items-center justify-between'>
							<div>
								<CardTitle>Token Allocation</CardTitle>
								<CardDescription>Portfolio composition</CardDescription>
							</div>
							<Button variant='outline' size='sm'>
								<Repeat className='h-4 w-4 mr-2' />
								Rebalance
							</Button>
						</CardHeader>
						<CardContent>
							<div className='flex items-center justify-center'>
								<ResponsiveContainer width='100%' height={200}>
									<PieChart>
										<Pie
											data={pieData}
											cx='50%'
											cy='50%'
											innerRadius={60}
											outerRadius={90}
											paddingAngle={2}
											dataKey='value'>
											{pieData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip
											formatter={(value) => [`${value}%`, 'Weight']}
											contentStyle={{
												backgroundColor: 'hsl(var(--popover))',
												border: '1px solid hsl(var(--border))',
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
							<div className='mt-4 space-y-2'>
								{pieData.map((item, index) => (
									<div
										key={index}
										className='flex items-center justify-between text-sm'>
										<div className='flex items-center gap-2'>
											<div
												className='h-3 w-3 rounded-full'
												style={{ backgroundColor: item.color }}></div>
											<span>{item.name}</span>
										</div>
										<span className='font-medium'>{item.value}%</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Holdings Table */}
				<Card className='glass'>
					<CardHeader>
						<CardTitle>Holdings</CardTitle>
						<CardDescription>
							Your token positions and performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Token</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Weight</TableHead>
									<TableHead>Cost Basis</TableHead>
									<TableHead>Current Price</TableHead>
									<TableHead>P&L</TableHead>
									<TableHead></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{holdings.map((holding, index) => (
									<TableRow key={index}>
										<TableCell>
											<div>
												<div className='font-medium'>{holding.token}</div>
												<div className='text-sm text-muted-foreground'>
													{holding.symbol}
												</div>
											</div>
										</TableCell>
										<TableCell>
											{holding.qty > 0 ? holding.qty.toLocaleString() : '-'}
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-2'>
												<Progress value={holding.weight} className='w-16 h-2' />
												<span className='text-sm'>{holding.weight}%</span>
											</div>
										</TableCell>
										<TableCell>${holding.costBasis.toFixed(2)}</TableCell>
										<TableCell>${holding.currentPrice.toFixed(2)}</TableCell>
										<TableCell>
											<div
												className={`${
													holding.pnlPercent > 0
														? 'text-green-500'
														: 'text-red-500'
												}`}>
												<div className='font-medium'>
													{holding.pnlPercent > 0 ? '+' : ''}$
													{holding.pnl.toLocaleString()}
												</div>
												<div className='text-sm'>
													{holding.pnlPercent > 0 ? '+' : ''}
													{holding.pnlPercent}%
												</div>
											</div>
										</TableCell>
										<TableCell>
											<Button variant='ghost' size='sm'>
												<ArrowUpDown className='h-4 w-4' />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card className='glass'>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>
							Latest transactions and rebalances
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{recentTx.map((tx, index) => (
								<div
									key={index}
									className='flex items-center justify-between p-3 rounded-lg border'>
									<div className='flex items-center gap-3'>
										<div
											className={`h-8 w-8 rounded-full flex items-center justify-center ${
												tx.type === 'Buy'
													? 'bg-green-500/20 text-green-500'
													: tx.type === 'Sell'
													? 'bg-red-500/20 text-red-500'
													: 'bg-blue-500/20 text-blue-500'
											}`}>
											{tx.type === 'Buy' ? '+' : tx.type === 'Sell' ? '-' : '⟲'}
										</div>
										<div>
											<div className='font-medium'>
												{tx.type} • {tx.basket}
											</div>
											<div className='text-sm text-muted-foreground'>
												{tx.time}
											</div>
										</div>
									</div>
									<div className='flex items-center gap-2'>
										<span
											className={`font-medium ${
												tx.amount.startsWith('+')
													? 'text-green-500'
													: tx.amount.startsWith('-')
													? 'text-red-500'
													: ''
											}`}>
											{tx.amount}
										</span>
										<Badge variant='outline' className='text-xs'>
											{tx.status}
										</Badge>
										<Button variant='ghost' size='sm'>
											<ExternalLink className='h-4 w-4' />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
}
