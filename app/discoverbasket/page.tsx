import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface Basket {
  id: string;
  name: string;
  description: string;
  type: string;
  value: string;
  stocksPreview: string[];
  investedCount: number;
}

const sampleBaskets: Basket[] = [
  {
    id: '1',
    name: 'DeFi Blue Chip Basket',
    description: 'A diversified basket of leading DeFi protocols.',
    type: 'DeFi',
    value: '$1,200.50',
    stocksPreview: ['ETH', 'UNI', 'AAVE'],
    investedCount: 1250,
  },
  {
    id: '2',
    name: 'NFT Art Collection',
    description: 'Curated collection of rare digital art NFTs.',
    type: 'NFT',
    value: '$5,000.00',
    stocksPreview: ['BAYC', 'CryptoPunks', 'ArtBlocks'],
    investedCount: 340,
  },
  {
    id: '3',
    name: 'Gaming Metaverse Portfolio',
    description: 'Investments in promising blockchain gaming projects and metaverse land.',
    type: 'Gaming',
    value: '$800.75',
    stocksPreview: ['AXS', 'SAND', 'MANA'],
    investedCount: 890,
  },
  {
    id: '4',
    name: 'Stablecoin Yield Basket',
    description: 'Low-risk basket focused on stablecoin yield farming.',
    type: 'Stablecoin',
    value: '$2,500.00',
    stocksPreview: ['USDT', 'USDC', 'DAI'],
    investedCount: 2100,
  },
  {
    id: '5',
    name: 'Web3 Infrastructure Basket',
    description: 'Basket focused on foundational Web3 projects.',
    type: 'Web3',
    value: '$1,800.00',
    stocksPreview: ['DOT', 'LINK', 'FIL'],
    investedCount: 750,
  },
  {
    id: '6',
    name: 'AI & Blockchain Synergy Basket',
    description: 'Combining AI and blockchain for future tech.',
    type: 'AI',
    value: '$3,200.00',
    stocksPreview: ['FET', 'AGIX', 'RNDR'],
    investedCount: 500,
  },
  {
    id: '7',
    name: 'Layer 2 Solutions Basket',
    description: 'Basket focusing on scalable Layer 2 blockchain solutions.',
    type: 'Layer 2',
    value: '$1,500.00',
    stocksPreview: ['MATIC', 'OP', 'ARB'],
    investedCount: 980,
  },
  {
    id: '8',
    name: 'Privacy Coin Basket',
    description: 'A selection of leading privacy-focused cryptocurrencies.',
    type: 'Privacy',
    value: '$950.00',
    stocksPreview: ['XMR', 'ZEC', 'DASH'],
    investedCount: 420,
  },
  {
    id: '9',
    name: 'Oracle Network Basket',
    description: 'Investments in decentralized oracle networks.',
    type: 'Oracle',
    value: '$1,100.00',
    stocksPreview: ['LINK', 'BAND', 'API3'],
    investedCount: 610,
  },
  {
    id: '10',
    name: 'Cross-Chain Interoperability Basket',
    description: 'Projects enabling seamless communication between blockchains.',
    type: 'Cross-Chain',
    value: '$2,100.00',
    stocksPreview: ['ATOM', 'DOT', 'ONE'],
    investedCount: 780,
  },
  {
    id: '11',
    name: 'Decentralized Storage Basket',
    description: 'Basket focused on decentralized data storage solutions.',
    type: 'Storage',
    value: '$700.00',
    stocksPreview: ['FIL', 'AR', 'SIA'],
    investedCount: 300,
  },
  {
    id: '12',
    name: 'Metaverse Gaming Guilds Basket',
    description: 'Investments in play-to-earn gaming guilds and assets.',
    type: 'Gaming Guilds',
    value: '$1,300.00',
    stocksPreview: ['YGG', 'MC', 'GF'],
    investedCount: 550,
  },
  {
    id: '13',
    name: 'Decentralized Social Media Basket',
    description: 'Projects building censorship-resistant social platforms.',
    type: 'SocialFi',
    value: '$600.00',
    stocksPreview: ['DESO', 'MASK', 'RPL'],
    investedCount: 280,
  },
  {
    id: '14',
    name: 'Real World Assets (RWA) Basket',
    description: 'Tokenized real-world assets and their underlying protocols.',
    type: 'RWA',
    value: '$2,800.00',
    stocksPreview: ['MKR', 'COMP', 'AAVE'],
    investedCount: 1100,
  },
  {
    id: '15',
    name: 'Liquid Staking Derivatives (LSD) Basket',
    description: 'Protocols offering liquid staking solutions.',
    type: 'LSD',
    value: '$1,900.00',
    stocksPreview: ['LDO', 'RPL', 'FXS'],
    investedCount: 900,
  },
  {
    id: '16',
    name: 'Decentralized Science (DeSci) Basket',
    description: 'Projects leveraging blockchain for scientific research and funding.',
    type: 'DeSci',
    value: '$400.00',
    stocksPreview: ['LABS', 'GENE', 'OCEAN'],
    investedCount: 150,
  },
];

const DiscoverBasketPage = () => {
  const basketTypes = [
    'All',
    'DeFi',
    'NFT',
    'Gaming',
    'Stablecoin',
    'Web3',
    'AI',
    'Layer 2',
    'Privacy',
    'Oracle',
    'Cross-Chain',
    'Storage',
    'Gaming Guilds',
    'SocialFi',
    'RWA',
    'LSD',
    'DeSci',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-gradient-to-br from-purple-900 to-green-500">
      <h1 className="text-4xl font-bold mb-8 text-white">Discover Baskets</h1>
      <Tabs defaultValue="All" className="w-full max-w-6xl">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-9">
          {basketTypes.map(type => (
            <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
          ))}
        </TabsList>
        {basketTypes.map(type => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {(type === 'All' ? sampleBaskets : sampleBaskets.filter(basket => basket.type === type)).map((basket) => (
                <Card key={basket.id} className="w-full bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-50 shadow-lg rounded-lg">
                  <CardHeader>
                    <CardTitle>{basket.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{basket.description}</p>
                    <p className="text-md font-semibold">Type: {basket.type} {
                      basket.type === 'DeFi' && '💰'
                    } {
                      basket.type === 'Layer 2' && '🔗'
                    } {
                      basket.type === 'Privacy' && '🕵️'
                    } {
                      basket.type === 'Oracle' && '🔮'
                    } {
                      basket.type === 'Cross-Chain' && '🌉'
                    } {
                      basket.type === 'Storage' && '💾'
                    } {
                      basket.type === 'Gaming Guilds' && '⚔️'
                    } {
                      basket.type === 'SocialFi' && '🤝'
                    } {
                      basket.type === 'RWA' && '🏘️'
                    } {
                      basket.type === 'LSD' && '💧'
                    } {
                      basket.type === 'DeSci' && '🔬'
                    } {
                      basket.type === 'NFT' && '🖼️'
                    } {
                      basket.type === 'Gaming' && '🎮'
                    } {
                      basket.type === 'Stablecoin' && '💵'
                    }</p>
                    <p className="text-md font-semibold">Value: {basket.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Stocks: {basket.stocksPreview.join(', ')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Investors: {basket.investedCount}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DiscoverBasketPage;