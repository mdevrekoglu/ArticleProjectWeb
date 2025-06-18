import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const GeneralReport: React.FC = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  //const [data, setData] = useState<journalDataListModel>();

  return <div>GeneralReport</div>;
};

export default GeneralReport;
