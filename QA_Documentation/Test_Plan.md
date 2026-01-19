# Vehicle Management System - Test Plan

**Version:** 1.0  
**Date:** January 16, 2026  
**Prepared by:** QA Team  
**Project:** Vehicle Service Management System

---

## 1. INTRODUCTION

### 1.1 Purpose
This document outlines the testing strategy for the Vehicle Service Management System, ensuring quality, functionality, and reliability across all modules.

### 1.2 Project Overview
A comprehensive web application for managing vehicle services with three user roles:
- **Customer**: Book services, manage vehicles, make payments
- **Manager**: Administrative control, view analytics, manage system
- **Employee**: Handle attendance, salary, and operational tasks

---

## 2. SCOPE

### 2.1 In-Scope Modules

#### Authentication & Authorization
- Customer registration and login
- Manager login
- Role-based access control
- Session management

#### Booking Management
- Create bookings with packages/services
- View/Edit/Delete bookings
- Booking limits per day
- Email confirmations

#### Vehicle Management
- CRUD operations for vehicles
- Vehicle registration validation
- Customer-vehicle association
- Vehicle condition tracking

#### Service Management
- Service catalog
- Package management
- Service history tracking
- Service assignment

#### Payment Processing
- Payment creation and recording
- Multiple payment methods
- Payment invoice generation
- Payment history

#### Inventory Management
- Stock tracking
- Supplier management
- Price management
- Low stock alerts

#### Employee Management
- Employee CRUD operations
- Attendance tracking
- Salary management
- Auto-generated employee IDs

#### Feedback System
- Customer feedback submission
- Feedback review and management

### 2.2 Out-of-Scope
- Third-party payment gateway integration (Stripe/PayPal)
- Mobile application testing
- Performance/Load testing (covered in later phases)
- Security penetration testing

---

## 3. TEST TYPES

### 3.1 Manual Testing (Day 1 Focus)
- **Functional Testing**: Verify features work as expected
- **UI/UX Testing**: Check interface usability
- **Integration Testing**: Test module interactions
- **Negative Testing**: Invalid inputs and edge cases

### 3.2 Future Test Types (Not Day 1)
- Automated testing (API & UI)
- Performance testing
- Security testing
- Regression testing

---

## 4. TEST ENVIRONMENT

### 4.1 Hardware
- **OS**: Windows 10/11
- **Browser**: Chrome (latest), Firefox (latest), Edge (latest)
- **Screen Resolution**: 1920x1080, 1366x768

### 4.2 Software
- **Frontend**: React + Vite (Port: 5173)
- **Backend**: Node.js + Express (Port: 8077)
- **Database**: MongoDB
- **Email Service**: Gmail SMTP

### 4.3 Test Data
- 10-15 test customer accounts
- 5-10 test vehicles
- 3-5 test employees
- 1 manager account
- Sample services and packages

---

## 5. TOOLS

| Tool | Purpose |
|------|---------|
| Google Sheets / Excel | Manual test case management |
| Browser DevTools | Debug and inspect elements |
| Postman (optional) | API testing |
| MongoDB Compass | Database verification |
| Screenshot tool | Bug reporting |

---

## 6. TEST DELIVERABLES

1. Test Plan (this document)
2. Test Cases Excel/Google Sheet (50-70 cases)
3. Test Execution Report
4. Bug Report (if issues found)

---

## 7. ENTRY & EXIT CRITERIA

### 7.1 Entry Criteria
- ✅ Development environment set up
- ✅ Application deployable and running
- ✅ Test environment configured
- ✅ Test data prepared
- ✅ Test cases reviewed and approved

### 7.2 Exit Criteria
- ✅ All critical test cases executed
- ✅ 95%+ test case pass rate for critical flows
- ✅ All critical bugs resolved
- ✅ Test report documented
- ✅ Stakeholder sign-off

---

## 8. TEST SCHEDULE

| Phase | Activity | Duration | Status |
|-------|----------|----------|--------|
| Day 1 | System understanding | 1-2 hrs | ✅ |
| Day 1 | Test plan creation | 1 hr | 🔄 In Progress |
| Day 1 | Write test cases | 3-4 hrs | ⏳ Pending |
| Day 2+ | Execute test cases | TBD | ⏳ Pending |
| Day 3+ | Bug reporting & retesting | TBD | ⏳ Pending |

---

## 9. RISK & MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Environment downtime | High | Maintain local test environment |
| Incomplete test data | Medium | Create comprehensive test data set |
| Unclear requirements | High | Document assumptions, seek clarification |
| Time constraints | Medium | Prioritize critical flows first |

---

## 10. ASSUMPTIONS

1. All required APIs are functional
2. Database is accessible and populated with base data
3. Email service is configured correctly
4. Role-based access is implemented in backend

---

## 11. ROLES & RESPONSIBILITIES

| Role | Responsibility |
|------|----------------|
| QA Engineer | Design, execute tests, report bugs |
| Developer | Fix bugs, provide clarifications |
| Manager | Review test results, approve releases |

---

## 12. TEST PRIORITIES

### P0 - Critical (Must Test)
- Login/Registration
- Booking creation
- Payment processing
- Role-based access

### P1 - High (Should Test)
- Vehicle CRUD
- Service management
- Inventory updates
- Email notifications

### P2 - Medium (Nice to Test)
- Feedback system
- Employee management
- Reports and analytics

---

## 13. APPROVAL

| Name | Role | Signature | Date |
|------|------|-----------|------|
|      | QA Lead |           |      |
|      | Project Manager |   |      |
|      | Development Lead |  |      |
