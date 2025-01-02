import {
  AppstoreAddOutlined,
  CloseOutlined,
  OrderedListOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { Button, Divider, Form, theme, Typography } from 'antd';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const { Text } = Typography;

const messages = defineMessages({
  newItem: {
    id: 'dataPageModalHeader.newItem',
    defaultMessage: 'New Item'
  },
  create: {
    id: 'dataPageModalHeader.create',
    defaultMessage: 'Create'
  },
  clear: {
    id: 'dataPageModalHeader.clear',
    defaultMessage: 'Clear'
  },
  update: {
    id: 'dataPageModalHeader.update',
    defaultMessage: 'Update'
  },
  close: {
    id: 'dataPageModalHeader.close',
    defaultMessage: 'Close'
  },
  itemId: {
    id: 'dataPageModalHeader.itemId',
    defaultMessage: 'Item ID'
  },
  view: {
    id: 'dataPageModalHeader.view',
    defaultMessage: 'View'
  }
});

interface DataPageModalHeaderProps {
  pageTitle: string;
  loading: boolean;
  isNewItem: boolean;
  id?: number;
  onCloseClick: () => void;
  onClick: () => void;
  onClearClick?: () => void;
}

const { useToken } = theme;

const DataPageModalHeader: React.FC<DataPageModalHeaderProps> = ({
  pageTitle,
  loading = false,
  isNewItem,
  id,
  onCloseClick,
  onClick
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
        {isNewItem ? (
          <>
            <AppstoreAddOutlined
              style={{
                marginTop: '20px',
                marginLeft: '0px',
                fontSize: '24px',
                float: 'left'
              }}
            />
            <Text
              style={{
                marginTop: '12px',
                marginLeft: '6px',
                fontSize: '24px',
                float: 'left'
              }}
            >
              {intl.formatMessage(messages.create)} {pageTitle}
            </Text>
          </>
        ) : (
          <>
            <OrderedListOutlined
              style={{
                marginTop: '20px',
                marginLeft: '0px',
                fontSize: '24px',
                float: 'left'
              }}
            />
            <Text
              style={{
                marginTop: '12px',
                marginLeft: '6px',
                fontSize: '24px',
                float: 'left'
              }}
            >
              {intl.formatMessage(messages.update)} {pageTitle}
            </Text>

            <Text
              style={{
                marginTop: '26px',
                marginLeft: '30px',
                fontSize: '12px',
                float: 'left'
              }}
            >
              {intl.formatMessage(messages.itemId)} : {id}
            </Text>
          </>
        )}

        <Button
          type='default'
          onClick={onCloseClick}
          icon={<CloseOutlined />}
          style={{
            alignItems: 'center',
            borderRadius: '5px',
            padding: '0 12px',
            margin: '8px 4px',
            float: 'right'
          }}
        >
          {intl.formatMessage(messages.close)}
        </Button>

        {/*
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
        */}

        {isNewItem ? (
          <Button
            type='primary'
            icon={<SaveOutlined />}
            onClick={onClick}
            loading={loading}
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
          >
            {intl.formatMessage(messages.create)}
          </Button>
        ) : (
          <Button
            type='primary'
            icon={<SaveOutlined />}
            onClick={onClick}
            loading={loading}
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
          >
            {intl.formatMessage(messages.update)}
          </Button>
        )}
      </Form.Item>

      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </div>
  );
};

export default DataPageModalHeader;
