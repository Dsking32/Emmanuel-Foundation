import { apiGet, apiPost } from "@/lib/api";

export const AdmissionsService = {
  apply: (payload) => apiPost("/admissions/apply", payload),
  status: (email) => apiGet(`/admissions/status?email=${encodeURIComponent(email)}`),
};
