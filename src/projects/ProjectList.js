import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import RestorationApi from "../api/api";
import ProjectCardList from "./ProjectCardList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies
 *
 * On mount, loads projects from API
 *
 * ProjectList -> ProjectCardList -> projectCard
 *
 * This is routed to at /projects
 *
 * Routes -> { ProjectCard, SearchForm }
 */

function ProjectList() {
  const [projects, setProjects] = useState(null);

  useEffect(function getProjectsOnMount() {
    search();
  }, []);

  //Trigged by search from submit; realoads projects
  async function search(active) {
    let projects = await RestorationApi.getProjects(active);
    setProjects(projects);
  }

  if (!projects) return <LoadingSpinner />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {projects.length ? (
        <ProjectCardList projects={projects} />
      ) : (
        <p className="lead">Sorry, no results were found</p>
      )}
    </div>
  );
}

export default ProjectList;
