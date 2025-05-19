import { Col, Form, Input, InputNumber, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import { useIntl } from 'react-intl';
import journalResources from '../messages';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import {
  journalCreateInputModel,
  journalDataOutputModel,
  journalUpdateInputModel
} from '../models';
import ApiService from '../../../modules/ApiService';
import { keyInputModel } from '../../../models/BaseModels';

interface JournalDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
  inputId?: number;
}

const JournalDetailModal: React.FC<JournalDetailModalProps> = ({
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
            journalDataOutputModel
          >('/Journal/GetById', keyInputData);

          if (response.isSuccessed) {
            form.setFieldsValue(response);
          } else {
            notification.error({
              message: intl.formatMessage(journalResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '800px' }
            });
          }
        } catch (error) {
          notification.error({
            message: intl.formatMessage(journalResources.unknownError),
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
          const journalCreateData: journalCreateInputModel = {
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            journalCreateInputModel,
            journalDataOutputModel
          >('/Journal/Create', journalCreateData);

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
              message: intl.formatMessage(journalResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '400px' }
            });
          }
        } else {
          const journalUpdateData: journalUpdateInputModel = {
            id: id!,
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            journalUpdateInputModel,
            journalDataOutputModel
          >('/Journal/Update', journalUpdateData);

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
              message: intl.formatMessage(journalResources.anErrorOccurred),
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
        pageTitle={intl.formatMessage(journalResources.journal)}
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
              label={intl.formatMessage(journalResources.journalName)}
              name='journalName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterJournalName)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.AbbreviationName)}
              name='AbbreviationName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterAbbreviationName)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.ISSN)}
              name='ISSN'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterISSN)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.EISSN)}
              name='EISSN'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterEISSN)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.JIF)}
              name='JIF'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterJIF)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.JIF5Years)}
              name='JIF5Years'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterJIF5Years)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.CategoryName)}
              name='CategoryName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterCategoryName)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.Quartile)}
              name='Quartile'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterQuartile)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.Rank)}
              name='Rank'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterRank)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.TotalJournals)}
              name='TotalJournals'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterTotalJournals)}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(journalResources.Year)}
              name='Year'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(journalResources.enterYear)}
              />
            </DataPageFormItem>
          </Col>

          
        </Row>
      </Form>
    </Modal>
  );
};

export default JournalDetailModal;