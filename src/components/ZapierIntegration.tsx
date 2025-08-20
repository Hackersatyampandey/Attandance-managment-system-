import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, ExternalLink } from "lucide-react";

interface ZapierIntegrationProps {
  attendanceData: any[];
}

const ZapierIntegration = ({ attendanceData }: ZapierIntegrationProps) => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
          attendance_data: attendanceData,
          summary: {
            total_students: attendanceData.length,
            present: attendanceData.filter(s => s.status === "Present").length,
            absent: attendanceData.filter(s => s.status === "Absent").length,
            late: attendanceData.filter(s => s.status === "Late").length,
          }
        }),
      });

      // Since we're using no-cors, we won't get a proper response status
      // Instead, we'll show a more informative message
      toast({
        title: "Attendance Data Sent!",
        description: "The attendance data was sent to Google Sheets via Zapier. Please check your spreadsheet to confirm it was updated.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Google Sheets Integration
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect your attendance system to Google Sheets via Zapier webhook
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Go to <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Zapier.com</a> and create a new Zap</li>
              <li>Choose "Webhooks by Zapier" as the trigger app</li>
              <li>Select "Catch Hook" as the trigger event</li>
              <li>Copy the webhook URL and paste it below</li>
              <li>Choose "Google Sheets" as the action app</li>
              <li>Configure it to create/update rows in your attendance spreadsheet</li>
            </ol>
          </div>

          <form onSubmit={handleTrigger} className="space-y-4">
            <div>
              <Label htmlFor="webhook">Zapier Webhook URL</Label>
              <Input
                id="webhook"
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                This URL will receive the attendance data to sync with Google Sheets
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !webhookUrl}
              className="btn-education w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending to Google Sheets...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Attendance to Google Sheets
                </>
              )}
            </Button>
          </form>

          {attendanceData.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Data Preview:</h4>
              <div className="text-sm space-y-1">
                <p><strong>Total Records:</strong> {attendanceData.length}</p>
                <p><strong>Present:</strong> {attendanceData.filter(s => s.status === "Present").length}</p>
                <p><strong>Absent:</strong> {attendanceData.filter(s => s.status === "Absent").length}</p>
                <p><strong>Late:</strong> {attendanceData.filter(s => s.status === "Late").length}</p>
              </div>
              <Textarea
                className="mt-2 text-xs"
                value={JSON.stringify(attendanceData.slice(0, 2), null, 2)}
                readOnly
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Sample of data that will be sent (showing first 2 records)
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <a 
              href="https://zapier.com/apps/webhooks/help" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Learn more about Zapier Webhooks
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierIntegration;