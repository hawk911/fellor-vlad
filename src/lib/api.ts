import { HiringDataPoint } from "@/types";

const generateMockData = (): HiringDataPoint[] => {
  const data: HiringDataPoint[] = [];

  for (let i = 0; i < 30; i++) {
    const day = i + 1;

    const appToInterviewBase = Math.sqrt(i) * 16;
    const appToInterviewNoise = ((Math.random() - 0.4) * i) / 4;
    const applicationToInterview = Math.max(
      0,
      Math.min(95, appToInterviewBase + appToInterviewNoise),
    );

    const offerAcceptanceBase = i * 4.1;
    const offerAcceptanceNoise = ((Math.random() - 0.5) * i) / 3;
    const offerAcceptance = Math.max(
      0,
      Math.min(95, offerAcceptanceBase + offerAcceptanceNoise),
    );

    const rejectionBase = i * 0.7;
    const rejectionNoise = (Math.random() * i) / 2.5;
    const rejection = Math.max(0, Math.min(50, rejectionBase + rejectionNoise));

    data.push({
      day,
      applicationToInterview,
      offerAcceptance,
      rejection,
    });
  }
  return data;
};

export const getHiringInsights = async (): Promise<HiringDataPoint[]> => {
  const mockData = generateMockData();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
};
