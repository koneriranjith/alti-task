import { Component } from "react";

export default class Api extends Component {
  static returnApiUrl() {
    return "http://localhost:4010";
  }

  static setAuthorizationToken(type) {
    let hash =
      type === "multipart"
        ? {}
        : {
            "content-type": "application/json",
          };
    const header = new Headers(hash);
    return header;
  }

  static get(url) {
    return this.apiCall(url, null, "GET");
  }

  static put(url, params, type = null) {
    return this.apiCall(url, params, "PUT", { type });
  }

  static post(url, params, type = null) {
    return this.apiCall(url, params, "POST", { type });
  }

  static delete(url, params) {
    return this.apiCall(url, params, "DELETE");
  }

  static apiCall(url, params, method, option = {}) {
    const type = ["POST", "PUT", "PATCH"].includes(method) ? option.type : null;
    const host = this.returnApiUrl();
    const fullUrl = `${host}${url}`;
    const updateParams =
      type === "multipart" ? params : params ? JSON.stringify(params) : null;
    return fetch(fullUrl, {
      method: method,
      headers: this.setAuthorizationToken(type),
      body: updateParams,
    })
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
