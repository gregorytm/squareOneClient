import React, { useState } from "react";
import Alert from "../common/Alert";
import SquareOneApi from "../api/api";
import { useCurrentUser } from "../auth/UserContext";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state
 * Submitting the form calls the API to save, and triggers user reloading
 * througout the site
 *
 * Confirmation of a successful save is a simple alert
 */

//TODO: rework profile form or rework currentUser
function ProfileForm() {
  const theCurrentUser = useCurrentUser();
  const { currentUser, setCurrentUser } = useCurrentUser;
  const [formData, setFormData] = useState({
    username: theCurrentUser.username,
    firstInital: theCurrentUser.firstInital,
    lastName: theCurrentUser.lastName,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfiremed] = useState(false);

  // async function updateProfileApiCall(data) {
  //   try {
  //     let result = await SquareOneApi.saveProfile(data);
  //     return { success: true, result };
  //   } catch (errors) {
  //     console.error("Failed to update profile", errors);
  //     return { success: false, errors };
  //   }
  // }

  /** on form submit:
   * -attempt save to backend & report any errors
   * if successful
   * -clear previous error messages and password
   * -show save-confired message
   * -set current user info throuout the site
   */

  async function handleSubmit(evt) {
    let profileData = {
      username: formData.username,
      firstInital: formData.firstInital,
      lastName: formData.lastName,
      password: formData.password,
    };

    let updateEmployee;

    try {
      updateEmployee = await SquareOneApi.saveProfile(
        theCurrentUser.id,
        profileData
      );
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfiremed(true);

    //trigger reloading of employee information througout the site
    setCurrentUser(updateEmployee);
  }

  /** handle form data chaning */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>First Inital</label>
              <input
                name="firstInital"
                className="form-control"
                value={formData.firstInital}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            {saveConfirmed ? (
              <Alert type="success" messages={["Updated successfully."]} />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
