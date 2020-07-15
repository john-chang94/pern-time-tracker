import React from 'react'
import { Modal } from 'react-materialize';
import moment from 'moment';

const EditEntry = ({ modalOpen, closeModal, handleChange, date, hours_worked, details }) => { 
    return (
        <Modal open={modalOpen} options={{ onCloseStart: closeModal }}>
            <div className="modal-content">
                <h5>Edit Entry</h5>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={moment(date).format('YYYY-MM-DD')} onChange={handleChange} />
                <label htmlFor="hours_worked">Hours Worked</label>
                <input type="text" id="hours_worked" value={hours_worked} onChange={handleChange} />
                <label htmlFor="details">Details</label>
                <textarea className="materialize-textarea" id="details" value={details} onChange={handleChange}></textarea>
            </div>
        </Modal>
    );
}



export default EditEntry;