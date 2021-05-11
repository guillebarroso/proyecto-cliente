import React from 'react'

const Dashboard = (props) => {
    return (
        <div>
            {props.name ? 'Hola ' + props.name + "!": 'You are not logged in'}
        </div>
    )
}

export default Dashboard
