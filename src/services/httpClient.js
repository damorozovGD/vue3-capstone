class HttpClient {
  constructor(options = {}) {
    this._baseURL = options.baseURL || '';
    this._headers = options.headers || {};
  }

  async _fetchJSON(endpoint, options = {}) {
    const res = await fetch(this._baseURL + endpoint, {
      ...options,
      headers: this._headers,
    });

    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  }

  get(endpoint, options = {}) {
    return this._fetchJSON(endpoint, {
      ...options,
      method: 'GET',
    });
  }
}

export default HttpClient;
