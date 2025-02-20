import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

interface UserData {
  name: String;
  email: String;
  roles: String;
}
interface Props {
  UserData: UserData;
  logout: any;
}
const ProfileModal: React.FC<Props> = ({ UserData, logout }) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-center"
                id="exampleModalLabel"
              >
                Profile:
              </h1>
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              /> */}
            </div>
            <div className="modal-body d-flex justify-content-center row gap-2">
              <div>
                <label>User:</label>
                <span> {UserData.name}</span>
              </div>
              <div>
                <label>Email:</label>
                <span> {UserData.email}</span>
              </div>
              <div>
                {UserData.roles == "ROLE_ADMIN" ? (
                  <>
                    <label>User Type:</label>
                    <span> ADMIN</span>
                  </>
                ) : (
                  <>
                    <label>User Type:</label>
                    <span> USER</span>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <div className="text-end">
                <IoLogOutOutline
                  onClick={logout}
                  data-bs-dismiss="modal"
                  size={35}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
