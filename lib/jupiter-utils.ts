// Utility functions for Jupiter integration

import { SwapQuote } from './jupiter-service';

/**
 * Convert amount to lamports (smallest unit in Solana)
 */
export const toLamports = (amount: number, decimals: number = 9): string => {
	return Math.floor(amount * Math.pow(10, decimals)).toString();
};

/**
 * Convert lamports back to decimal amount
 */
export const fromLamports = (
	lamports: string,
	decimals: number = 9
): number => {
	return parseInt(lamports) / Math.pow(10, decimals);
};

/**
 * Calculate price impact from quote
 */
export const calculatePriceImpact = (quote: SwapQuote): number => {
	return parseFloat(quote.priceImpactPct) * 100;
};

/**
 * Calculate swap fee from quote
 */
export const calculateSwapFee = (): number => {
	// Jupiter's fee is typically included in the price impact
	// This is a placeholder for custom fee calculation
	return 0;
};

/**
 * Format currency amount for display
 */
export const formatCurrency = (
	amount: number,
	currency: string = '₹'
): string => {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: currency === '₹' ? 'INR' : 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
};

/**
 * Format large numbers (K, M, B)
 */
export const formatLargeNumber = (num: number): string => {
	if (num >= 1e9) {
		return (num / 1e9).toFixed(1) + 'B';
	}
	if (num >= 1e6) {
		return (num / 1e6).toFixed(1) + 'M';
	}
	if (num >= 1e3) {
		return (num / 1e3).toFixed(1) + 'K';
	}
	return num.toString();
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
	oldValue: number,
	newValue: number
): number => {
	return ((newValue - oldValue) / oldValue) * 100;
};

/**
 * Validate Solana address
 */
export const isValidSolanaAddress = (address: string): boolean => {
	// Basic validation - Solana addresses are base58 and 32-44 characters
	const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
	return base58Regex.test(address);
};

/**
 * Generate risk level based on volatility
 */
export const calculateRiskLevel = (
	change24h: number
): {
	level: string;
	color: string;
} => {
	const absChange = Math.abs(change24h);

	if (absChange > 20) return { level: 'Very High', color: 'bg-red-500' };
	if (absChange > 10) return { level: 'High', color: 'bg-orange-500' };
	if (absChange > 5) return { level: 'Medium', color: 'bg-yellow-500' };
	return { level: 'Low', color: 'bg-green-500' };
};

/**
 * Retry function with exponential backoff
 */
export const retryWithBackoff = async <T>(
	fn: () => Promise<T>,
	maxRetries: number = 3,
	baseDelay: number = 1000
): Promise<T> => {
	let lastError: Error;

	for (let i = 0; i < maxRetries; i++) {
		try {
			return await fn();
		} catch (error) {
			lastError = error as Error;

			if (i < maxRetries - 1) {
				const delay = baseDelay * Math.pow(2, i);
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}
	}

	throw lastError!;
};

/**
 * Debounce function for API calls
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timeoutId: NodeJS.Timeout;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	};
};

/**
 * Calculate optimal slippage based on token volatility
 */
export const calculateOptimalSlippage = (change24h: number): number => {
	const absChange = Math.abs(change24h);

	// Base slippage is 0.5% (50 bps)
	let slippage = 50;

	// Increase slippage for more volatile tokens
	if (absChange > 20) slippage = 200; // 2%
	else if (absChange > 10) slippage = 100; // 1%
	else if (absChange > 5) slippage = 75; // 0.75%

	return slippage;
};

/**
 * Get token icon by symbol
 */
export const getTokenIcon = (symbol: string): string => {
	const icons: { [key: string]: string } = {
		SOL: '🟣',
		USDC: '💵',
		USDT: '💰',
		RAY: '🌊',
		JUP: '🪐',
		BONK: '🐕',
		JTO: '🚀',
		ORCA: '🐋',
		SRM: '🏺',
		MNGO: '🥭',
		BTC: '₿',
		ETH: '⟠',
	};
	return icons[symbol] || '🪙';
};
