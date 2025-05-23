import { ProgressBar, StageCompletionDetail } from "../ProgressBar";
import "./globals.css";

// Helper function to calculate average time between deliverables
const calculateAverageTimeBetweenDeliverables = (details: StageCompletionDetail[]): string => {
  const completedWithDates = details.filter(d => d.completionDate);
  if (completedWithDates.length < 2) {
    return "N/A (need at least 2 completed stages with dates)";
  }

  // Sort by completion date to calculate time differences between consecutive stages
  const sortedDetails = [...completedWithDates].sort((a, b) => 
    new Date(a.completionDate!).getTime() - new Date(b.completionDate!).getTime()
  );

  let totalDaysBetween = 0;
  if (sortedDetails.length > 1) {
    const firstDate = new Date(sortedDetails[0].completionDate!).getTime();
    const lastDate = new Date(sortedDetails[sortedDetails.length - 1].completionDate!).getTime();
    totalDaysBetween = (lastDate - firstDate) / (1000 * 60 * 60 * 24);
  }
  
  const averageDaysBetween = totalDaysBetween / (sortedDetails.length -1) ; // Average time *between* deliverables

  return averageDaysBetween > 0 ? `${averageDaysBetween.toFixed(1)} days` : "N/A";
};

// New helper function to calculate average time to completion from project start
const PROJECT_START_DATE = "2025-05-19"; // Define your project start date here

const calculateAverageTimeToCompletionFromStart = (details: StageCompletionDetail[], projectStartDateString: string): string => {
  const completedWithDates = details.filter(d => d.completionDate);
  if (completedWithDates.length === 0) {
    return "N/A (no completed stages with dates)";
  }

  const projectStartDate = new Date(projectStartDateString).getTime();
  let totalDaysFromStartSum = 0;

  completedWithDates.forEach(detail => {
    const completionDate = new Date(detail.completionDate!).getTime();
    const daysFromStart = (completionDate - projectStartDate) / (1000 * 60 * 60 * 24);
    if (daysFromStart >= 0) { // Ensure completion date is after project start
      totalDaysFromStartSum += daysFromStart;
    }
  });

  if (completedWithDates.length === 0) return "N/A"; // Should be caught earlier, but good for safety

  const averageDaysFromStart = totalDaysFromStartSum / completedWithDates.length;

  return averageDaysFromStart >= 0 ? `${averageDaysFromStart.toFixed(1)} days` : "N/A";
};


export default function Home() {
  // List the keys and completion dates of features here
  // Dates should be in "YYYY-MM-DD" format
  const stageCompletionDetails: StageCompletionDetail[] = [
    { key: "users", completionDate: "2025-05-19" }, // Account creation done
    { key: "profile_basic" },
    { key: "groups", completionDate: "2025-05-21" }, // Groups completed
    { key: "private_messages", completionDate: "2025-05-22" }, // Private messages completed
    { key: "jobs" },
    { key: "admin_actions" },
    { key: "user_notifications" },
    // Add or update stages with their completion dates
  ];

  const averageTimeBetween = calculateAverageTimeBetweenDeliverables(stageCompletionDetails);
  const averageTimeFromStart = calculateAverageTimeToCompletionFromStart(stageCompletionDetails, PROJECT_START_DATE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] text-[rgb(var(--foreground-rgb))] flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-[rgb(var(--primary-accent-rgb))] selection:text-[rgb(var(--primary-accent-text-rgb))]">
      <main className="flex flex-col gap-10 w-full max-w-5xl items-center">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 drop-shadow-lg mb-3">
            Polmatch Platform Progress
          </h1>
          <p className="text-xl sm:text-2xl text-[rgb(var(--muted-foreground-rgb))] max-w-3xl">
            Visualizing the journey to a fully-featured social platform. Each milestone represents a core component of Polmatch.
          </p>
        </div>
        <ProgressBar stageDetails={stageCompletionDetails} />
        <div className="mt-4 text-center text-lg text-[rgb(var(--muted-foreground-rgb))] animate-fade-in delay-200">
          Average time between deliverables: <span className="font-semibold text-[rgb(var(--foreground-rgb))]">{averageTimeBetween}</span>
        </div>
        <div className="mt-2 text-center text-lg text-[rgb(var(--muted-foreground-rgb))] animate-fade-in delay-300">
          Average time to complete (from project start): <span className="font-semibold text-[rgb(var(--foreground-rgb))]">{averageTimeFromStart}</span>
        </div>
      </main>
      <footer className="mt-16 mb-4 text-[rgb(var(--muted-foreground-rgb))] text-sm text-center animate-fade-in delay-300">
        &copy; {new Date().getFullYear()} Moše Abramović. Crafted with care.
      </footer>
    </div>
  );
}
