import React from 'react';
import { facultyDataListModel, facultyDataModel } from '../models';
import { Button, Table, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import facultyResources from '../messages';
import affiliationResources from '../../Affiliation/messages';
import Permission from '../../../components/Permission/Permission';

interface FacultyTableProps {
  data?: facultyDataListModel;
  onSortChange?: TableProps<facultyDataModel>['onChange'];
  pagination: TableProps<facultyDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void; // Callback to open the modal with ID
}

const FacultyTable: React.FC<FacultyTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(facultyResources.faculty),
      dataIndex: 'facultyName',
      key: 'facultyName',
      sorter: true,
      render: (text: string, record: facultyDataModel) => (
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
      title: intl.formatMessage(affiliationResources.affiliation),
      dataIndex: 'affiliationName',
      key: 'affiliationName',
      sorter: false /* fix sorting expression */
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

export default FacultyTable;
