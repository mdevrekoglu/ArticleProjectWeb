import React from 'react';
import { majorDisciplineDataListModel, majorDisciplineDataModel } from '../models';
import { Button, Table, TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';
import affiliationResources from '../../Affiliation/messages';
import Permission from '../../../components/Permission/Permission';
import facultyResources from '../../Faculty/messages';
import majorDisciplineResources from '../messages';
import departmentResources from '../../Department/messages';

interface MajorDisciplineTableProps {
  data?: majorDisciplineDataListModel;
  onSortChange?: TableProps<majorDisciplineDataModel>['onChange'];
  pagination: TableProps<majorDisciplineDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void; // Callback to open the modal with ID
}

const MajorDisciplineTable: React.FC<MajorDisciplineTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();
console.log(data?.data[0]);

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
      sorter: true
    },
    {
      
      title: intl.formatMessage(majorDisciplineResources.majorDiscipline),
      dataIndex: 'majorDisciplineName',
      key: 'majorDisciplineName',
      sorter: true,
      render: (text: string, record: majorDisciplineDataModel) => (
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

export default MajorDisciplineTable;
