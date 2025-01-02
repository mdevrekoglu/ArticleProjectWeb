import { Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import { useIntl } from 'react-intl';
import affiliationResources from '../messages';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import {
  affiliationCreateInputModel,
  affiliationDataOutputModel,
  affiliationUpdateInputModel
} from '../models';
import ApiService from '../../../modules/ApiService';
import { keyInputModel } from '../../../models/BaseModels';

interface AffiliationDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
  inputId?: number;
}

const AffiliationDetailModal: React.FC<AffiliationDetailModalProps> = ({
  open,
  handleModalClose,
  inputId
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const [id, setId] = useState<number | undefined>();
  const isNewItem = id === undefined || id === null;

  // Update the state whenever inputId changes
  useEffect(() => {
    setId(inputId);
  }, [inputId]);

  // Reset form and state when modal is opened or closed
  useEffect(() => {
    if (!open) {
      form.resetFields(); // Clear form fields
    } else if (!isNewItem) {
      // Fetch data when modal is opened with an existing ID
      // We have to create a new function to use async/await in useEffect
      const fetchData = async () => {
        setLoading(true);

        try {
          const keyInputData: keyInputModel = { id: id! };

          const response = await ApiService.UseGet<
            keyInputModel,
            affiliationDataOutputModel
          >('/Affiliation/GetById', keyInputData);

          if (response.isSuccessed) {
            form.setFieldsValue(response);
          } else {
            notification.error({
              message: intl.formatMessage(affiliationResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '800px' }
            });
          }
        } catch (error) {
          notification.error({
            message: intl.formatMessage(affiliationResources.unknownError),
            placement: 'topRight',
            duration: 5,
            style: { width: '800px' }
          });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      form.resetFields(); // Clear form for a new item
    }
  }, [open, form, intl, isNewItem, id]);

  const handleClick = async () => {
    setLoading(true);
    let formIsValid = false;

    try {
      await form.validateFields(); // Validate form fields. Had to use try-catch because it throws an error if form is not valid
      formIsValid = true;
    } catch (error) {
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        if (isNewItem) {
          const affiliationCreateData: affiliationCreateInputModel = {
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            affiliationCreateInputModel,
            affiliationDataOutputModel
          >('/Affiliation/Create', affiliationCreateData);

          if (response.isSuccessed) {
            notification.success({
              message: response.messages[0],
              placement: 'topRight',
              duration: 3,
              style: { width: '400px' }
            });

            setId(response.id);
            form.setFieldsValue(response);
            setIsDataChanged(true);
          } else {
            notification.error({
              message: intl.formatMessage(affiliationResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '400px' }
            });
          }
        } else {
          const affiliationUpdateData: affiliationUpdateInputModel = {
            id: id!,
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            affiliationUpdateInputModel,
            affiliationDataOutputModel
          >('/Affiliation/Update', affiliationUpdateData);

          if (response.isSuccessed) {
            notification.success({
              message: response.messages[0],
              placement: 'topRight',
              duration: 3,
              style: { width: '400px' }
            });

            form.setFieldsValue(response);
            setIsDataChanged(true);
          } else {
            notification.error({
              message: intl.formatMessage(affiliationResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '400px' }
            });
          }
        }
      } catch (error) {}
    }

    setLoading(false);
  };

  return (
    <Modal
      open={open}
      onCancel={() => handleModalClose(isDataChanged)}
      footer={null}
      destroyOnClose
      centered
      width={1000}
      closeIcon={null}
    >
      <DataPageModalHeader
        pageTitle={intl.formatMessage(affiliationResources.affiliation)}
        loading={loading}
        onCloseClick={() => handleModalClose(isDataChanged)}
        isNewItem={isNewItem}
        onClick={handleClick}
        id={id}
      />

      <Form
        form={form}
        layout='inline'
        style={{ width: '100%' }}
        requiredMark={false}
      >
        <Row gutter={[4, 4]} style={{ width: '100%' }}>
          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(affiliationResources.name)}
              name='affiliationName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(affiliationResources.enterName)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(affiliationResources.city)}
              name='city'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(affiliationResources.enterCity)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(affiliationResources.address)}
              name='address'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  affiliationResources.enterAddress
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(affiliationResources.country)}
              name='country'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  affiliationResources.enterCountry
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(affiliationResources.organizationType)}
              name='organizationType'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  affiliationResources.enterOrganizationType
                )}
              />
            </DataPageFormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AffiliationDetailModal;
