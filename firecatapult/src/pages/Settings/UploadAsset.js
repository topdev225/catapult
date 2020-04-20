import { connect } from 'react-redux';
import { withHandlers, compose } from 'recompose';
import UploadImage from "../../components/UploadImage";
import { uploadAsset } from '../../modules/auth';

const mapDispatch = {
  uploadAsset
}

export default compose(
  connect(null, mapDispatch),
  withHandlers({
    upload: props => async e => {
      props.uploadAsset(props.inputName, e.target.files[0])
    }
  })
)(UploadImage);