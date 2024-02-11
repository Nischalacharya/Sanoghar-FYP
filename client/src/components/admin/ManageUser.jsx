import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { GetUser, EditUser, DeleteUser } from "../../function/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/Index";
export const ManageUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditSectionVisible, setEditSectionVisible] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const handleEditClick = (user) => {
    setUser(user);
    setEditSectionVisible(!isEditSectionVisible);
  };

  const editUserHandler = async (e) => {
    e.preventDefault();
    const res = await EditUser(user);
    if (!res.success) return;
    console.log(user);
    dispatch(setLogin({ user }));
    getUser();
    setEditSectionVisible(!isEditSectionVisible);
  };

  const deleteUserHandler = async (id) => {
    const res = await DeleteUser(id);
    if (!res.success) return;
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
            users.map((user) => (
              <tr className="user-info">
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobilenumber || "-----------------"}</td>
                <td>{user.isAdmin}</td>
                <td>{user.isHostelOwner}</td>
                <td className="edit-delete">
                  <button onClick={() => handleEditClick(user)}>
                    {" "}
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button onClick={() => deleteUserHandler(user._id)}>
                    {" "}
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </table>
        {isEditSectionVisible && (
          <form className="edit-section">
            <div>
              <label>username</label>
              <input
                type="text"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                value={user.username}
              />
            </div>
            <div>
              <label>email</label>
              <input
                type="text"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                onChange={(e) =>
                  setUser({ ...user, mobilenumber: e.target.value })
                }
                value={user.mobilenumber}
              />
            </div>
            <div>
              <label>isAdmin</label>
              <select
                defaultValue={user.isAdmin}
                onChange={(e) => setUser({ ...user, isAdmin: e.target.value })}
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
                  setUser({ ...user, isHostelOwner: e.target.value })
                }
              >
                <option>------</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
              <div>
                <button onClick={(e) => editUserHandler(e)}>save</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
