import { Button, Table, TableProps } from "antd";
import { journalDataListModel, journalDataModel } from "../models";
import { useIntl } from "react-intl";
import journalResources from "../messages";
import Permission from "../../../components/Permission/Permission";
import { EditOutlined } from "@ant-design/icons";

interface JournalTableProps {
  data?: journalDataListModel;
  onSortChange?: TableProps<journalDataModel>['onChange'];
  pagination: TableProps<journalDataModel>['pagination'];
  loading?: boolean;
  onOpenModal?: (id: number) => void; // Callback to open the modal with ID
}

const JournalTable: React.FC<JournalTableProps> = ({
  data,
  onSortChange,
  pagination,
  loading,
  onOpenModal
}) => {
  const intl = useIntl();

  const columns = [
    {
      title: intl.formatMessage(journalResources.journal),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (text: string, record: journalDataModel) => (
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
      title: intl.formatMessage(journalResources.AbbreviationName),
      dataIndex: 'abbreviationName',
      key: 'abbreviationName',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.ISSN),
      dataIndex: 'issn',
      key: 'issn',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.EISSN),
      dataIndex: 'eissn',
      key: 'eissn',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.JIF),
      dataIndex: 'jif',
      key: 'jif',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.JIF5Years),
      dataIndex: 'jiF5Years',
      key: 'jiF5Years',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.CategoryName),
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Quartile),
      dataIndex: 'quartile',
      key: 'quartile',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Rank),
      dataIndex: 'rank',
      key: 'rank',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Year),
      dataIndex: 'year',
      key: 'year',
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

export default JournalTable;

