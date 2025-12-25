# eDMS (Enterprise Document Management System)

A modern, responsive **Enterprise Document Management System** built with **SvelteKit**, **TailwindCSS**, and **shadcn/ui**. Designed for LAN/offline use, this project demonstrates **user roles, department-aware permissions, document workflows, and audit logging** with a polished UI/UX.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

- **User Accounts**
  - Roles: `admin`, `editor`, `viewer`
  - Department-based access control
  - Login & logout
  - Create new user (admin-only)

- **Document Management**
  - Metadata tracking
  - Versioning
  - Soft deletes / archiving
  - Owner-based permissions

- **Access Control & Approval Workflow**
  - Request access for downloads or sharing
  - Admin or owner can approve/deny
  - Expiration dates on access

- **Audit & Logs**
  - Immutable access logs (view/download/share)
  - Department tracking
  - Admin audit logs

- **UI & UX**
  - TailwindCSS + shadcn/ui components
  - Gradient backgrounds, hover effects, subtle animations
  - Responsive design for desktop and mobile

- **Offline / LAN Capable**
  - Works locally without external internet dependency
  - Mock API ready to be replaced by backend integration

---

## Tech Stack

- **Frontend:** SvelteKit + TypeScript  
- **UI:** TailwindCSS + shadcn/ui  
- **State Management:** Svelte stores  
- **Mock Backend:** TypeScript services (replaceable with real API)  
- **Authentication:** Role-based with department awareness  

---


## Project Structure

COMING SOON.

---

## Future Features

- Future Enhancements
- Real backend integration (SQLite/PostgreSQL)
- LAN-based file sharing & storage
- File encryption & version rollback
- Advanced audit dashboards
- Drag-and-drop document upload
- Email notifications for access approvals

---
