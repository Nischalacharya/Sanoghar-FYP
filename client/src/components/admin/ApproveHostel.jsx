import React, { useEffect, useState } from "react";
import {
  DeleteHostel,
  approveHostel,
  getUnverifiedHostel,
} from "../../function/Hostel";
import { toast } from "react-toastify";

function ApproveHostel() {
  const [hostels, setHostels] = useState([]);
  const [isDetail, setIsDetail] = useState(false);
  const [hostel, setHostel] = useState({});

  const getHostels = async () => {
    const res = await getUnverifiedHostel();
    setHostels(res);
    console.log(res);
  };

  const verifyHostelHandler = async (_id, status) => {
    const res = await approveHostel({ _id, isApprove: status });
    if (!res.success) {
      toast.error(res);
      return;
    }
    getHostels();
    setIsDetail(false);
    toast.success("Hostel verified");
  };

  useEffect(() => {
    getHostels();
  }, []);

  return (
    <div className="approve-hostel">
      <table>
        <tr className="manage-title">
          <th>Hostel Name</th>
          <th>Hostel Owner</th>
          <th>Created at</th>
          <th></th>
        </tr>
        {hostels.length > 0 &&
          hostels.map((hostel, i) => (
            <tr className="user-info" key={i}>
              <td>{hostel.title}</td>
              <td>{hostel.email}</td>
              <td>{hostel.createdAt.slice(0, 10)}</td>
              <td>
                <button
                  className="btn btn-secondary m-2"
                  onClick={() => {
                    setHostel(hostel);
                    setIsDetail(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
      </table>

      {isDetail && (
        <div className="hostel-detail-bg">
          <div className="hostel-detail d-flex">
            <div>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setIsDetail(false)}
              ></i>
              <div>
                <label className="form-control">Hostel Title</label>
                <span className="form-control">{hostel.title}</span>
              </div>
              <div>
                <label className="form-control">Hostel Owner</label>
                <span className="form-control">{hostel.email}</span>
              </div>
              <div>
                <label className="form-control">Sex</label>
                <span className="form-control">{hostel.sex}</span>
              </div>
              <div>
                <label className="form-control">Location</label>
                <span className="form-control">{hostel.location}</span>
              </div>
              <div>
                <label className="form-control">Room Description</label>
                <span className="form-control">
                  {hostel.floor &&
                    Object.keys(hostel.floor).map((floorIndex) => (
                      <>
                        <div>Floor {+floorIndex}</div>
                        <div className="d-flex">
                          {hostel.floor[floorIndex] &&
                            Object.keys(hostel.floor[floorIndex]).map(
                              (roomName) => (
                                <>
                                  <div
                                    key={roomName}
                                    className={`me-3 w-25 my-2 `}
                                  >
                                    <div>
                                      <span className="text-capitalize">
                                        {roomName}
                                      </span>{" "}
                                      Seater
                                    </div>
                                    <div>
                                      Rs.{" "}
                                      {hostel.floor[floorIndex][roomName].price}
                                    </div>
                                  </div>
                                </>
                              )
                            )}
                        </div>
                      </>
                    ))}
                </span>
              </div>
              <div>
                <label className="form-control">Description</label>
                <span className="form-control scrollable-x ">{hostel.description} </span>
              </div>
            </div>
            <div className="form-control">
              {hostel.imagepath1 &&
                hostel.imagepath2 &&
                hostel.imagepath3 !== "undefined" ? (
                <div className="image-container">
                  {hostel.imagepath1 !== "undefined" ? (
                    <>
                      <div>Image 1</div>
                      <img
                        src={`http://localhost:5000/assets/${hostel.imagepath1}`}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {hostel.imagepath2 !== "undefined" ? (
                    <>
                      <div>Image 2</div>
                      <img
                        src={`http://localhost:5000/assets/${hostel.imagepath2}`}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {hostel.imagepath3 !== "undefined" ? (
                    <>
                      <div>Image 3</div>
                      <img
                        src={`http://localhost:5000/assets/${hostel.imagepath3}`}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="text-center m-auto">
                  "No Images selected in this hostel"
                </div>
              )}
            </div>
            <button
              className="btn btn-primary approve"
              onClick={() => verifyHostelHandler(hostel._id, "Approved")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger deny"
              onClick={() => verifyHostelHandler(hostel._id, "Denied")}
            >
              Deny
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApproveHostel;
