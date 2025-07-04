# Confidently You - Public Speaking Development App

## Overview
Confidently You is a full-stack web application designed to enhance public speaking skills by analyzing video, audio, and text inputs. It leverages advanced computer vision and machine learning techniques to provide real-time feedback on face detection, posture, engagement, pitch, pace, and clarity, helping users improve their communication skills.

## Features
- **Video Analysis**: Utilizes OpenCV and YOLO for face detection and posture analysis.
- **Audio Analysis**: Processes pitch, pace, and clarity using Python-based audio processing.
- **Text Analysis**: Evaluates speech content for clarity and structure.
- **Full-Stack Architecture**: 
  - Frontend: Built with React, Vite, and Tailwind CSS for a responsive UI.
  - Backend: Powered by Express and Node.js with MongoDB for data storage.
  - Deployment: Hosted on Vercel for seamless scalability.
- **Testing & Development**: Integrated with Postman for API testing.
- **Real-Time Feedback**: Provides actionable insights to improve public speaking.

## Tech Stack
- **Programming Languages**: Python, JavaScript
- **Frameworks/Libraries**: React, Vite, Express, Node.js, Tailwind CSS, OpenCV, YOLO, scikit-learn, Seaborn, Pandas, NumPy
- **Database**: MongoDB
- **Tools**: Git, GitHub, Postman, Vercel
- **Development Period**: March 2024 - May 2025

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Git

### Steps

1. **Clone the Repository**:
```bash
git clone https://github.com/MeetKanabar/video_analysis_proj_complete.git
cd video_analysis_proj_complete
```

2. **Backend Setup**:
```bash
cd backend
npm install
```
Create a `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
Start the backend server:
```bash
npm start
```

3. **Frontend Setup**:
```bash
cd ../frontend
npm install
npm run dev
```

4. **Python Dependencies**:
```bash
pip install opencv-python scikit-learn seaborn pandas numpy
```

5. **MongoDB Setup**:
- Ensure MongoDB is running locally or provide a cloud-based MongoDB URI in the `.env` file.

6. **Run the Application**:
- Access the app at http://localhost:5173 (or the port specified by Vite).

## Usage
1. **Upload a Video**: Use the frontend interface to upload a video of your public speaking session.
2. **Analyze**: The app processes the video for face detection, posture, and engagement (via OpenCV/YOLO) and audio for pitch and clarity (via Python).
3. **View Feedback**: Receive detailed feedback on your performance, including posture corrections, engagement metrics, and speech clarity.
4. **Iterate**: Use the feedback to refine your public speaking skills and re-upload videos for continuous improvement.

## Project Structure
```
video_analysis_proj_complete/
├── backend/                # Express and Node.js backend
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   └── server.js           # Main server file
├── frontend/               # React and Vite frontend
│   ├── src/                # React components and assets
│   └── tailwind.config.js  # Tailwind CSS configuration
├── scripts/                # Python scripts for video/audio analysis
└── README.md               # Project documentation
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
- **Author**: Y. M. Kanabar
- **Email**: meetyogeshkanabar3@gmail.com
- **GitHub**: [MeetKanabar](https://github.com/MeetKanabar)
- **LinkedIn**: [Meet Kanabar](https://linkedin.com/in/meet-kanabar)
