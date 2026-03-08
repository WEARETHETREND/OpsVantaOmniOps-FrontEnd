/**
 * PROPRIETARY AND CONFIDENTIAL - TRADE SECRET
 *
 * © 2026 OpsVanta LLC
 * ALL RIGHTS RESERVED
 *
 * UNAUTHORIZED ACCESS, USE, OR DISTRIBUTION PROHIBITED
 *
 * This file contains trade secrets and confidential information.
 * Violators will be prosecuted under trade secret law.
 *
 * For licensing: contact@opsvanta.com
 */

import { API_URL } from './config';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`);
  }
  if (res.status === 204 || res.headers.get('Content-Length')?.trim() === '0') {
    return null;
  }
  const contentType = res.headers.get('Content-Type');
  if (!contentType || !contentType.toLowerCase().includes('application/json')) {
    return null;
  }
  return res.json();
}

export async function getProjects() {
  return request('/projects');
}

export async function createProject(data) {
  return request('/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function getWorkflows() {
  return request('/workflow');
}

// AI Website Generation
export async function generateWebsite(data) {
  return request('/projects/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function getGenerationProgress(projectId) {
  return request(`/projects/${projectId}/progress`);
}

export async function getProject(projectId) {
  return request(`/projects/${projectId}`);
}

export async function updateProject(projectId, data) {
  return request(`/projects/${projectId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteProject(projectId) {
  return request(`/projects/${projectId}`, {
    method: 'DELETE',
  });
}

// Domain Management
export async function searchDomains(query) {
  return request(`/domains/search?q=${encodeURIComponent(query)}`);
}

export async function getDomains(projectId) {
  return request(`/projects/${projectId}/domains`);
}

export async function connectDomain(projectId, domain) {
  return request(`/projects/${projectId}/domains`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });
}
