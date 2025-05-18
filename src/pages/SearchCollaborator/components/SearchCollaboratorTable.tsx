import React from 'react';
import { collaboratorDataListModel } from '../models';
import { useIntl } from 'react-intl';
import searchCollaboratorResources from '../messages';
import { Table } from 'antd';

interface SearchCollaboratorProps {
  data?: collaboratorDataListModel;
  loading?: boolean;
}

const SearchCollaboratorTable: React.FC<SearchCollaboratorProps> = ({
  data,
  loading
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(searchCollaboratorResources.name),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: intl.formatMessage(searchCollaboratorResources.wosId),
      dataIndex: 'wosId',
      key: 'wosId'
    },
    {
      title: intl.formatMessage(searchCollaboratorResources.similarity),
      dataIndex: 'similarity',
      key: 'similarity'
    },
    {
      title: intl.formatMessage(searchCollaboratorResources.articleCount),
      dataIndex: 'articleCount',
      key: 'articleCount'
    }
  ];

  return (
    <Table
      dataSource={data?.data || []}
      columns={columns}
      bordered
      pagination={false}
      rowKey='id'
      size='small'
      loading={loading}
    />
  );
};

export default SearchCollaboratorTable;
