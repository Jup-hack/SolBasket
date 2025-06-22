// Jupiter API service for handling token data and swaps

export interface JupiterToken {
	symbol: string;
	name: string;
	address: string;
	price: number;
	change24h: number;
	volume: number;
	marketCap: number;
	icon: string;
	trending: boolean;
	logoURI?: string;
}

export interface SwapQuote {
	inputMint: string;
	inAmount: string;
	outputMint: string;
	outAmount: string;
	otherAmountThreshold: string;
	swapMode: string;
	slippageBps: number;
	platformFee: null;
	priceImpactPct: string;
	routePlan: unknown[];
}

export interface BasketSwapRequest {
	basket: {
		name: string;
		tokens: Array<{
			symbol: string;
			address: string;
			allocation: number;
		}>;
	};
	userPublicKey: string;
	totalAmount: number;
}

class JupiterService {
	private baseUrl = '/api/jupiter';

	async fetchTokens(): Promise<JupiterToken[]> {
		try {
			const response = await fetch(`${this.baseUrl}/tokens`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data.tokens;
		} catch (error) {
			console.error('Error fetching tokens:', error);
			throw error;
		}
	}

	async getSwapQuote(
		inputMint: string,
		outputMint: string,
		amount: number,
		slippageBps: number = 50
	): Promise<SwapQuote> {
		try {
			const params = new URLSearchParams({
				inputMint,
				outputMint,
				amount: amount.toString(),
				slippageBps: slippageBps.toString(),
			});

			const response = await fetch(`${this.baseUrl}/quote?${params}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error getting swap quote:', error);
			throw error;
		}
	}

	async executeSwap(
		quoteResponse: SwapQuote,
		userPublicKey: string
	): Promise<{ swapTransaction: string }> {
		try {
			const response = await fetch(`${this.baseUrl}/swap`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					quoteResponse,
					userPublicKey,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error executing swap:', error);
			throw error;
		}
	}

	async executeBasketSwap(
		request: BasketSwapRequest
	): Promise<{ success: boolean; results: unknown[] }> {
		try {
			const response = await fetch(`${this.baseUrl}/swap`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error('Error executing basket swap:', error);
			throw error;
		}
	}

	// Token addresses for popular tokens (these would come from the API in production)
	static readonly TOKEN_ADDRESSES = {
		SOL: 'So11111111111111111111111111111111111111112',
		USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
		JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
		BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
		JTO: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
	};
}

// Utility functions
export const formatTokenAmount = (
	amount: number,
	decimals: number = 9
): string => {
	return (amount * Math.pow(10, decimals)).toString();
};

export const parseTokenAmount = (
	amount: string,
	decimals: number = 9
): number => {
	return parseInt(amount) / Math.pow(10, decimals);
};

export const calculatePriceImpact = (quote: SwapQuote): number => {
	return parseFloat(quote.priceImpactPct) * 100;
};

export const jupiterService = new JupiterService();
export default jupiterService;
