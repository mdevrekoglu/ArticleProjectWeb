import { Button, Col, Form, Input, List, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  notificationCreateInputModel,
  notificationDataOutputModel,
  notificationUpdateInputModel,
  UserOptionsSearchInputModel
} from '../models';
import { useWatch } from 'antd/es/form/Form';
import {
  BaseGetOptionsStringOutputModel,
  keyInputModel
} from '../../../models/BaseModels';
import ApiService from '../../../modules/ApiService';
import commonResources from '../../../messages';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import notificationResources from '../messages';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import IsActiveSelect from '../../../components/FilterComponents/IsActiveSelect';
import CustomDivider from '../../../components/DataPageItems/CustomDivider';
import AffiliationSelect from '../../../components/FilterComponents/AffiliationSelect';
import FacultySelect from '../../../components/FilterComponents/FacultySelect';
import DepartmentSelect from '../../../components/FilterComponents/DepartmentSelect';
import { UserAddOutlined } from '@ant-design/icons';

interface NotificationDetailModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
  inputId?: number;
}

const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  open,
  handleModalClose,
  inputId
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [entity, setEntity] = useState<
    notificationDataOutputModel | undefined
  >();

  const [id, setId] = useState<number | undefined>();
  const isNewItem = id === undefined || id === null;

  // Update the state whenever inputId changes
  useEffect(() => {
    setId(inputId);
  }, [inputId]);

  const affiliationId = useWatch('affiliationId', form);
  const facultyId = useWatch('facultyId', form);
  const [targetUsers, setTargetUsers] = useState<
    BaseGetOptionsStringOutputModel[]
  >([]);

  // Reset form and state when modal is opened or closed
  useEffect(() => {
    if (!open) {
      form.resetFields();
      setTargetUsers([]);
      setEntity(undefined);
    } else if (!isNewItem) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const keyInputData: keyInputModel = { id: id! };

          const response = await ApiService.UseGet<
            keyInputModel,
            notificationDataOutputModel
          >('/Notification/GetById', keyInputData);

          if (response.isSuccessed) {
            form.setFieldsValue(response);
            setEntity(response);
            setTargetUsers(
              response.targets.map(user => ({
                id: user.userId,
                name: user.name
              }))
            );
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

    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    try {
      if (isNewItem) {
        const notificationCreateData: notificationCreateInputModel = {
          ...form.getFieldsValue(),
          userIds: targetUsers.map(user => user.id)
        };

        const response = await ApiService.UsePost<
          notificationCreateInputModel,
          notificationDataOutputModel
        >('/Notification/Create', notificationCreateData);

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
        const notificationUpdateData: notificationUpdateInputModel = {
          id: id!,
          ...form.getFieldsValue(),
          userIds: targetUsers.map(user => user.id)
        };

        const response = await ApiService.UsePost<
          notificationUpdateInputModel,
          notificationDataOutputModel
        >('/Notification/Update', notificationUpdateData);

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

    setLoading(false);
  };

  const handleFetchUsers = async () => {
    setLoading(true);

    const { affiliationId, departmentId, facultyId } = form.getFieldsValue([
      'affiliationId',
      'departmentId',
      'facultyId'
    ]);

    const hasAnyValue = affiliationId || departmentId || facultyId;

    if (!hasAnyValue) {
      notification.warning({
        message: intl.formatMessage(notificationResources.fetchUsersWarning),
        placement: 'topRight',
        duration: 4
      });
      return;
    }

    try {
      const getOptionsSearchModel: UserOptionsSearchInputModel = {
        affiliationId,
        facultyId,
        departmentId
      };

      const response = await ApiService.UseGet<
        UserOptionsSearchInputModel,
        BaseGetOptionsStringOutputModel[]
      >('/UserManagement/GetOptionsBySearchModel', getOptionsSearchModel);

      setTargetUsers(prev => {
        const combined = [...prev, ...response];

        // Distinct by ID
        const uniqueMap = new Map<string, BaseGetOptionsStringOutputModel>();
        combined.forEach(user => {
          uniqueMap.set(user.id, user);
        });

        return Array.from(uniqueMap.values());
      });
    } catch (error) {}

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
        pageTitle={intl.formatMessage(notificationResources.notification)}
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
              label={intl.formatMessage(notificationResources.title)}
              name='title'
              rules={[{ required: true }]}
            >
              <Input
                placeholder={intl.formatMessage(
                  notificationResources.enterTitle
                )}
              />
            </DataPageFormItem>
          </Col>

          <Col xs={24} sm={12}>
            <IsActiveSelect
              disabled={isNewItem}
              value={isNewItem ? true : undefined}
            />
          </Col>

          <Col xs={24} sm={24}>
            <DataPageFormItem
              label={intl.formatMessage(notificationResources.description)}
              name='description'
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder={intl.formatMessage(
                  notificationResources.enterDescription
                )}
              />
            </DataPageFormItem>
          </Col>

          <CustomDivider />

          <Col xs={24} sm={8}>
            <AffiliationSelect mode='single' />
          </Col>

          <Col xs={24} sm={8}>
            <FacultySelect
              mode='single'
              selectedAffiliationId={entity ? undefined : affiliationId}
            />
          </Col>

          <Col xs={24} sm={8}>
            <DepartmentSelect
              mode='single'
              selectedFacultyId={entity ? undefined : facultyId}
            />
          </Col>

          <CustomDivider>
            <Button icon={<UserAddOutlined />} onClick={handleFetchUsers}>
              {intl.formatMessage(notificationResources.fetchUsers)}
            </Button>
          </CustomDivider>

          <Col xs={24} sm={24}>
            <DataPageFormItem
              label={intl.formatMessage(notificationResources.users)}
              name='userIds'
            >
              <List
                size='small'
                bordered
                dataSource={targetUsers}
                style={{ maxHeight: 200, overflowY: 'auto' }}
                locale={{
                  emptyText: intl.formatMessage(
                    notificationResources.noUserSelected
                  )
                }}
                renderItem={user => (
                  <List.Item
                    actions={[
                      <Button
                        size='small'
                        type='link'
                        danger
                        onClick={() =>
                          setTargetUsers(prev =>
                            prev.filter(u => u.id !== user.id)
                          )
                        }
                      >
                        {intl.formatMessage(commonResources.remove)}
                      </Button>
                    ]}
                  >
                    {user.name}
                  </List.Item>
                )}
              />
            </DataPageFormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NotificationDetailModal;
