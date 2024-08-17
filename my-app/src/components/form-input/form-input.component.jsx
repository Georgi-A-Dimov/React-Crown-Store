import './form-input.styles.scss';

const FormInput = ({ label, error, ...otherProps }) => {
    return (
        <div className={`group ${error ? 'error' : ''}`}>
            <input className={`form-input ${error ? 'form-input-error' : ''}`} {...otherProps} />

            {label &&
                <label className={ `${otherProps.value.lenght ? 'shrink' : ''} form-input-label` }>
                    {label}
                </label>
            }

            {error && 
                <p className="error-message">{error}</p>
            }
        </div>

    )
};

export default FormInput;