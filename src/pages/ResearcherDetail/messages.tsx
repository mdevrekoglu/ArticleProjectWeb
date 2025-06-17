import { defineMessages } from 'react-intl';

const researcherDetailResources = defineMessages({
  pageTitle: {
    id: 'researcherDetail.pageTitle',
    defaultMessage: 'Researcher Detail'
  },
  errorNoId: {
    id: 'researcherDetail.errorNoId',
    defaultMessage: 'No researcher ID provided.'
  },
  orcIdStyled: {
    id: 'researcherDetail.orcIdStyled',
    defaultMessage: 'ORCID: {orcId}'
  },
  scopusIdStyled: {
    id: 'researcherDetail.scopusIdStyled',
    defaultMessage: 'Scopus ID: {scopusId}'
  },
  wosIdStyled: {
    id: 'researcherDetail.wosIdStyled',
    defaultMessage: 'WOS ID: {wosId}'
  },
  generalInformation: {
    id: 'researcherDetail.generalInformation',
    defaultMessage: 'General Information'
  },
  publications: {
    id: 'researcherDetail.publications',
    defaultMessage: 'Publications'
  }
});

export default researcherDetailResources;
