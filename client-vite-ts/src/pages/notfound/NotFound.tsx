import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

const NotFound: FC<{}> = () => {
    return (
        <div>
            <h1>Page you seacrhing for is not found</h1>
            <h4>
                Go back to <NavLink to="/">main page</NavLink>
            </h4>
        </div>
    )
}

export default NotFound
