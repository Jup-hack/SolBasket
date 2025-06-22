// Configuration for Jupiter API integration

export const config = {
	// Jupiter API endpoints
	jupiter: {
		tokenListUrl: 'https://token.jup.ag/all',
		priceUrl: 'https://api.jup.ag/price/v2',
		quoteUrl: 'https://quote-api.jup.ag/v6/quote',
		swapUrl: 'https://quote-api.jup.ag/v6/swap',
		feeAccount: process.env.JUPITER_FEE_ACCOUNT || null,
	},

	// Solana configuration
	solana: {
		rpcUrl:
			process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
			'https://api.mainnet-beta.solana.com',
		cluster: 'mainnet-beta',
	},

	// Application settings
	app: {
		name: process.env.NEXT_PUBLIC_APP_NAME || 'Crypto Basket Creator',
		url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
	},

	// Default settings
	defaults: {
		slippageBps: 50, // 0.5%
		priorityFee: 0.0001, // SOL
		maxRetries: 3,
	},

	// Token addresses (Solana mainnet)
	tokens: {
		SOL: 'So11111111111111111111111111111111111111112',
		USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
		RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
		JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
		BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
		JTO: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
	},
};

export default config;
