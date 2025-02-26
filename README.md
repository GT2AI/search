# search
Search tool

# System Design Documentation

## User Authentication Flow

```mermaid
sequenceDiagram
    User->>Frontend: Enter credentials
    Frontend->>API: Submit login request
    API->>Database: Validate credentials
    Database-->>API: Return user data
    API-->>Frontend: Return JWT token
    Frontend-->>User: Display logged-in state