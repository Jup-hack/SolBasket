'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	Home,
	PieChart,
	Search,
	Plus,
	Activity,
	Settings,
	Menu,
	Wallet,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

interface NavigationItem {
	name: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	count?: number;
}

const navigation: NavigationItem[] = [
	{ name: 'Home', href: '/', icon: Home },
	{ name: 'My Baskets', href: '/baskets', icon: PieChart, count: 5 },
	{ name: 'Discover', href: '/discover', icon: Search },
	{ name: 'Create Basket', href: '/create', icon: Plus },
	{ name: 'Activity', href: '/activity', icon: Activity },
	{ name: 'Settings', href: '/settings', icon: Settings },
];

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const pathname = usePathname();

	const SidebarContent = () => (
		<div className='flex h-full flex-col'>
			{/* Logo */}
			<div className='flex h-16 items-center gap-2 border-b px-4'>
				<div className='h-8 w-8 rounded-lg gradient-solana'></div>
				{!sidebarCollapsed && (
					<span className='text-xl font-bold'>SolanaCase</span>
				)}
			</div>

			{/* Navigation */}
			<ScrollArea className='flex-1 px-2 py-4'>
				<nav className='space-y-2'>
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${
										isActive
											? 'bg-primary text-primary-foreground'
											: 'hover:bg-accent hover:text-accent-foreground'
									}
                `}>
								<item.icon className='h-4 w-4 shrink-0' />
								{!sidebarCollapsed && (
									<>
										<span className='flex-1'>{item.name}</span>
										{item.count && (
											<Badge
												variant='secondary'
												className='ml-auto h-5 w-5 shrink-0 p-0 text-xs'>
												{item.count}
											</Badge>
										)}
									</>
								)}
							</Link>
						);
					})}
				</nav>
			</ScrollArea>

			{/* Collapse button */}
			<div className='border-t px-2 py-3'>
				<Button
					variant='ghost'
					size='sm'
					onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
					className='w-full justify-center'>
					{sidebarCollapsed ? (
						<ChevronRight className='h-4 w-4' />
					) : (
						<ChevronLeft className='h-4 w-4' />
					)}
				</Button>
			</div>
		</div>
	);

	return (
		<div className='flex h-screen bg-background'>
			{/* Desktop Sidebar */}
			<div
				className={`hidden md:flex md:flex-col border-r transition-all duration-300 ${
					sidebarCollapsed ? 'md:w-16' : 'md:w-60'
				}`}>
				<SidebarContent />
			</div>

			{/* Mobile Sidebar */}
			<Sheet>
				<div className='flex flex-1 flex-col md:hidden'>
					{/* Mobile Header */}
					<header className='flex h-16 items-center gap-4 border-b px-4 md:hidden'>
						<SheetTrigger asChild>
							<Button variant='ghost' size='sm'>
								<Menu className='h-4 w-4' />
							</Button>
						</SheetTrigger>
						<div className='h-8 w-8 rounded-lg gradient-solana'></div>
						<span className='text-xl font-bold'>SolanaCase</span>
					</header>
				</div>
				<SheetContent side='left' className='p-0 w-60'>
					<SidebarContent />
				</SheetContent>
			</Sheet>

			{/* Main Content */}
			<div className='flex flex-1 flex-col overflow-hidden'>
				{/* Desktop Header */}
				<header className='hidden md:flex h-16 items-center justify-between border-b px-6'>
					<div className='flex items-center gap-4'>
						{/* Network Pill */}
						<Badge variant='outline' className='px-3 py-1'>
							<div className='h-2 w-2 rounded-full bg-green-500 mr-2'></div>
							Devnet
						</Badge>
					</div>

					<div className='flex items-center gap-4'>
						{/* USD Balance */}
						<div className='text-right'>
							<p className='text-sm text-muted-foreground'>Portfolio Value</p>
							<p className='text-lg font-semibold'>$12,450.67</p>
						</div>

						{/* Wallet Connect */}
						<Button className='gradient-solana'>
							<Wallet className='h-4 w-4 mr-2' />
							Connect Wallet
						</Button>
					</div>
				</header>

				{/* Page Content */}
				<main className='flex-1 overflow-y-auto p-6'>
					<div className='animate-fade-slide-in'>{children}</div>
				</main>
			</div>
		</div>
	);
}
