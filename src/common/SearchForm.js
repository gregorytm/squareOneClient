import React, { useState } from "react";

/**Search widget
 *
 * Appears on ProjectList, chamberList, EmployeesList so that these can be filtered
 * down
 *
 * This componenet doesn't "do" the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to
 * do the searching
 *
 * { ProjectList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    //take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.avlue);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form control-lg flex grow-1"
          name="searchTerm"
          placeholder="Enter search term.."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
