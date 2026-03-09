'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  QrCode,
  Users,
  Edit,
  Trash2,
  CreditCard,
} from 'lucide-react'
import { toast } from 'sonner'

// Mock data
const initialEmployees = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acmecorp.com',
    designation: 'Chief Technology Officer',
    department: 'Engineering',
    phone: '+1 555-0123',
    leadCount: 89,
    isActive: true,
    avatar: null,
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@acmecorp.com',
    designation: 'VP of Sales',
    department: 'Sales',
    phone: '+1 555-0124',
    leadCount: 156,
    isActive: true,
    avatar: null,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@acmecorp.com',
    designation: 'Marketing Director',
    department: 'Marketing',
    phone: '+1 555-0125',
    leadCount: 45,
    isActive: true,
    avatar: null,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@acmecorp.com',
    designation: 'Product Manager',
    department: 'Product',
    phone: '+1 555-0126',
    leadCount: 98,
    isActive: true,
    avatar: null,
  },
  {
    id: '5',
    name: 'Alex Turner',
    email: 'alex@acmecorp.com',
    designation: 'Software Engineer',
    department: 'Engineering',
    phone: '+1 555-0127',
    leadCount: 32,
    isActive: false,
    avatar: null,
  },
]

export default function TeamPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    phone: '',
  })

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email) {
      toast.error('Please fill in required fields')
      return
    }

    const employee = {
      id: String(employees.length + 1),
      ...newEmployee,
      leadCount: 0,
      isActive: true,
      avatar: null,
    }

    setEmployees([...employees, employee])
    setNewEmployee({ name: '', email: '', designation: '', department: '', phone: '' })
    setIsAddDialogOpen(false)
    toast.success('Employee added successfully')
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id))
    toast.success('Employee removed')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const totalLeads = employees.reduce((sum, emp) => sum + emp.leadCount, 0)
  const activeEmployees = employees.filter(emp => emp.isActive).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground">Manage your team members and their digital cards</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Add a new team member to your organization. They will receive an invitation to set up their digital card.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    placeholder="Software Engineer"
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee({ ...newEmployee, designation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="Engineering"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 555-0123"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEmployee}>Add Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold text-foreground">{employees.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold text-foreground">{activeEmployees}</p>
              </div>
              <div className="p-2 rounded-lg bg-green-100">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold text-foreground">{totalLeads}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="group hover:border-primary/50 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.designation}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-lg text-muted-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      View Card
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      QR Code
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-destructive"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{employee.department}</Badge>
                <Badge variant={employee.isActive ? 'default' : 'secondary'} className={employee.isActive ? 'bg-green-100 text-green-700' : ''}>
                  {employee.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                {employee.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{employee.leadCount} leads</span>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card */}
        <Card className="border-dashed hover:border-primary/50 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[280px]">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors mb-4">
                <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Add Team Member</h3>
              <p className="text-sm text-muted-foreground">Invite a new employee</p>
            </button>
          </CardContent>
        </Card>
      </div>

      {filteredEmployees.length === 0 && searchQuery && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-1">No team members found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search criteria
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
