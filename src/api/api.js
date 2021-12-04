import axios from "axios";

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
    const headers = { Authorization: `Bearer ${SquareOneApi.token}` };
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

  static async getCurrentUser(username) {
    let res = await this.request(`employee/${username}`);
    return res.employee;
  }

  /**Get project (filtered by actove if not undefined) */

  static async getProjects(active) {
    let res = await this.request("projects", { active });
    res.projects.forEach((project) => {
      project.createdAt = new Date(project.created_at);
    });
    return res.projects;
  }

  /** Get details on a project by id */

  static async getProject(id) {
    let res = await this.request(`projects/${id}`);
    res.project.createdAt = new Date(res.project.createdAt);
    return res.project;
  }

  /** Get list of chambers related to project*/

  static async getChambers(projectId) {
    let res = await this.request(`projects/${projectId}/chambers`);
    return res.chambers;
  }

  /**Get list of affected materials related to cham */

  static async getMaterials(projectId, chamberId) {
    let res = await this.request(
      `projects/${projectId}/chamber/${chamberId}/material`
    );
    console.log("affected res", res.material);
    return res.material;
  }

  /** get list of dehus related to a chamber */

  static async getDehus(projectId, chamberId) {
    let res = await this.request(`projects/${projectId}/chamber/${chamberId}`);
    console.log("res", res);
    return res.dehu;
  }

  /**get details on a chamber by id  */

  static async getChamber(id) {
    let res = await this.request(`chamber/${id}`);
    console.log("res", res);
    return res.chamber;
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

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default SquareOneApi;
