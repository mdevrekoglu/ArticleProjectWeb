import { Col, Divider, Input, Row } from "antd";
import Form, { useWatch } from "antd/es/form/Form";
import { useIntl } from "react-intl";
import DataPageFormItem from "../../../components/DataPageItems/DataPageFormItem";
import journalResources from "../messages";

interface JournalFilterProps {
  form: any;
}

const JournalFilter: React.FC<JournalFilterProps> = ({ form }) => {
  const intl = useIntl();
  const affiliationId = useWatch('affiliationId', form);

  return (
    <Form form={form}
    layout='inline' 
    style={{
       width: '100%' 
       }}
       >

      <Row gutter={[4, 4]} style={{ width: '100%' }}>
        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.journalName)}
            name='journalName'
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
            name='ISSN'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterISSN
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.EISSN)}
            name='EISSN'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterEISSN
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.JIF)}
            name='JIF'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterJIF
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.JIF5Years)}
            name='JIF5Years'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterJIF5Years
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.CategoryName)}
            name='CategoryName'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.CategoryName
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.Quartile)}
            name='Quartile'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterQuartile
              )}
            />
          </DataPageFormItem>
        </Col>

        <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.Rank)}
            name='Rank'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterRank
              )}
            />
          </DataPageFormItem>
        </Col>

         <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.TotalJournals)}
            name='TotalJournals'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterTotalJournals
              )}
            />
          </DataPageFormItem>
        </Col>

         <Col xs={24} sm={8}>
          <DataPageFormItem
            label={intl.formatMessage(journalResources.Year)}
            name='Year'
          >
            <Input
              placeholder={intl.formatMessage(
                journalResources.enterYear
              )}
            />
          </DataPageFormItem>
        </Col>

      </Row>
      <Divider style={{ marginTop: '8px', marginBottom: '8px' }}></Divider>
    </Form>
  );
};

export default JournalFilter;