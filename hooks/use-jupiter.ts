import { useState, useEffect, useCallback } from 'react';
import jupiterService, {
	JupiterToken,
	SwapQuote,
	BasketSwapRequest,
} from '@/lib/jupiter-service';

export const useJupiterTokens = () => {
	const [tokens, setTokens] = useState<JupiterToken[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchTokens = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const tokenData = await jupiterService.fetchTokens();
			setTokens(tokenData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch tokens');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTokens();
	}, [fetchTokens]);

	return {
		tokens,
		loading,
		error,
		refetch: fetchTokens,
	};
};

export const useJupiterSwap = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getQuote = useCallback(
		async (
			inputMint: string,
			outputMint: string,
			amount: number,
			slippageBps?: number
		): Promise<SwapQuote | null> => {
			try {
				setLoading(true);
				setError(null);
				const quote = await jupiterService.getSwapQuote(
					inputMint,
					outputMint,
					amount,
					slippageBps
				);
				return quote;
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to get quote');
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const executeSwap = useCallback(
		async (
			quoteResponse: SwapQuote,
			userPublicKey: string
		): Promise<{ swapTransaction: string } | null> => {
			try {
				setLoading(true);
				setError(null);
				const result = await jupiterService.executeSwap(
					quoteResponse,
					userPublicKey
				);
				return result;
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to execute swap');
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const executeBasketSwap = useCallback(
		async (
			request: BasketSwapRequest
		): Promise<{ success: boolean; results: any[] } | null> => {
			try {
				setLoading(true);
				setError(null);
				const result = await jupiterService.executeBasketSwap(request);
				return result;
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to execute basket swap'
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return {
		loading,
		error,
		getQuote,
		executeSwap,
		executeBasketSwap,
	};
};

// Hook for managing wallet connection (placeholder - you'd integrate with actual wallet)
export const useWallet = () => {
	const [connected, setConnected] = useState(false);
	const [publicKey, setPublicKey] = useState<string | null>(null);

	const connect = useCallback(async () => {
		// This is a placeholder - integrate with actual Solana wallet adapter
		try {
			// In a real app, you'd use @solana/wallet-adapter-react
			// For now, we'll mock a connection
			const mockPublicKey = 'YourSolanaWalletPublicKeyHere';
			setPublicKey(mockPublicKey);
			setConnected(true);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	}, []);

	const disconnect = useCallback(() => {
		setPublicKey(null);
		setConnected(false);
	}, []);

	return {
		connected,
		publicKey,
		connect,
		disconnect,
	};
};
