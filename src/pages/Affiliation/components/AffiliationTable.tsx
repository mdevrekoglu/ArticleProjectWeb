import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { TableProps } from 'antd/es/table';
import { affiliationDataListModel, affiliationDataModel } from '../models';
import { useIntl } from 'react-intl';
import affiliationResources from '../messages';
import Permission from '../../../components/Permission/Permission';

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
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(affiliationResources.affiliation),
      dataIndex: 'affiliationName',
      key: 'affiliationName',
      sorter: true,
      render: (text: string, record: affiliationDataModel) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Permission roles={['Admin']}>
            <Button
              type='link'
              icon={<EditOutlined />}
              onClick={() => onOpenModal && onOpenModal(record.id)}
              style={{ marginRight: 8 }}
            />
          </Permission>
          <span>{text}</span>
        </div>
      )
    },
    {
      title: intl.formatMessage(affiliationResources.scopusId),
      dataIndex: 'scopusId',
      key: 'scopusId',
      sorter: true
    },
    {
      title: intl.formatMessage(affiliationResources.city),
      dataIndex: 'city',
      key: 'city',
      sorter: true
    },
    {
      title: intl.formatMessage(affiliationResources.address),
      dataIndex: 'address',
      key: 'address',
      sorter: true
    },
    {
      title: intl.formatMessage(affiliationResources.country),
      dataIndex: 'country',
      key: 'country',
      sorter: true
    },
    {
      title: intl.formatMessage(affiliationResources.organizationType),
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
      size='small'
      pagination={pagination}
      onChange={onSortChange}
      loading={loading}
    />
  );
};

export default AffiliationTable;
