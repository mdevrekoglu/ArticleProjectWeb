import React from 'react';
import { userDataListModel, userDataModel } from '../models';
import { Button, Table, TableProps } from 'antd';
import { useIntl } from 'react-intl';
import userPanelResources from '../messages';
import Permission from '../../../components/Permission/Permission';
import { EditOutlined } from '@ant-design/icons';
import commonResources from '../../../messages';

interface UserPanelTableProps {
  data?: userDataListModel;
  onSortChange?: TableProps<userDataModel>['onChange'];
  pagination: TableProps<userDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: string) => void;
}

const UserPanelTable: React.FC<UserPanelTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(commonResources.firstName),
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true,
      render: (text: string, record: userDataModel) => (
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
      title: intl.formatMessage(userPanelResources.lastName),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.email),
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.affiliationName),
      dataIndex: 'affiliationName',
      key: 'affiliationName',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.facultyName),
      dataIndex: 'facultyName',
      key: 'facultyName',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.departmentName),
      dataIndex: 'departmentName',
      key: 'departmentName',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.researcherId),
      dataIndex: 'researcherId',
      key: 'researcherId',
      sorter: true
    },
    {
      title: intl.formatMessage(commonResources.roles),
      dataIndex: 'roles',
      key: 'roles',
      sorter: true,
      render: (text: string[]) => (
        <div>
          {text.map(role => (
            <div key={role}>{role}</div>
          ))}
        </div>
      )
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

export default UserPanelTable;
