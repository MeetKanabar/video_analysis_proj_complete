import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

interface PostureData {
  score: number
  shoulderAlignment: number
  headPosition: number
  stability: number
  postureOverTime: {
    time: number
    alignment: number
    stability: number
  }[]
}

interface PostureChartProps {
  data: PostureData
}

export function PostureChart({ data }: PostureChartProps) {
  // Format data for the chart
  const chartData = data.postureOverTime.map((item) => ({
    time: `${Math.floor(item.time / 60)}:${(item.time % 60).toString().padStart(2, "0")}`,
    alignment: item.alignment,
    stability: item.stability,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Posture Metrics Over Time</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Overall posture score: <strong>{data.score}%</strong>
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Tooltip formatter={(value) => [`${value}%`, ""]} labelFormatter={(label) => `Time: ${label}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="alignment"
                name="Body Alignment"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="stability"
                name="Stability"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posture Analysis</CardTitle>
          <CardDescription>How your body language affected your presentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground">Shoulder Alignment</h4>
              <p className="text-2xl font-bold mt-1">{data.shoulderAlignment}%</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground">Head Position</h4>
              <p className="text-2xl font-bold mt-1">{data.headPosition}%</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground">Stability</h4>
              <p className="text-2xl font-bold mt-1">{data.stability}%</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Key Observations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                • Your overall posture score was {data.score}%, which is{" "}
                {data.score >= 70 ? "strong" : "an area for improvement"}.
              </li>
              <li>
                •{" "}
                {data.shoulderAlignment >= 70
                  ? "Your shoulders were well-aligned, projecting confidence."
                  : "Your shoulder alignment could be improved for a more confident appearance."}
              </li>
              <li>
                •{" "}
                {data.stability >= 70
                  ? "You maintained good stability throughout your presentation."
                  : "There was some unnecessary movement that may have distracted from your message."}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Recommendations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {data.score < 70 ? (
                <>
                  <li>• Practice standing with your weight evenly distributed on both feet.</li>
                  <li>• Keep your shoulders back and down, with your chest slightly lifted.</li>
                  <li>• Record yourself presenting to become more aware of your posture habits.</li>
                </>
              ) : (
                <>
                  <li>• Continue maintaining your excellent posture in presentations.</li>
                  <li>• Consider incorporating purposeful movement to emphasize key points.</li>
                  <li>• Your stable posture contributes significantly to your professional presence.</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
