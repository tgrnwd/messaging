import React from 'react'
import PropTypes from 'prop-types'
import './UserInput.css'

function UserInput({handleUserInput}) {
    let input
    
    const inputSubmit = (e) => {
        handleUserInput(e, input.value)
        input.value = ''
    }
    
    return (
        <div className="UserInput">
            <form onSubmit={inputSubmit}>
                <input type='text' ref={i => input = i} />
                <button type='submit'>-></button>
            </form>
        </div>
    )
}

export default UserInput

UserInput.propTypes = {
    handleUserInput: PropTypes.func.isRequired
}