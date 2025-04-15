import React from 'react'
import useForm from '../hooks/useForm'

const DynamicBootstrapForm = ({fields, buildUrl, formButtons }) => {
  const { formState, handleInputChange, handleReset, handleSubmit } = useForm({})
  const url = buildUrl(formState)

  return (
    <form onSubmit={(e) => handleSubmit(e, url, formButtons.successCallback)}>
      {
        fields.map(field => (
          <div className={'mb-3'} key={field.name}>
            <label htmlFor={field.name} className={'form-label'}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formState[field.name]}
              className={'form-control'}
              id={field.name}
              placeholder={field.placeholder}
              onChange={handleInputChange}
            />
          </div>
        ))
      }
      <div className={'d-flex gap-2'}>
        <button type={'submit'} className={'btn btn-primary'}>{formButtons.submitText}</button>
        <button type={'reset'} className={'btn btn-danger'} onClick={() => handleReset(formButtons.resetCallback)}>Reset</button>
      </div>
    </form>
  )
}

export default DynamicBootstrapForm
