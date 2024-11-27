import { useState } from 'react';
import { Card, Tabs, Empty } from 'antd';
import { Grid, List, BarChart2, Plus } from 'lucide-react';
import { ModelComparisonCard } from '../components/model-comparison-card';
import { ComparisonTable } from '../components/comparison-table';
import { ComparisonChart } from '../components/comparison-chart';
import { llmModels, getModelsByProvider } from '../data/llm-models';

export default function CompareLLM() {
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'chart'>('cards');
  const groupedModels = getModelsByProvider();

  const handleToggleModel = (modelId: string) => {
    const newSelected = new Set(selectedModels);
    if (newSelected.has(modelId)) {
      newSelected.delete(modelId);
    } else if (newSelected.size < 5) {
      newSelected.add(modelId);
    }
    setSelectedModels(newSelected);
  };

  const selectedModelsList = llmModels.filter(model => selectedModels.has(model.id));

  const items = Object.entries(groupedModels).map(([provider, models]) => ({
    key: provider,
    label: provider,
    children: (
      <Card>
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model) => (
              <ModelComparisonCard
                key={model.id}
                model={model}
                onToggle={handleToggleModel}
                disabled={!selectedModels.has(model.id) && selectedModels.size >= 5}
              />
            ))}
          </div>
        )}
        {viewMode === 'table' && <ComparisonTable models={models} />}
        {viewMode === 'chart' && <ComparisonChart models={models} />}
      </Card>
    ),
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Compare LLM Models</h1>
          <p className="text-gray-500 mt-2">
            Compare capabilities and features across different LLM models
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded ${viewMode === 'cards' ? 'bg-white shadow' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`p-2 rounded ${viewMode === 'chart' ? 'bg-white shadow' : ''}`}
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedModels.size > 0 && (
        <Card title="Selected Models">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">
              {selectedModels.size} of 5 models selected
            </span>
            <button
              onClick={() => setSelectedModels(new Set())}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all
            </button>
          </div>
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedModelsList.map((model) => (
                <ModelComparisonCard
                  key={model.id}
                  model={model}
                  onToggle={handleToggleModel}
                />
              ))}
            </div>
          )}
          {viewMode === 'table' && <ComparisonTable models={selectedModelsList} />}
          {viewMode === 'chart' && <ComparisonChart models={selectedModelsList} />}
        </Card>
      )}

      <Tabs defaultActiveKey="Google" items={items} />

      {selectedModels.size === 0 && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No models selected"
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p>Select up to 5 models to compare their features and capabilities</p>
          </div>
        </Empty>
      )}
    </div>
  );
}