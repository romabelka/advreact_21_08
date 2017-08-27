import React from 'react'

function ErrorField(props) {
    const {input, type, meta: {error, touched}, label} = props
    const errorText = touched && error && <div style={{color: 'red'}}>{error}</div>
    return (
        <div>
            <label>{label || input.name}</label>
            <input {...input} type={type}/>
            {errorText}
        </div>
    )
}

ErrorField.propTypes = {
}

export default ErrorField