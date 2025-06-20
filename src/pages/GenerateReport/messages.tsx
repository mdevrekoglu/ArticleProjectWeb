import { defineMessages } from 'react-intl';

const generateReportResources = defineMessages({
  generateReport: {
    id: 'generateReportResources.generateReport',
    defaultMessage: 'Generate Report'
  },
  reportType: {
    id: 'generateReportResources.reportType',
    defaultMessage: 'Report Type'
  },
  uploadExcel: {
    id: 'generateReportResources.uploadExcel',
    defaultMessage: 'Upload Excel File'
  },
  clickToUpload: {
    id: 'generateReportResources.clickToUpload',
    defaultMessage: 'Click to upload'
  },
  clickOrDragMessage: {
    id: 'generateReportResources.clickOrDragMessage',
    defaultMessage: 'Click or drag file to this area to upload'
  },
  draggerWarningMessage: {
    id: 'generateReportResources.draggerWarningMessage',
    defaultMessage: 'Drag only one .xlsx file at a time'
  },
  selectedFile: {
    id: 'generateReportResources.selectedFile',
    defaultMessage:
      'Selected File: {fileName} ({fileSize} MB, last modified: {lastModified})'
  }
});

export default generateReportResources;
