import { FileTypeEnum } from '../AzureFiles/enums';
import { ReportTypeEnum } from './enums';

export interface GenerateReportInputModel {
  file: File;
  fileName: string;
  description: string;
  fileType: FileTypeEnum;
  reportType: ReportTypeEnum;
}
