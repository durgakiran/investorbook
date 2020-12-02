import { IconButton } from '@material-ui/core';
import React from 'react';
import editIcon from "./edit-icon.svg";
import deleteIcon from './delete-icon.svg';


export default function TableActions({ id, handleEdit, handleDelete }) {
    return (
        <div>
            <IconButton>
                <img src={editIcon} alt="edit" />
            </IconButton>
            <IconButton>
                <img src={deleteIcon} alt="edit" />
            </IconButton>
        </div>
    )
}
