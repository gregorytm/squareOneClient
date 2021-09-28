import React from "react";

/**Presentational compnent for showing bootstrap-styple alerts
 *
 * { LoginForm, Signupform, ProfileForm } -> Alert
 */

function Alert({ type = "danger", messages = [] }) {
  console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert aype-${type}`} role="alert">
      {messages.map((error) => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export default Alert;
