import React from 'react';
import { Button, Table, TableProps, Tag } from 'antd';
import { CalendarOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import {
  notificationDataListModel,
  notificationDataModel,
  notificationTargetDataModel
} from '../models';
import notificationResources from '../messages';
import commonResources from '../../../messages';
import Permission from '../../../components/Permission/Permission';

interface NotificationTableProps {
  data?: notificationDataListModel;
  onSortChange?: TableProps<notificationDataModel>['onChange'];
  pagination: TableProps<notificationDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void;
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();

  // Columns for the main table
  const columns: TableProps<notificationDataModel>['columns'] = [
    {
      title: intl.formatMessage(notificationResources.title),
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (text: string, record: notificationDataModel) => (
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
      title: intl.formatMessage(notificationResources.description),
      dataIndex: 'description',
      key: 'description',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.status),
      dataIndex: 'isActive',
      key: 'isActive',
      sorter: true,
      align: 'center',
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color='green'>{intl.formatMessage(commonResources.active)}</Tag>
        ) : (
          <Tag color='red'>{intl.formatMessage(commonResources.notActive)}</Tag>
        )
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
    }
  ];

  // Expanded row (targets) render
  const expandedRowRender = (record: notificationDataModel) => (
    <Table<notificationTargetDataModel>
      dataSource={record.targets}
      pagination={false}
      rowKey='userId'
      size='small'
      bordered
      columns={[
        {
          title: intl.formatMessage(notificationResources.name),
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: intl.formatMessage(notificationResources.readStatus),
          dataIndex: 'isRead',
          key: 'isRead',
          render: (isRead: boolean) =>
            isRead ? (
              <Tag color='green'>
                {intl.formatMessage(notificationResources.read)}
              </Tag>
            ) : (
              <Tag color='red'>
                {intl.formatMessage(notificationResources.notRead)}
              </Tag>
            )
        }
      ]}
    />
  );

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
      expandable={{
        expandedRowRender,
        rowExpandable: record => record.targets && record.targets.length > 0
      }}
    />
  );
};

export default NotificationTable;
