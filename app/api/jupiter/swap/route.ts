import { NextRequest, NextResponse } from 'next/server';

const JUPITER_SWAP_URL = 'https://quote-api.jup.ag/v6/swap';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {
			quoteResponse,
			userPublicKey,
			wrapAndUnwrapSol = true,
			useSharedAccounts = true,
		} = body;

		if (!quoteResponse || !userPublicKey) {
			return NextResponse.json(
				{ error: 'Missing required parameters: quoteResponse, userPublicKey' },
				{ status: 400 }
			);
		}

		// Prepare swap request body
		const swapRequest = {
			quoteResponse,
			userPublicKey,
			wrapAndUnwrapSol,
			useSharedAccounts,
			feeAccount: process.env.JUPITER_FEE_ACCOUNT, // Optional fee account for integrators
		};

		const response = await fetch(JUPITER_SWAP_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(swapRequest),
		});

		if (!response.ok) {
			const errorData = await response.text();
			throw new Error(
				`Jupiter Swap API error: ${response.status} - ${errorData}`
			);
		}

		const swapData = await response.json();

		return NextResponse.json(swapData);
	} catch (error) {
		console.error('Error executing Jupiter swap:', error);
		return NextResponse.json(
			{ error: 'Failed to execute swap' },
			{ status: 500 }
		);
	}
}

// Handle basket swaps - multiple token purchases
export async function PUT(request: NextRequest) {
	try {
		const body = await request.json();
		const { basket, userPublicKey, totalAmount } = body;

		if (!basket || !userPublicKey || !totalAmount) {
			return NextResponse.json(
				{
					error:
						'Missing required parameters: basket, userPublicKey, totalAmount',
				},
				{ status: 400 }
			);
		}

		const swapResults = [];

		// Execute swaps for each token in the basket
		for (const token of basket.tokens) {
			const tokenAmount = (totalAmount * token.allocation) / 100;

			try {
				// Get quote first
				const quoteResponse = await fetch(
					`/api/jupiter/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${
						token.address
					}&amount=${Math.floor(tokenAmount * 1e9)}`
				);
				const quote = await quoteResponse.json();

				if (quote.error) {
					throw new Error(`Quote error for ${token.symbol}: ${quote.error}`);
				}

				// Execute swap
				const swapResponse = await fetch('/api/jupiter/swap', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						quoteResponse: quote,
						userPublicKey,
					}),
				});

				const swapResult = await swapResponse.json();

				if (swapResult.error) {
					throw new Error(
						`Swap error for ${token.symbol}: ${swapResult.error}`
					);
				}

				swapResults.push({
					token: token.symbol,
					success: true,
					transaction: swapResult.swapTransaction,
					amount: tokenAmount,
				});
			} catch (error) {
				swapResults.push({
					token: token.symbol,
					success: false,
					error: error instanceof Error ? error.message : 'Unknown error',
					amount: tokenAmount,
				});
			}
		}

		return NextResponse.json({
			success: swapResults.every((r) => r.success),
			results: swapResults,
		});
	} catch (error) {
		console.error('Error executing basket swap:', error);
		return NextResponse.json(
			{ error: 'Failed to execute basket swap' },
			{ status: 500 }
		);
	}
}
