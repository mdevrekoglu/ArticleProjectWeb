import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd/es/table';
import { affiliationDataListModel, affiliationDataModel } from '../models';

interface AffiliationTableProps {
  data?: affiliationDataListModel;
  onSortChange?: TableProps<affiliationDataModel>['onChange'];
  pagination: TableProps<affiliationDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void; // Callback to open the modal with ID
}

const AffiliationTable: React.FC<AffiliationTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const columns = [
    {
      title: 'Affiliation Name',
      dataIndex: 'affiliationName',
      key: 'affiliationName',
      sorter: true,
      render: (text: string, record: affiliationDataModel) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => onOpenModal && onOpenModal(record.id)}
            style={{ marginRight: 8 }}
          />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: true
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: true
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      sorter: true
    },
    {
      title: 'Organization Type',
      dataIndex: 'organizationType',
      key: 'organizationType',
      sorter: true
    }
  ];

  return (
    <Table
      dataSource={data?.data || []}
      columns={columns}
      bordered
      rowKey='id'
      pagination={pagination}
      onChange={onSortChange}
      loading={loading}
    />
  );
};

export default AffiliationTable;
