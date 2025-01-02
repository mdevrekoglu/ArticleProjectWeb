import { Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { keyInputModel } from '../../../models/BaseModels';
import ApiService from '../../../modules/ApiService';
import {
  facultyCreateInputModel,
  facultyDataOutputModel,
  facultyUpdateInputModel
} from '../models';
import facultyResources from '../messages';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';

interface FacultyDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged?: boolean) => void;
  inputId?: number;
}

const FacultyDetailModal: React.FC<FacultyDetailModalProps> = ({
  open,
  handleModalClose,
  inputId
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [entity, setEntity] = useState<facultyDataOutputModel | undefined>();

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
      setEntity(undefined);
    } else if (!isNewItem) {
      // Fetch data when modal is opened with an existing ID
      // We have to create a new function to use async/await in useEffect
      const fetchData = async () => {
        setLoading(true);

        try {
          const keyInputData: keyInputModel = { id: id! };

          const response = await ApiService.UseGet<
            keyInputModel,
            facultyDataOutputModel
          >('/Faculty/GetById', keyInputData);

          if (response.isSuccessed) {
            form.setFieldsValue(response);
            setEntity(response);
          } else {
            notification.error({
              message: intl.formatMessage(facultyResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '800px' }
            });
          }
        } catch (error) {
          notification.error({
            message: intl.formatMessage(facultyResources.unknownError),
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
          const facultyCreateData: facultyCreateInputModel = {
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            facultyCreateInputModel,
            facultyDataOutputModel
          >('/Faculty/Create', facultyCreateData);

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
            setEntity(response);
          } else {
            notification.error({
              message: intl.formatMessage(facultyResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '400px' }
            });
          }
        } else {
          const facultyUpdateData: facultyUpdateInputModel = {
            id: id!,
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            facultyUpdateInputModel,
            facultyDataOutputModel
          >('/Faculty/Update', facultyUpdateData);

          if (response.isSuccessed) {
            notification.success({
              message: response.messages[0],
              placement: 'topRight',
              duration: 3,
              style: { width: '400px' }
            });

            form.setFieldsValue(response);
            setIsDataChanged(true);
            setEntity(response);
          } else {
            notification.error({
              message: intl.formatMessage(facultyResources.anErrorOccurred),
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
        pageTitle={intl.formatMessage(facultyResources.faculty)}
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
              label={intl.formatMessage(facultyResources.facultyName)}
              name='facultyName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  facultyResources.enterFacultyName
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={16}>
            <AffiliationSelect
              initialValue={
                entity
                  ? { id: entity.affiliationId, name: entity.affiliationName }
                  : undefined
              }
              mode='single'
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FacultyDetailModal;
