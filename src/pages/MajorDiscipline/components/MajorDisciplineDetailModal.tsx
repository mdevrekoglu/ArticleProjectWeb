import { Col, Form, Input, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { keyInputModel } from '../../../models/BaseModels';
import ApiService from '../../../modules/ApiService';
import {
  majorDisciplineCreateInputModel,
  majorDisciplineDataOutputModel,
  majorDisciplineUpdateInputModel
} from '../models';
import departmentResources from '../messages';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';
import FacultySelect from '../../../components/FilterComponents/FacultySelect';
import { useWatch } from 'antd/es/form/Form';
import commonResources from '../../../messages';
import majorDisciplineResources from '../messages';
import DepartmentSelect from '../../../components/FilterComponents/DepartmentSelect';

interface MajorDisciplineDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
  inputId?: number;
}

const MajorDisciplineDetailModal: React.FC<MajorDisciplineDetailModalProps> = ({
  open,
  handleModalClose,
  inputId
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [entity, setEntity] = useState<majorDisciplineDataOutputModel | undefined>();

  const [id, setId] = useState<number | undefined>();
  const isNewItem = id === undefined || id === null;

  // Update the state whenever inputId changes
  useEffect(() => {
    setId(inputId);
  }, [inputId]);

  const affiliationId = useWatch('affiliationId', form);
  const facultyId = useWatch('facultyId', form);

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
            majorDisciplineDataOutputModel
          >('/MajorDiscipline/GetById', keyInputData);

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
          const majorDisciplineCreateData: majorDisciplineCreateInputModel = {
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            majorDisciplineCreateInputModel,
            majorDisciplineDataOutputModel
          >('/MajorDiscipline/Create', majorDisciplineCreateData);

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
          const majorDisciplineUpdateData: majorDisciplineUpdateInputModel = {
            id: id!,
            ...form.getFieldsValue()
          };

          const response = await ApiService.UsePost<
            majorDisciplineUpdateInputModel,
            majorDisciplineDataOutputModel
          >('/MajorDiscipline/Update', majorDisciplineUpdateData);

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
        pageTitle={intl.formatMessage(departmentResources.majorDiscipline)}
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
              label={intl.formatMessage(majorDisciplineResources.majorDisciplineName)}
              name='majorDisciplineName'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  majorDisciplineResources.enterMajorDisciplineName
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

          <Col xs={24} sm={12}>
            <DepartmentSelect
              initialOption={
                entity
                  ? { id: entity.departmentId, name: entity.departmentName }
                  : undefined
              }
              mode='single'
              rules={[{ required: true }]}
              selectedFacultyId={entity ? undefined : facultyId}
            />
          </Col>

        </Row>
      </Form>
    </Modal>
  );
};

export default MajorDisciplineDetailModal;
