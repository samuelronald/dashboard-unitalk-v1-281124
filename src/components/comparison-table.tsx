import { Table, Tag, Tooltip } from 'antd';
import { Check, X } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { LLMModel } from '../types';

interface ComparisonTableProps {
  models: LLMModel[];
}

export function ComparisonTable({ models }: ComparisonTableProps) {
  const columns: ColumnsType<LLMModel> = [
    {
      title: 'Model',
      key: 'name',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-gray-500">{record.provider}</div>
        </div>
      ),
      fixed: 'left',
      width: 200,
    },
    {
      title: 'Input Cost',
      dataIndex: 'inputCost',
      key: 'inputCost',
      render: (value) => `$${value.toFixed(6)}/token`,
      width: 120,
    },
    {
      title: 'Output Cost',
      dataIndex: 'outputCost',
      key: 'outputCost',
      render: (value) => `$${value.toFixed(6)}/token`,
      width: 120,
    },
    {
      title: 'Context',
      dataIndex: 'contextWindow',
      key: 'contextWindow',
      render: (value) => `${(value / 1000)}k tokens`,
      width: 120,
    },
    {
      title: 'Speed',
      dataIndex: 'averageSpeed',
      key: 'averageSpeed',
      render: (value) => `~${value} tokens/s`,
      width: 120,
    },
    {
      title: 'Features',
      key: 'specialFeatures',
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          {record.specialFeatures?.map((feature) => (
            <Tag key={feature}>{feature}</Tag>
          ))}
        </div>
      ),
      width: 200,
    },
    {
      title: 'Capabilities',
      key: 'capabilities',
      render: (_, record) => (
        <div className="flex flex-wrap gap-2">
          {Object.entries(record.capabilities).map(([key, value]) => (
            <Tooltip key={key} title={key.replace(/([A-Z])/g, ' $1').trim()}>
              {value ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </Tooltip>
          ))}
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={models}
      rowKey="id"
      scroll={{ x: 1000 }}
      pagination={false}
    />
  );
}