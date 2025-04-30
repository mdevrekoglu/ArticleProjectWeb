import React from 'react';
import { departmentDataListModel, departmentDataModel } from '../models';
import { Button, Table, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import departmentResources from '../messages';
import affiliationResources from '../../Affiliation/messages';
import Permission from '../../../components/Permission/Permission';
import facultyResources from '../../Faculty/messages';

interface DepartmentTableProps {
  data?: departmentDataListModel;
  onSortChange?: TableProps<departmentDataModel>['onChange'];
  pagination: TableProps<departmentDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void; // Callback to open the modal with ID
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
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
      sorter: true
    },
    {
      title: intl.formatMessage(facultyResources.faculty),
      dataIndex: 'facultyName',
      key: 'facultyName',
      sorter: true
    },
    {
      title: intl.formatMessage(departmentResources.department),
      dataIndex: 'departmentName',
      key: 'departmentName',
      sorter: true,
      render: (text: string, record: departmentDataModel) => (
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

export default DepartmentTable;
