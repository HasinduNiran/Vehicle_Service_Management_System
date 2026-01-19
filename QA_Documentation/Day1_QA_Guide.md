# 🎯 Day 1 QA Guide - Vehicle Management System

## 📋 Quick Reference

**Total Test Cases:** 70  
**Priority Breakdown:**
- P0 (Critical): 26 cases
- P1 (High): 36 cases  
- P2 (Medium): 8 cases

---

## ✅ TASK 1: UNDERSTAND THE SYSTEM (1-2 hrs)

### System Overview

#### **Three User Roles**

1. **Customer (Public Users)**
   - Register and login
   - Manage vehicles (CRUD)
   - Create/manage bookings
   - Make payments
   - Submit feedback
   - View service history

2. **Manager (Admin)**
   - Login with username/password
   - Full system access
   - Manage employees
   - Manage inventory
   - Set booking limits
   - View all data and analytics

3. **Employee**
   - Attendance tracking
   - Salary management
   - Assigned tasks

---

### Core Modules Breakdown

#### **1. Authentication & Authorization**
- **Models:** Customer, Manager
- **Routes:** UserAccount_Route.js, Manager_Route.js (implied)
- **Features:**
  - Customer: email/password login
  - Manager: username/password login
  - Role-based access control

#### **2. Booking Management**
- **Models:** Booking.js, BookingLimit.js
- **Routes:** Booking_Route.js, BookingLimit_Route.js
- **Features:**
  - Create bookings with date/vehicle/customer details
  - Select packages or services
  - Daily booking limits enforced
  - Email confirmations (autocarenadeeka@gmail.com)
  - CRUD operations

#### **3. Vehicle Management**
- **Model:** Vehicle.js
- **Route:** Vehicle_Route.js
- **Features:**
  - Register vehicles with registration number
  - Track: Make, Model, Year, Engine, Transmission, Color, Features, Condition, Owner
  - Duplicate registration check
  - Search by ID or Registration Number
  - Associate with customer (cusID)

#### **4. Service Management**
- **Models:** Service.js, Package.js, ServiceHistory.js
- **Routes:** Service_Route.js, Package_Route.js, ServiceHistory_Route.js
- **Features:**
  - Service catalog
  - Package bundles
  - Service history tracking

#### **5. Payment Processing**
- **Models:** Payment.js, PaymentInvoice.js
- **Routes:** Payment_Route.js, PaymentInvoice.js
- **Features:**
  - Multiple payment methods: Cash, Card, Online
  - Link to bookings via Booking_Id
  - Search, pagination, sorting
  - Invoice generation

#### **6. Inventory Management**
- **Model:** Inventory.js
- **Route:** Inventory_Route.js
- **Features:**
  - Stock tracking
  - Supplier management (name, phone, email)
  - Purchase and sell prices
  - Location tracking
  - Duplicate name prevention
  - Validation: 10-digit phone, positive prices

#### **7. Employee Management**
- **Models:** Employee.js, EmployeeAttendance.js, EmployeeSalary.js
- **Routes:** Employee_Route.js, EmployeeAttendence_Route.js, EmployeeSalary_Route.js
- **Features:**
  - Auto-generated EmpID
  - Employee details: Name, DOB, NIC, Address, Salary, Contact, Email
  - Attendance tracking
  - Salary management

#### **8. Feedback System**
- **Model:** Feedback.js
- **Route:** Feedback_Route.js
- **Features:**
  - Customer feedback submission
  - Manager review

---

### Key Technical Details

| Aspect | Details |
|--------|---------|
| **Backend** | Node.js + Express (Port: 8077) |
| **Frontend** | React + Vite (Port: 5173) |
| **Database** | MongoDB (Mongoose ODM) |
| **Email** | NodeMailer + Gmail SMTP |
| **Validation** | Server-side validation on all routes |
| **ID Generation** | Auto-increment for EmpID, cusID patterns |

---

## ✅ TASK 2: CREATE TEST PLAN (1 hr)

### What You Need

I've created a comprehensive test plan for you:

📄 **File:** `QA_Documentation/Test_Plan.md`

### Test Plan Contents

✅ **Included:**
1. Introduction & Purpose
2. Scope (In-scope & Out-of-scope modules)
3. Test Types (Manual, Functional, UI, Integration, Negative)
4. Test Environment (Hardware, Software, Test Data)
5. Tools (Google Sheets, Browser DevTools, Postman)
6. Test Deliverables
7. Entry & Exit Criteria
8. Test Schedule
9. Risks & Mitigation
10. Assumptions
11. Roles & Responsibilities
12. Test Priorities (P0/P1/P2)
13. Approval Section

### How to Use

1. **Review** the test plan document
2. **Customize** based on your team's needs:
   - Update team member names
   - Adjust schedule dates
   - Modify tools if using different ones
3. **Get approval** from stakeholders before proceeding

---

## ✅ TASK 3: WRITE MANUAL TEST CASES (3-4 hrs)

### What You Have

📄 **File:** `QA_Documentation/Manual_Test_Cases.csv`

**Total Cases:** 70 test cases

### Test Case Breakdown

| Module | Count | Priority Focus |
|--------|-------|----------------|
| Authentication | 10 | P0 - Critical |
| Role-Based Access | 5 | P0 - Security |
| Booking Management | 10 | P0/P1 - Core flow |
| Booking Limits | 4 | P1 - Manager feature |
| Vehicle Management | 10 | P0/P1 - CRUD |
| Payment Processing | 10 | P0/P1 - Transactions |
| Inventory Management | 10 | P1 - Manager feature |
| Employee Management | 5 | P1 - HR module |
| Service & Packages | 4 | P1 - Catalog |
| Feedback | 3 | P2 - Optional |
| Security (Unauthorized) | 5 | P0 - Critical |
| Integration Testing | 3 | P1 - Flow validation |
| UI/UX | 5 | P2 - User experience |

### How to Use the CSV

#### **Option 1: Google Sheets (Recommended)**
1. Open Google Sheets
2. File → Import → Upload the CSV
3. Start executing tests
4. Share with team for collaboration

#### **Option 2: Microsoft Excel**
1. Open Excel
2. File → Open → Select the CSV
3. Enable editing
4. Use filters and sorting

#### **Option 3: VS Code**
1. Install "Excel Viewer" extension
2. Open the CSV in VS Code
3. View in table format

### Test Case Structure

Each test case includes:
- **Test Case ID**: Unique identifier (e.g., TC_AUTH_001)
- **Module**: Which module it tests
- **Test Scenario**: High-level scenario
- **Test Case Description**: Detailed description
- **Preconditions**: Setup required
- **Test Steps**: Step-by-step instructions
- **Test Data**: Exact data to use
- **Expected Result**: What should happen
- **Actual Result**: What actually happened (fill during execution)
- **Status**: Not Executed / Pass / Fail
- **Priority**: P0 (Critical) / P1 (High) / P2 (Medium)
- **Tested By**: Your name
- **Date**: Execution date
- **Comments**: Additional notes

---

## 🎯 EXECUTION STRATEGY

### Phase 1: Critical Tests (P0) - Day 1 Priority

**Execute these 26 tests first:**

1. **Authentication (4 tests)**
   - TC_AUTH_001: Valid customer registration
   - TC_AUTH_006: Valid customer login
   - TC_AUTH_009: Valid manager login
   - TC_AUTH_010: Invalid manager login

2. **Security (5 tests)**
   - TC_RBAC_001: Customer can't access manager dashboard
   - TC_RBAC_002: Unauthenticated access blocked
   - TC_UNAUTH_001-005: All unauthorized access tests

3. **Booking (3 tests)**
   - TC_BOOK_001: Create valid booking
   - TC_BOOK_003: Booking limit enforcement
   - TC_BOOK_009: Email validation

4. **Vehicle (3 tests)**
   - TC_VEH_001: Add valid vehicle
   - TC_VEH_003: Duplicate registration check
   - TC_VEH_002: Required field validation

5. **Payment (2 tests)**
   - TC_PAY_001: Create valid payment
   - TC_PAY_002: Required field validation

### Phase 2: High Priority (P1) - Day 2

Execute 36 P1 tests covering:
- Full CRUD operations
- Manager functionalities
- Integration flows
- Data validation

### Phase 3: Medium Priority (P2) - Day 3

Execute 8 P2 tests:
- UI/UX responsiveness
- Feedback system
- Optional features

---

## 🛠️ TESTING SETUP

### Before You Start

1. **Start Backend:**
```bash
cd Backend
npm install
node index.js
# Should run on port 8077
```

2. **Start Frontend:**
```bash
cd client
npm install
npm run dev
# Should run on port 5173
```

3. **Verify MongoDB Connection:**
   - Check Backend console for connection message
   - Ensure database is accessible

4. **Prepare Test Data:**
   - Create 1 manager account manually
   - Prepare sample customer data
   - Have vehicle images ready

### Test Execution Tips

✅ **DO:**
- Follow test steps exactly as written
- Document actual results
- Take screenshots of bugs
- Test on multiple browsers (Chrome, Firefox, Edge)
- Test different screen sizes
- Note any deviations from expected results

❌ **DON'T:**
- Skip preconditions
- Test multiple cases simultaneously
- Modify test data mid-execution
- Ignore minor UI issues

### Bug Reporting Format

When you find a bug:

```
Bug ID: BUG_001
Module: Booking
Severity: High
Priority: P0

Title: Booking limit not enforced on date 2026-01-25

Steps to Reproduce:
1. Set booking limit for 2026-01-25 to 5
2. Create 5 bookings for that date
3. Attempt to create 6th booking
4. Booking is created (should be blocked)

Expected: Error message "Booking limit exceeded"
Actual: Booking created successfully

Environment: Chrome 120, Windows 11
Screenshot: attached
```

---

## 📊 SAMPLE TEST EXECUTION

### Example: TC_AUTH_001

**Before Testing:**
- Status: Not Executed
- Actual Result: (empty)

**During Testing:**
1. Navigate to http://localhost:5173/register
2. Enter firstName: "John"
3. Enter lastName: "Doe"
4. Enter NIC: "123456789V"
5. Enter phone: "0771234567"
6. Enter email: "john@test.com"
7. Enter password: "Test@123"
8. Click "Register"

**After Testing:**
- Status: Pass
- Actual Result: "User registered successfully, redirected to login page"
- Tested By: Your Name
- Date: 2026-01-16
- Comments: "Works as expected"

---

## 📝 DAILY CHECKLIST

### End of Day 1

- [ ] System understanding document reviewed
- [ ] Test Plan created and reviewed
- [ ] 70 test cases documented in CSV
- [ ] Test environment verified and working
- [ ] At least 10-15 P0 tests executed
- [ ] Bugs documented (if any)
- [ ] Test execution report drafted

---

## 🎓 TESTING BEST PRACTICES

1. **Always test negative scenarios** - Don't just test happy paths
2. **Test boundary values** - Min/max lengths, dates, quantities
3. **Test special characters** - SQL injection, XSS attempts
4. **Verify database updates** - Use MongoDB Compass to verify data
5. **Test email functionality** - Check spam folder for confirmations
6. **Clear cache between tests** - Ensure clean state
7. **Document assumptions** - Note anything unclear
8. **Retest after fixes** - Always verify bug fixes

---

## 📞 SUPPORT RESOURCES

### Documentation Files Created

1. **Test_Plan.md** - Complete testing strategy
2. **Manual_Test_Cases.csv** - All 70 test cases
3. **Day1_QA_Guide.md** - This guide

### Key Code References

- **Backend Routes**: `Backend/Routes/` folder
- **Backend Models**: `Backend/Models/` folder
- **Frontend Pages**: `client/src/assets/pages/` folder

---

## ✨ SUCCESS CRITERIA FOR DAY 1

You've completed Day 1 successfully if you have:

✅ Clear understanding of all system modules  
✅ Test plan document approved  
✅ 70 test cases documented  
✅ Test environment set up and working  
✅ 15-20 critical (P0) test cases executed  
✅ Bug list created (even if empty)  
✅ Ready to continue Day 2 testing  

---

## 🚀 NEXT STEPS (Day 2+)

1. Complete all P0 test execution
2. Begin P1 test execution
3. Log and track all bugs
4. Retest fixed bugs
5. Create test execution report
6. Plan for automation (if required)

---

**Good luck with your testing! 🎯**