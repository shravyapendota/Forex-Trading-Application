import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3, Clock } from 'lucide-react';

interface RealTimeDataProps {
  selectedPair: string;
  currentPrice: number;
}

interface MarketData {
  pair: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  spread: number;
}

// Mock real-time market data
const generateMarketData = (selectedPair: string, currentPrice: number): MarketData[] => {
  const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD', 'USD/CAD'];
  
  return pairs.map(pair => {
    const basePrice = pair === selectedPair ? currentPrice : 
      pair === 'EUR/USD' ? 1.0847 :
      pair === 'GBP/USD' ? 1.2734 :
      pair === 'USD/JPY' ? 148.25 :
      pair === 'USD/CHF' ? 0.8756 :
      pair === 'AUD/USD' ? 0.6543 : 1.3456;
    
    const change = (Math.random() - 0.5) * 0.01;
    const changePercent = (change / basePrice) * 100;
    
    return {
      pair,
      price: Number((basePrice + change).toFixed(5)),
      change: Number(change.toFixed(5)),
      changePercent: Number(changePercent.toFixed(3)),
      volume: Math.floor(Math.random() * 50000000) + 10000000,
      spread: Number((Math.random() * 0.0005 + 0.0001).toFixed(5))
    };
  });
};

export const RealTimeData = ({ selectedPair, currentPrice }: RealTimeDataProps) => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const updateData = () => {
      setMarketData(generateMarketData(selectedPair, currentPrice));
      setLastUpdate(new Date());
    };

    updateData();
    const interval = setInterval(updateData, 2000);

    return () => clearInterval(interval);
  }, [selectedPair, currentPrice]);

  const selectedData = marketData.find(data => data.pair === selectedPair);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Main Price Card */}
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">{selectedPair}</span>
            </div>
            <Badge variant="secondary" className="bg-success/20 text-success">Live</Badge>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono">{currentPrice.toFixed(5)}</div>
            {selectedData && (
              <div className={`flex items-center gap-1 text-sm ${
                selectedData.change >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {selectedData.change >= 0 ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                {selectedData.change >= 0 ? '+' : ''}{selectedData.change.toFixed(5)} 
                ({selectedData.changePercent >= 0 ? '+' : ''}{selectedData.changePercent.toFixed(2)}%)
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Market Overview</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Volume (24h)</span>
              <span className="font-mono">{selectedData?.volume.toLocaleString() || '0'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Spread</span>
              <span className="font-mono">{selectedData?.spread.toFixed(5) || '0.00000'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Volatility</span>
              <span className="text-warning">Medium</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Status */}
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">AI Signals</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">SMA Signal</span>
              <Badge variant="secondary" className="bg-success/20 text-success text-xs">BUY</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">RSI Signal</span>
              <Badge variant="secondary" className="bg-warning/20 text-warning text-xs">HOLD</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">MACD Signal</span>
              <Badge variant="secondary" className="bg-danger/20 text-danger text-xs">SELL</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="md:col-span-1">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">System Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Connection</span>
              <Badge variant="secondary" className="bg-success/20 text-success text-xs">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Latency</span>
              <span className="text-xs font-mono">12ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Last Update</span>
              <span className="text-xs font-mono">{lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Major Pairs Quick View */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Major Currency Pairs</span>
            <Badge variant="outline" className="ml-auto">Live Prices</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {marketData.map((data) => (
              <div 
                key={data.pair} 
                className={`p-3 rounded-lg border ${
                  data.pair === selectedPair ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{data.pair}</span>
                  {data.change >= 0 ? 
                    <TrendingUp className="h-3 w-3 text-success" /> : 
                    <TrendingDown className="h-3 w-3 text-danger" />
                  }
                </div>
                <div className="font-mono text-sm font-bold">{data.price.toFixed(5)}</div>
                <div className={`text-xs ${data.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};