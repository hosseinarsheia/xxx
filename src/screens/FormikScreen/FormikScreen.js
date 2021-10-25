// import React, { Fragment, useEffect, useState } from 'react'
// import { View, Text, Alert, TextInput, StyleSheet, Button, useWindowDimensions, Image, ScrollView } from 'react-native'
// import { observable, action, autorun, computed } from 'mobx'
// import { inject, observer, useLocalStore } from 'mobx-react'
// import { Input, CheckBox } from 'react-native-elements'
// import { Formik, useFormik } from 'formik'
// import * as Yup from 'yup'

// // add custom validation, Generally
// Yup.addMethod(Yup.string, 'isEqullToTwo', function (value) {
//   return this.test('dede', 'it is not 2 ', value => (parseInt(value) === 2 ? true : false))
// })

// const FormikScreen = () => {
//   const {
//     values,
//     errors,
//     handleChange,
//     touched,
//     handleBlur,
//     handleSubmit,
//     handleReset,
//     setFieldValue,
//     setFieldTouched,
//   } = useFormik({
//     initialValues: {
//       name: 'dede',
//       email: 'hosseinarsheia@yahoo.com',
//       password: '',
//       confirmPassword: '',
//       check: false,
//       dateValue: '',
//     },
//     onSubmit: (values, data) => {
//       handleReset(values)
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().trim().min(2, 'name length is smaller than 2').required('name is required'),
//       email: Yup.string().trim().required('email is required').email(),
//       check: Yup.boolean().oneOf([true], 'Please check the agreement'),
//       dateValue: Yup.string().trim().required('date must entered'),
//     }),
//   })

//   const { height, width } = useWindowDimensions()

//   const [num, setNum] = useState('')

//   return (
//     <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
//       {/* {console.log('getFieldProps : ', getFieldProps('name'))} */}

//       <Text style={styles.errorTextStyle}>{touched.dateValue && errors.dateValue}</Text>

//       <CheckBox
//         center
//         title="Click Here"
//         onBlur={handleBlur('check')}
//         checked={values.check}
//         onPress={() => {
//           setFieldTouched('check', true)
//           setFieldValue('check', !values.check)
//         }}
//       />
//       <Text style={styles.errorTextStyle}>{touched.check && errors.check}</Text>
//       <Input
//         value={values.name}
//         placeholder="name"
//         style={styles.TextInputStyle}
//         errorMessage={touched.name && errors.name ? errors.name : ''}
//         onChangeText={handleChange('name')}
//         onBlur={handleBlur('name')}
//       />
//       <Input
//         value={values.email}
//         placeholder="email"
//         style={styles.TextInputStyle}
//         errorMessage={touched.email && errors.email ? errors.email : ''}
//         onChangeText={handleChange('email')}
//         onBlur={handleBlur('email')}
//       />

//       <Button title="Submit" onPress={handleSubmit} />

//       {/* {console.log(formik)} */}
//       {/*
//       <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={() => {}}>
//         {({ values, errors, handleChange, touched, handleBlur, handleSubmit }) => {
//           const { name, familyName, email, password, confirmPassword } = values
//           return (
//             <>
//               <Input
//                 value={name}
//                 placeholder="name"
//                 style={styles.TextInputStyle}
//                 errorMessage={errors.name}
//                 onChangeText={handleChange('name')}
//               />

//               <Input
//                 value={email}
//                 placeholder="email"
//                 style={styles.TextInputStyle}
//                 onChangeText={handleChange('email')}
//                 errorMessage={errors.email}
//               />
//               <Input
//                 value={password}
//                 placeholder="password"
//                 style={styles.TextInputStyle}
//                 onChangeText={handleChange('password')}
//                 errorMessage={errors.password}
//               />
//               <Input
//                 value={confirmPassword}
//                 placeholder="confirmPassword"
//                 style={styles.TextInputStyle}
//                 onChangeText={handleChange('confirmPassword')}
//                 errorMessage={errors.confirmPassword}
//               />

//               <Button title="press me" onPress={handleSubmit} />
//             </>
//           )
//         }}
//       </Formik> */}
//     </ScrollView>
//   )
// }

// export default FormikScreen

// export const styles = StyleSheet.create({
//   TextInputStyle: {
//     borderColor: 'grey',
//     borderWidth: 1,
//     width: 200,
//     marginTop: 20,
//   },
//   errorTextStyle: {
//     color: 'red',
//   },
// })

import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { observable, action, autorun, computed } from 'mobx'
import { inject, observer, useLocalStore } from 'mobx-react'

const FormikScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>FormikScreen</Text>
    </View>
  )
}

export default FormikScreen
