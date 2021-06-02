import {Field, Form, Formik, FormikValues} from "formik";
import React from "react";

type FilterFormProps = {
    onTermFilter: (term: string) => void
    onFriendFilter: (isFriend: '' | boolean) => void
    currentPage: number
    term: string
    isFriend: '' | boolean
}


const FilterForm: React.FC<FilterFormProps> = React.memo(({onTermFilter, onFriendFilter, term, isFriend}) => {

    const initialValues = {term: term, isFriend: isFriend}
    const onSubmit = (values: FormikValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        if (values.term) {
            onTermFilter(values.term)
        }
        if (values.isFriend) {
            onFriendFilter(values.isFriend)
        }

        setSubmitting(false);

    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field
                            component="select"
                            id="isFriend"
                            name="isFriend"
                            multiple={false}
                        >
                            <option value="">All</option>
                            <option value='true'>Followed Users</option>
                            <option value='false'>Unfollowed Users</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default FilterForm