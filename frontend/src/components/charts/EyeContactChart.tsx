import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface EyeContactData {
  score: number
  timeWithContact: number
  totalTime: number
  contactOverTime: {
    time: number
    percentage: number
  }[]
}

interface EyeContactChartProps {
  data: EyeContactData
}

export function EyeContactChart({ data }: EyeContactChartProps) {
  // Format data for the chart
  const chartData = data.contactOverTime.map((item) => ({
    time: `${Math.floor(item.time / 60)}:${(item.time % 60).toString().padStart(2, "0")}`,
    percentage: item.percentage,
  }))

  // Calculate percentage of time with eye contact
  const eyeContactPercentage = Math.round((data.timeWithContact / data.totalTime) * 100)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Eye Contact Over Time</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Overall eye contact score: <strong>{data.score}%</strong>
        </p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="eyeContactGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Tooltip
                formatter={(value) => [`${value}%`, "Eye Contact"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#eyeContactGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eye Contact Analysis</CardTitle>
          <CardDescription>How effectively you connected with your audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground">Time with Eye Contact</h4>
              <p className="text-2xl font-bold mt-1">
                {Math.floor(data.timeWithContact / 60)}:{(data.timeWithContact % 60).toString().padStart(2, "0")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{eyeContactPercentage}% of total time</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm text-muted-foreground">Longest Sustained Contact</h4>
              <p className="text-2xl font-bold mt-1">{Math.max(...data.contactOverTime.map((d) => d.percentage))}%</p>
              <p className="text-xs text-muted-foreground mt-1">Maximum engagement level</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium">Key Observations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• You maintained eye contact for {eyeContactPercentage}% of your presentation.</li>
              <li>
                •{" "}
                {eyeContactPercentage >= 70
                  ? "Your consistent eye contact helped establish credibility."
                  : "There are opportunities to improve your audience connection through more eye contact."}
              </li>
              <li>
                •{" "}
                {data.contactOverTime.some((d) => d.percentage < 30)
                  ? "There were moments where you lost connection with your audience."
                  : "You maintained steady engagement throughout your presentation."}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Recommendations</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {eyeContactPercentage < 60 ? (
                <>
                  <li>• Practice looking directly at the camera when presenting virtually.</li>
                  <li>• Try the "triangle technique" - alternating between eyes and forehead.</li>
                </>
              ) : (
                <>
                  <li>• Continue your strong eye contact patterns in future presentations.</li>
                  <li>• Consider scanning the entire audience to include everyone.</li>
                </>
              )}
              <li>• Reduce dependency on notes to maintain better audience connection.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
