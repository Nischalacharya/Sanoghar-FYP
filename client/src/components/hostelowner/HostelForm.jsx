import React, { createRef, useEffect, useState } from "react";
import PopUpMap from "./PopUpMap";
import { AddHostel, getVerifiedHostel } from "../../function/Hostel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
function HostelForm({ formToggler, setHostel, hostel }) {
  const dispatch = useDispatch();
  const storage = useSelector((state) => state);
  const [isMap, setIsMap] = useState(false);
  const [floorNum, setFloorNum] = useState(1);
  const [imageNum, setImageNum] = useState(1);

  const inputImageRef = createRef(null);
  const mapToggler = () => {
    setIsMap(!isMap);
  };

  const floorHandler = (i, floorName) => {
    if (!hostel.floor?.[i]?.[floorName]?.isTrue) {
      setHostel({
        ...hostel,
        floor: {
          ...hostel.floor,
          [i]: {
            ...hostel.floor?.[i],
            [floorName]: { price: "", isTrue: true },
          },
        },
      });
    } else {
      const updatedFloor = { ...hostel.floor };
      delete updatedFloor[i][floorName];
      if (Object.keys(updatedFloor[i]).length === 0)
        delete updatedFloor[i];
      setHostel({ ...hostel, floor: updatedFloor });
    }
  };

  const imageHandler = (e, i) => {
    setHostel({
      ...hostel,
      images: {
        ...hostel.images,
        [`imagepath${i + 1}`]: {
          name: e.target.files[0].name,
          image: e.target.files[0],
        },
      },
    });
  };

  const validationHandler = () => {
    if (!hostel.title) {
      toast.error("Hostel title is required");
      return false;
    }
    if (!hostel.sex) {
      toast.error("Hostel gender is required");
      return false;
    }
    if (!hostel.location) {
      toast.error("Hostel location is required");
      return false;
    }
    if (!hostel.latlng) {
      toast.error("Hostel location is required");
      return false;
    }
    if (!hostel.description) {
      toast.error("Hostel description is required");
      return false;
    }
    if (!hostel.floor) {
      toast.error("Hostel room is required");
      return false;
    }
    return true;
  };

  const ValueChecker = (e) => {
    if (e.target.value === "" || [...e.target.value].includes("-")) {
      e.target.value = "";
      return false;
    }
    return true;
  };

  const addHostelHandler = async (e) => {
    e.preventDefault();
    console.log(hostel);
    if (!validationHandler()) return;
    const formData = new FormData();
    formData.append("_id", hostel._id || "");
    formData.append("title", hostel.title);
    formData.append("description", hostel.description);
    formData.append("location", hostel.location);
    formData.append("sex", hostel.sex);
    formData.append("floor", JSON.stringify(hostel.floor));
    formData.append("email", storage.user.email);
    formData.append("latlng", JSON.stringify(hostel.latlng));

    if (hostel.images) {
      Object.keys(hostel.images).map((e, i) => {
        formData.append(
          "image",
          hostel.images?.[`imagepath${i + 1}`]?.image
        );
      });

      formData.append(
        "imagepath1",
        hostel.images?.[`imagepath${1}`]?.name
      );
      formData.append(
        "imagepath2",
        hostel.images?.[`imagepath${2}`]?.name
      );
      formData.append(
        "imagepath3",
        hostel.images?.[`imagepath${3}`]?.name
      );
    }
    const res = await AddHostel(formData);
    if (!res.success) return toast.error(res.message);
    formToggler();
    toast.success(res.message);
    setHostel({
      _id: "",
      title: "",
      description: "",
      location: "",
      sex: "Boys",
    });
  };

  return (
    <div className="hostel-form-bg">
      <div className="hostel-form">
        <div className="top-section">
          <div>
            <div>
              <label>Hostel Name</label>
              <input
                type="text"
                className="form-control "
                value={hostel.title}
                onChange={(e) =>
                  setHostel({
                    ...hostel,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Sex</label>
              <select
                onChange={(e) =>
                  setHostel({
                    ...hostel,
                    sex: e.target.value,
                  })
                }
                className="form-control"
              >
                <option value="">---------</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
              </select>
            </div>
            {[...Array(imageNum)].map((e, i) => (
              <div key={i} className="div-input-image">
                <label>Image {i + 1}</label>
                <input
                  type="file"
                  className="form-control"
                  ref={inputImageRef}
                  onChange={(e) => imageHandler(e, i)}
                />
              </div>
            ))}
            <div className="div-button-image">
              <button
                className={`btn btn-primary w-35 mt-2 ${imageNum === 3 ? "d-none" : ""
                  } `}
                onClick={() =>
                  setImageNum((prev) =>
                    imageNum < 3 ? imageNum + 1 : prev
                  )
                }
              >
                {" "}
                Add Image
              </button>
              {imageNum > 1 ? (
                <button
                  className="btn btn-light w-25 mt-2 d-inline-block "
                  onClick={() => {
                    setImageNum((prev) =>
                      prev === 1 ? 1 : prev - 1
                    );
                    setHostel({
                      ...hostel,
                      image: hostel.image.slice(0, -1),
                    });
                  }}
                >
                  <DeleteIcon />
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              <label>Location</label>
              <div>
                <button
                  onClick={() => mapToggler()}
                  className="btn btn-light"
                >
                  {hostel.location
                    ? hostel.location
                      .split(",")
                      .slice(0, -2)
                      .join(",")
                    : "Choose Location"}
                </button>
              </div>
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={hostel.description}
                className="form-control"
                cols="110"
                onChange={(e) =>
                  setHostel({
                    ...hostel,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="overflow-y-scroll overflow-x-hidden">
            {[...Array(floorNum)].map((a, i) => (
              <container className=" py-2 " key={i + 1}>
                <label className=" w-100 text-center my-2">
                  Floor {i + 1}
                </label>
                <div className="d-flex flex-row justify-content-between ">
                  <button
                    className={`me-1 w-25 btn ${hostel.floor &&
                      hostel.floor[i + 1] &&
                      hostel.floor[i + 1]["one"]?.isTrue
                      ? "btn-success"
                      : "btn-light"
                      }`}
                    onClick={() =>
                      floorHandler(i + 1, "one")
                    }
                  >
                    1 Seater
                  </button>
                  <button
                    className={`me-1 w-25 btn ${hostel.floor &&
                      hostel.floor[i + 1] &&
                      hostel.floor[i + 1]["two"]?.isTrue
                      ? "btn-success"
                      : "btn-light"
                      }`}
                    onClick={() =>
                      floorHandler(i + 1, "two")
                    }
                  >
                    2 Seater
                  </button>
                  <button
                    className={`me-1 w-25 btn ${hostel.floor &&
                      hostel.floor[i + 1] &&
                      hostel.floor[i + 1]["three"]?.isTrue
                      ? "btn-success"
                      : "btn-light"
                      }`}
                    onClick={() =>
                      floorHandler(i + 1, "three")
                    }
                  >
                    3 Seater
                  </button>
                  <button
                    className={`me-1 w-25 btn ${hostel.floor &&
                      hostel.floor[i + 1] &&
                      hostel.floor[i + 1]["four"]?.isTrue
                      ? "btn-success"
                      : "btn-light"
                      }`}
                    onClick={() =>
                      floorHandler(i + 1, "four")
                    }
                  >
                    4 Seater
                  </button>
                </div>

                <div className="d-flex flex-row justify-content-between mt-2 ">
                  <input
                    type="number"
                    placeholder="price"
                    className="mx-1 w-25 form-control"
                    value={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["one"]
                        ? hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["one"]
                          ?.price
                        : ""
                    }
                    onChange={(e) =>
                      setHostel({
                        ...hostel,
                        floor: {
                          ...hostel.floor,
                          [i + 1]: {
                            ...hostel.floor?.[
                            i + 1
                            ],
                            ["one"]: {
                              ...hostel.floor?.[
                              i + 1
                              ]?.["one"],
                              price:
                                ValueChecker(
                                  e
                                ) &&
                                e.target.value,
                            },
                          },
                        },
                      })
                    }
                    disabled={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["one"]?.isTrue
                        ? false
                        : true
                    }
                  ></input>
                  <input
                    type="number"
                    placeholder="price"
                    className="mx-1 w-25 form-control"
                    value={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["two"]
                        ? hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["two"]
                          ?.price
                        : ""
                    }
                    onChange={(e) =>
                      setHostel({
                        ...hostel,
                        floor: {
                          ...hostel.floor,
                          [i + 1]: {
                            ...hostel.floor?.[
                            i + 1
                            ],
                            ["two"]: {
                              ...hostel.floor[
                              i + 1
                              ]["two"],
                              price:
                                ValueChecker(
                                  e
                                ) &&
                                e.target.value,
                            },
                          },
                        },
                      })
                    }
                    disabled={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["two"]?.isTrue
                        ? false
                        : true
                    }
                  ></input>
                  <input
                    type="number"
                    placeholder="price"
                    className="mx-1 w-25 form-control"
                    value={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["three"]
                        ? hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["three"]
                          ?.price
                        : ""
                    }
                    onChange={(e) =>
                      setHostel({
                        ...hostel,
                        floor: {
                          ...hostel.floor,
                          [i + 1]: {
                            ...hostel.floor?.[
                            i + 1
                            ],
                            ["three"]: {
                              ...hostel.floor[
                              i + 1
                              ]["three"],
                              price:
                                ValueChecker(
                                  e
                                ) &&
                                e.target.value,
                            },
                          },
                        },
                      })
                    }
                    disabled={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["three"]?.isTrue
                        ? false
                        : true
                    }
                  ></input>
                  <input
                    type="number"
                    placeholder="price"
                    className="mx-1 w-25 form-control"
                    value={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["four"]
                        ? hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["four"]
                          ?.price
                        : ""
                    }
                    onChange={(e) =>
                      setHostel({
                        ...hostel,
                        floor: {
                          ...hostel.floor,
                          [i + 1]: {
                            ...hostel.floor?.[
                            i + 1
                            ],
                            ["four"]: {
                              ...hostel.floor[
                              i + 1
                              ]["four"],
                              price:
                                ValueChecker(
                                  e
                                ) &&
                                e.target.value,
                            },
                          },
                        },
                      })
                    }
                    disabled={
                      hostel.floor &&
                        hostel.floor[i + 1] &&
                        hostel.floor[i + 1]["four"]?.isTrue
                        ? false
                        : true
                    }
                  ></input>
                </div>
              </container>
            ))}
            {floorNum > 4 ? (
              ""
            ) : (
              <button
                className="d-block m-auto my-2 btn btn-primary"
                onClick={() => setFloorNum(floorNum + 1)}
              >
                Next Floor
              </button>
            )}
          </div>
        </div>
        <div className="bottom-section">
          <button onClick={(e) => addHostelHandler(e)}>Create</button>
        </div>
        <span onClick={() => formToggler()}>&times;</span>
        {isMap ? (
          <PopUpMap mapToggler={mapToggler} setHostel={setHostel} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default HostelForm;
