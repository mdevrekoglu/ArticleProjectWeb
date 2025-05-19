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
      dataIndex: 'journalName',
      key: 'journalName',
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
      dataIndex: 'AbbreviationName',
      key: 'AbbreviationName',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.ISSN),
      dataIndex: 'ISSN',
      key: 'ISSN',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.EISSN),
      dataIndex: 'EISSN',
      key: 'EISSN',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.JIF),
      dataIndex: 'JIF',
      key: 'JIF',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.JIF5Years),
      dataIndex: 'JIF5Years',
      key: 'JIF5Years',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.CategoryName),
      dataIndex: 'CategoryName',
      key: 'CategoryName',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Quartile),
      dataIndex: 'Quartile',
      key: 'Quartile',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Rank),
      dataIndex: 'Rank',
      key: 'Rank',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.TotalJournals),
      dataIndex: 'TotalJournals',
      key: 'TotalJournals',
      sorter: true
    },
    {
      title: intl.formatMessage(journalResources.Year),
      dataIndex: 'Year',
      key: 'Year',
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

