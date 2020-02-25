import React, { Component } from 'react'
import './App.css'

import Sidebar from './Sidebar'
import Messages from './Messages'
import UserInput from './UserInput'

class App extends Component {

  state = {
    activePane: 1,
    messages: this.props.data.messages,
  }

  handleSwitchPane = (index) => {
    this.setState({
      activePane: index
    })
  }

  createSidebarPayload = () => {
    let currentUser = this.props.data.users.find(u => u.isCurrentUser === true)
    
    let dms = this.props.data.channels.reduce((acc, chan) => {
      chan.hasOwnProperty('private') && acc.push(chan)
      return acc
    }, []).map(channel => {
      return {
        ...channel,
        name: channel.private.reduce((str, userID) => {
          let prU = this.props.data.users.find(u => u.id === userID && u.id !== currentUser.id)
          str += prU !== undefined ? prU.name : ""
          return str
        }, "") 
      }
    })

    let publicChannels = this.props.data.channels.reduce((acc, chan) => {
      !chan.hasOwnProperty('private') && acc.push(chan)
      return acc
    }, [])

    return {
      channels: publicChannels,
      dms: dms
    }
  }

  createMessagePayload = () => {
    return this.state.messages.filter(m => m.channel === this.state.activePane)
      .sort((a,b) => b.time > a.time)
  }

  handleUserInput = (e, input) => {
    e.preventDefault()

    let users = this.props.data.users
    let currentUser = users.find(u => u.isCurrentUser === true)
    let currentChanelObject = this.props.data.channels.find(ch => ch.id === this.state.activePane)
    let privateChannelParticipants = currentChanelObject.hasOwnProperty('private') ? currentChanelObject.private : null
    let nextId = this.state.messages.reduce(function(prev, current) {
      return (prev.id > current.id) ? prev : current
    }).id + 1

    let message = {
      id: nextId, 
      user: currentUser.id, 
      time: Math.round(new Date().getTime()/1000), 
      message: input, 
      channel: this.state.activePane,
      participants: privateChannelParticipants
    }

    this.setState({
       messages: [
         ...this.state.messages,
         message
       ]
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Sidebar">
          <Sidebar 
            menus={this.createSidebarPayload()} 
            activePane={this.state.activePane} 
            handleSwitchPane={this.handleSwitchPane}
            />
        </div>
        <div className="Main">
          <Messages messages={this.createMessagePayload()} users={this.props.data.users} />
          <UserInput handleUserInput={this.handleUserInput} />
        </div>
      </div>
    );
  }
}

export default App;