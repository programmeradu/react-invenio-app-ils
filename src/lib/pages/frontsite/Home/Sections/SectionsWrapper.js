import { documentApi } from '@api/documents';
import { DocumentCardGroup } from '@modules/Document/DocumentCardGroup';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { SectionServices } from './SectionServices';
import SectionTags from './SectionTags';
import Overridable from 'react-overridable';

export default class SectionsWrapper extends Component {
  render() {
    const { size } = this.props;
    return (
      <Container fluid className="fs-landing-page-section-wrapper">
        <Overridable id="SectionsWrapper.servicesInstallationSections">
          <>
            <SectionServices />
          </>
        </Overridable>
        <Container fluid id="recent-books">
          <Container textAlign="center" className="fs-landing-page-section">
            <DocumentCardGroup
              title="Most recent books"
              headerClass="section-header highlight"
              fetchDataMethod={documentApi.list}
              fetchDataQuery={documentApi
                .query()
                .withDocumentType('BOOK')
                .sortBy('-created')
                .withSize(size)
                .qs()}
              viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
                '&sort=created&order=desc'
              )}
            />
          </Container>
        </Container>
        <SectionTags />
        <Container
          textAlign="center"
          className="fs-landing-page-section"
          id="recent-ebooks"
        >
          <DocumentCardGroup
            title="Most recent e-books"
            headerClass="section-header highlight"
            fetchDataMethod={documentApi.list}
            fetchDataQuery={documentApi
              .query()
              .withDocumentType('BOOK')
              .withEitems()
              .sortBy('-created')
              .withSize(size)
              .qs()}
            viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
              '&f=doctype%3ABOOK&f=medium%3AE-BOOK&sort=created&order=desc'
            )}
          />
        </Container>
        <Container
          textAlign="center"
          className="fs-landing-page-section"
          id="most-loaned"
        >
          <DocumentCardGroup
            title="Most loaned books"
            headerClass="section-header highlight"
            fetchDataMethod={documentApi.list}
            fetchDataQuery={documentApi
              .query()
              .withDocumentType('BOOK')
              .sortBy('-mostloaned')
              .withSize(size)
              .qs()}
            viewAllUrl={FrontSiteRoutes.documentsListWithQuery(
              '&sort=mostloaned&order=desc'
            )}
          />
        </Container>
      </Container>
    );
  }
}

SectionsWrapper.propTypes = {
  size: PropTypes.number,
};

SectionsWrapper.defaultProps = {
  size: 5,
};
