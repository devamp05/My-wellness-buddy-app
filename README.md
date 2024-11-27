# CMPT370_T13_Team34_GroupProject



# My Wellness Buddy

My Wellness Buddy is a **food logging and wellness app** designed with a dietician's perspective in mind. This app aims to promote better health by providing users with personalized nutrition and fitness tracking tools.

---

## Team 34 – The Fit Fellas

- **Ogo Alege** (egv062)
- **Stephen Kelly** (bjl294)
- **Yusup Guldadov** (hze083)
- **Devam Patel** (dns682)
- **Zachary Szakacs** (bxq315)
- **Brian Zhou** (baz896)

---

## Product Vision

My Wellness Buddy is built for users seeking **nutrition and fitness guidance**, with insights curated by a dietician. Whether you're a student, professional athlete, or someone managing a busy lifestyle, this app helps you achieve your wellness goals by:

- Logging food and nutrients.
- Providing meal plan recommendations.
- Tracking progress toward health and fitness goals.

---

## Key Features

### 1. Meal Plan Generation
- Personalized meal plans based on user goals.
- Calorie and nutrient recommendations tailored to individual needs.

### 2. Food Logging and Nutrition Tracking
- Log daily food intake with macronutrient breakdown.
- Track recipes and create custom meals.

### 3. User-Centric Design
- Simple, non-overwhelming interface for all user types.
- Features tailored for specific personas:
  - Students looking to optimize meal planning.
  - Professionals balancing health with busy schedules.
  - Athletes optimizing nutrition for peak performance.
  - Individuals with unique dietary needs (e.g., allergies).

### 4. Integration and Scalability
- Cloud-based storage using **MongoDB**.
- Built on a **React Native** framework for cross-platform support.

---

## Personas

We designed this app with six core personas in mind, including:

1. **Ahmad**: A student aiming to gain weight and track nutrition.
2. **William**: A busy student-worker seeking time-efficient health solutions.
3. **Jeremy**: A moderately active janitor focusing on cost-effective wellness.
4. **James**: An NFL player needing precise food and nutrient tracking.
5. **Bob**: An accountant managing prediabetes through healthy eating.
6. **Aakash**: A software developer meal-prepping to cut out junk food.

---

## Software Architecture

- **Client-Server Pattern**:
  - Supports many clients connecting to a centralized server.
- **Front-End**:
  - Framework: React Native with Expo Go for testing.
  - Language: JavaScript.
- **Back-End**:
  - Database: MongoDB.

---

## Epics & User Stories

Our development process follows Agile principles, with user stories focused on:

- **Meal Plan Customization** (e.g., create a weekly plan for Ahmad).
- **Tracking Progress** (e.g., log weight changes or compare nutrients for James).
- **Personalized Suggestions** (e.g., allergy-friendly recipes for Bob).

---

## QA Plan

- **Integration Testing**: Manual task-based walkthroughs for end-to-end validation.
- **Unit Testing**: Key backend functions (`searchOne()` and `getAll()`).
- **Regression Testing**: Automated class-specific tests to ensure feature stability.
- **System Testing**: Manual API tests using Postman.

---

## Next Steps

1. Refine existing features and code.
2. Expand database to include **dietician-approved meals**.
3. Implement user profile management with secure authentication.
4. Integrate external APIs to enrich app functionality.
5. Plan for a public release.

---

## How to Run

1. Clone the repository.
2. Set up MongoDB for backend storage.
3. Install dependencies:
   ```bash
   npm install
4. Start the app in development mode:
Copy code
```bash
expo start
```
5. Test API endpoints using Postman.


### Contributions

This project was collaboratively built by Team 34 – The Fit Fellas. Contributions are welcome as we continue to expand My Wellness Buddy into a robust wellness tool.

