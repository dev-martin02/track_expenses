const backendUrl = "http://localhost:3000";

// fetch categories breakdown
export const fetchCategoriesBreakdown = async (month: number, year: number) => {
  const response = await fetch(
    `${backendUrl}/transactions/category-breakdown?month=${month}&year=${year}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const { data } = await response.json();
  return data;
};

// weekly performance
export const fetchWeeklyPerformance = async (month: number, year: number) => {
  const response = await fetch(
    `${backendUrl}/transactions/weekly-breakdown?month=${month}&year=${year}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const { data } = await response.json();
  return data;
};

export const fetchMonthlyPerformance = async () => {
  const response = await fetch(`${backendUrl}/transactions/monthly-breakdown`, {
    method: "GET",
    credentials: "include",
  });

  console.log("Monthly performance response:", response);
  const { data } = await response.json();
  return data;
};
