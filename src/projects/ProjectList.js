import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import RestorationApi from "../api/api";
import ProjectCard from "./ProjectCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies
 *
 * On mount, loads projects from API
 * Re-loads filters companies on submit from search fomr
 *
 * THis is routed to at /comanies
 *
 * Routes -> { ProjectCard, SearchForm }
 */

function ProjectList() {
  const [projects, setProjects] = useState(null);

  useEffect(function getProjectsOnMount() {
    search();
  }, []);

  //Trigged by search from submit; realoads projecets
  async function search(address) {
    let projects = await RestorationApi.getProjects(address);
    setProjects(projects);
  }

  if (!projects) return <LoadingSpinner />;

  return (
    <div className="ProjectList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {projects.length ? (
        <div className="ProjectList-list">
          {projects.map((p) => (
            <ProjectCard
              key={p.handle}
              address={p.address}
              insuredName={p.insuredName}
              created_at={p.createdAt}
              active={p.active}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found</p>
      )}
    </div>
  );
}

export default ProjectList;
