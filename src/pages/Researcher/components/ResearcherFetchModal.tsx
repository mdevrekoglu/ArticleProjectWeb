import { Col, Form, InputNumber, Modal, notification, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import DataPageModalHeader from '../../../components/DataPageItems/DataPageModalHeader';
import researcherResources from '../messages';
import { keyInputModel, messageOutputModel } from '../../../models/BaseModels';
import ApiService from '../../../modules/ApiService';
import commonResources from '../../../messages';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';

interface ResearcherFetchModalProps {
  open: boolean;
  handleModalClose: (isDataChanged: boolean) => void;
}

const ResearcherFetchModal: React.FC<ResearcherFetchModalProps> = ({
  open,
  handleModalClose
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

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
        const fetchResearcherData: keyInputModel = {
          ...form.getFieldsValue()
        };

        const response = await ApiService.UsePost<
          keyInputModel,
          messageOutputModel
        >('/Researcher/Fetch', fetchResearcherData);

        if (response.isSuccessed) {
          notification.success({
            message: response.messages[0],
            placement: 'topRight',
            duration: 3,
            style: { width: '400px' }
          });

          setIsDataChanged(true);
        } else {
          notification.error({
            message: intl.formatMessage(commonResources.anErrorOccurred),
            description: response.messages.join('\n'),
            placement: 'topRight',
            duration: 5,
            style: { width: '400px' }
          });
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
        pageTitle={intl.formatMessage(researcherResources.updateUserViaScopus)}
        loading={loading}
        onCloseClick={() => handleModalClose(isDataChanged)}
        isNewItem={false}
        onClick={handleClick}
        id={undefined}
      />

      <Form
        form={form}
        layout='inline'
        style={{ width: '100%' }}
        requiredMark={false}
      >
        <Row gutter={[4, 4]} style={{ width: '100%' }}>
          <Col xs={24} sm={24}>
            <DataPageFormItem
              label={intl.formatMessage(researcherResources.scopusId)}
              name='id'
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder={intl.formatMessage(
                  researcherResources.enterScopusId
                )}
                style={{ width: '100%' }}
                controls={false}
                min={0}
              />
            </DataPageFormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ResearcherFetchModal;
