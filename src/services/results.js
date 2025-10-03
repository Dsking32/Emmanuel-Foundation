import { apiGet } from "@/lib/api";

export const ResultsService = {
  getByMatricAndSession: (matricNo, session) =>
    apiGet(`/results?matricNo=${encodeURIComponent(matricNo)}&session=${encodeURIComponent(session)}`),
};
