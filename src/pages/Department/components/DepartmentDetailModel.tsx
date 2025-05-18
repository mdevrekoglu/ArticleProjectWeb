import { Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { keyInputModel } from '../../../models/BaseModels';
import ApiService from '../../../modules/ApiService';
import {
  departmentCreateInputModel,
  departmentDataOutputModel,
  departmentUpdateInputModel
} from '../models';
import departmentResources from '../messages';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';
import FacultySelect from '../../../components/FilterComponents/FacultySelect';
import { useWatch } from 'antd/es/form/Form';
import commonResources from '../../../messages';

interface DepartmentDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
  inputId?: number;
}

const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  open,
  handleModalClose,
  inputId
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [entity, setEntity] = useState<departmentDataOutputModel | undefined>();

  const [id, setId] = useState<number | undefined>();
  const isNewItem = id === undefined || id === null;

  // Update the state whenever inputId changes
  useEffect(() => {
    setId(inputId);
  }, [inputId]);

  const affiliationId = useWatch('affiliationId', form);

  // Reset form and state when modal is opened or closed
  useEffect(() => {
    if (!open) {
      form.resetFields();
      setEntity(undefined);
    } else if (!isNewItem) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const keyInputData: keyInputModel = { id: id! };

          const response = await ApiService.UseGet<
            keyInputModel,
            departmentDataOutputModel
          >('/Department/GetById', keyInputData);

          if (response.isSuccessed) {
            form.setFieldsValue(response);
            setEntity(response);
          } else {
            notification.error({
              message: intl.formatMessage(commonResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '800px' }
            });
          }
        } catch (error) {
          notification.error({
            message: intl.formatMessage(commonResources.unknownError),
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
      form.resetFields();
    }
  }, [open, form, intl, isNewItem, id]);

  const handleClick = async () => {
    setLoading(true);
    let formIsValid = false;

    try {
      await form.validateFields();
      formIsValid = true;
    } catch (error) {
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        if (isNewItem) {
          const departmentCreateData: departmentCreateInputModel = {
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            departmentCreateInputModel,
            departmentDataOutputModel
          >('/Department/Create', departmentCreateData);

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
              message: intl.formatMessage(commonResources.anErrorOccurred),
              description: response.messages.join('\n'),
              placement: 'topRight',
              duration: 5,
              style: { width: '400px' }
            });
          }
        } else {
          const departmentUpdateData: departmentUpdateInputModel = {
            id: id!,
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            departmentUpdateInputModel,
            departmentDataOutputModel
          >('/Department/Update', departmentUpdateData);

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
              message: intl.formatMessage(commonResources.anErrorOccurred),
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
        pageTitle={intl.formatMessage(departmentResources.department)}
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
          <Col xs={24} sm={12}>
            <DataPageFormItem
              label={intl.formatMessage(departmentResources.departmentName)}
              name='departmentName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  departmentResources.enterDepartmentName
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={12}>
            <AffiliationSelect
              initialOption={
                entity
                  ? { id: entity.affiliationId, name: entity.affiliationName }
                  : undefined
              }
              mode='single'
              rules={[{ required: true }]}
            />
          </Col>

          <Col xs={24} sm={12}>
            <FacultySelect
              initialOption={
                entity
                  ? { id: entity.facultyId, name: entity.facultyName }
                  : undefined
              }
              mode='single'
              rules={[{ required: true }]}
              selectedAffiliationId={entity ? undefined : affiliationId}
            />
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(departmentResources.StudentCount)}
              name='studentCount'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  departmentResources.enterStudentCount
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={8}>
            <DataPageFormItem
              label={intl.formatMessage(departmentResources.ResearcherCount)}
              name='researcherCount'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  departmentResources.enterResearcherCount
                )}
              />
            </DataPageFormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DepartmentDetailModal;
