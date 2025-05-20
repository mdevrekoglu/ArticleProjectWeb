import React, { useEffect, useState } from 'react';
import { List, Skeleton, Divider, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  notificationUserDataListModel,
  notificationUserDataModel
} from './models';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import { useIntl } from 'react-intl';
import userNotificationResources from './messages';
import ApiService from '../../modules/ApiService';
import { baseSearchModel } from '../../models/BaseModels';

const UserNotification: React.FC = () => {
  const intl = useIntl();
  const [data, setData] = useState<notificationUserDataModel[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const pageSize = 10;

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const searchData: baseSearchModel = {
        pageIndex: page - 1, // Page index starts from 0 in API!!!
        pageSize: pageSize,
        sortingColumn: 'createdDate',
        sortingType: 'desc'
      };

      const response = await ApiService.UseGet<
        baseSearchModel,
        notificationUserDataListModel
      >('/Notification/GetNotificationsPaged', searchData);

      setData(prev => [...prev, ...response.data]);
      setTotal(response.count);
      setPage(prev => prev + 1);

      if (response.data.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      // handle error (notification can be shown)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(userNotificationResources.notifications)}
        loading={loading}
        dataCount={total}
      />

      <div
        id='scrollableDiv'
        style={{
          height: 500,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
          backgroundColor: 'rgba(0, 0, 0, 0.25)' // biraz transparanlık istersen
        }}
      >
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={
            <Divider plain>
              {intl.formatMessage(userNotificationResources.noMoreNotification)}
            </Divider>
          }
          scrollableTarget='scrollableDiv'
        >
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item.title}
                style={{ opacity: item.isRead ? 0.6 : 1 }}
              >
                <List.Item.Meta
                  title={<Typography.Text strong>{item.title}</Typography.Text>}
                  description={
                    <>
                      <div>{item.description}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>
                        {new Date(item.createdDate).toLocaleString()}
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default UserNotification;
