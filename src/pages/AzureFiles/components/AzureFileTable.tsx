import React from 'react';
import { azureFileListDataModel } from '../models';
import { Table, TableProps, Tag } from 'antd';
import { useIntl } from 'react-intl';
import azureFilesResources from '../messages';
import commonResources from '../../../messages';
import { CalendarOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FileTypeEnum } from '../enums';
import { getEnumKeyByValue } from '../../../utils/EnumUtils';
import { ReportTypeEnum } from '../../GenerateReport/enums';
import Permission from '../../../components/Permission/Permission';

interface AzureFileTableProps {
  data?: azureFileListDataModel[];
  onSortChange?: TableProps<azureFileListDataModel>['onChange'];
  pagination: TableProps<azureFileListDataModel>['pagination'];
  loading?: boolean;
  onDownloadClick: (id: number) => void;
}

const AzureFileTable: React.FC<AzureFileTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onDownloadClick
}) => {
  const intl = useIntl();

  const columns: TableProps<azureFileListDataModel>['columns'] = [
    {
      title: intl.formatMessage(azureFilesResources.fileName),
      dataIndex: 'fileName',
      key: 'fileName',
      sorter: true,
      render: (value: string, record) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {value}
          <Permission roles={['Admin']}>
            <DownloadOutlined
              style={{ cursor: 'pointer', color: '#1890ff' }}
              onClick={() => onDownloadClick(record.id)}
              title={intl.formatMessage(commonResources.download)}
            />
          </Permission>
        </span>
      )
    },
    {
      title: intl.formatMessage(azureFilesResources.fileGUID),
      dataIndex: 'fileGUID',
      key: 'fileGUID',
      sorter: true
    },
    {
      title: intl.formatMessage(azureFilesResources.fileType),
      dataIndex: 'fileType',
      key: 'fileType',
      sorter: false,
      render: (value: number) => getEnumKeyByValue(FileTypeEnum, value)
    },
    {
      title: intl.formatMessage(azureFilesResources.reportType),
      dataIndex: 'reportType',
      key: 'reportType',
      sorter: false,
      render: (value: number) => getEnumKeyByValue(ReportTypeEnum, value)
    },
    {
      title: intl.formatMessage(azureFilesResources.description),
      dataIndex: 'description',
      key: 'description',
      sorter: false
    },
    {
      title: intl.formatMessage(commonResources.createdDate),
      dataIndex: 'createdDate',
      key: 'createdDate',
      sorter: true,
      align: 'center',
      render: (date: string | Date) => (
        <Tag
          icon={<CalendarOutlined />}
          color='blue'
          style={{ borderRadius: 6, fontSize: 13 }}
        >
          {dayjs(date).format('YYYY-MM-DD HH:mm')}
        </Tag>
      )
    },
    {
      title: intl.formatMessage(commonResources.userName),
      dataIndex: 'userName',
      key: 'userName',
      sorter: false
    }
  ];

  return (
    <Table
      dataSource={data}
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

export default AzureFileTable;
