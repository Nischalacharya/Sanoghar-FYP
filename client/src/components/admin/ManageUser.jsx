import { useEffect, useState } from "react";
import "./Admin.scss";
import { GetUser, EditUser, DeleteUser } from "../../function/User";
import { toast } from "react-toastify";
import CustomModal from "../Modals/CustomModal";

export const ManageUser = () => {
    const [isEditSectionVisible, setEditSectionVisible] = useState(false);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [openCustom, setOpenCustom] = useState(false);
    const [userID, setuserID] = useState("");

    const handleEditClick = (user) => {
        setUser(user);
        setEditSectionVisible(!isEditSectionVisible);
    };

    const validationChecker = () => {
        if (!user.username) {
            toast.error("Please enter username");
            return false;
        }

        if (!user.email) {
            toast.error("Please enter email");
            return false;
        }
        return true;
    }

    const editUserHandler = async (e) => {
        e.preventDefault();
        if (!validationChecker()) return;
        const res = await EditUser(user);
        if (!res.success) return;
        toast.success(res.message);
        getUser();
        setEditSectionVisible(!isEditSectionVisible);
    };

    const deleteUserHandler = async (id) => {
        const res = await DeleteUser(id);
        if (!res.success) return;
        setOpenCustom(false);
        toast.success(res.message);
        getUser();
    };

    const getUser = async () => {
        const res = await GetUser(user);
        setUsers(res);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <div className="manage-user">
                <table>
                    <tr className="manage-title">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>isAdmin</th>
                        <th>isHostelowner</th>
                        <th>Action</th>
                    </tr>
                    {users &&
                        users.map((user, i) => (
                            <tr className="user-info" key={i}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.mobilenumber || "-----------------"}
                                </td>
                                <td>{user.isAdmin}</td>
                                <td>{user.isHostelOwner}</td>
                                <td className="edit-delete">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                    >
                                        {" "}
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setuserID(user?._id);
                                            setOpenCustom(true);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </table>
                {isEditSectionVisible && (
                    <>
                        <form className="edit-section">
                            <div
                                style={{
                                    position: "absolute",
                                    right: 2,
                                    margin: 5,
                                    cursor: "pointer",
                                }}
                                onClick={() => setEditSectionVisible(false)}
                            >
                                <i className="fa-solid fa-times"></i>
                            </div>
                            <div>
                                <label>Username</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            username: e.target.value,
                                        })
                                    }
                                    value={user.username}
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                    value={user.email}
                                />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            mobilenumber: e.target.value,
                                        })
                                    }
                                    value={user.mobilenumber}
                                />
                            </div>
                            <div>
                                <label>isAdmin</label>
                                <select
                                    defaultValue={user.isAdmin}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            isAdmin: e.target.value,
                                        })
                                    }
                                >
                                    <option>------</option>
                                    <option value={"false"}>False</option>
                                    <option value={"true"}>True</option>
                                </select>
                            </div>
                            <div>
                                <label>isHostelowner</label>
                                <select
                                    defaultValue={user.isHostelOwner}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            isHostelOwner: e.target.value,
                                        })
                                    }
                                >
                                    <option>------</option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                </select>
                            </div>
                            <br />
                            <div className="modelBtn">
                                <button
                                    className="cancelBtn"
                                    onClick={() => setEditSectionVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="saveBtn"
                                    onClick={(e) => editUserHandler(e)}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {openCustom && (
                    <CustomModal
                        title="Are you sure you want to delete this user?"
                        description="Please be sure the user will be deleted permanently."
                        closeModal={() => setOpenCustom(false)}
                        primaryBtn={() => deleteUserHandler(userID)}
                        pirmaryTxt="Delete"
                        deleteClass={true}
                    />
                )}
            </div>
        </>
    );
};
