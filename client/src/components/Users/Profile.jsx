import React, { useEffect, useRef } from 'react';
import { GetProfileDetails, ProfileUpdateRequest } from "../../APIRequest/UsersAPIRequest";
import { useSelector } from "react-redux";
import { errorToast, getBase64, isEmpty, isMobile } from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const userImgRef = useRef(null);
  const userImgView = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    GetProfileDetails();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);
  console.log(ProfileData);

  const PreviewImage = () => {
    const ImgFile = userImgRef.current.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.current.src = base64Img;
    });
  };

  const UpdateMyProfile = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const mobile = mobileRef.current.value;
    const password = passwordRef.current.value;
    const photo = userImgView.current.src;

    if (isEmpty(firstName)) {
      errorToast("First Name Required !");
    } else if (isEmpty(lastName)) {
      errorToast("Last Name Required !");
    } else if (!isMobile(mobile)) {
      errorToast("Valid Mobile Required !");
    } else if (isEmpty(password)) {
      errorToast("Password Required !");
    } else {
      ProfileUpdateRequest( firstName, lastName, mobile, password, photo).then((result) => {
        if (result === true) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img ref={userImgView} className="icon-nav-img-lg" src="" alt="" />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input onChange={PreviewImage} ref={userImgRef} placeholder="User Email" className="form-control animated fadeInUp" type="file" />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input key={Date.now()} defaultValue={ProfileData?.email || ''} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input key={Date.now()} defaultValue={ProfileData?.firstName || ''} ref={firstNameRef} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input key={Date.now()} defaultValue={ProfileData?.lastName || ''} ref={lastNameRef} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input key={Date.now()} defaultValue={ProfileData?.mobile || ''} ref={mobileRef} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input key={Date.now()} defaultValue={ProfileData?.password || ''} ref={passwordRef} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                  </div>
                  <div className="col-4 p-2">
                    <button onClick={UpdateMyProfile} className="btn w-100 float-end btn-secondary animated fadeInUp">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;