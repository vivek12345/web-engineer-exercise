import React from 'react';
import { Link } from 'react-router-dom';

export default function Apps({
    error,
    items,
    fetchApps
}) { 
    if (!items || !items.length) {
        fetchApps();
        return (<div>LOADING APPS...</div>);
    }

    return (
        <ul id="apps">
            {items.map(({ id, name, logo }) => {
                return (
                    <li class="app">
                        <Link to={`/apps/${id}`}>
                            <p>{name}</p>
                            <img src={logo} alt={name} width="100" height="100"/>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
