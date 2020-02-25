import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './Messages.css'

export default class Messages extends React.Component {
    render() {
        return (
            <div className="Messages">
                <ul>
                    {this.props.messages.map(m => (
                        <Message 
                            key={m.id}  
                            time={m.time} 
                            message={m.message}
                            user={this.props.users.find(u => u.id === m.user)} />
                    ))}
                </ul>
            </div>
        )
    }
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired
}

function Message({time, message, user}) {
    return (
        <li className="Message">
            <div className="Message-layout-left">
                <div className="Message-avatar">
                    <img alt={user.name} src={user.avatar} />
                </div>
            </div>
            <div className="Message-layout-right">
                <div className="Message-meta">
                    <span className="Message-username">{user.name}</span>            
                    <span className="Message-time">{moment.unix(time).format('MMM D LT')}</span>
                </div>
                <div className="Message-content">
                    <span>{message}</span>
                </div>
            </div>            
        </li>
    )
}

Message.propTypes = {
    user: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
}