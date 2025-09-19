"use client";
import { useState, useEffect } from "react";

const PodiumStep = ({ position, participant, height, bgColor, textColor }) => (
  <div className="flex flex-col items-center">
    <div className="mb-4 text-center">
      <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center text-white text-2xl font-bold mb-2 mx-auto`}>
        {position}
      </div>
      <h3 className="font-bold text-lg text-gray-800 dark:text-white">{participant.name || 'Unknown'}</h3>
      <p className={`text-2xl font-bold ${textColor}`}>{participant.points || 0} pts</p>
    </div>
    <div className={`w-24 ${height} ${bgColor} rounded-t-lg flex items-end justify-center pb-4`}>
      <span className="text-white font-bold text-xl">{position}</span>
    </div>
  </div>
);

export default function Leaderboard() {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      console.log(data)
      if (data.error) {
        throw new Error(data.error);
      }

      // Sort participants by points
      const sortedParticipants = data.responses
        .map(participant => ({
          ...participant,
          name: participant.Name,
          points: parseInt(participant["Total Points"] || 0)
        }))
        .sort((a, b) => b.points - a.points);

      setParticipants(sortedParticipants);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          <button
            onClick={fetchLeaderboard}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const top3 = participants.slice(0, 3);
  const rest = participants.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Top performers and rankings</p>
        </div>

        {/* Podium */}
        {top3.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-center items-end gap-8 mb-8">
              {/* 2nd Place */}
              {top3[1] && (
                <PodiumStep
                  position={2}
                  participant={top3[1]}
                  height="h-32"
                  bgColor="bg-gray-400"
                  textColor="text-gray-600"
                />
              )}

              {/* 1st Place */}
              {top3[0] && (
                <PodiumStep
                  position={1}
                  participant={top3[0]}
                  height="h-40"
                  bgColor="bg-yellow-500"
                  textColor="text-yellow-600"
                />
              )}

              {/* 3rd Place */}
              {top3[2] && (
                <PodiumStep
                  position={3}
                  participant={top3[2]}
                  height="h-24"
                  bgColor="bg-amber-600"
                  textColor="text-amber-600"
                />
              )}
            </div>
          </div>
        )}

        {/* Rest of participants */}
        {rest.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Other Participants</h2>
            <div className="space-y-3">
              {rest.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 4}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {participant.name}
                    </span>
                  </div>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                    {participant.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {participants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">No participants found</p>
          </div>
        )}
      </div>
    </div>
  );
}
