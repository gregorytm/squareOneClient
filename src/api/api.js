import axios from "axios";
import jwt from "jsonwebtoken";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class SquareOneApi {
  //the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = SquareOneApi.token;
    console.log(headers)
      ? { Authorization: `Bearer ${SquareOneApi.token}` }
      : {};
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API ERROR:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //Get the current user.

  static async getCurrentUser() {
    if (!this.token) {
      return undefined;
    }
    const { userId } = jwt.decode(this.token);
    let res = await this.request(`employee/${userId}`);
    return res.employee;
  }

  /**Get project (filtered by active if not undefined) */

  static async getProjects(active) {
    let res = await this.request("projects", { active });
    res.projects.forEach((project) => {
      project.createdAt = new Date(project.created_at);
    });
    return res.projects;
  }

  /** Get details on a project by id */

  static async getProject(projId) {
    let res = await this.request(`projects/${projId}`);
    res.project.createdAt = new Date(res.project.createdAt);
    return res.project;
  }

  /** Create project for api */

  static async newProject(data) {
    let res = await this.request(`projects/new`, data, "post");
    return res;
  }

  /** Delete project from the db */

  static async deleteProject(id) {
    let res = await this.request(`projects/${id}`, {}, "delete");
    return res;
  }

  /** Update project for api */

  static async updateProject(data) {
    let res = await this.request(`projects/${data.id}/update`, data, "patch");
    return res;
  }

  /** Get list of chambers related to project*/

  static async getChambers(projId) {
    let res = await this.request(`chamber/project/${projId}`);
    return res.chambers;
  }

  /**get details on a chamber by id  */

  static async getChamber(chamberId) {
    let res = await this.request(`chamber/${chamberId}`);
    return res.chamber[0];
  }

  /** Create project for api */

  static async newChamber(data) {
    let res = await this.request(
      `chamber/${data.project_id}/new`,
      data,
      "post"
    );
    return res.chamber;
  }

  /** Update chamber for api */

  static async updateChamber(data) {
    let res = await this.request(`chamber/${data.id}`, data, "patch");
    return res;
  }

  /**Get chambers and readings for assoicated project */

  static async chamberReports(projectId) {
    let res = await this.request(`projects/${projectId}/readings/chamber`);
    return res.chambers;
  }

  /** Delete chamber from the db */

  static async deleteChamber(chamberId) {
    let res = await this.request(`chamber/${chamberId}`, {}, "delete");
    return res;
  }

  /** delete chamber reading from the readings db */

  static async chamberReadingDelete(readingId) {
    let res = await this.request(`chamber/reading/${readingId}`, {}, "delete");
    return res;
  }

  /** New chamber reading for api */

  static async newChamberReading(data) {
    let res = await this.request(`chamber/reading/new`, data, "post");
    return res;
  }

  /** Get last chamber reading info from DB */

  static async chamberReadingData(chamberId) {
    let res = await this.request(`chamber/${chamberId}/reading/data`);
    return res.chamberData;
  }

  /**Get one chamber reading using the readings id */

  static async chamberReadingDetails(readingId) {
    let res = await this.request(`chamber/reading/${readingId}`);
    return res.chamberReadingDetails[0];
  }

  /**get details on a material by materialId  */

  static async getMaterial(materialId) {
    let res = await this.request(`material/${materialId}`);
    return res.material;
  }

  /**Get list of affected materials related to cham */

  static async getMaterials(chamberId) {
    let res = await this.request(`material/${chamberId}/list`);
    return res.material;
  }

  /** Create new affected material related to chamber */

  static async newMaterial(data) {
    let res = await this.request(`material/new`, data, "post");
    return res;
  }

  /** Update affected material for api */

  static async updateMaterial(data) {
    let res = await this.request(`material/${data.id}`, data, "patch");
    return res;
  }

  /** Delete material from the db */

  static async deleteMaterial(materialId) {
    let res = await this.request(`material/${materialId}`, {}, "delete");
    return res;
  }

  /** New material reading for DB reading for db */

  static async newMaterialReading(data) {
    let res = await this.request(`material/reading/new`, data, "post");
    return res;
  }

  /**Get materials and readings for assoicated project */

  static async materialReports(projectId) {
    let res = await this.request(`projects/${projectId}/readings/materials`);
    return res.materials;
  }

  /** Get last chamber reading info from DB */

  static async materialReadingData(materialId) {
    let res = await this.request(`material/${materialId}/reading/data`);
    return res.materialData;
  }

  /**Get one material reading using the readings id */

  static async materialReadingDetails(readingId) {
    let res = await this.request(`material/reading/${readingId}`);
    return res.materialReadingDetails[0];
  }

  /** delete material reading from the readings db */

  static async materialReadingDelete(readingId) {
    let res = await this.request(`material/reading/${readingId}`, {}, "delete");
    return res;
  }

  /** get list of dehus related to a chamber */

  static async getDehus(chamberId) {
    let res = await this.request(`dehu/chamber/${chamberId}`);
    return res.dehus;
  }

  /**get details on a chamber by id  */

  static async getDehu(dehuId) {
    let res = await this.request(`dehu/${dehuId}`);
    return res.dehu;
  }

  /**Get dehus and readings for assoicated project */

  static async dehuReports(projectId) {
    let res = await this.request(`projects/${projectId}/readings/dehu`);
    return res.dehus;
  }

  /** Create new dehu related to chamber */

  static async newDehu(data) {
    let res = await this.request(`dehu/new`, data, "post");
    return res.dehu;
  }

  /** Update dehu for api */

  static async updateDehu(data) {
    let res = await this.request(`dehu/${data.id}`, data, "patch");
    return res;
  }

  /** New dehu reading for db */

  static async newDehuReading(data) {
    let res = await this.request(`dehu/reading/new`, data, "post");
    return res;
  }

  /**Get one dehu reading using the readings id */

  static async dehuReportDetails(reportId) {
    let res = await this.request(`dehu/reading/${reportId}`);
    return res.dehuReportDetails[0];
  }

  /** Delete dehu reading from the readings db */

  static async dehuReadingDelete(reportId) {
    let res = await this.request(`dehu/reading/${reportId}`, {}, "delete");
    return res;
  }

  /** Delete dehu from the db */

  static async deleteDehu(dehuId) {
    let res = await this.request(`dehu/${dehuId}`, {}, "delete");
    return res;
  }

  /** Get last dehu reading info from DB for reading input */

  static async dehuReadingData(dehuId) {
    let res = await this.request(`dehu/${dehuId}/reading/data`);
    return res.dehuData;
  }

  /**Get employees for admin */

  static async getEmployees() {
    let res = await this.request(`employee/personnel`);
    return res.employees;
  }

  /**Get data on specific employee */

  static async getEmployee(empId) {
    let res = await this.request(`employee/${empId}`);
    return res.employee;
  }

  /**Promote employee to manager */

  static async promoteToManager(empId) {
    let res = await this.request(`employee/${empId}/manager`, {}, "patch");
    return res;
  }

  /**Promote null to user */

  static async promoteToUser(empId) {
    let res = await this.request(`employee/${empId}/user`, {}, "patch");
    return res;
  }

  /** Delete employee from the db */

  static async deleteEmployee(empId) {
    let res = await this.request(`employee/${empId}`, {}, "delete");
    return res;
  }

  static async unactiveEmployee(empId) {
    let res = await this.request(`employee/${empId}/unactive`, {}, "patch");
    return res;
  }

  /** Get token for login from username, password */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** save user profile prage. */

  static async saveProfile(empId, data) {
    let res = await this.request(`employee/${empId}/update`, data, "patch");
    return { ...res.employee, id: empId };
  }
}

export default SquareOneApi;
