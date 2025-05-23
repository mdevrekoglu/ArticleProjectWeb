import { Col, Divider, Input, InputNumber, Row } from 'antd';
import Form from 'antd/es/form/Form';
import { useIntl } from 'react-intl';
import DataPageFormItem from '../../../components/DataPageItems/DataPageFormItem';
import journalResources from '../messages';
import QuartileSelect from '../../Authentication/components/QuartileSelect';

interface JournalFilterProps {
  form: any;
}

const JournalFilter: React.FC<JournalFilterProps> = ({ form }) => {
  const intl = useIntl();

  return (
    <Form
      form={form}
      layout='inline'
      style={{
        width: '100%'
      }}
    >
      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.journalName)}
            name='name'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterJournalName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.ISSN)}
            name='issn'
          >
            <Input
              placeholder={intl.formatMessage(journalResources.enterISSN)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.EISSN)}
            name='eissn'
          >
            <Input
              placeholder={intl.formatMessage(journalResources.enterEISSN)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.CategoryName)}
            name='categoryName'
          >
            <Input
              placeholder={intl.formatMessage(journalResources.CategoryName)}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.Year)}
            name='year'
          >
            <InputNumber
              placeholder={intl.formatMessage(journalResources.enterYear)}
              style={{ width: '100%' }}
              controls={false}
              min={0}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.Quartile)}
            name='quartile'
          >
            <QuartileSelect
              placeholder={intl.formatMessage(journalResources.enterQuartile)}
            />
          </DataPageFormItem>
        </Col>
      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </Form>
  );
};

export default JournalFilter;
