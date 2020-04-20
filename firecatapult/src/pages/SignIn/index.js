import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { compose } from 'redux';
import { signInValidationSchema } from '../../helpers/validationSchemas';
import { signIn } from '../../modules/auth';
import { routerPush } from '../../modules/app';

import SignIn from "./SignIn";

const withForm = withFormik({
	validationSchema: signInValidationSchema,
	mapPropsToValues: ({ username, password }) => ({
		username: username || '',
		password: password || ''
	}),
	handleSubmit: async ({
		username,
		password
	}, {
		props: {
			signIn,
			routerPush
		},
		setSubmitting
	}) => {
		try {
			setSubmitting(true);
			await signIn({ username, password });
			routerPush('/');
		} catch (error) {
			alert('Your username or password is incorrect')
			setSubmitting(false);
		}
	}
});

const mapDispatch = {
	signIn,
	routerPush
};

const enhance = compose(
	connect(null, mapDispatch),
	withForm
)

export default enhance(SignIn);
