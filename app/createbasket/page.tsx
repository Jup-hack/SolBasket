'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
	TrendingUp,
	TrendingDown,
	Plus,
	Minus,
	Share2,
	QrCode,
	Target,
	DollarSign,
	Trash2,
	CheckCircle,
	Copy,
	ExternalLink,
	Sparkles,
	Zap,
	Shield,
	BarChart3,
	Repeat,
	ArrowUpDown,
} from 'lucide-react';

// Mock data for trending tokens
const trendingTokens = [
	{
		symbol: 'SOL',
		name: 'Solana',
		price: 12347.5, // INR
		change24h: 8.5,
		volume: 450000000, // INR
		marketCap: 5800000000000, // INR
		icon: '🟣',
		trending: true,
	},
	{
		symbol: 'USDC',
		name: 'USD Coin',
		price: 83.25, // INR
		change24h: 0.1,
		volume: 2100000000, // INR
		marketCap: 4200000000000, // INR
		icon: '💵',
		trending: false,
	},
	{
		symbol: 'RAY',
		name: 'Raydium',
		price: 241.8, // INR
		change24h: 15.2,
		volume: 85000000, // INR
		marketCap: 125000000000, // INR
		icon: '🌊',
		trending: true,
	},
	{
		symbol: 'JUP',
		name: 'Jupiter',
		price: 91.7, // INR
		change24h: 22.8,
		volume: 120000000, // INR
		marketCap: 180000000000, // INR
		icon: '🪐',
		trending: true,
	},
	{
		symbol: 'BONK',
		name: 'Bonk',
		price: 0.0025, // INR
		change24h: 45.6,
		volume: 95000000, // INR
		marketCap: 85000000000, // INR
		icon: '🐕',
		trending: true,
	},
	{
		symbol: 'JTO',
		name: 'Jito',
		price: 250.5, // INR
		change24h: 12.3,
		volume: 65000000, // INR
		marketCap: 95000000000, // INR
		icon: '🚀',
		trending: true,
	},
];

// Mock basket templates
const basketTemplates = [
	{
		id: 'defi-alpha',
		name: 'DeFi Alpha',
		description: 'High-growth DeFi tokens with strong fundamentals',
		tokens: ['SOL', 'RAY', 'JUP'],
		allocation: [40, 35, 25],
		risk: 'High',
		returns: '45%',
		icon: '🏦',
	},
	{
		id: 'blue-chip',
		name: 'Blue Chip',
		description: 'Stable, established tokens for conservative investors',
		tokens: ['SOL', 'USDC'],
		allocation: [60, 40],
		risk: 'Low',
		returns: '12%',
		icon: '💎',
	},
	{
		id: 'meme-moonshot',
		name: 'Meme Moonshot',
		description: 'High-risk, high-reward meme tokens',
		tokens: ['BONK', 'JTO'],
		allocation: [60, 40],
		risk: 'Very High',
		returns: '125%',
		icon: '🚀',
	},
];

interface SelectedToken {
	symbol: string;
	name: string;
	price: number;
	allocation: number;
	amount: number;
	icon: string;
}

export default function CreateBasket() {
	const [selectedTokens, setSelectedTokens] = useState<SelectedToken[]>([]);
	const [basketName, setBasketName] = useState('');
	const [basketDescription, setBasketDescription] = useState('');
	const [investmentAmount, setInvestmentAmount] = useState(10000); // Default ₹10,000
	const [profitTarget, setProfitTarget] = useState(20);
	const [stopLoss, setStopLoss] = useState(10);
	const [enableDCA, setEnableDCA] = useState(false);
	const [dcaAmount, setDcaAmount] = useState(1000);
	const [dcaFrequency, setDcaFrequency] = useState('weekly');
	const [shareableLink, setShareableLink] = useState('');
	const [showShareDialog, setShowShareDialog] = useState(false);
	const [currentTab, setCurrentTab] = useState('create');

	// Calculate total allocation
	const totalAllocation = selectedTokens.reduce(
		(sum, token) => sum + token.allocation,
		0
	);

	// Add token to basket
	const addToken = (token: (typeof trendingTokens)[0]) => {
		if (selectedTokens.find((t) => t.symbol === token.symbol)) return;

		const newToken: SelectedToken = {
			symbol: token.symbol,
			name: token.name,
			price: token.price,
			allocation: selectedTokens.length === 0 ? 100 : 0,
			amount: 0,
			icon: token.icon,
		};

		setSelectedTokens([...selectedTokens, newToken]);
	};

	// Remove token from basket
	const removeToken = (symbol: string) => {
		setSelectedTokens(selectedTokens.filter((t) => t.symbol !== symbol));
	};

	// Update token allocation
	const updateAllocation = (symbol: string, allocation: number) => {
		setSelectedTokens(
			selectedTokens.map((token) =>
				token.symbol === symbol ? { ...token, allocation } : token
			)
		);
	};

	// Auto-balance allocations
	const autoBalance = () => {
		const equalAllocation = 100 / selectedTokens.length;
		setSelectedTokens(
			selectedTokens.map((token) => ({
				...token,
				allocation: Math.round(equalAllocation * 100) / 100,
			}))
		);
	};

	// Load basket template
	const loadTemplate = (template: (typeof basketTemplates)[0]) => {
		const templateTokens = template.tokens
			.map((symbol, index) => {
				const tokenData = trendingTokens.find((t) => t.symbol === symbol);
				if (!tokenData) return null;

				return {
					symbol: tokenData.symbol,
					name: tokenData.name,
					price: tokenData.price,
					allocation: template.allocation[index],
					amount: 0,
					icon: tokenData.icon,
				};
			})
			.filter(Boolean) as SelectedToken[];

		setSelectedTokens(templateTokens);
		setBasketName(template.name);
		setBasketDescription(template.description);
	};

	// Generate shareable link
	const generateShareableLink = () => {
		const basketData = {
			name: basketName,
			description: basketDescription,
			tokens: selectedTokens.map((t) => ({
				symbol: t.symbol,
				allocation: t.allocation,
			})),
		};

		const encodedData = btoa(JSON.stringify(basketData));
		const link = `${window.location.origin}/basket/share?data=${encodedData}`;
		setShareableLink(link);
		setShowShareDialog(true);
	};

	// Calculate risk level
	const getRiskLevel = () => {
		const avgVolatility =
			selectedTokens.reduce((sum, token) => {
				const tokenData = trendingTokens.find((t) => t.symbol === token.symbol);
				return sum + Math.abs(tokenData?.change24h || 0);
			}, 0) / selectedTokens.length;

		if (avgVolatility > 20) return { level: 'Very High', color: 'bg-red-500' };
		if (avgVolatility > 10) return { level: 'High', color: 'bg-orange-500' };
		if (avgVolatility > 5) return { level: 'Medium', color: 'bg-yellow-500' };
		return { level: 'Low', color: 'bg-green-500' };
	};

	return (
		<DashboardLayout>
			<div className='space-y-6'>
				{/* Header */}
				<div className='flex justify-between items-center'>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>
							Create Basket 🧺
						</h1>
						<p className='text-muted-foreground'>
							Build your custom crypto portfolio with trending tokens
						</p>
					</div>
					<div className='flex gap-2'>
						<Button variant='outline' size='sm'>
							<QrCode className='h-4 w-4 mr-2' />
							QR Code
						</Button>
						<Button
							variant='outline'
							size='sm'
							onClick={generateShareableLink}
							disabled={selectedTokens.length === 0}>
							<Share2 className='h-4 w-4 mr-2' />
							Share
						</Button>
					</div>
				</div>

				<Tabs defaultValue='create' className='w-full'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='create'>Create Basket</TabsTrigger>
						<TabsTrigger value='templates'>Templates</TabsTrigger>
						<TabsTrigger value='trending'>Trending</TabsTrigger>
					</TabsList>

					{/* Create Basket Tab */}
					<TabsContent value='create' className='space-y-6'>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							{/* Left Column - Basket Configuration */}
							<div className='lg:col-span-2 space-y-6'>
								{/* Basket Details */}
								<Card className='glass'>
									<CardHeader>
										<CardTitle className='flex items-center gap-2'>
											<Sparkles className='h-5 w-5' />
											Basket Details
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<div>
												<Label htmlFor='basket-name'>Basket Name</Label>
												<Input
													id='basket-name'
													placeholder='My Crypto Basket'
													value={basketName}
													onChange={(e) => setBasketName(e.target.value)}
												/>
											</div>
											<div>
												<Label htmlFor='investment-amount'>
													Investment Amount (₹)
												</Label>
												<Input
													id='investment-amount'
													type='number'
													placeholder='10000'
													value={investmentAmount}
													onChange={(e) =>
														setInvestmentAmount(Number(e.target.value))
													}
												/>
											</div>
										</div>
										<div>
											<Label htmlFor='basket-description'>Description</Label>
											<Textarea
												id='basket-description'
												placeholder='Describe your investment strategy...'
												value={basketDescription}
												onChange={(e) => setBasketDescription(e.target.value)}
											/>
										</div>
									</CardContent>
								</Card>

								{/* Token Selection */}
								<Card className='glass'>
									<CardHeader>
										<div className='flex justify-between items-center'>
											<CardTitle className='flex items-center gap-2'>
												<BarChart3 className='h-5 w-5' />
												Token Selection
											</CardTitle>
											<Button
												variant='outline'
												size='sm'
												onClick={autoBalance}
												disabled={selectedTokens.length < 2}>
												<ArrowUpDown className='h-4 w-4 mr-2' />
												Auto Balance
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										{selectedTokens.length === 0 ? (
											<div className='text-center py-8'>
												<p className='text-muted-foreground mb-4'>
													No tokens selected. Choose from trending tokens or
													templates.
												</p>
												<Button
													variant='outline'
													onClick={() => setCurrentTab('trending')}>
													Browse Trending Tokens
												</Button>
											</div>
										) : (
											<div className='space-y-4'>
												{selectedTokens.map((token) => (
													<div
														key={token.symbol}
														className='flex items-center justify-between p-4 border rounded-lg'>
														<div className='flex items-center gap-3'>
															<span className='text-2xl'>{token.icon}</span>
															<div>
																<div className='font-medium'>
																	{token.symbol}
																</div>
																<div className='text-sm text-muted-foreground'>
																	₹{token.price.toLocaleString()}
																</div>
															</div>
														</div>
														<div className='flex items-center gap-4'>
															<div className='text-right'>
																<div className='font-medium'>
																	{token.allocation}%
																</div>
																<div className='text-sm text-muted-foreground'>
																	₹
																	{(
																		(investmentAmount * token.allocation) /
																		100
																	).toLocaleString()}
																</div>
															</div>
															<div className='flex items-center gap-2'>
																<Button
																	variant='outline'
																	size='sm'
																	onClick={() =>
																		updateAllocation(
																			token.symbol,
																			Math.max(0, token.allocation - 5)
																		)
																	}>
																	<Minus className='h-3 w-3' />
																</Button>
																<span className='w-8 text-center'>
																	{token.allocation}%
																</span>
																<Button
																	variant='outline'
																	size='sm'
																	onClick={() =>
																		updateAllocation(
																			token.symbol,
																			Math.min(100, token.allocation + 5)
																		)
																	}>
																	<Plus className='h-3 w-3' />
																</Button>
																<Button
																	variant='destructive'
																	size='sm'
																	onClick={() => removeToken(token.symbol)}>
																	<Trash2 className='h-3 w-3' />
																</Button>
															</div>
														</div>
													</div>
												))}
												<div className='flex justify-between items-center pt-4 border-t'>
													<span className='font-medium'>Total Allocation:</span>
													<span
														className={`font-bold ${
															Math.abs(totalAllocation - 100) < 0.01
																? 'text-green-500'
																: 'text-red-500'
														}`}>
														{totalAllocation.toFixed(1)}%
													</span>
												</div>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Smart Automation */}
								<Card className='glass'>
									<CardHeader>
										<CardTitle className='flex items-center gap-2'>
											<Zap className='h-5 w-5' />
											Smart Automation
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-6'>
										{/* Profit Target */}
										<div className='space-y-2'>
											<div className='flex justify-between items-center'>
												<Label className='flex items-center gap-2'>
													<Target className='h-4 w-4' />
													Profit Target
												</Label>
												<span className='text-sm text-muted-foreground'>
													{profitTarget}%
												</span>
											</div>
											<Slider
												value={[profitTarget]}
												onValueChange={(value) => setProfitTarget(value[0])}
												max={100}
												min={5}
												step={5}
												className='w-full'
											/>
										</div>

										{/* Stop Loss */}
										<div className='space-y-2'>
											<div className='flex justify-between items-center'>
												<Label className='flex items-center gap-2'>
													<Shield className='h-4 w-4' />
													Stop Loss
												</Label>
												<span className='text-sm text-muted-foreground'>
													{stopLoss}%
												</span>
											</div>
											<Slider
												value={[stopLoss]}
												onValueChange={(value) => setStopLoss(value[0])}
												max={50}
												min={5}
												step={5}
												className='w-full'
											/>
										</div>

										{/* DCA Settings */}
										<div className='space-y-4'>
											<div className='flex items-center justify-between'>
												<Label className='flex items-center gap-2'>
													<Repeat className='h-4 w-4' />
													Enable DCA (Dollar Cost Averaging)
												</Label>
												<Switch
													checked={enableDCA}
													onCheckedChange={setEnableDCA}
												/>
											</div>
											{enableDCA && (
												<div className='grid grid-cols-1 md:grid-cols-2 gap-4 pl-6'>
													<div>
														<Label htmlFor='dca-amount'>DCA Amount (₹)</Label>
														<Input
															id='dca-amount'
															type='number'
															value={dcaAmount}
															onChange={(e) =>
																setDcaAmount(Number(e.target.value))
															}
														/>
													</div>
													<div>
														<Label htmlFor='dca-frequency'>Frequency</Label>
														<Select
															value={dcaFrequency}
															onValueChange={setDcaFrequency}>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='daily'>Daily</SelectItem>
																<SelectItem value='weekly'>Weekly</SelectItem>
																<SelectItem value='monthly'>Monthly</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Right Column - Preview & Actions */}
							<div className='space-y-6'>
								{/* Basket Preview */}
								<Card className='glass'>
									<CardHeader>
										<CardTitle className='flex items-center gap-2'>
											<CheckCircle className='h-5 w-5' />
											Basket Preview
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-4'>
										<div className='text-center'>
											<div className='text-2xl font-bold'>
												₹{investmentAmount.toLocaleString()}
											</div>
											<div className='text-sm text-muted-foreground'>
												Initial Investment
											</div>
										</div>

										<Separator />

										<div className='space-y-2'>
											{selectedTokens.map((token) => (
												<div
													key={token.symbol}
													className='flex justify-between items-center'>
													<div className='flex items-center gap-2'>
														<span>{token.icon}</span>
														<span className='text-sm'>{token.symbol}</span>
													</div>
													<div className='text-right'>
														<div className='text-sm font-medium'>
															{token.allocation}%
														</div>
														<div className='text-xs text-muted-foreground'>
															₹
															{(
																(investmentAmount * token.allocation) /
																100
															).toLocaleString()}
														</div>
													</div>
												</div>
											))}
										</div>

										<Separator />

										<div className='flex justify-between items-center'>
											<span className='text-sm'>Risk Level:</span>
											<Badge
												variant='secondary'
												className={`${getRiskLevel().color} text-white`}>
												{getRiskLevel().level}
											</Badge>
										</div>

										<div className='flex justify-between items-center'>
											<span className='text-sm'>Profit Target:</span>
											<span className='text-sm font-medium text-green-500'>
												+{profitTarget}%
											</span>
										</div>

										<div className='flex justify-between items-center'>
											<span className='text-sm'>Stop Loss:</span>
											<span className='text-sm font-medium text-red-500'>
												-{stopLoss}%
											</span>
										</div>

										{enableDCA && (
											<div className='flex justify-between items-center'>
												<span className='text-sm'>DCA:</span>
												<span className='text-sm font-medium'>
													₹{dcaAmount} {dcaFrequency}
												</span>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Action Buttons */}
								<div className='space-y-3'>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												className='w-full gradient-solana'
												size='lg'
												disabled={
													selectedTokens.length === 0 ||
													Math.abs(totalAllocation - 100) > 0.01 ||
													!basketName
												}>
												<DollarSign className='h-4 w-4 mr-2' />
												Invest Now
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>Confirm Investment</AlertDialogTitle>
												<AlertDialogDescription>
													You're about to invest ₹
													{investmentAmount.toLocaleString()} in "{basketName}".
													This will execute swaps via Jupiter Exchange.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction>
													Confirm Investment
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>

									<Button
										variant='outline'
										className='w-full'
										onClick={generateShareableLink}
										disabled={selectedTokens.length === 0}>
										<Share2 className='h-4 w-4 mr-2' />
										Share Basket
									</Button>

									<Button variant='outline' className='w-full'>
										<Copy className='h-4 w-4 mr-2' />
										Save as Template
									</Button>
								</div>
							</div>
						</div>
					</TabsContent>

					{/* Templates Tab */}
					<TabsContent value='templates' className='space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{basketTemplates.map((template) => (
								<Card
									key={template.id}
									className='glass hover:shadow-lg transition-shadow'>
									<CardHeader>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<span className='text-2xl'>{template.icon}</span>
												<CardTitle className='text-lg'>
													{template.name}
												</CardTitle>
											</div>
											<Badge
												variant='secondary'
												className={
													template.risk === 'Low'
														? 'bg-green-500/20 text-green-400'
														: template.risk === 'Medium'
														? 'bg-yellow-500/20 text-yellow-400'
														: template.risk === 'High'
														? 'bg-orange-500/20 text-orange-400'
														: 'bg-red-500/20 text-red-400'
												}>
												{template.risk}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className='space-y-4'>
										<p className='text-sm text-muted-foreground'>
											{template.description}
										</p>
										<div className='space-y-2'>
											<div className='text-sm font-medium'>Tokens:</div>
											<div className='flex flex-wrap gap-1'>
												{template.tokens.map((symbol) => (
													<Badge key={symbol} variant='outline'>
														{symbol}
													</Badge>
												))}
											</div>
										</div>
										<div className='flex justify-between items-center'>
											<span className='text-sm text-muted-foreground'>
												Est. Returns:
											</span>
											<span className='text-sm font-medium text-green-400'>
												{template.returns}
											</span>
										</div>
										<Button
											variant='outline'
											className='w-full'
											onClick={() => {
												loadTemplate(template);
												setCurrentTab('create');
											}}>
											Use Template
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					{/* Trending Tab */}
					<TabsContent value='trending' className='space-y-6'>
						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<h3 className='text-lg font-semibold'>Trending Tokens 📈</h3>
								<Badge variant='secondary'>Updated 2 min ago</Badge>
							</div>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{trendingTokens.map((token) => (
									<Card
										key={token.symbol}
										className='glass hover:shadow-lg transition-shadow'>
										<CardContent className='p-4'>
											<div className='flex items-center justify-between'>
												<div className='flex items-center gap-3'>
													<span className='text-2xl'>{token.icon}</span>
													<div>
														<div className='font-medium'>{token.symbol}</div>
														<div className='text-sm text-muted-foreground'>
															{token.name}
														</div>
													</div>
													{token.trending && (
														<Badge
															variant='secondary'
															className='bg-orange-500/20 text-orange-400'>
															<TrendingUp className='h-3 w-3 mr-1' />
															Hot
														</Badge>
													)}
												</div>
												<div className='text-right'>
													<div className='font-medium'>
														₹{token.price.toLocaleString()}
													</div>
													<div
														className={`text-sm flex items-center gap-1 ${
															token.change24h > 0
																? 'text-green-400'
																: 'text-red-400'
														}`}>
														{token.change24h > 0 ? (
															<TrendingUp className='h-3 w-3' />
														) : (
															<TrendingDown className='h-3 w-3' />
														)}
														{Math.abs(token.change24h)}%
													</div>
												</div>
											</div>
											<div className='mt-3 flex items-center justify-between'>
												<div className='text-xs text-muted-foreground'>
													Volume: ₹{(token.volume / 1000000).toFixed(1)}M
												</div>
												<Button
													variant='outline'
													size='sm'
													onClick={() => {
														addToken(token);
														setCurrentTab('create');
													}}
													disabled={selectedTokens.some(
														(t) => t.symbol === token.symbol
													)}>
													{selectedTokens.some(
														(t) => t.symbol === token.symbol
													) ? (
														<CheckCircle className='h-3 w-3 mr-1' />
													) : (
														<Plus className='h-3 w-3 mr-1' />
													)}
													{selectedTokens.some((t) => t.symbol === token.symbol)
														? 'Added'
														: 'Add'}
												</Button>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</TabsContent>
				</Tabs>

				{/* Share Dialog */}
				<Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Share Your Basket</DialogTitle>
							<DialogDescription>
								Share this basket with others so they can view or invest in it.
							</DialogDescription>
						</DialogHeader>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='share-link'>Shareable Link</Label>
								<div className='flex gap-2'>
									<Input
										id='share-link'
										value={shareableLink}
										readOnly
										className='flex-1'
									/>
									<Button
										variant='outline'
										onClick={() =>
											navigator.clipboard.writeText(shareableLink)
										}>
										<Copy className='h-4 w-4' />
									</Button>
								</div>
							</div>
							<div className='flex gap-2'>
								<Button variant='outline' className='flex-1'>
									<QrCode className='h-4 w-4 mr-2' />
									QR Code
								</Button>
								<Button variant='outline' className='flex-1'>
									<ExternalLink className='h-4 w-4 mr-2' />
									Open Link
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</DashboardLayout>
	);
}
