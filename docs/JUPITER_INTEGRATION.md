# Jupiter API Integration

This document explains how the Jupiter API integration works in the Crypto Basket Creator application.

## Overview

The application integrates with Jupiter's APIs to provide real-time token data and swap functionality:

- **Token API**: Fetches token metadata and pricing information
- **Price API**: Gets current token prices in real-time
- **Swap API**: Executes token swaps for basket investments

## API Routes

### `/api/jupiter/tokens`

- **Method**: GET
- **Description**: Fetches trending tokens with real-time price data
- **Response**: Array of token objects with price, volume, and market cap

### `/api/jupiter/quote`

- **Method**: GET
- **Parameters**:
  - `inputMint`: Input token address
  - `outputMint`: Output token address
  - `amount`: Amount to swap (in smallest units)
  - `slippageBps`: Slippage tolerance in basis points (optional, default: 50)
- **Description**: Gets a swap quote from Jupiter

### `/api/jupiter/swap`

- **Method**: POST
- **Body**:
  ```json
  {
    "quoteResponse": {...},
    "userPublicKey": "string"
  }
  ```
- **Description**: Executes a single token swap

- **Method**: PUT
- **Body**:
  ```json
  {
    "basket": {
      "name": "string",
      "tokens": [...]
    },
    "userPublicKey": "string",
    "totalAmount": number
  }
  ```
- **Description**: Executes multiple swaps for a basket

## Services

### `JupiterService` (`lib/jupiter-service.ts`)

Main service class that handles Jupiter API interactions:

- `fetchTokens()`: Get trending tokens
- `getSwapQuote()`: Get swap quotes
- `executeSwap()`: Execute single swaps
- `executeBasketSwap()`: Execute basket swaps

### Hooks (`hooks/use-jupiter.ts`)

React hooks for managing Jupiter API state:

- `useJupiterTokens()`: Fetch and manage token data
- `useJupiterSwap()`: Handle swap operations
- `useWallet()`: Manage wallet connection (placeholder)

## Configuration

Configuration is managed in `lib/config.ts`:

```typescript
const config = {
	jupiter: {
		tokenListUrl: 'https://token.jup.ag/all',
		priceUrl: 'https://api.jup.ag/price/v2',
		quoteUrl: 'https://quote-api.jup.ag/v6/quote',
		swapUrl: 'https://quote-api.jup.ag/v6/swap',
	},
	defaults: {
		slippageBps: 50, // 0.5%
	},
};
```

## Environment Variables

Create a `.env.local` file with:

```env
JUPITER_FEE_ACCOUNT=your_fee_account_here_optional
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Error Handling

The integration includes comprehensive error handling:

- Network errors are caught and displayed to users
- Invalid parameters return appropriate error responses
- Swap failures are handled gracefully with user feedback

## Wallet Integration

The current implementation includes a placeholder wallet hook. For production, integrate with:

- [@solana/wallet-adapter-react](https://github.com/solana-labs/wallet-adapter)
- Popular Solana wallets (Phantom, Solflare, etc.)

## Rate Limiting

Jupiter APIs have rate limits. The integration includes:

- Automatic retries for failed requests
- Error handling for rate limit responses
- Fallback to mock data when APIs are unavailable

## Security Considerations

- Never expose private keys in client-side code
- Validate all user inputs before API calls
- Implement proper authentication for sensitive operations
- Use HTTPS for all API communications

## Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Navigate to `/createbasket`
3. The app will automatically fetch real token data from Jupiter
4. Create a basket and test the investment flow

## Production Deployment

For production deployment:

1. Set up proper environment variables
2. Configure CORS for your domain
3. Implement proper error monitoring
4. Set up wallet integration
5. Test with small amounts first

## Support

For Jupiter API issues:

- [Jupiter Discord](https://discord.gg/jup)
- [Jupiter Documentation](https://dev.jup.ag/)

For integration issues:

- Check the browser console for error messages
- Verify environment variables are set correctly
- Ensure your RPC endpoint is accessible
