import React from 'react'
import api from 'api'
import { withFormik } from 'formik'
import * as yup from 'yup'

import { Field, Submit } from 'components/Forms'

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="name"
      value={values.name}
      label="Full name"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.name && errors.name}
    />
    <Field
      name="phone_number"
      value={values.phone_number}
      label="Phone number (including country code if outside the US)"
      placeholder="(415)-555-555"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.phone_number && errors.phone_number}
    />
    <Field
      name="email"
      value={values.email}
      disabled
      label="Email address"
      placeholder="email"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
    />
    <Field
      name="address"
      value={values.address}
      label="Full address"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.address && errors.address}
      type="textarea"
    />
    <Field
      name="gender"
      value={values.gender || 'select'}
      label="Gender"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.gender && errors.gender}
      type="select"
    >
      <option value="select" disabled>
        Select One
      </option>
      <option value="agender">Agender</option>
      <option value="female">Female</option>
      <option value="genderqueer">Genderqueer</option>
      <option value="male">Male</option>
      <option value="other_gender">Other gender</option>
    </Field>
    <Field
      name="birthday"
      value={values.birthday}
      label="Birthday"
      placeholder="YYYY-MM-DD"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.birthday && errors.birthday}
      type="date"
    />
    <Field
      name="ethnicity"
      value={values.ethnicity || 'select'}
      label="Ethnicity"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.ethnicity && errors.ethnicity}
      type="select"
    >
      <option value="select" disabled>
        Select One
      </option>
      <option value="asian_or_pacific_islander">
        Asian or Pacific Islander
      </option>
      <option value="black">Black</option>
      <option value="hispanic_or_latino">Hispanic or Latino</option>
      <option value="native_american_or_indian">
        Native American or Indian
      </option>
      <option value="white">White</option>
      <option value="other_ethnicity">Other ethnicity</option>
    </Field>
    <Field
      name="expected_graduation"
      value={values.expected_graduation}
      label="What month do you graduate from high school?"
      placeholder="YYYY-MM"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.expected_graduation && errors.expected_graduation}
      type="month"
    />
    <Field
      name="personal_website"
      value={values.personal_website}
      label="Personal website"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.personal_website && errors.personal_website}
    />
    <Field
      name="github_url"
      value={values.github_url}
      label="GitHub profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.github_url && errors.github_url}
    />
    <Field
      name="linkedin_url"
      value={values.linkedin_url}
      label="LinkedIn profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.linkedin_url && errors.linkedin_url}
    />
    <Field
      name="twitter_url"
      value={values.twitter_url}
      label="Twitter profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.twitter_url && errors.twitter_url}
    />
    <Field
      name="facebook_url"
      value={values.facebook_url}
      label="Facebook profile"
      placeholder="https://"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.facebook_url && errors.facebook_url}
    />
    <Submit
      disabled={isSubmitting}
      onClick={handleSubmit}
      value="Submit"
      bg="primary"
      fontSize={4}
    />
  </form>
)

export default withFormik({
  mapValuesToProps: props => ({
    email: props.email,
    address: '',
    gender: '',
    ethnicity: '',
    name: '',
    phone_number: ''
  }),
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required('required')
      .email('invalid email'),
    address: yup
      .string()
      .required('required')
      .test({
        // eslint-disable-next-line
        message: '${path} should not be a single line',
        test: value => {
          try {
            return value.trim().split(/\r\n|\r|\n/).length > 1
          } catch (_e) {
            return false
          }
        }
      }),
    expected_graduation: yup.date().required('required'),
    gender: yup
      .string()
      .required('required')
      .matches(/(male|female|genderqueer|agender|other_gender)/),
    ethnicity: yup
      .string()
      .required('required')
      .matches(
        /(hispanic_or_latino|white|black|native_american_or_indian|asian_or_pacific_islander|other_ethnicity)/
      ),
    name: yup.string().required('required'),
    phone_number: yup.string().required('required')
  }),
  handleSubmit: (values, { props, setSubmitting, setStatus }) => {
    api
      .post(`v1/users/${props.userId}/new_leader`, { data: values })
      .then(leaderPosition => {
        setSubmitting(false)
        setStatus('success')
        props.callback(leaderPosition)
      })
      .catch(err => {
        console.error(err)
        setSubmitting(false)
        setStatus('error')
      })
  }
})(InnerForm)
