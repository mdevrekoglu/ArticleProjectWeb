import React from 'react';
import { researcherDataListModel, researcherDataModel } from '../models';
import { Table, TableProps } from 'antd';
import { useIntl } from 'react-intl';
import researcherResources from '../messages';
import affiliationResources from '../../Affiliation/messages';

interface ResearcherTableProps {
  data?: researcherDataListModel;
  onSortChange?: TableProps<researcherDataModel>['onChange'];
  pagination: TableProps<researcherDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void;
}

const ResearcherTable: React.FC<ResearcherTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(researcherResources.firstName),
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.lastName),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.email),
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.documentCount),
      dataIndex: 'documentCount',
      key: 'documentCount',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.position),
      dataIndex: 'position',
      key: 'position',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.staffTitle),
      dataIndex: 'staffTitle',
      key: 'staffTitle',
      sorter: true
    },
    {
      title: intl.formatMessage(affiliationResources.affiliationName),
      dataIndex: 'affiliationName',
      key: 'affiliationName',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.woSId),
      dataIndex: 'woSId',
      key: 'woSId',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.orcId),
      dataIndex: 'orcId',
      key: 'orcId',
      sorter: true
    },
    {
      title: intl.formatMessage(researcherResources.scopusId),
      dataIndex: 'scopusId',
      key: 'scopusId',
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

export default ResearcherTable;
