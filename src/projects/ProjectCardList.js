import React from "react";
import ProjectCard from "./ProjectCard";

/** Show list of project cards
 *
 * Used by ChamberList, DehuList, AffectedMaterialList, Readings
 * func prop which will be called by
 */

function ProjectCardList({ projects }) {
  return (
    <div className="ProjectCardList">
      <h2 className="text-center">Current Projects</h2>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          insuredName={project.insured_name}
          address={project.address}
          createdAt={project.createdAt}
          active={project.active}
        />
      ))}
    </div>
  );
}

export default ProjectCardList;
