import { Button, Checkbox, Dropdown, Table, theme, Typography } from 'antd';
import React, { useState } from 'react';
import { articleDataModel } from '../../SearchArticle/models';
import commonResources from '../../../messages';
import searchArticleResources from '../../SearchArticle/messages';
import { useIntl } from 'react-intl';
import { DownOutlined } from '@ant-design/icons';
import researcherDetailResources from '../messages';

const { Title } = Typography;

interface ResearcherDetailTableProps {
  data: articleDataModel[];
  title: string;
}

const ResearcherDetailTable: React.FC<ResearcherDetailTableProps> = ({
  data,
  title
}) => {
  const intl = useIntl();
  const { token } = theme.useToken();

  const allColumns = [
    {
      key: 'scopusId',
      title: intl.formatMessage(searchArticleResources.scopusId),
      dataIndex: 'scopusId',
      show: false
    },
    {
      key: 'eid',
      title: intl.formatMessage(searchArticleResources.eid),
      dataIndex: 'eid',
      show: false
    },
    {
      key: 'title',
      title: intl.formatMessage(searchArticleResources.title),
      dataIndex: 'title',
      show: true
    },
    {
      key: 'creator',
      title: intl.formatMessage(searchArticleResources.creator),
      dataIndex: 'creator',
      show: false
    },
    {
      key: 'publicationName',
      title: intl.formatMessage(searchArticleResources.publicationName),
      dataIndex: 'publicationName',
      show: false
    },
    {
      key: 'journalName',
      title: intl.formatMessage(searchArticleResources.journalName),
      dataIndex: 'journalName',
      show: false
    },
    {
      key: 'journalAbbreviationName',
      title: intl.formatMessage(searchArticleResources.journalAbbreviationName),
      dataIndex: 'journalAbbreviationName',
      show: true
    },
    {
      key: 'categoryName',
      title: intl.formatMessage(searchArticleResources.categoryName),
      dataIndex: 'categoryName',
      show: false
    },
    {
      key: 'issn',
      title: intl.formatMessage(searchArticleResources.issn),
      dataIndex: 'issn',
      show: false
    },
    {
      key: 'eissn',
      title: intl.formatMessage(searchArticleResources.eissn),
      dataIndex: 'eissn',
      show: false
    },
    {
      key: 'volume',
      title: intl.formatMessage(searchArticleResources.volume),
      dataIndex: 'volume',
      show: false
    },
    {
      key: 'issue',
      title: intl.formatMessage(searchArticleResources.issue),
      dataIndex: 'issue',
      show: false
    },
    {
      key: 'pageRange',
      title: intl.formatMessage(searchArticleResources.pageRange),
      dataIndex: 'pageRange',
      show: false
    },
    {
      key: 'coverDate',
      title: intl.formatMessage(searchArticleResources.coverDate),
      dataIndex: 'coverDate',
      show: false
    },
    {
      key: 'doi',
      title: intl.formatMessage(searchArticleResources.doi),
      dataIndex: 'doi',
      show: true
    },
    {
      key: 'citedByCount',
      title: intl.formatMessage(searchArticleResources.citedByCount),
      dataIndex: 'citedByCount',
      show: true
    },
    {
      key: 'affiliationName',
      title: intl.formatMessage(commonResources.affiliationName),
      dataIndex: 'affiliationName',
      show: false
    }
  ];

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    allColumns.filter(col => col.show).map(col => col.key)
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleColumn = (key: string, checked: boolean) => {
    setSelectedKeys(prev =>
      checked ? [...prev, key] : prev.filter(k => k !== key)
    );
  };

  const columnMenu = (
    <div
      style={{
        padding: '10px',
        backgroundColor: token.colorBgContainer, // veya '#fff' açık tema için
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
      onClick={e => e.stopPropagation()}
    >
      {allColumns.map(col => (
        <div key={col.key}>
          <Checkbox
            checked={selectedKeys.includes(col.key)}
            onChange={e => toggleColumn(col.key, e.target.checked)}
            style={{ color: token.colorTextHeading }}
          >
            {col.title}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  const visibleColumns = allColumns
    .filter(col => selectedKeys.includes(col.key))
    .map(col => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key,
      sorter: false,
      render:
        col.key === 'doi'
          ? (doi: string) =>
              doi ? (
                <a
                  href={`https://doi.org/${doi}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {doi}
                </a>
              ) : (
                '-'
              )
          : undefined
    }));

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}
      >
        <Title
          level={5}
          style={{ marginBlockStart: '0px', marginBlockEnd: '0px' }}
        >
          {intl.formatMessage(researcherDetailResources.publications)}
        </Title>

        <Dropdown
          overlay={columnMenu}
          trigger={['click']}
          open={dropdownVisible}
          onOpenChange={setDropdownVisible}
        >
          <Button type='default' style={{ marginTop: '5px' }}>
            {intl.formatMessage(searchArticleResources.selectColumns)}{' '}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Table
        dataSource={data}
        rowKey='scopusId'
        pagination={{ pageSize: 10 }}
        size='small'
        bordered
        columns={visibleColumns}
      />
    </>
  );
};

export default ResearcherDetailTable;
