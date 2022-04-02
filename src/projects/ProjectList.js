import React, { useState, useEffect } from "react";
import RestorationApi from "../api/api";
import ProjectCardList from "./ProjectCardList";
import { NavLink } from "react-router-dom";
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
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <div className="col-md-8 offset-md-2 text-center">
        {projects.length ? (
          <ProjectCardList projects={projects} />
        ) : (
          <p className="lead">Sorry, no results were found</p>
        )}
        <NavLink className="btn btn-primary btn-block mt-4" to="/projects/new">
          New Project
        </NavLink>
      </div>
    </div>
  );
}

export default ProjectList;
