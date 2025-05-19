import React from "react";

// Stages derived from the social platform schema
export const STAGES = [
  { key: "users", label: "User Accounts" },
  { key: "profile_basic", label: "Basic Profiles" },
  { key: "profile_business", label: "Business Profiles" },
  { key: "profile_love", label: "Love Profiles" },
  { key: "groups", label: "Groups" },
  { key: "group_members", label: "Group Membership" },
  { key: "group_invitations", label: "Group Invitations" },
  { key: "private_messages", label: "Private Messaging" },
  { key: "group_messages", label: "Group Messaging" },
  { key: "questionnaires", label: "Questionnaires" },
  { key: "questions", label: "Questions" },
  { key: "user_questionnaire_answers", label: "User Answers" },
  { key: "required_questionnaires", label: "Required Questionnaires" },
  { key: "profile_questionnaire_visibility", label: "Profile Questionnaire Visibility" },
  { key: "jobs", label: "Jobs" },
  { key: "job_applications", label: "Job Applications" },
  { key: "user_bookmarks", label: "Bookmarks" },
  { key: "admin_actions", label: "Admin Actions" },
  { key: "ip_bans", label: "IP Bans" },
  { key: "user_notifications", label: "Notifications" },
  { key: "user_activity_logs", label: "User Activity Logs" },
  { key: "user_reports", label: "User Reports" },
  { key: "user_preferences", label: "User Preferences" },
  { key: "user_search_history", label: "Search History" },
  { key: "user_connections", label: "User Connections" },
  { key: "user_sessions", label: "User Sessions" },
  { key: "support_tickets", label: "Support Tickets" },
  { key: "tags", label: "Tags" },
  { key: "tagged_items", label: "Tagged Items" },
];

export type StageKey = typeof STAGES[number]["key"];

export interface StageCompletionDetail {
  key: StageKey;
  completionDate?: string; // ISO date string e.g., "YYYY-MM-DD"
}

export interface ProgressBarProps {
  stageDetails: StageCompletionDetail[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ stageDetails }) => {
  const totalPossibleStages = STAGES.length;
  const completedWithDateCount = stageDetails.filter((detail) => detail.completionDate).length;
  const percent = totalPossibleStages > 0 ? (completedWithDateCount / totalPossibleStages) * 100 : 0;

  return (
    <div className="w-full flex flex-col items-center my-8 p-4 bg-[rgb(var(--card-rgb))] rounded-xl shadow-2xl backdrop-blur-md border border-[rgb(var(--border-rgb))]">
      <div className="relative flex flex-col items-center h-[700px] max-h-[75vh] w-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-custom scrollbar-track-custom">
        {/* Larger, centered vertical line background */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-6 bg-[rgb(var(--border-rgb))] rounded-full z-0" style={{ height: "calc(100% - 2rem)" }} />
        {/* Larger vertical progress fill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-6 bg-gradient-to-b from-[rgb(var(--primary-accent-rgb))] to-gray-400 rounded-full z-10 transition-all duration-1000 ease-out"
          style={{ height: `calc(${percent}% * (100% - 2rem) / 100)` }}
        />
        {/* Stages */}
        <div className="flex flex-col justify-between h-full w-full z-20 py-2">
          {STAGES.map((stage, idx) => {
            const detail = stageDetails.find((d) => d.key === stage.key);
            const isCompleted = !!detail?.completionDate; // Considered completed if it has a date
            const completionDate = detail?.completionDate;

            return (
              <div key={stage.key} className="flex items-center my-3 last:mb-0 group" style={{ minHeight: "3rem" }}>
                <div className="flex flex-col items-center mr-6 relative z-10">
                  <span
                    className={`w-16 h-16 rounded-full border-4 text-xl font-bold flex items-center justify-center shadow-xl transition-all duration-300 ease-in-out ${
                      isCompleted
                        ? "bg-gradient-to-br from-[rgb(var(--primary-accent-rgb))] to-gray-300 border-gray-400 text-[rgb(var(--primary-accent-text-rgb))] scale-110 ring-2 ring-gray-500/50 ring-offset-2 ring-offset-[rgb(var(--card-rgb))]"
                        : "bg-[rgb(var(--card-rgb))] border-[rgb(var(--border-rgb))] text-[rgb(var(--muted-foreground-rgb))]"
                    } group-hover:scale-105 group-hover:shadow-gray-500/30`}
                  >
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 pl-4 pr-2 py-2 bg-[rgba(var(--card-rgb),0.7)] rounded-lg shadow-md backdrop-blur-sm border border-[rgba(var(--border-rgb),0.5)] group-hover:bg-[rgba(var(--border-rgb),0.3)] transition-colors">
                  <div className={`text-xl font-semibold ${isCompleted ? "text-[rgb(var(--primary-accent-rgb))]" : "text-[rgb(var(--muted-foreground-rgb))]"}`}>{stage.label}</div>
                  {completionDate && (
                    <div className="text-xs text-[rgb(var(--muted-foreground-rgb))] mt-1">
                      Completed: {new Date(completionDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8 text-center text-lg text-[rgb(var(--muted-foreground-rgb))]">
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">{completedWithDateCount}</span> / {totalPossibleStages} milestones achieved
      </div>
    </div>
  );
};
