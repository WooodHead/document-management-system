import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserDocuments, deleteDocument, undoDelete } from '../../actions/documentsAction';
import PreLoader from '../templates/PreLoader';

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);

    // set Dynamic import for code splitting and optimisation
    this.state = {
      ActivePage: <PreLoader />,
      pathName: this.props.location.pathname
    };
    console.log(this.props);
    this.loadListDocument = this.loadListDocument.bind(this);
  }

  componentDidMount() {
    this.loadListDocument();
    console.log('okay');
  }

  loadListDocument() {
    console.log(this.props.route.path)
    this.props.loadUserDocuments()
      .then(() => {
        import('./DocumentList')
          .then((DocumentList) => {
            this.setState({
              ActivePage: <DocumentList.default
              documents={this.props.myDocuments}
              user={this.props.user}
              deleteDocument={this.props.deleteDocument}
              archived={this.props.archived}
              undoDelete={this.props.undoDelete}
               />
            });
          });
      });
  }


  render() {
    return (
      <div> {this.state.ActivePage} </div>
    );
  }
}

DocumentPage.propTypes = {
  myDocuments: PropTypes.array.isRequired,
  loadUserDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  archived: PropTypes.object.isRequired,
  undoDelete: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const currentState = state.manageDocument;
  const myDocuments = currentState.alldocuments;
  return {
    myDocuments,
    user: state.user.user,
    archived: currentState.archived,
  };
}


export default connect(mapStateToProps, { loadUserDocuments, deleteDocument, undoDelete })(DocumentPage);
