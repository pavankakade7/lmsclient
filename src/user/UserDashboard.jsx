import { useEffect, useState } from "react";
import DashboardLayout from "@/common/DashboardLayout";
import RequestLeave from "@/employee/RequestLeave";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function UserDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveData, setLeaveData] = useState({
    casualLeaves: 7,
    medicalLeaves: 7,
    privilegedLeaves: 20,
    unpaidLeaves: 0
  });

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const empId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/api/leave-requests/empId/${empId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeaveRequests(data);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleLeaveRequestApproval = (type) => {
    // Assuming this function is called when admin approves a leave request
    setLeaveData(prevLeaveData => ({
      ...prevLeaveData,
      [type]: prevLeaveData[type] + 1
    }));
  };

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <RequestLeave onLeaveRequestApproval={handleLeaveRequestApproval} />
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CASUAL LEAVES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveData.casualLeaves}/7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">MEDICAL LEAVES</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveData.medicalLeaves}/7</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">PRIVILEGED LEAVE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveData.privilegedLeaves}/20</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">UNPAID LEAVE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaveData.unpaidLeaves}/0</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Leave history</CardTitle>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <a href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-72 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="hidden sm:table-cell">Apply Date</TableHead>
                        <TableHead className="hidden sm:table-cell">Leave Type</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.map((request, index) => {
                        const { employee } = request;
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="font-medium">
                                {employee ? `${employee.firstName} ${employee.lastName}` : "Unknown Employee"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {employee ? employee.email : "No Email"}
                              </div>
                            </TableCell>
                            <TableCell>{employee ? employee.department : "No Department"}</TableCell>
                            <TableCell className="hidden sm:table-cell">{request.startDate}</TableCell>
                            <TableCell className="hidden sm:table-cell">{request.leaveType}</TableCell>
                            <TableCell className="text-right hidden sm:table-cell">
                              <Badge className="text-xs" variant={request.status === "PENDING" ? "secondary" : "outline"}>
                                {request.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Holidays</CardTitle>
              </CardHeader>
              <ScrollArea className="max-h-72 overflow-y-auto">
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Christmas</p>
                      <p className="text-sm text-muted-foreground">Monday</p>
                    </div>
                    <div className="ml-auto font-medium">2024-12-25</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">New Year's Day</p>
                      <p className="text-sm text-muted-foreground">Tuesday</p>
                    </div>
                    <div className="ml-auto font-medium">2025-01-01</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Thanksgiving</p>
                      <p className="text-sm text-muted-foreground">Thursday</p>
                    </div>
                    <div className="ml-auto font-medium">2024-11-28</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Independence Day</p>
                      <p className="text-sm text-muted-foreground">Thursday</p>
                    </div>
                    <div className="ml-auto font-medium">2024-07-04</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">Labor Day</p>
                      <p className="text-sm text-muted-foreground">Monday</p>
                    </div>
                    <div className="ml-auto font-medium">2024-09-02</div>
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}

export default UserDashboard;
