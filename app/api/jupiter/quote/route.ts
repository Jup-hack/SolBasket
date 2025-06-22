import { NextRequest, NextResponse } from 'next/server';

const JUPITER_QUOTE_URL = 'https://quote-api.jup.ag/v6/quote';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const inputMint = searchParams.get('inputMint');
		const outputMint = searchParams.get('outputMint');
		const amount = searchParams.get('amount');
		const slippageBps = searchParams.get('slippageBps') || '50';

		if (!inputMint || !outputMint || !amount) {
			return NextResponse.json(
				{ error: 'Missing required parameters: inputMint, outputMint, amount' },
				{ status: 400 }
			);
		}

		// Build Jupiter Quote API URL
		const quoteUrl = new URL(JUPITER_QUOTE_URL);
		quoteUrl.searchParams.set('inputMint', inputMint);
		quoteUrl.searchParams.set('outputMint', outputMint);
		quoteUrl.searchParams.set('amount', amount);
		quoteUrl.searchParams.set('slippageBps', slippageBps);

		const response = await fetch(quoteUrl.toString());

		if (!response.ok) {
			throw new Error(`Jupiter Quote API error: ${response.status}`);
		}

		const quoteData = await response.json();

		return NextResponse.json(quoteData);
	} catch (error) {
		console.error('Error fetching Jupiter quote:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch quote' },
			{ status: 500 }
		);
	}
}
