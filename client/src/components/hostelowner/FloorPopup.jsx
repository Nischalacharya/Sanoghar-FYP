import React from 'react';
import './Owner.scss';

function FloorPopup({ hostel, setHostel, setIsFloor }) {
    const handleFloorChange = (e, floorIndex, type, bedOrPrice) => {
        const { value } = e.target;
        setHostel(prevHostel => {
            const updatedRoom = { ...prevHostel.room };
            if (!updatedRoom[floorIndex]) {
                updatedRoom[floorIndex] = {
                    private: { bed: '', price: '' },
                    twoSharing: { bed: '', price: '' },
                    threeSharing: { bed: '', price: '' },
                    fourSharing: { bed: '', price: '' }
                };
            }
            updatedRoom[floorIndex][type][bedOrPrice] = value;
            return { ...prevHostel, room: updatedRoom };
        });
    };

    return (
        <div className='hostel-form-bed-container'>
            <div className='hostel-form-bed'>
                <button onClick={() => setIsFloor(false)}>X</button>
                {[...Array(+hostel.floor)].map((e, i) => (
                    <>
                        <label> Floor : {i + 1} </label>
                        <div>
                            <label>Private</label>
                            <div>
                                <label>Beds</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.private?.bed || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'private', 'bed')}
                                />
                                <label>Price</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.private?.price || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'private', 'price')}
                                />
                            </div>
                            <label>2 Sharing</label>
                            <div>
                                <label>Beds</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.twoSharing?.bed || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'twoSharing', 'bed')}
                                />
                                <label>Price</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.twoSharing?.price || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'twoSharing', 'price')}
                                />
                            </div>
                            <label>3 Sharing</label>
                            <div>
                                <label>Beds</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.threeSharing?.bed || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'threeSharing', 'bed')}
                                />
                                <label>Price</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.threeSharing?.price || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'threeSharing', 'price')}
                                />
                            </div>
                            <label>4 Sharing</label>
                            <div>
                                <label>Beds</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.fourSharing?.bed || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'fourSharing', 'bed')}
                                />
                                <label>Price</label>
                                <input
                                    type='text'
                                    value={hostel.room[i]?.fourSharing?.price || ''}
                                    onChange={(e) => handleFloorChange(e, i, 'fourSharing', 'price')}
                                />
                            </div>
                        </div>
                    </>
                ))
                }
            </div >
        </div >
    );
}

export default FloorPopup;
