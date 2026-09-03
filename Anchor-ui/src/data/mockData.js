export const mockData = {
  user: {
    name: "Rahul Sharma",
    occupation: "Delivery Partner",
    city: "Bengaluru, India",
    language: "en"
  },
  financialState: {
    state: "STABLE",
    runway_days: 7.4,
    safe_to_spend: 4280,
    expected_buffer: 1950,
  },
  income: {
    baseline_weekly: 4950,
    current_weekly: 5620,
    last_weekly: 5180,
    trend: "+8%",
    sources: [
      { name: "Swiggy", percent: 70, amount: 3934, hourly_rate: 140, recent_avg: 135 },
      { name: "Zomato", percent: 20, amount: 1124, hourly_rate: 120, recent_avg: 125 },
      { name: "Uber", percent: 10, amount: 562, hourly_rate: 110, recent_avg: 115 },
    ],
    daily_history: [
      { day: "Mon", amount: 850 },
      { day: "Tue", amount: 1730 },
      { day: "Wed", amount: 710 },
      { day: "Thu", amount: 1140 },
      { day: "Fri", amount: 1050 },
      { day: "Sat", amount: 0 },
      { day: "Sun", amount: 0 },
    ]
  },
  expenses: {
    current_weekly: 2140,
    trend: "-4%",
    obligations: [
      { name: "Rent", amount: 1500, priority: "Must Protect", due: "Friday" },
      { name: "Fuel", amount: 500, priority: "Must Protect", due: "Tomorrow" },
      { name: "Food", amount: 600, priority: "Must Protect", due: "Daily" },
      { name: "Phone", amount: 200, priority: "Must Protect", due: "Today" },
      { name: "Vehicle Maintenance", amount: 300, priority: "Work Enabling", due: "Sunday" }
    ],
    protected_total: 1000,
  },
  savings: {
    current_weekly: 640,
    emergency_fund: { current: 6800, target: 15000 },
    recommended_savings: 400,
  },
  growth: {
    surplus: 1950, // Available buffer
    recommended_investment: 100, // min(30% of 1950, 100) -> 100 per day max
    options: [
      { id: "gold", name: "Digital Gold", description: "Safe, highly liquid micro-investment.", risk: "Low", minimum: 10 },
      { id: "health", name: "Micro Health Policy", description: "Cover ₹1 Lakh medical emergency.", risk: "None", minimum: 50 },
      { id: "mutual-fund", name: "Liquid Mutual Fund", description: "Better returns than bank account.", risk: "Low", minimum: 100 }
    ]
  }
};
