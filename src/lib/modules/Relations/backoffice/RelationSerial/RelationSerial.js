import { Error, Loader } from '@components';
import { SeriesDetailsLink } from '@components/backoffice/buttons';
import { InfoMessage } from '@components/backoffice';
import {
  ExistingRelations,
  RelationRemover,
} from '@modules/Relations/backoffice';
import { DocumentTitle } from '@modules/Document';
import { RelationSerialModal } from '../RelationSerial';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

export default class RelationSerial extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'serial';
  }

  viewDetails = ({ row }) => {
    return (
      <SeriesDetailsLink pidValue={row.pid_value}>
        <DocumentTitle metadata={row.record_metadata} />
      </SeriesDetailsLink>
    );
  };

  removeHandler = ({ row }) => {
    const { recordDetails } = this.props;

    if (!isEmpty(recordDetails)) {
      return (
        <RelationRemover
          referrer={recordDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove from this serial"
        />
      );
    }
  };

  render() {
    const {
      relations,
      showMaxRows,
      isLoading,
      error,
      recordDetails,
    } = this.props;
    const serial = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Volume', field: 'volume' },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationSerialModal
            relationType={this.relationType}
            recordDetails={recordDetails}
          />

          <ExistingRelations
            rows={serial}
            showMaxRows={showMaxRows}
            columns={columns}
            emptyMessage={
              <InfoMessage
                header="No serials"
                content="Use the button above to add this literature to a serial."
              />
            }
          />
        </Error>
      </Loader>
    );
  }
}

RelationSerial.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  recordDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationSerial.defaultProps = {
  showMaxRows: 3,
  error: null,
};