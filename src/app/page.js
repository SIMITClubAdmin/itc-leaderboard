"use client";
import { useState, useEffect } from "react";

// Counting animation hook
const useCountUp = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  return count;
};

const PodiumStep = ({ position, participant, height, bgColor, textColor, delay = 0 }) => {
  const animatedPoints = useCountUp(participant.points || 0, 2000, delay);

  return (
    <div
      className="flex flex-col items-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 text-center">
        <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center text-cream text-2xl font-bold mb-2 mx-auto transform hover:scale-110 transition-transform duration-300 animate-bounce-in shadow-lg`}>
          {position}
        </div>
        <h3 className="font-bold text-lg text-dark animate-slide-in">{participant.name || 'Unknown'}</h3>
        <p className={`text-2xl font-bold ${textColor} animate-pulse-points`}>
          {animatedPoints} pts
        </p>
      </div>
      <div className={`w-24 ${height} ${bgColor} rounded-t-lg flex items-end justify-center pb-4 transform hover:scale-105 transition-all duration-300 animate-grow-up shadow-lg`}>
        <span className="text-cream font-bold text-xl">{position}</span>
      </div>
    </div>
  );
};

const ParticipantRow = ({ participant, position, delay }) => {
  const animatedPoints = useCountUp(participant.points || 0, 1500, delay);

  return (
    <div
      className="flex items-center justify-between p-4 bg-light-gray hover:bg-cream transition-all duration-300 hover:scale-102 animate-slide-in-right rounded-lg border border-light-gray hover:border-red-primary shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center text-sm font-bold animate-bounce-in text-cream">
          {position}
        </div>
        <span className="font-medium text-dark">
          {participant.name}
        </span>
      </div>
      <span className="font-bold text-lg text-red-primary">
        {animatedPoints} pts
      </span>
    </div>
  );
};

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-primary mx-auto mb-4"></div>
          <p className="text-dark">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-accent">Error: {error}</p>
          <button
            onClick={fetchLeaderboard}
            className="mt-4 px-4 py-2 bg-red-primary text-cream rounded hover:bg-red-accent transition-colors"
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
    <>
      <div className="light-rays-bg"></div>
      <div className="min-h-screen py-8 px-4 relative z-10">
        {/* Logo */}
        <div className="absolute top-4 left-4 animate-fade-in">
          <img
            src="/sim-itc-logo.png"
            alt="SIM ITC Club"
            className="w-16 h-16 object-contain"
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-dark mb-2 animate-slide-down">🏆 ITCamp: Frontendamentals Subcomm Leaderboard</h1>
            <p className="text-dark opacity-80 animate-fade-in-delayed">Top scorers and rankings</p>
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
                    delay={600}
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
                    delay={300}
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
                    delay={900}
                  />
                )}
              </div>
            </div>
          )}

          {/* Rest of participants */}
          {rest.length > 0 && (
            <div className="bg-cream rounded-lg shadow-lg p-6 animate-fade-in-up border border-light-gray" style={{ animationDelay: '1200ms' }}>
              <h2 className="text-2xl font-bold text-dark mb-6 text-center animate-slide-in">Other Participants</h2>
              <div className="space-y-3">
                {rest.map((participant, index) => (
                  <ParticipantRow
                    key={index}
                    participant={participant}
                    position={index + 4}
                    delay={1400 + (index * 100)}
                  />
                ))}
              </div>
            </div>
          )}

          {participants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark opacity-70 text-lg">No participants found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
