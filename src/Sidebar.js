import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.css'

export default class Sidebar extends React.Component {
    render() {
        return (
            Object.keys(this.props.menus).map(menu => 
                <SidebarMenu 
                    key={menu} 
                    title={menu} 
                    list={this.props.menus[menu]} 
                    handleSwitchPane={this.props.handleSwitchPane} 
                    activePane={this.props.activePane} />
            )
        )
    }
}

Sidebar.propTypes = {
    menus: PropTypes.object.isRequired
}

function SidebarMenu({ title, list, handleSwitchPane, activePane }) {
    return(
        <>
            <h3 className="SidebarMenu-title">{title}</h3>
            <ul className="SidebarMenu-list">
                {list.map(listitem => 
                    <li 
                        key={listitem.id}
                        className={(activePane === listitem.id && `active`).toString()}>
                        <button onClick={() => handleSwitchPane(listitem.id)}>
                            # {listitem.name}
                        </button>
                    </li>
                )}
            </ul>
        </>
    )
}

SidebarMenu.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    handleSwitchPane: PropTypes.func.isRequired,
    activePane: PropTypes.number.isRequired
}