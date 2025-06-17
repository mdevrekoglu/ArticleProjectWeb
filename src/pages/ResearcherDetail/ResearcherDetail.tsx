import {
  Typography,
  Descriptions,
  Skeleton,
  Button,
  notification,
  theme
} from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ApiService from '../../modules/ApiService';
import { keyInputModel } from '../../models/BaseModels';
import { researcherDetailDataOutputModel } from './models';
import { useIntl } from 'react-intl';
import researcherDetailResources from './messages';
import { RollbackOutlined } from '@ant-design/icons';
import DefaultAvatar from '../../assets/DefaultAvatar.png';
import commonResources from '../../messages';
import DataPageHeader from '../../components/DataPageItems/DataPageHeader';
import CustomDivider from '../../components/DataPageItems/CustomDivider';
import ResearcherDetailTable from './components/ResearcherDetailTable';
import researcherResources from '../Researcher/messages';

const { Title } = Typography;
const { useToken } = theme;

const ResearcherDetail = () => {
  const { id, origin } = useParams();
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useToken();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<researcherDetailDataOutputModel>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error(
            intl.formatMessage(researcherDetailResources.errorNoId)
          );
        }

        const response = await ApiService.UseGet<
          keyInputModel,
          researcherDetailDataOutputModel
        >('/Researcher/GetResearcherDetailsById', {
          id: Number(id)
        } as keyInputModel);

        if (response.isSuccessed) {
          setData(response);
        } else {
          notification.error({
            message: intl.formatMessage(commonResources.anErrorOccurred),
            description: response.messages.join('\n'),
            placement: 'topRight',
            duration: 5,
            style: { width: '400px' }
          });

          setData(undefined);
        }
      } catch (error) {
        setData(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, intl]);

  const handleGoBack = () => {
    navigate(`/${origin}`, { state: location.state });
  };

  const renderAvatar = (imageBase64: string | undefined) => {
    return imageBase64 ? (
      <img
        src={`data:image/png;base64,${imageBase64}`}
        alt='Researcher'
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '16px'
        }}
      />
    ) : (
      <img
        src={DefaultAvatar}
        alt='Default Avatar'
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '16px'
        }}
      />
    );
  };

  return (
    <div>
      <DataPageHeader
        pageTitle={intl.formatMessage(researcherDetailResources.pageTitle)}
        loading={loading}
        extraButton={
          <Button
            type='default'
            style={{
              alignItems: 'center',
              borderRadius: '5px',
              padding: '0 12px',
              margin: '8px 4px',
              float: 'right'
            }}
            icon={<RollbackOutlined />}
            loading={loading}
            onClick={handleGoBack}
          >
            {intl.formatMessage(commonResources.returnBack)}
          </Button>
        }
      />

      {loading ? (
        <Skeleton active />
      ) : (
        data && (
          <div style={{ display: 'flex', gap: '24px', padding: '24px' }}>
            <div
              style={{
                minWidth: '250px',
                maxWidth: '300px',
                background: token.colorBgContainer,
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}
            >
              {renderAvatar(data.image)}
              <Title level={3} style={{ marginBottom: '8px' }}>
                {data.firstName} {data.lastName}
              </Title>
              <div
                style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  textAlign: 'left'
                }}
              >
                <p>
                  <strong>
                    {data.scopusId &&
                      intl.formatMessage(
                        researcherDetailResources.scopusIdStyled,
                        {
                          scopusId: data.scopusId
                        }
                      )}
                  </strong>
                </p>
                <p>
                  <strong>
                    {data.woSId &&
                      intl.formatMessage(
                        researcherDetailResources.wosIdStyled,
                        {
                          wosId: data.woSId
                        }
                      )}
                  </strong>
                </p>
                <p>
                  <strong>
                    {data.orcId &&
                      intl.formatMessage(
                        researcherDetailResources.orcIdStyled,
                        {
                          orcId: data.orcId
                        }
                      )}
                  </strong>
                </p>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <Descriptions
                title={
                  <Title
                    level={3}
                    style={{ marginBottom: '10px', marginTop: '0px' }}
                  >
                    {intl.formatMessage(
                      researcherDetailResources.generalInformation
                    )}
                  </Title>
                }
                bordered
                size='middle'
                column={2}
              >
                <Descriptions.Item
                  label={intl.formatMessage(commonResources.affiliationName)}
                >
                  {data.affiliationName ?? '-'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage(commonResources.email)}
                >
                  {data.email ?? '-'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage(researcherResources.documentCount)}
                >
                  {data.documentCount ?? '-'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage(commonResources.status)}
                >
                  {data.isActive
                    ? intl.formatMessage(commonResources.active)
                    : intl.formatMessage(commonResources.notActive)}
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage(commonResources.staffTitle)}
                >
                  {data.staffTitle ?? '-'}
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage(commonResources.position)}
                >
                  {data.position ?? '-'}
                </Descriptions.Item>
              </Descriptions>

              <CustomDivider />

              <ResearcherDetailTable
                data={data.articles}
                title={intl.formatMessage(
                  researcherDetailResources.publications
                )}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ResearcherDetail;
