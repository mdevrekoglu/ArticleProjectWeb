import React from 'react';
import { collaboratorDataListModel, collaboratorDataModel } from '../models';
import { useIntl } from 'react-intl';
import searchCollaboratorResources from '../messages';
import { Button, Popover, Table } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import researcherResources from '../../Researcher/messages';

interface SearchCollaboratorProps {
  data?: collaboratorDataListModel;
  loading?: boolean;
  onRedirectToDetail?: (id?: number) => void;
}

const SearchCollaboratorTable: React.FC<SearchCollaboratorProps> = ({
  data,
  loading,
  onRedirectToDetail
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(searchCollaboratorResources.name),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: collaboratorDataModel) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{text}</span>
          {record.id && (
            <Popover
              content={intl.formatMessage(researcherResources.researcherDetail)}
            >
              <Button
                type='link'
                icon={<InfoCircleOutlined />}
                style={{ marginLeft: '5px' }}
                onClick={() =>
                  onRedirectToDetail && onRedirectToDetail(record.id)
                }
              />
            </Popover>
          )}
        </div>
      )
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
