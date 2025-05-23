// CustomSearchButton.tsx
import React from 'react';
import { Button, Form, theme, Typography, Upload, UploadProps } from 'antd';
import {
  ClearOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { defineMessages, useIntl } from 'react-intl';
import Title from 'antd/es/typography/Title';
import Permission from '../Permission/Permission';
import CustomDivider from './CustomDivider';

const { Text } = Typography;

const messages = defineMessages({
  search: {
    id: 'dataPageHeader.search',
    defaultMessage: 'Search'
  },
  newItem: {
    id: 'dataPageHeader.newItem',
    defaultMessage: 'New Item'
  },
  importExcel: {
    id: 'dataPageHeader.importExcel',
    defaultMessage: 'Import Excel'
  },
  clear: {
    id: 'dataPageHeader.clear',
    defaultMessage: 'Clear'
  },
  dataCount: {
    id: 'dataPageHeader.dataCount',
    defaultMessage: 'Data Count'
  }
});

interface DataPageHeaderProps {
  pageTitle: string;
  dataCount?: number;
  loading: boolean;
  onSearchClick?: () => void;
  onClearClick?: () => void;
  onNewItemClick?: (id?: any) => void;
  uploadProps?: UploadProps;
  extraButton?: React.ReactElement;
  extraButtonPermission?: string[];
}

const { useToken } = theme;

const DataPageHeader: React.FC<DataPageHeaderProps> = ({
  pageTitle,
  dataCount,
  loading = false,
  onSearchClick,
  onClearClick,
  onNewItemClick,
  uploadProps,
  extraButton,
  extraButtonPermission
}) => {
  const intl = useIntl();
  const { token } = useToken();

  return (
    <div>
      <Form.Item
        style={{
          float: 'left',
          backgroundColor: token.colorBgElevated,
          borderRadius: '4px',
          padding: '4px',
          width: '100%',
          marginBottom: '8px'
        }}
      >
        <EnvironmentOutlined
          style={{ fontSize: '24px', float: 'left', margin: '12px 4px' }}
        />
        <Title level={3} style={{ margin: '8px 4px', float: 'left' }}>
          {pageTitle}
        </Title>

        {dataCount !== undefined && dataCount !== null && (
          <>
            <UnorderedListOutlined
              style={{
                marginTop: '21px',
                marginLeft: '30px',
                fontSize: '14px',
                float: 'left'
              }}
            />
            <Text
              style={{
                marginTop: '17px',
                marginLeft: '4px',
                fontSize: '14px',
                float: 'left'
              }}
            >
              {intl.formatMessage(messages.dataCount)} : {dataCount}
            </Text>
          </>
        )}

        {extraButton && (
          <Permission roles={extraButtonPermission || ['Admin']}>
            {extraButton}
          </Permission>
        )}

        <Permission roles={['Admin']}>
          {uploadProps && (
            <div style={{ float: 'right', margin: '8px 4px' }}>
              <Upload {...uploadProps} showUploadList={false}>
                <Button
                  type='default'
                  icon={<UploadOutlined />}
                  loading={loading}
                  style={{
                    alignItems: 'center',
                    borderRadius: '5px',
                    padding: '0 12px'
                  }}
                >
                  {intl.formatMessage(messages.importExcel)}
                </Button>
              </Upload>
            </div>
          )}
        </Permission>

        <Permission roles={['Admin']}>
          {onNewItemClick && (
            <Button
              type='default'
              icon={<PlusOutlined />}
              onClick={() => onNewItemClick(undefined)}
              loading={loading}
              style={{
                alignItems: 'center',
                borderRadius: '5px',
                padding: '0 12px',
                margin: '8px 4px',
                float: 'right'
              }}
            >
              {intl.formatMessage(messages.newItem)}
            </Button>
          )}
        </Permission>

        {onClearClick && (
          <Button
            type='default'
            icon={<ClearOutlined />}
            onClick={onClearClick}
            loading={loading}
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
          >
            {intl.formatMessage(messages.clear)}
          </Button>
        )}

        {onSearchClick && (
          <Button
            type='primary'
            icon={<SearchOutlined />}
            onClick={onSearchClick}
            loading={loading}
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
          >
            {intl.formatMessage(messages.search)}
          </Button>
        )}
      </Form.Item>

      <CustomDivider />
    </div>
  );
};

export default DataPageHeader;
