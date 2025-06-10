import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts"

interface EngagementData {
  averageScore: number
  peakMoments: {
    time: number
    score: number
    reason: string
  }[]
  lowMoments: {
    time: number
    score: number
    reason: string
  }[]
  engagementOverTime: {
    time: number
    score: number
  }[]
}

interface EngagementChartProps {
  data: EngagementData
}

export function EngagementChart({ data }: EngagementChartProps) {
  // Format data for the chart
  const chartData = data.engagementOverTime.map((item) => ({
    time: `${Math.floor(item.time / 60)}:${(item.time % 60).toString().padStart(2, "0")}`,
    score: item.score,
  }))

  // Find peak and low moments for annotations
  const peakMoments = data.peakMoments.map((moment) => ({
    time: `${Math.floor(moment.time / 60)}:${(moment.time % 60).toString().padStart(2, "0")}`,
    score: moment.score,
    reason: moment.reason,
  }))

  const lowMoments = data.lowMoments.map((moment) => ({
    time: `${Math.floor(moment.time / 60)}:${(moment.time % 60).toString().padStart(2, "0")}`,
    score: moment.score,
    reason: moment.reason,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Audience Engagement Over Time</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Average engagement score: <strong>{data.averageScore}%</strong>
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Engagement"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <ReferenceLine y={data.averageScore} stroke="#f59e0b" strokeDasharray="3 3" label="Average" />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Peak Engagement Moments</CardTitle>
            <CardDescription>When you captured your audience's attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {peakMoments.map((moment, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-300 font-medium">{moment.score}%</span>
                  </div>
                  <div>
                    <p className="font-medium">At {moment.time}</p>
                    <p className="text-sm text-muted-foreground">{moment.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Engagement Moments</CardTitle>
            <CardDescription>When audience attention may have waned</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {lowMoments.map((moment, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-300 font-medium">{moment.score}%</span>
                  </div>
                  <div>
                    <p className="font-medium">At {moment.time}</p>
                    <p className="text-sm text-muted-foreground">{moment.reason}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Insights</CardTitle>
          <CardDescription>How to improve audience connection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Key Observations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Your average engagement score was {data.averageScore}%.</li>
              <li>
                • Your highest engagement ({Math.max(...data.engagementOverTime.map((d) => d.score))}%) occurred when
                you {peakMoments[0]?.reason.toLowerCase() || "were most animated and expressive"}.
              </li>
              <li>
                • Engagement tended to drop when you{" "}
                {lowMoments[0]?.reason.toLowerCase() || "used monotone delivery or technical jargon"}.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Recommendations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Use more storytelling techniques to maintain audience interest.</li>
              <li>• Vary your vocal pace and tone to emphasize important points.</li>
              <li>• Incorporate strategic pauses after key statements.</li>
              <li>• Consider adding more visual aids or demonstrations at low engagement points.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
