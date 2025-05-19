import React from 'react';
import { DatePicker, Form, theme } from 'antd';
import { defineMessages, useIntl } from 'react-intl';

const dateFormat = 'DD/MM/YYYY';
const { useToken } = theme;

const messages = defineMessages({
  date: { id: 'customDatePicker.date', defaultMessage: 'Date' },
  startDate: { id: 'customDatePicker.startDate', defaultMessage: 'Start date' },
  endDate: { id: 'customDatePicker.endDate', defaultMessage: 'End date' }
});

interface CustomDatePickerProps {
  name?: [string, string];
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name = ['startDate', 'endDate']
}) => {
  const { token } = useToken();
  const intl = useIntl();
  const form = Form.useFormInstance();

  return (
    <Form.Item
      label={intl.formatMessage(messages.date)}
      colon={false}
      style={{
        width: '100%',
        backgroundColor: token.colorBgElevated,
        borderRadius: '4px',
        padding: '4px'
      }}
      labelCol={{
        style: {
          width: '80px',
          textAlign: 'right'
        }
      }}
    >
      <Form.Item name={name[0]} noStyle>
        <DatePicker
          format={dateFormat}
          placeholder={intl.formatMessage(messages.startDate)}
          style={{ width: '50%' }}
          disabledDate={currentDate => {
            const end = form.getFieldValue(name[1]);
            return end && currentDate && currentDate.isAfter(end, 'day');
          }}
        />
      </Form.Item>
      <Form.Item name={name[1]} noStyle>
        <DatePicker
          format={dateFormat}
          placeholder={intl.formatMessage(messages.endDate)}
          style={{ width: '50%' }}
          disabledDate={currentDate => {
            const start = form.getFieldValue(name[0]);
            return start && currentDate && currentDate.isBefore(start, 'day');
          }}
        />
      </Form.Item>
    </Form.Item>
  );
};

export default CustomDatePicker;
