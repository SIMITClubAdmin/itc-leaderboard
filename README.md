# 🏆 ITC Leaderboard

A dynamic, animated leaderboard for tracking participant scores from Google Sheets data. Built with Next.js and featuring a beautiful podium design with counting animations.

## ✨ Features

- **Real-time Data**: Fetches participant scores from Google Sheets
- **Animated Podium**: Gold, silver, bronze podium for top 3 participants
- **Counting Animation**: Points animate from 0 to final value

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your system
- A Google Sheets document with participant data like [this format](https://docs.google.com/spreadsheets/d/1jeOni4L-EtVD_sJS8NVoeYO1bs10RSQtqY4gg9ruPRc/edit?usp=sharing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd itc-leaderboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Google Sheets**
   - Ensure your Google Sheet is published to the web
   - Update the CSV URL in `src/app/api/leaderboard/route.js`
   - Your sheet should have columns: `Name`, `Total Points`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Your leaderboard should be running!

### Google Sheets Setup

Your Google Sheets document should have the following structure:

| No | Name    | Lesson 1 | Lesson 2 | ... | Total Points |
|----|---------|----------|----------|-----|--------------|
| 1  | Alice   | 10       | 15       | ... | 85           |
| 2  | Bob     | 8        | 12       | ... | 72           |
| 3  | Charlie | 12       | 18       | ... | 95           |

**Important columns:**
- `Name`: Participant's name
- `Total Points`: Final score for ranking

## 🔧 Maintenance

### Updating Participant Data

The leaderboard automatically fetches data from your Google Sheets. To update scores:

1. **Edit your Google Sheet** with new scores
2. **Refresh the leaderboard** - data updates automatically on page load
3. **No code changes needed** - the app will sort participants by points

### Customizing Colors

The app uses a custom color palette defined in `src/app/globals.css`:

```css
:root {
  --color-dark: #131313;
  --color-red-primary: #d01921;
  --color-red-accent: #ff002a;
  --color-light-gray: #ededed;
  --color-cream: #faf9f5;
}
```

To change colors:
1. Update the CSS variables in `globals.css`
2. Colors will automatically apply throughout the app

### Modifying Animations

Animation timings can be adjusted in `src/app/page.js`:

- **Counting speed**: Change `duration` in `useCountUp` hook
- **Entrance delays**: Modify `delay` props in components
- **Animation types**: Edit CSS classes in `globals.css`

### Changing Fonts

Current fonts:
- **Headings**: League Spartan
- **Body text**: Glacial Indifference

To change fonts:
1. Update Google Fonts imports in `globals.css`
2. Modify CSS variables for `--font-heading` and `--font-body`

### Adding New Participants

Simply add new rows to your Google Sheets:
1. Add participant name in the `Name` column
2. Add their total points in the `Total Points` column
3. The leaderboard will automatically include them

### Deployment

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

#### Other Platforms
```bash
npm run build
npm start
```

## 📁 Project Structure

```
itc-leaderboard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── leaderboard/
│   │   │       └── route.js          # Google Sheets API
│   │   ├── globals.css               # Styles & animations
│   │   ├── layout.js                 # App layout
│   │   └── page.js                   # Main leaderboard
├── public/
│   └── sim-itc-logo.png             # Club logo
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for SIM ITC Club**