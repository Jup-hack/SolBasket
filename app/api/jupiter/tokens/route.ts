import { NextResponse } from 'next/server';

// Jupiter Token List endpoint
const JUPITER_TOKEN_LIST_URL = 'https://token.jup.ag/all';
const JUPITER_PRICE_URL = 'https://api.jup.ag/price/v2';

export async function GET() {
	try {
		// Fetch token list from Jupiter
		const tokenResponse = await fetch(JUPITER_TOKEN_LIST_URL);
		const tokens = await tokenResponse.json();

		// Filter for popular tokens
		const popularTokens = tokens.filter((token: { symbol: string }) =>
			['SOL', 'USDC', 'RAY', 'JUP', 'BONK', 'JTO'].includes(token.symbol)
		);

		// Get token addresses for price fetching
		const tokenAddresses = popularTokens
			.map((token: { address: string }) => token.address)
			.join(',');

		// Fetch prices from Jupiter Price API
		const priceResponse = await fetch(
			`${JUPITER_PRICE_URL}?ids=${tokenAddresses}`
		);
		const priceData = await priceResponse.json();

		// Combine token data with prices
		const enrichedTokens = popularTokens.map(
			(token: {
				symbol: string;
				name: string;
				address: string;
				logoURI?: string;
			}) => {
				const tokenPrice = priceData.data[token.address];
				const priceInINR = tokenPrice?.price ? tokenPrice.price * 83.25 : 0; // Rough USD to INR conversion

				return {
					symbol: token.symbol,
					name: token.name,
					address: token.address,
					price: priceInINR,
					change24h: Math.random() * 20 - 10, // Mock 24h change for now
					volume: Math.random() * 1000000000, // Mock volume
					marketCap: Math.random() * 10000000000, // Mock market cap
					icon: getTokenIcon(token.symbol),
					trending: Math.random() > 0.5,
					logoURI: token.logoURI,
				};
			}
		);

		return NextResponse.json({ tokens: enrichedTokens });
	} catch (error) {
		console.error('Error fetching Jupiter tokens:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch token data' },
			{ status: 500 }
		);
	}
}

function getTokenIcon(symbol: string): string {
	const icons: { [key: string]: string } = {
		SOL: '🟣',
		USDC: '💵',
		RAY: '🌊',
		JUP: '🪐',
		BONK: '🐕',
		JTO: '🚀',
	};
	return icons[symbol] || '🪙';
}
